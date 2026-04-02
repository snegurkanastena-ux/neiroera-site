"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "./TextType.css";

export type TextTypeProps = {
  text: string | string[];
  as?: "h1" | "h2" | "div" | "span";
  typingSpeed?: number;
  initialDelay?: number;
  pauseDuration?: number;
  deletingSpeed?: number;
  loop?: boolean;
  className?: string;
  showCursor?: boolean;
  hideCursorWhileTyping?: boolean;
  cursorCharacter?: string;
  cursorClassName?: string;
  /** Длительность одной фазы мигания (полный цикл ≈ 2×) */
  cursorBlinkDuration?: number;
  variableSpeed?: { min: number; max: number };
  onSentenceComplete?: (sentence: string, index: number) => void;
  startOnVisible?: boolean;
  reverseMode?: boolean;
} & Omit<React.HTMLAttributes<HTMLElement>, "children">;

export function TextType({
  text,
  as: Tag = "div",
  typingSpeed = 50,
  initialDelay = 0,
  pauseDuration = 2000,
  deletingSpeed = 30,
  loop = true,
  className = "",
  showCursor = true,
  hideCursorWhileTyping = false,
  cursorCharacter = "|",
  cursorClassName = "",
  cursorBlinkDuration = 0.5,
  variableSpeed,
  onSentenceComplete,
  startOnVisible = false,
  reverseMode = false,
  ...rest
}: TextTypeProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(!startOnVisible);
  const [ready, setReady] = useState(initialDelay <= 0);
  const containerRef = useRef<HTMLElement | null>(null);

  const assignRef = useCallback((node: HTMLElement | null) => {
    containerRef.current = node;
  }, []);

  const textArray = useMemo(() => (Array.isArray(text) ? text : [text]), [text]);

  const getRandomSpeed = useCallback(() => {
    if (!variableSpeed) return typingSpeed;
    const { min, max } = variableSpeed;
    return Math.random() * (max - min) + min;
  }, [variableSpeed, typingSpeed]);

  const fullText = useMemo(() => {
    const raw = textArray[currentTextIndex] ?? "";
    return reverseMode ? raw.split("").reverse().join("") : raw;
  }, [textArray, currentTextIndex, reverseMode]);

  useEffect(() => {
    if (initialDelay <= 0) {
      setReady(true);
      return;
    }
    const id = window.setTimeout(() => setReady(true), initialDelay);
    return () => window.clearTimeout(id);
  }, [initialDelay]);

  useEffect(() => {
    if (!startOnVisible || !containerRef.current) return;

    const el = containerRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setIsVisible(true);
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [startOnVisible]);

  useEffect(() => {
    if (!isVisible || !ready) return;

    const full = fullText;
    let timeoutId: number | undefined;

    if (!isDeleting) {
      if (displayedText.length < full.length) {
        const speed = variableSpeed ? getRandomSpeed() : typingSpeed;
        timeoutId = window.setTimeout(() => {
          setDisplayedText(full.slice(0, displayedText.length + 1));
        }, speed);
      } else {
        if (!loop && currentTextIndex === textArray.length - 1) {
          return undefined;
        }
        timeoutId = window.setTimeout(() => setIsDeleting(true), pauseDuration);
      }
    } else if (displayedText.length > 0) {
      timeoutId = window.setTimeout(() => {
        setDisplayedText((prev) => prev.slice(0, -1));
      }, deletingSpeed);
    } else {
      const completed = textArray[currentTextIndex];
      const completedIndex = currentTextIndex;
      timeoutId = window.setTimeout(() => {
        onSentenceComplete?.(completed, completedIndex);
        setIsDeleting(false);
        setCurrentTextIndex((prev) => (prev + 1) % textArray.length);
      }, pauseDuration);
    }

    return () => {
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
    };
  }, [
    isVisible,
    ready,
    displayedText,
    isDeleting,
    fullText,
    typingSpeed,
    deletingSpeed,
    pauseDuration,
    loop,
    currentTextIndex,
    textArray,
    variableSpeed,
    getRandomSpeed,
    onSentenceComplete
  ]);

  const shouldHideCursor =
    hideCursorWhileTyping && (displayedText.length < fullText.length || isDeleting);

  const blinkPeriod = `${cursorBlinkDuration * 2}s`;

  return (
    <Tag
      ref={assignRef as never}
      className={`text-type ${className}`.trim()}
      style={
        {
          ["--text-type-blink-period" as string]: blinkPeriod
        } as React.CSSProperties
      }
      {...rest}
    >
      <span className="text-type__content">{displayedText}</span>
      {showCursor ? (
        <span
          className={`text-type__cursor ${cursorClassName} ${shouldHideCursor ? "text-type__cursor--hidden" : ""}`.trim()}
          aria-hidden
        >
          {cursorCharacter}
        </span>
      ) : null}
    </Tag>
  );
}

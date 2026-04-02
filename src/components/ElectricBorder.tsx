"use client";

import { useCallback, useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import "./ElectricBorder.css";

function fract(x: number) {
  return x - Math.floor(x);
}

export type ElectricBorderProps = {
  children: ReactNode;
  /** Явный цвет линии canvas */
  color?: string;
  /** Второй цвет для градиента свечения */
  secondaryColor?: string;
  /** Какой акцент темы — основа «молнии», второй берётся парным */
  accentVariant?: "accent" | "accent2";
  speed?: number;
  chaos?: number;
  borderRadius?: number;
  className?: string;
  style?: CSSProperties;
  contentClassName?: string;
};

export function ElectricBorder({
  children,
  color,
  secondaryColor,
  accentVariant = "accent",
  speed = 1,
  chaos = 0.12,
  borderRadius = 24,
  className = "",
  style,
  contentClassName = ""
}: ElectricBorderProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const timeRef = useRef(0);
  const lastFrameTimeRef = useRef(0);
  const widthRef = useRef(0);
  const heightRef = useRef(0);
  const strokeColorRef = useRef(color ?? "rgb(72, 255, 207)");

  const random = useCallback((x: number) => fract(Math.sin(x * 12.9898) * 43758.5453), []);

  const noise2D = useCallback(
    (x: number, y: number) => {
      const i = Math.floor(x);
      const j = Math.floor(y);
      const fx = x - i;
      const fy = y - j;

      const a = random(i + j * 57);
      const b = random(i + 1 + j * 57);
      const c = random(i + (j + 1) * 57);
      const d = random(i + 1 + (j + 1) * 57);

      const ux = fx * fx * (3.0 - 2.0 * fx);
      const uy = fy * fy * (3.0 - 2.0 * fy);

      return a * (1 - ux) * (1 - uy) + b * ux * (1 - uy) + c * (1 - ux) * uy + d * ux * uy;
    },
    [random]
  );

  const octavedNoise = useCallback(
    (
      x: number,
      octaves: number,
      lacunarity: number,
      gain: number,
      baseAmplitude: number,
      baseFrequency: number,
      time: number,
      seed: number,
      baseFlatness: number
    ) => {
      let y = 0;
      let amplitude = baseAmplitude;
      let frequency = baseFrequency;

      for (let i = 0; i < octaves; i++) {
        let octaveAmplitude = amplitude;
        if (i === 0) {
          octaveAmplitude *= baseFlatness;
        }
        y += octaveAmplitude * noise2D(frequency * x + seed * 100, time * frequency * 0.3);
        frequency *= lacunarity;
        amplitude *= gain;
      }

      return y;
    },
    [noise2D]
  );

  const getCornerPoint = useCallback(
    (centerX: number, centerY: number, radius: number, startAngle: number, arcLength: number, progress: number) => {
      const angle = startAngle + progress * arcLength;
      return {
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle)
      };
    },
    []
  );

  const getRoundedRectPoint = useCallback(
    (t: number, left: number, top: number, width: number, height: number, radius: number) => {
      const straightWidth = width - 2 * radius;
      const straightHeight = height - 2 * radius;
      const cornerArc = (Math.PI * radius) / 2;
      const totalPerimeter = 2 * straightWidth + 2 * straightHeight + 4 * cornerArc;
      const distance = t * totalPerimeter;

      let accumulated = 0;

      if (distance <= accumulated + straightWidth) {
        const progress = (distance - accumulated) / straightWidth;
        return { x: left + radius + progress * straightWidth, y: top };
      }
      accumulated += straightWidth;

      if (distance <= accumulated + cornerArc) {
        const progress = (distance - accumulated) / cornerArc;
        return getCornerPoint(left + width - radius, top + radius, radius, -Math.PI / 2, Math.PI / 2, progress);
      }
      accumulated += cornerArc;

      if (distance <= accumulated + straightHeight) {
        const progress = (distance - accumulated) / straightHeight;
        return { x: left + width, y: top + radius + progress * straightHeight };
      }
      accumulated += straightHeight;

      if (distance <= accumulated + cornerArc) {
        const progress = (distance - accumulated) / cornerArc;
        return getCornerPoint(left + width - radius, top + height - radius, radius, 0, Math.PI / 2, progress);
      }
      accumulated += cornerArc;

      if (distance <= accumulated + straightWidth) {
        const progress = (distance - accumulated) / straightWidth;
        return { x: left + width - radius - progress * straightWidth, y: top + height };
      }
      accumulated += straightWidth;

      if (distance <= accumulated + cornerArc) {
        const progress = (distance - accumulated) / cornerArc;
        return getCornerPoint(left + radius, top + height - radius, radius, Math.PI / 2, Math.PI / 2, progress);
      }
      accumulated += cornerArc;

      if (distance <= accumulated + straightHeight) {
        const progress = (distance - accumulated) / straightHeight;
        return { x: left, y: top + height - radius - progress * straightHeight };
      }
      accumulated += straightHeight;

      const progress = (distance - accumulated) / cornerArc;
      return getCornerPoint(left + radius, top + radius, radius, Math.PI, Math.PI / 2, progress);
    },
    [getCornerPoint]
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const apply = () => {
      const el = containerRef.current;
      if (!el) return;
      const root = document.documentElement;
      const primaryVar = accentVariant === "accent2" ? "--accent2-rgb" : "--accent-rgb";
      const secondaryVar = accentVariant === "accent2" ? "--accent-rgb" : "--accent2-rgb";

      if (color) {
        el.style.setProperty("--electric-border-color", color);
        strokeColorRef.current = color;
      } else {
        const raw = getComputedStyle(root).getPropertyValue(primaryVar).trim();
        if (raw) {
          const rgb = `rgb(${raw.split(/\s+/).join(", ")})`;
          el.style.setProperty("--electric-border-color", rgb);
          strokeColorRef.current = rgb;
        }
      }

      if (secondaryColor) {
        el.style.setProperty("--electric-border-secondary", secondaryColor);
      } else {
        const raw2 = getComputedStyle(root).getPropertyValue(secondaryVar).trim();
        if (raw2) {
          el.style.setProperty("--electric-border-secondary", `rgb(${raw2.split(/\s+/).join(", ")})`);
        }
      }
    };

    apply();
    const mo = new MutationObserver(apply);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => mo.disconnect();
  }, [accentVariant, color, secondaryColor]);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const octaves = 10;
    const lacunarity = 1.6;
    const gain = 0.7;
    const amplitude = chaos;
    const frequency = 10;
    const baseFlatness = 0;
    const displacement = 60;
    const borderOffset = 60;

    const updateSize = () => {
      const rect = container.getBoundingClientRect();
      const logicalW = rect.width + borderOffset * 2;
      const logicalH = rect.height + borderOffset * 2;
      widthRef.current = logicalW;
      heightRef.current = logicalH;

      const dpr = Math.min(typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1, 2);
      canvas.width = Math.max(1, Math.floor(logicalW * dpr));
      canvas.height = Math.max(1, Math.floor(logicalH * dpr));
      canvas.style.width = `${logicalW}px`;
      canvas.style.height = `${logicalH}px`;

      return { width: logicalW, height: logicalH };
    };

    updateSize();
    lastFrameTimeRef.current = 0;

    const drawElectricBorder = (currentTime: number) => {
      if (!canvas || !ctx) return;

      if (lastFrameTimeRef.current === 0) {
        lastFrameTimeRef.current = currentTime;
      }
      const deltaTime = Math.min((currentTime - lastFrameTimeRef.current) / 1000, 0.064);
      lastFrameTimeRef.current = currentTime;
      timeRef.current += deltaTime * speed;

      const dpr = Math.max(canvas.width / widthRef.current, 1e-6);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      ctx.strokeStyle = strokeColorRef.current;
      ctx.lineWidth = 1;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      const width = widthRef.current;
      const height = heightRef.current;
      const scale = displacement;
      const left = borderOffset;
      const top = borderOffset;
      const borderWidth = width - 2 * borderOffset;
      const borderHeight = height - 2 * borderOffset;
      const maxRadius = Math.min(borderWidth, borderHeight) / 2;
      const radius = Math.min(borderRadius, maxRadius);

      const approximatePerimeter = 2 * (borderWidth + borderHeight) + 2 * Math.PI * radius;
      const sampleCount = Math.max(32, Math.floor(approximatePerimeter / 2));

      ctx.beginPath();

      for (let i = 0; i <= sampleCount; i++) {
        const progress = i / sampleCount;
        const point = getRoundedRectPoint(progress, left, top, borderWidth, borderHeight, radius);

        const xNoise = octavedNoise(
          progress * 8,
          octaves,
          lacunarity,
          gain,
          amplitude,
          frequency,
          timeRef.current,
          0,
          baseFlatness
        );

        const yNoise = octavedNoise(
          progress * 8,
          octaves,
          lacunarity,
          gain,
          amplitude,
          frequency,
          timeRef.current,
          1,
          baseFlatness
        );

        const displacedX = point.x + xNoise * scale;
        const displacedY = point.y + yNoise * scale;

        if (i === 0) {
          ctx.moveTo(displacedX, displacedY);
        } else {
          ctx.lineTo(displacedX, displacedY);
        }
      }

      ctx.closePath();
      ctx.stroke();

      animationRef.current = requestAnimationFrame(drawElectricBorder);
    };

    const ro = new ResizeObserver(() => {
      updateSize();
    });
    ro.observe(container);

    animationRef.current = requestAnimationFrame(drawElectricBorder);

    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
      ro.disconnect();
    };
  }, [speed, chaos, borderRadius, getRoundedRectPoint, octavedNoise, accentVariant, color, secondaryColor]);

  const mergedStyle: CSSProperties = {
    borderRadius: `${borderRadius}px`,
    ...(color ? { ["--electric-border-color" as string]: color } : {}),
    ...(secondaryColor ? { ["--electric-border-secondary" as string]: secondaryColor } : {}),
    ...style
  };

  return (
    <div ref={containerRef} className={`electric-border ${className}`.trim()} style={mergedStyle}>
      <div className="eb-layers" aria-hidden>
        <div className="eb-glow-1" />
        <div className="eb-glow-2" />
        <div className="eb-background-glow" />
      </div>
      <div className="eb-canvas-wrap">
        <canvas ref={canvasRef} className="eb-canvas" aria-hidden />
      </div>
      <div className={`eb-content ${contentClassName}`.trim()}>{children}</div>
    </div>
  );
}

/* eslint-disable react/no-unknown-property */
"use client";

import { Canvas, extend, useFrame } from "@react-three/fiber";
import { Environment, Lightformer, useGLTF, useTexture } from "@react-three/drei";
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  type RapierRigidBody,
  useRopeJoint,
  useSphericalJoint
} from "@react-three/rapier";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";
import { Suspense, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import "./Lanyard.css";

extend({ MeshLineGeometry, MeshLineMaterial });

const CARD_URL = "/lanyard/card.glb";
const LANYARD_TEX = "/lanyard/lanyard.png";

function bandXOffsets(count: number, spread: number): number[] {
  if (count <= 0) return [];
  if (count === 1) return [0];
  const mid = (count - 1) / 2;
  return Array.from({ length: count }, (_, i) => (i - mid) * spread);
}

export type LanyardSceneProps = {
  /** URL картинок для лицевой стороны каждой карточки (по одному шнурку на URL). */
  photoUrls: readonly string[];
  position?: [number, number, number];
  gravity?: [number, number, number];
  fov?: number;
  transparent?: boolean;
  className?: string;
};

export function LanyardScene({
  photoUrls,
  position,
  gravity = [0, -40, 0],
  fov,
  transparent = true,
  className = ""
}: LanyardSceneProps) {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const count = photoUrls.length;
  const spread = isMobile ? 2.45 : 3.05;
  const offsets = useMemo(() => bandXOffsets(count, spread), [count, spread]);

  const camera = useMemo(() => {
    const z = isMobile ? (count > 2 ? 32 : 28) : count > 2 ? 28 : 24;
    const y = count > 2 ? 0.45 : 0.2;
    const pos = position ?? [0, y, z];
    const f = fov ?? (count > 2 ? 22 : 20);
    return { position: pos as [number, number, number], fov: f };
  }, [count, isMobile, position, fov]);

  if (count === 0) return null;

  return (
    <div className={`lanyard-neuro-wrapper ${className}`.trim()}>
      <Canvas
        camera={camera}
        dpr={[1, isMobile ? 1.5 : 2]}
        gl={{ alpha: transparent, antialias: true, powerPreference: "high-performance" }}
        onCreated={({ gl }) => gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1)}
      >
        <ambientLight intensity={Math.PI} />
        <Suspense fallback={null}>
          {photoUrls.map((src, i) => (
            <Physics key={src} gravity={gravity} timeStep={isMobile ? 1 / 30 : 1 / 60}>
              <Band photoSrc={src} xOffset={offsets[i] ?? 0} isMobile={isMobile} />
            </Physics>
          ))}
        </Suspense>
        <Environment blur={0.75}>
          <Lightformer
            intensity={2}
            color="white"
            position={[0, -1, 5]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={3}
            color="white"
            position={[-1, -1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={3}
            color="white"
            position={[1, 1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={10}
            color="white"
            position={[-10, 0, 14]}
            rotation={[0, Math.PI / 2, Math.PI / 3]}
            scale={[100, 10, 1]}
          />
        </Environment>
      </Canvas>
    </div>
  );
}

type BandProps = {
  photoSrc: string;
  xOffset: number;
  maxSpeed?: number;
  minSpeed?: number;
  isMobile?: boolean;
};

function Band({ photoSrc, xOffset, maxSpeed = 50, minSpeed = 0, isMobile = false }: BandProps) {
  const band = useRef<THREE.Mesh>(null);
  const fixed = useRef<RapierRigidBody>(null);
  const j1 = useRef<RapierRigidBody>(null);
  const j2 = useRef<RapierRigidBody>(null);
  const j3 = useRef<RapierRigidBody>(null);
  const card = useRef<RapierRigidBody>(null);

  const vec = new THREE.Vector3();
  const ang = new THREE.Vector3();
  const dir = new THREE.Vector3();
  const dampQuat = useMemo(() => new THREE.Quaternion(), []);
  const dampEuler = useMemo(() => new THREE.Euler(), []);

  const segmentProps = {
    type: "dynamic" as const,
    canSleep: true,
    colliders: false as const,
    angularDamping: 4,
    linearDamping: 4
  };

  const { nodes, materials } = useGLTF(CARD_URL) as unknown as {
    nodes: { card: THREE.Mesh; clip: THREE.Mesh; clamp: THREE.Mesh };
    materials: { base: THREE.MeshStandardMaterial; metal: THREE.Material };
  };

  const lanyardTex = useTexture(LANYARD_TEX);
  const photoMap = useTexture(photoSrc);

  useLayoutEffect(() => {
    photoMap.colorSpace = THREE.SRGBColorSpace;
    photoMap.wrapS = photoMap.wrapT = THREE.ClampToEdgeWrapping;
    photoMap.needsUpdate = true;
  }, [photoMap]);

  const [curve] = useState(
    () => new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()])
  );
  const [dragged, drag] = useState<false | THREE.Vector3>(false);
  const [hovered, hover] = useState(false);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [
    [0, 0, 0],
    [0, 1.45, 0]
  ]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? "grabbing" : "grab";
      return () => {
        document.body.style.cursor = "auto";
      };
    }
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    if (dragged !== false && card.current) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());
      card.current.setNextKinematicTranslation({
        x: vec.x - dragged.x,
        y: vec.y - dragged.y,
        z: vec.z - dragged.z
      });
    }
    if (fixed.current && j1.current && j2.current && j3.current && card.current && band.current) {
      const j1c = j1.current;
      const j2c = j2.current;
      const j1Any = j1c as RapierRigidBody & { lerped?: THREE.Vector3 };
      const j2Any = j2c as RapierRigidBody & { lerped?: THREE.Vector3 };
      if (!j1Any.lerped) j1Any.lerped = new THREE.Vector3().copy(j1c.translation() as unknown as THREE.Vector3);
      if (!j2Any.lerped) j2Any.lerped = new THREE.Vector3().copy(j2c.translation() as unknown as THREE.Vector3);

      const step = (ref: typeof j1Any) => {
        const clampedDistance = Math.max(0.1, Math.min(1, ref.lerped!.distanceTo(ref.translation() as unknown as THREE.Vector3)));
        ref.lerped!.lerp(
          ref.translation() as unknown as THREE.Vector3,
          delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed))
        );
      };
      step(j1Any);
      step(j2Any);

      curve.points[0].copy(j3.current.translation() as unknown as THREE.Vector3);
      curve.points[1].copy(j2Any.lerped!);
      curve.points[2].copy(j1Any.lerped!);
      curve.points[3].copy(fixed.current.translation() as unknown as THREE.Vector3);

      const geom = band.current.geometry as unknown as InstanceType<typeof MeshLineGeometry>;
      geom.setPoints(curve.getPoints(isMobile ? 16 : 32));

      ang.copy(card.current.angvel() as unknown as THREE.Vector3);
      const rq = card.current.rotation();
      dampQuat.set(rq.x, rq.y, rq.z, rq.w);
      dampEuler.setFromQuaternion(dampQuat, "YXZ");
      card.current.setAngvel({ x: ang.x, y: ang.y - dampEuler.y * 0.25, z: ang.z }, true);
    }
  });

  curve.curveType = "chordal";
  lanyardTex.wrapS = lanyardTex.wrapT = THREE.RepeatWrapping;

  const resX = isMobile ? 1200 : 1600;
  const resY = isMobile ? 2000 : 1100;

  return (
    <group position={[xOffset, 0, 0]}>
      <group position={[0, 4, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody
          position={[2, 0, 0]}
          ref={card}
          {...segmentProps}
          type={dragged !== false ? "kinematicPosition" : "dynamic"}
        >
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group
            scale={2.25}
            position={[0, -1.2, -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(e) => {
              (e.target as HTMLElement).releasePointerCapture(e.pointerId);
              drag(false);
            }}
            onPointerDown={(e) => {
              (e.target as HTMLElement).setPointerCapture(e.pointerId);
              if (!card.current) return;
              drag(
                new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation() as unknown as THREE.Vector3))
              );
            }}
          >
            <mesh geometry={nodes.card.geometry}>
              <meshPhysicalMaterial
                map={photoMap}
                clearcoat={isMobile ? 0 : 0.85}
                clearcoatRoughness={0.2}
                roughness={0.65}
                metalness={0.15}
              />
            </mesh>
            <mesh geometry={nodes.clip.geometry} material={materials.metal} />
            <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
          </group>
        </RigidBody>
      </group>
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          color="white"
          depthTest={false}
          resolution={[resX, resY]}
          useMap
          map={lanyardTex}
          repeat={[-4, 1]}
          lineWidth={1}
        />
      </mesh>
    </group>
  );
}

useGLTF.preload(CARD_URL);

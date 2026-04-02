declare module "meshline" {
  import type * as THREE from "three";
  export class MeshLineGeometry extends THREE.BufferGeometry {
    setPoints(points: THREE.Vector3[]): void;
  }
  export class MeshLineMaterial extends THREE.Material {
    constructor(parameters?: Record<string, unknown>);
  }
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      meshLineGeometry: Record<string, unknown>;
      meshLineMaterial: Record<string, unknown>;
    }
  }
}

export {};

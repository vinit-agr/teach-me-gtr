"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Grid } from "@react-three/drei";
import * as THREE from "three";
import { useMemo } from "react";

interface CurvedSurfaceVisualizationProps {
  curvature: number;
  gridDensity: number;
}

function CurvedSurface({
  curvature,
  gridDensity,
}: CurvedSurfaceVisualizationProps) {
  const geometry = useMemo(() => {
    const size = 10;
    const segments = gridDensity;

    const geometry = new THREE.PlaneGeometry(size, size, segments, segments);
    const positions = geometry.attributes.position;

    // Apply curvature to the surface
    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i);
      const y = positions.getY(i);

      // Calculate distance from center
      const distanceFromCenter = Math.sqrt(x * x + y * y);

      // Apply Gaussian curvature
      const z =
        curvature * Math.exp(-(distanceFromCenter * distanceFromCenter) / 10);

      positions.setZ(i, z);
    }

    geometry.computeVertexNormals();
    return geometry;
  }, [curvature, gridDensity]);

  return (
    <mesh geometry={geometry} rotation={[-Math.PI / 2, 0, 0]}>
      <meshStandardMaterial
        color="#8b5cf6"
        wireframe={false}
        side={THREE.DoubleSide}
        transparent
        opacity={0.8}
      />
    </mesh>
  );
}

function GridLines({ gridDensity }: { gridDensity: number }) {
  return (
    <group rotation={[-Math.PI / 2, 0, 0]}>
      <gridHelper args={[10, gridDensity, "#6366f1", "#8b5cf6"]} />
    </group>
  );
}

export default function CurvedSurfaceVisualization({
  curvature,
  gridDensity,
}: CurvedSurfaceVisualizationProps) {
  return (
    <div className="w-full h-full bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <Canvas camera={{ position: [8, 8, 8], fov: 50 }}>
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} />

        {/* 3D Objects */}
        <CurvedSurface curvature={curvature} gridDensity={gridDensity} />
        <GridLines gridDensity={gridDensity} />

        {/* Controls */}
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={5}
          maxDistance={20}
        />

        {/* Axis Helper */}
        <axesHelper args={[5]} />
      </Canvas>

      {/* Instructions Overlay */}
      <div className="absolute bottom-4 left-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg px-4 py-2 text-xs text-gray-600 dark:text-gray-400">
        <p>🖱️ Left click + drag to rotate</p>
        <p>🖱️ Right click + drag to pan</p>
        <p>🖱️ Scroll to zoom</p>
      </div>

      {/* Info Overlay */}
      <div className="absolute top-4 left-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg px-4 py-3">
        <div className="text-sm">
          <p className="font-medium text-gray-900 dark:text-white mb-1">
            Curved Surface
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            Curvature: {curvature.toFixed(2)}
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            Grid: {gridDensity}×{gridDensity}
          </p>
        </div>
      </div>
    </div>
  );
}

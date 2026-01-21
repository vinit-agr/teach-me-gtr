"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getConcept } from "@/data/curriculum";
import dynamic from "next/dynamic";

// Dynamically import 3D component (client-side only)
const CurvedSurfaceVisualization = dynamic(
  () => import("@/components/visualizations/CurvedSurfaceVisualization"),
  { ssr: false }
);

export default function IntuitionPage() {
  const params = useParams();
  const conceptId = params.conceptId as string;
  const concept = getConcept(conceptId);

  const [curvature, setCurvature] = useState(0.5);
  const [gridDensity, setGridDensity] = useState(10);
  const [discoveredPatterns, setDiscoveredPatterns] = useState<string[]>([]);
  const [xpEarned, setXpEarned] = useState(0);

  if (!concept) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Concept not found
        </h2>
      </div>
    );
  }

  const patterns = concept.intuitionContent.patterns;
  const allPatternsDiscovered = discoveredPatterns.length === patterns.length;

  const handlePatternDiscovery = (patternId: string) => {
    if (!discoveredPatterns.includes(patternId)) {
      const pattern = patterns.find((p) => p.id === patternId);
      if (pattern) {
        setDiscoveredPatterns([...discoveredPatterns, patternId]);
        setXpEarned(xpEarned + pattern.xpReward);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Instructions */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
        <div className="flex items-start gap-4">
          <div className="text-4xl">🎨</div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Phase 1: Build Intuition
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Explore the interactive visualization below. Manipulate the
              parameters and observe what happens. Your goal is to discover key
              patterns about curved surfaces.
            </p>
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-purple-600">
                {discoveredPatterns.length} / {patterns.length} patterns
                discovered
              </span>
              <span className="text-sm text-gray-500">
                +{xpEarned} XP earned
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 3D Visualization */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="h-[500px] relative">
          <CurvedSurfaceVisualization
            curvature={curvature}
            gridDensity={gridDensity}
          />
        </div>

        {/* Controls */}
        <div className="p-6 border-t border-gray-200 dark:border-gray-700">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Surface Curvature: {curvature.toFixed(2)}
              </label>
              <input
                type="range"
                min="0"
                max="2"
                step="0.1"
                value={curvature}
                onChange={(e) => setCurvature(parseFloat(e.target.value))}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Grid Density: {gridDensity}
              </label>
              <input
                type="range"
                min="5"
                max="20"
                step="1"
                value={gridDensity}
                onChange={(e) => setGridDensity(parseInt(e.target.value))}
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Prompts */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
          🎯 Exploration Tasks
        </h3>
        <div className="space-y-3">
          {concept.intuitionContent.prompts.map((prompt, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
            >
              <div className="text-purple-600 font-bold">{index + 1}.</div>
              <p className="text-gray-700 dark:text-gray-300">{prompt}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Pattern Recognition */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
          💡 Pattern Recognition
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Check off patterns as you discover them through experimentation:
        </p>
        <div className="space-y-3">
          {patterns.map((pattern) => {
            const discovered = discoveredPatterns.includes(pattern.id);
            return (
              <div
                key={pattern.id}
                className="flex items-center gap-3 p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
              >
                <button
                  onClick={() => handlePatternDiscovery(pattern.id)}
                  className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${
                    discovered
                      ? "bg-green-500 border-green-500 text-white"
                      : "border-gray-300 dark:border-gray-600 hover:border-purple-500"
                  }`}
                  disabled={discovered}
                >
                  {discovered && "✓"}
                </button>
                <div className="flex-1">
                  <p
                    className={`${discovered ? "text-gray-500 line-through" : "text-gray-700 dark:text-gray-300"}`}
                  >
                    {pattern.description}
                  </p>
                </div>
                {discovered && (
                  <span className="text-sm font-medium text-green-600">
                    +{pattern.xpReward} XP
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Continue Button */}
      {allPatternsDiscovered && (
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-6 shadow-lg text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold mb-2">
                🎉 Great work! All patterns discovered!
              </h3>
              <p className="text-purple-100">
                You&apos;ve earned {xpEarned} XP. Ready to dive into the
                mathematics?
              </p>
            </div>
            <Link href={`/concept/${conceptId}/derivation`}>
              <button className="px-6 py-3 bg-white text-purple-600 rounded-lg hover:bg-purple-50 transition-colors font-medium">
                Continue to Derivation →
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

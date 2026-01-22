"use client";

import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Welcome back!
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Master Einstein&apos;s masterpiece. One geodesic at a time.
            </p>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Level
            </div>
            <div className="text-3xl font-bold text-purple-600">1</div>
            <div className="text-xs text-gray-500">0 / 100 XP</div>
          </div>
        </div>

        {/* XP Bar */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Progress to Level 2
            </span>
            <span className="text-sm text-gray-500">0%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
            <div
              className="bg-gradient-to-r from-purple-600 to-blue-600 h-4 rounded-full transition-all duration-300"
              style={{ width: "0%" }}
            />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="text-3xl">🔥</div>
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  0
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Day Streak
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="text-3xl">📚</div>
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  0 / 1
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Concepts Completed
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="text-3xl">🏆</div>
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  0
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Achievements
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Start Learning Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            🚀 Start Your Journey
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Begin with the fundamental building block of General Relativity: the
            metric tensor
          </p>

          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:border-purple-500 transition-colors">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  The Metric Tensor
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Understanding how spacetime curvature is encoded mathematically
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>⏱️ ~45 minutes</span>
                  <span>⭐ Difficulty: Medium</span>
                  <span>🎯 150 XP</span>
                </div>
              </div>
              <Link href="/concept/metric-tensor/intuition">
                <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:opacity-90 transition-opacity font-medium">
                  Start Learning →
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* XP Tracks */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            📊 Your Progress Tracks
          </h2>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  🧮 Derivation Master
                </span>
                <span className="text-sm text-gray-500">0 XP</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-purple-600 h-2 rounded-full"
                  style={{ width: "0%" }}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  🎨 Visualizer
                </span>
                <span className="text-sm text-gray-500">0 XP</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: "0%" }}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  🎯 Problem Solver
                </span>
                <span className="text-sm text-gray-500">0 XP</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-green-600 h-2 rounded-full"
                  style={{ width: "0%" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { usePathname, useParams } from "next/navigation";
import { cn } from "@/lib/utils/cn";

export default function ConceptLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const params = useParams();
  const conceptId = params.conceptId as string;

  const phases = [
    { id: "intuition", label: "Intuition", icon: "🎨" },
    { id: "derivation", label: "Derivation", icon: "🧮" },
    { id: "synthesis", label: "Synthesis", icon: "🎯" },
  ];

  const currentPhase = pathname.split("/").pop();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                ← Dashboard
              </Link>
              <div className="h-6 w-px bg-gray-300 dark:bg-gray-600" />
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                The Metric Tensor
              </h1>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Progress
                </div>
                <div className="text-sm font-bold text-purple-600">
                  0 / 150 XP
                </div>
              </div>
            </div>
          </div>

          {/* Phase Navigation */}
          <div className="flex items-center gap-2 mt-4">
            {phases.map((phase, index) => {
              const isActive = currentPhase === phase.id;
              const isCompleted = false; // TODO: Track completion

              return (
                <Link
                  key={phase.id}
                  href={`/concept/${conceptId}/${phase.id}`}
                  className="flex-1"
                >
                  <div
                    className={cn(
                      "flex items-center gap-2 p-3 rounded-lg transition-colors",
                      isActive
                        ? "bg-purple-100 dark:bg-purple-900/30 border-2 border-purple-500"
                        : "bg-gray-100 dark:bg-gray-700 border-2 border-transparent hover:border-gray-300 dark:hover:border-gray-600"
                    )}
                  >
                    <div className="flex items-center gap-2 flex-1">
                      <span className="text-xl">{phase.icon}</span>
                      <div>
                        <div
                          className={cn(
                            "text-sm font-medium",
                            isActive
                              ? "text-purple-900 dark:text-purple-100"
                              : "text-gray-700 dark:text-gray-300"
                          )}
                        >
                          Phase {index + 1}
                        </div>
                        <div
                          className={cn(
                            "text-xs",
                            isActive
                              ? "text-purple-700 dark:text-purple-300"
                              : "text-gray-500 dark:text-gray-400"
                          )}
                        >
                          {phase.label}
                        </div>
                      </div>
                    </div>
                    {isCompleted && (
                      <span className="text-green-500">✓</span>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">{children}</div>
    </div>
  );
}

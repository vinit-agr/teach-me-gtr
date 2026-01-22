"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getConcept } from "@/data/curriculum";
import dynamic from "next/dynamic";

const BlockMath = dynamic(
  () => import("react-katex").then((mod) => mod.BlockMath),
  { ssr: false }
);

export default function SynthesisPage() {
  const params = useParams();
  const conceptId = params.conceptId as string;
  const concept = getConcept(conceptId);

  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [attempts, setAttempts] = useState<number[]>([]);
  const [showSolution, setShowSolution] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });
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

  const problems = concept.synthesisContent.problems;
  const currentProblem = problems[currentProblemIndex];
  const allProblemsCompleted = attempts.length === problems.length;

  const handleSubmit = () => {
    // Simple check (in production, use AI for evaluation)
    const isCorrect = userAnswer.toLowerCase().includes("time dilation") ||
                      userAnswer.toLowerCase().includes("infinity") ||
                      userAnswer.toLowerCase().includes("slower");

    if (isCorrect) {
      setFeedback({
        type: "success",
        message: "Excellent analysis! " + currentProblem.explanation,
      });
      setAttempts([...attempts, 1]);
      setXpEarned(xpEarned + currentProblem.xpReward);
      setShowSolution(true);
    } else {
      setFeedback({
        type: "error",
        message:
          "Your answer is on the right track, but consider the effect on the time component of the metric. Try again or view the solution.",
      });
    }
  };

  const handleNextProblem = () => {
    if (currentProblemIndex < problems.length - 1) {
      setCurrentProblemIndex(currentProblemIndex + 1);
      setUserAnswer("");
      setFeedback({ type: null, message: "" });
      setShowSolution(false);
    }
  };

  const difficultyColor = {
    easy: "text-green-600 bg-green-100 dark:bg-green-900/30",
    medium: "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30",
    hard: "text-red-600 bg-red-100 dark:bg-red-900/30",
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
        <div className="flex items-start gap-4">
          <div className="text-4xl">🎯</div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Phase 3: Synthesis & Application
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Apply what you&apos;ve learned to solve problems and make
              predictions
            </p>
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-purple-600">
                Problem {currentProblemIndex + 1} of {problems.length}
              </span>
              <span className="text-sm text-gray-500">+{xpEarned} XP</span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(attempts.length / problems.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Current Problem */}
      {!allProblemsCompleted && (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
          {/* Problem Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <span className="text-2xl">
                {currentProblem.type === "prediction"
                  ? "🔮"
                  : currentProblem.type === "calculation"
                    ? "🧮"
                    : "💭"}
              </span>
              <div>
                <div className="font-medium text-gray-500 dark:text-gray-400 text-sm">
                  {currentProblem.type === "prediction"
                    ? "Prediction Problem"
                    : currentProblem.type === "calculation"
                      ? "Calculation Problem"
                      : "Conceptual Problem"}
                </div>
              </div>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${difficultyColor[currentProblem.difficulty]}`}
            >
              {currentProblem.difficulty.charAt(0).toUpperCase() +
                currentProblem.difficulty.slice(1)}
            </span>
          </div>

          {/* Problem Statement */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              Problem:
            </h3>
            <div className="prose dark:prose-invert max-w-none">
              <pre className="whitespace-pre-wrap font-sans text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                {currentProblem.prompt}
              </pre>
            </div>
          </div>

          {/* Answer Input */}
          {!showSolution && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Your Answer:
                </label>
                <textarea
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="Explain your reasoning and prediction..."
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                />
              </div>

              {/* Feedback */}
              {feedback.type && (
                <div
                  className={`p-4 rounded-lg ${
                    feedback.type === "success"
                      ? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800"
                      : "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
                  }`}
                >
                  <p
                    className={`${feedback.type === "success" ? "text-green-800 dark:text-green-200" : "text-red-800 dark:text-red-200"}`}
                  >
                    {feedback.message}
                  </p>
                </div>
              )}

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={handleSubmit}
                  disabled={!userAnswer}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:opacity-90 transition-opacity font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Submit Answer
                </button>
                <button
                  onClick={() => setShowSolution(true)}
                  className="px-6 py-3 border-2 border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors font-medium"
                >
                  Show Solution
                </button>
              </div>
            </div>
          )}

          {/* Solution */}
          {showSolution && (
            <div className="space-y-6">
              <div className="p-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                <h4 className="font-bold text-blue-900 dark:text-blue-100 mb-3">
                  📘 Solution:
                </h4>
                <p className="text-blue-800 dark:text-blue-200 mb-4">
                  {currentProblem.expectedAnswer}
                </p>
                <div className="border-t border-blue-200 dark:border-blue-700 pt-4 mt-4">
                  <h5 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
                    Explanation:
                  </h5>
                  <p className="text-blue-800 dark:text-blue-200">
                    {currentProblem.explanation}
                  </p>
                </div>
              </div>

              {currentProblemIndex < problems.length - 1 && (
                <button
                  onClick={handleNextProblem}
                  className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:opacity-90 transition-opacity font-medium"
                >
                  Next Problem →
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* Concept Complete! */}
      {allProblemsCompleted && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-8 shadow-lg text-white text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-4xl font-bold mb-4">Concept Mastered!</h3>
            <p className="text-xl text-purple-100 mb-6">
              {concept.title}
            </p>

            <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto mb-8">
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-3xl font-bold">{problems.length}</div>
                <div className="text-sm text-purple-100">Problems Solved</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-3xl font-bold">~45</div>
                <div className="text-sm text-purple-100">Minutes</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-3xl font-bold">+{xpEarned}</div>
                <div className="text-sm text-purple-100">Total XP</div>
              </div>
            </div>

            <div className="flex justify-center gap-4">
              <Link href="/">
                <button className="px-8 py-4 bg-white text-purple-600 rounded-lg hover:bg-purple-50 transition-colors font-medium text-lg">
                  Return to Dashboard
                </button>
              </Link>
            </div>
          </div>

          {/* Connections */}
          {concept.synthesisContent.connections.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                🔗 Related Concepts
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Now that you&apos;ve mastered the metric tensor, you can explore
                these related topics:
              </p>
              <div className="grid gap-3">
                {concept.synthesisContent.connections.map((conceptId) => (
                  <div
                    key={conceptId}
                    className="p-4 border-2 border-gray-200 dark:border-gray-700 rounded-lg hover:border-purple-500 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900 dark:text-white capitalize">
                        {conceptId.replace(/-/g, " ")}
                      </span>
                      <span className="text-gray-400">🔒</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

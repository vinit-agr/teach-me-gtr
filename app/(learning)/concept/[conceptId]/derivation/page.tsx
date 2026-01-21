"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getConcept } from "@/data/curriculum";
import dynamic from "next/dynamic";

// Dynamically import LaTeX component
const InlineMath = dynamic(
  () => import("react-katex").then((mod) => mod.InlineMath),
  { ssr: false }
);
const BlockMath = dynamic(
  () => import("react-katex").then((mod) => mod.BlockMath),
  { ssr: false }
);

export default function DerivationPage() {
  const params = useParams();
  const conceptId = params.conceptId as string;
  const concept = getConcept(conceptId);

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [hintsUsed, setHintsUsed] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
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

  const steps = concept.derivationContent.steps;
  const currentStep = steps[currentStepIndex];
  const allStepsCompleted = completedSteps.length === steps.length;

  const handleSubmit = () => {
    // Simple string comparison for MVP (in production, use AI validation)
    const normalizedInput = userInput.trim().replace(/\s+/g, "");
    const normalizedExpected = currentStep.expectedAnswer
      .trim()
      .replace(/\s+/g, "");

    if (normalizedInput === normalizedExpected) {
      // Correct!
      setFeedback({
        type: "success",
        message: "Correct! " + currentStep.explanation,
      });
      setCompletedSteps([...completedSteps, currentStepIndex]);
      setXpEarned(xpEarned + 10); // Base XP per step

      // Move to next step after a delay
      setTimeout(() => {
        if (currentStepIndex < steps.length - 1) {
          setCurrentStepIndex(currentStepIndex + 1);
          setUserInput("");
          setFeedback({ type: null, message: "" });
          setShowHint(false);
        }
      }, 2000);
    } else {
      // Incorrect
      setFeedback({
        type: "error",
        message:
          "Not quite right. Check your answer and try again, or request a hint.",
      });
    }
  };

  const handleRequestHint = () => {
    setShowHint(true);
    setHintsUsed(hintsUsed + 1);
    setXpEarned(Math.max(0, xpEarned - 10)); // Penalty for hint
  };

  const currentHintIndex = Math.min(hintsUsed, currentStep.hints.length - 1);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
        <div className="flex items-start gap-4">
          <div className="text-4xl">🧮</div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Phase 2: Mathematical Derivation
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Work through the derivation step-by-step. Type your answer in
              LaTeX notation.
            </p>
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-purple-600">
                Step {currentStepIndex + 1} of {steps.length}
              </span>
              <span className="text-sm text-gray-500">
                Hints used: {hintsUsed}
              </span>
              <span className="text-sm text-gray-500">+{xpEarned} XP</span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full transition-all duration-300"
            style={{
              width: `${(completedSteps.length / steps.length) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Previous Steps (Collapsed) */}
      {completedSteps.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
          <details className="cursor-pointer">
            <summary className="font-medium text-gray-900 dark:text-white">
              ✓ Previous Steps ({completedSteps.length} completed)
            </summary>
            <div className="mt-4 space-y-3">
              {completedSteps.map((stepIndex) => {
                const step = steps[stepIndex];
                return (
                  <div
                    key={stepIndex}
                    className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800"
                  >
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                      Step {stepIndex + 1}: {step.prompt}
                    </div>
                    <div className="font-mono text-sm text-gray-900 dark:text-white">
                      <BlockMath math={step.expectedAnswer} />
                    </div>
                  </div>
                );
              })}
            </div>
          </details>
        </div>
      )}

      {/* Current Step */}
      {!allStepsCompleted && (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
              Step {currentStepIndex + 1}: {currentStep.prompt}
            </h3>
          </div>

          {/* Input Area */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Your Answer (LaTeX):
              </label>
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSubmit();
                }}
                placeholder="e.g., ds^2 = dx^2 + dy^2"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono"
              />
            </div>

            {/* Live Preview */}
            {userInput && (
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Preview:
                </div>
                <div className="text-lg">
                  <BlockMath math={userInput} errorColor="#ef4444" />
                </div>
              </div>
            )}

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
                disabled={!userInput}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:opacity-90 transition-opacity font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit Answer
              </button>
              <button
                onClick={handleRequestHint}
                className="px-6 py-3 border-2 border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors font-medium"
              >
                Hint (-10 XP)
              </button>
            </div>
          </div>

          {/* Hint Display */}
          {showHint && (
            <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
              <div className="flex items-start gap-3">
                <div className="text-xl">💡</div>
                <div>
                  <div className="font-medium text-yellow-900 dark:text-yellow-100 mb-1">
                    Hint {hintsUsed}:
                  </div>
                  <p className="text-yellow-800 dark:text-yellow-200">
                    {currentStep.hints[currentHintIndex]}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Completion */}
      {allStepsCompleted && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-8 shadow-lg text-white">
            <h3 className="text-3xl font-bold mb-4">
              🎉 Derivation Complete!
            </h3>
            <div className="space-y-2 mb-6">
              <p className="text-xl">Final Result:</p>
              <div className="text-2xl bg-white/10 p-4 rounded-lg">
                <BlockMath math={concept.derivationContent.finalResult} />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 mb-6 text-center">
              <div>
                <div className="text-3xl font-bold">{steps.length}</div>
                <div className="text-sm text-purple-100">Steps Completed</div>
              </div>
              <div>
                <div className="text-3xl font-bold">{hintsUsed}</div>
                <div className="text-sm text-purple-100">Hints Used</div>
              </div>
              <div>
                <div className="text-3xl font-bold">+{xpEarned}</div>
                <div className="text-sm text-purple-100">XP Earned</div>
              </div>
            </div>
          </div>

          {/* Key Insights */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              🔑 Key Insights
            </h3>
            <ul className="space-y-2">
              {concept.derivationContent.keyInsights.map((insight, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 text-gray-700 dark:text-gray-300"
                >
                  <span className="text-purple-600 mt-1">✓</span>
                  <span>{insight}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Continue Button */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-6 shadow-lg text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold mb-2">
                  Ready for the final phase?
                </h3>
                <p className="text-purple-100">
                  Apply what you&apos;ve learned to real problems
                </p>
              </div>
              <Link href={`/concept/${conceptId}/synthesis`}>
                <button className="px-6 py-3 bg-white text-purple-600 rounded-lg hover:bg-purple-50 transition-colors font-medium">
                  Continue to Synthesis →
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import { ConceptNode } from "./types";

export const metricTensorConcept: ConceptNode = {
  id: "metric-tensor",
  title: "The Metric Tensor",
  description:
    "Understanding how spacetime curvature is encoded mathematically through the metric tensor",
  category: "geometry",
  prerequisites: [], // First concept, no prerequisites

  intuitionContent: {
    visualizationType: "curved-surface-2d",
    interactiveParams: {
      curvature: {
        min: 0,
        max: 2,
        default: 0.5,
        step: 0.1,
        label: "Surface Curvature",
      },
      gridDensity: {
        min: 5,
        max: 20,
        default: 10,
        step: 1,
        label: "Grid Density",
      },
    },
    prompts: [
      "Place two points and observe the shortest path between them",
      "How does changing curvature affect the path?",
      "Try drawing a 'straight' line on this surface. What happens?",
      "What happens to parallel lines as they extend across the surface?",
    ],
    patterns: [
      {
        id: "geodesics-curve",
        description: "Geodesics curve with the spacetime geometry",
        xpReward: 30,
      },
      {
        id: "parallel-lines-converge",
        description:
          "Parallel lines converge or diverge on curved surfaces",
        xpReward: 30,
      },
      {
        id: "distances-distorted",
        description: "Distances are distorted by curvature",
        xpReward: 30,
      },
    ],
  },

  derivationContent: {
    steps: [
      {
        stepNumber: 1,
        prompt:
          "In flat Euclidean space, write the Pythagorean theorem for distance in 3D",
        expectedAnswer: "ds^2 = dx^2 + dy^2 + dz^2",
        hints: [
          "Think about the Pythagorean theorem you learned in school",
          "For infinitesimal distances, use differentials: dx, dy, dz",
          "The answer is: ds² = dx² + dy² + dz²",
        ],
        explanation:
          "In flat 3D space, the infinitesimal distance follows the Pythagorean theorem. This is the starting point before generalizing to curved spaces.",
      },
      {
        stepNumber: 2,
        prompt:
          "For spacetime (4D), include time. Write the Minkowski metric (flat spacetime)",
        expectedAnswer: "ds^2 = -c^2dt^2 + dx^2 + dy^2 + dz^2",
        hints: [
          "Spacetime has 4 dimensions: time (t) and space (x, y, z)",
          "Time has a different sign (negative) because of the metric signature",
          "Include the speed of light c to make units consistent",
        ],
        explanation:
          "The Minkowski metric describes flat spacetime. The negative sign for time is crucial - it makes spacetime fundamentally different from Euclidean space.",
      },
      {
        stepNumber: 3,
        prompt:
          "In curved spacetime, we introduce a metric tensor g_μν. Write the general form of the line element",
        expectedAnswer: "ds^2 = g_{\\mu\\nu} dx^\\mu dx^\\nu",
        hints: [
          "We need to generalize to arbitrary coordinates and curvature",
          "The metric tensor g_μν weights each coordinate direction",
          "Use Einstein summation notation (implicit sum over repeated indices)",
        ],
        explanation:
          "This is the fundamental equation! The metric tensor g_μν encodes ALL information about the geometry of spacetime. It tells us how to measure distances and angles in curved spacetime.",
      },
      {
        stepNumber: 4,
        prompt:
          "The metric tensor is symmetric. Write this property mathematically",
        expectedAnswer: "g_{\\mu\\nu} = g_{\\nu\\mu}",
        hints: [
          "Symmetric means swapping indices doesn't change the value",
          "Think about g_01 vs g_10",
          "This follows from the fact that dx^μ dx^ν = dx^ν dx^μ",
        ],
        explanation:
          "The metric tensor is symmetric because coordinate differentials commute: dxdy = dydx. This reduces the number of independent components from 16 to 10 in 4D spacetime.",
      },
      {
        stepNumber: 5,
        prompt:
          "In matrix form for 4D spacetime, what is the size of the metric tensor?",
        expectedAnswer: "4 \\times 4 \\text{ matrix}",
        hints: [
          "Spacetime is 4-dimensional",
          "The metric has two indices: μ and ν",
          "Each index runs from 0 to 3 (t, x, y, z)",
        ],
        explanation:
          "The metric is a 4×4 symmetric matrix. With symmetry, we have 10 independent components that fully describe spacetime geometry at each point.",
      },
    ],
    finalResult: "ds^2 = g_{\\mu\\nu} dx^\\mu dx^\\nu",
    keyInsights: [
      "The metric tensor completely determines spacetime geometry",
      "It's symmetric: g_μν = g_νμ (only 10 independent components in 4D)",
      "In flat spacetime, it reduces to the Minkowski metric",
      "Curvature is encoded in how g_μν varies from point to point",
    ],
  },

  synthesisContent: {
    problems: [
      {
        id: "schwarzschild-time-dilation",
        prompt:
          "The Schwarzschild metric near a massive object is:\n\nds² = -(1-2M/r)dt² + (1-2M/r)⁻¹dr² + r²dΩ²\n\nWhat happens to time measurements as you approach the event horizon (r → 2M)?",
        type: "prediction",
        difficulty: "medium",
        expectedAnswer:
          "Time dilation increases dramatically, approaching infinity as r → 2M. Clocks appear to stop at the horizon from an external observer's perspective.",
        explanation:
          "The g_tt component (1-2M/r) → 0 as r → 2M, causing extreme time dilation. This is gravitational time dilation - the closer to the mass, the slower time runs relative to infinity.",
        xpReward: 60,
      },
      {
        id: "flat-spacetime-check",
        prompt:
          "Show that the Minkowski metric η_μν represents flat spacetime by writing its matrix form",
        type: "calculation",
        difficulty: "easy",
        expectedAnswer:
          "\\eta_{\\mu\\nu} = \\begin{pmatrix} -1 & 0 & 0 & 0 \\\\ 0 & 1 & 0 & 0 \\\\ 0 & 0 & 1 & 0 \\\\ 0 & 0 & 0 & 1 \\end{pmatrix}",
        explanation:
          "The Minkowski metric is diagonal with signature (-,+,+,+). This represents flat spacetime - no curvature. All off-diagonal elements are zero.",
        xpReward: 40,
      },
      {
        id: "metric-physical-meaning",
        prompt:
          "Explain in your own words: What does the metric tensor physically represent?",
        type: "conceptual",
        difficulty: "medium",
        expectedAnswer:
          "The metric tensor is like a 'ruler' that changes from point to point in curved spacetime. It tells you how to measure distances and time intervals. It encodes all the gravitational effects as geometry.",
        explanation:
          "Perfect! The metric tensor is fundamentally a measurement device. It converts coordinate differences (which are arbitrary) into physical distances and time intervals. Where spacetime is curved (near masses), this 'ruler' is distorted.",
        xpReward: 50,
      },
    ],
    connections: ["geodesics", "christoffel-symbols", "curvature-tensor"],
  },

  baseDifficulty: 0.5,
  estimatedTimeMinutes: 45,
};

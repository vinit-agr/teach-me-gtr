export interface ConceptNode {
  id: string;
  title: string;
  description: string;
  category:
    | "foundations"
    | "geometry"
    | "curvature"
    | "field-equations"
    | "solutions";

  // Prerequisites
  prerequisites: string[]; // concept IDs

  // Content paths
  intuitionContent: {
    visualizationType: string;
    interactiveParams: Record<string, InteractiveParam>;
    prompts: string[];
    patterns: Pattern[];
  };

  derivationContent: {
    steps: DerivationStep[];
    finalResult: string;
    keyInsights: string[];
  };

  synthesisContent: {
    problems: Problem[];
    connections: string[]; // related concept IDs
  };

  // Difficulty
  baseDifficulty: number; // 0-1
  estimatedTimeMinutes: number;
}

export interface InteractiveParam {
  min: number;
  max: number;
  default: number;
  step?: number;
  label: string;
}

export interface Pattern {
  id: string;
  description: string;
  xpReward: number;
}

export interface DerivationStep {
  stepNumber: number;
  prompt: string;
  expectedAnswer: string; // LaTeX
  hints: string[];
  explanation: string;
}

export interface Problem {
  id: string;
  prompt: string;
  type: "prediction" | "calculation" | "conceptual";
  difficulty: "easy" | "medium" | "hard";
  expectedAnswer: string;
  explanation: string;
  xpReward: number;
}

# Teach Me GTR - Architecture & Design Document

## Technology Stack

### Frontend
- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript (strict mode)
- **3D Graphics**: three.js + @react-three/fiber + @react-three/drei
- **Math Rendering**: KaTeX (fast, lightweight)
- **UI Components**: Radix UI + Tailwind CSS
- **State Management**: Zustand (for client state) + Convex (for server state)
- **Animation**: Framer Motion
- **Code Editor**: CodeMirror (for LaTeX input)

### Backend
- **Backend-as-a-Service**: Convex
  - Real-time reactive queries
  - TypeScript-first API
  - Built-in authentication
  - Serverless functions
  - File storage for user data

### Deployment
- **Frontend Hosting**: Vercel
- **Backend**: Convex Cloud
- **CDN**: Vercel Edge Network
- **Analytics**: Vercel Analytics (optional)

### Additional Libraries
- **react-katex**: LaTeX rendering in React
- **zustand**: Lightweight state management
- **zod**: Runtime type validation
- **date-fns**: Date manipulation for streaks
- **recharts**: Progress charts and visualizations
- **react-confetti**: Celebration animations for achievements

## System Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Browser                              │
│  ┌───────────────────────────────────────────────────────┐  │
│  │              Next.js App (Vercel)                     │  │
│  │                                                       │  │
│  │  ┌─────────────┐  ┌──────────────┐  ┌─────────────┐ │  │
│  │  │   Learning  │  │     3D       │  │ Gamification│ │  │
│  │  │   Interface │  │ Visualizer   │  │   System    │ │  │
│  │  └─────────────┘  └──────────────┘  └─────────────┘ │  │
│  │                                                       │  │
│  │  ┌─────────────────────────────────────────────────┐ │  │
│  │  │         Convex Client (Reactive)                │ │  │
│  │  └─────────────────────────────────────────────────┘ │  │
│  └───────────────────────────────────────────────────────┘  │
└──────────────────────┬───────────────────────────────────────┘
                       │ WebSocket (real-time)
                       │ HTTPS (queries/mutations)
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                    Convex Backend                            │
│  ┌───────────────────────────────────────────────────────┐  │
│  │                Database (Reactive)                    │  │
│  │  • user_profiles   • concept_progress                │  │
│  │  • derivations     • achievements                    │  │
│  │  • learning_sessions • streaks                       │  │
│  └───────────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────┐  │
│  │              Convex Functions                         │  │
│  │  • Queries (real-time reads)                         │  │
│  │  • Mutations (transactional writes)                  │  │
│  │  • Actions (external API calls - Claude)            │  │
│  └───────────────────────────────────────────────────────┘  │
└──────────────────────┬───────────────────────────────────────┘
                       │ HTTPS API calls
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                  Claude API (Anthropic)                      │
│  • Adaptive explanations                                    │
│  • Hint generation                                          │
│  • Derivation validation                                    │
└─────────────────────────────────────────────────────────────┘
```

## Data Models (Convex Schema)

### User Profile

```typescript
// convex/schema.ts
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    clerkId: v.string(), // Clerk authentication ID
    username: v.string(),
    email: v.string(),

    // Gamification
    totalXP: v.number(),
    level: v.number(),

    // XP by track
    derivationXP: v.number(),
    visualizerXP: v.number(),
    problemSolverXP: v.number(),

    // Streaks
    currentStreak: v.number(),
    longestStreak: v.number(),
    lastActiveDate: v.string(), // ISO date
    streakFreezesAvailable: v.number(),

    // Settings
    preferredDifficultyLevel: v.union(
      v.literal("beginner"),
      v.literal("intermediate"),
      v.literal("advanced")
    ),
    enableHints: v.boolean(),
    enableLeaderboards: v.boolean(),

    // Metadata
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_clerk_id", ["clerkId"])
    .index("by_total_xp", ["totalXP"]),
});
```

### Concept Progress

```typescript
conceptProgress: defineTable({
  userId: v.id("users"),
  conceptId: v.string(), // e.g., "metric-tensor", "riemann-curvature"

  // Progress tracking
  status: v.union(
    v.literal("locked"),
    v.literal("available"),
    v.literal("in_progress"),
    v.literal("completed"),
    v.literal("mastered")
  ),

  // Phase completion
  intuitionPhaseCompleted: v.boolean(),
  derivationPhaseCompleted: v.boolean(),
  synthesisPhaseCompleted: v.boolean(),

  // Performance metrics
  hintsUsed: v.number(),
  attemptsCount: v.number(),
  timeSpentMinutes: v.number(),
  masteryScore: v.number(), // 0-100

  // Spaced repetition
  lastReviewedAt: v.optional(v.number()),
  nextReviewAt: v.optional(v.number()),
  reviewCount: v.number(),

  // Timestamps
  startedAt: v.optional(v.number()),
  completedAt: v.optional(v.number()),
  createdAt: v.number(),
  updatedAt: v.number(),
})
  .index("by_user", ["userId"])
  .index("by_user_and_concept", ["userId", "conceptId"])
  .index("by_next_review", ["userId", "nextReviewAt"]),
```

### Derivation Attempts

```typescript
derivationAttempts: defineTable({
  userId: v.id("users"),
  conceptId: v.string(),
  derivationId: v.string(), // e.g., "metric-tensor-derivation-1"

  // Attempt data
  userSteps: v.array(v.object({
    stepNumber: v.number(),
    userInput: v.string(), // LaTeX string
    isCorrect: v.boolean(),
    hintsUsedForStep: v.number(),
    timeSpentSeconds: v.number(),
  })),

  // Results
  isComplete: v.boolean(),
  isCorrect: v.boolean(),
  totalHintsUsed: v.number(),
  totalTimeSeconds: v.number(),
  xpEarned: v.number(),

  // Timestamps
  startedAt: v.number(),
  completedAt: v.optional(v.number()),
})
  .index("by_user", ["userId"])
  .index("by_user_and_concept", ["userId", "conceptId"]),
```

### Achievements

```typescript
achievements: defineTable({
  userId: v.id("users"),
  achievementId: v.string(), // e.g., "first-geodesic", "10-day-streak"

  // Achievement details
  title: v.string(),
  description: v.string(),
  icon: v.string(), // emoji or icon identifier
  category: v.union(
    v.literal("milestone"),
    v.literal("streak"),
    v.literal("mastery"),
    v.literal("challenge")
  ),

  // Reward
  xpReward: v.number(),

  // Unlock time
  unlockedAt: v.number(),
})
  .index("by_user", ["userId"])
  .index("by_user_and_achievement", ["userId", "achievementId"]),
```

### Learning Sessions

```typescript
learningSessions: defineTable({
  userId: v.id("users"),

  // Session info
  conceptsWorkedOn: v.array(v.string()),
  derivationsCompleted: v.number(),
  problemsSolved: v.number(),

  // Session metrics
  durationMinutes: v.number(),
  xpEarned: v.number(),
  hintsUsed: v.number(),

  // Timestamps
  startedAt: v.number(),
  endedAt: v.number(),
})
  .index("by_user", ["userId"])
  .index("by_user_and_date", ["userId", "startedAt"]),
```

### Daily Challenges

```typescript
dailyChallenges: defineTable({
  // Challenge definition
  challengeDate: v.string(), // ISO date string
  conceptId: v.string(),
  problemId: v.string(),
  difficulty: v.union(
    v.literal("easy"),
    v.literal("medium"),
    v.literal("hard")
  ),

  // Rewards
  baseXP: v.number(),
  bonusXP: v.number(), // for completing under time
  timeLimitMinutes: v.number(),

  createdAt: v.number(),
})
  .index("by_date", ["challengeDate"]),

challengeAttempts: defineTable({
  userId: v.id("users"),
  challengeId: v.id("dailyChallenges"),

  // Attempt data
  isComplete: v.boolean(),
  isCorrect: v.boolean(),
  timeSpentSeconds: v.number(),
  xpEarned: v.number(),

  // Timestamps
  attemptedAt: v.number(),
})
  .index("by_user", ["userId"])
  .index("by_user_and_challenge", ["userId", "challengeId"]),
```

## Frontend Architecture

### App Structure

```
/app
├── (auth)
│   ├── sign-in/
│   └── sign-up/
├── (dashboard)
│   ├── page.tsx                    # Main dashboard
│   ├── skill-tree/                 # Visual skill tree
│   ├── profile/                    # User profile & stats
│   └── leaderboard/                # Optional leaderboard
├── (learning)
│   ├── concept/[conceptId]/
│   │   ├── page.tsx                # Concept overview
│   │   ├── intuition/              # Phase 1
│   │   ├── derivation/             # Phase 2
│   │   └── synthesis/              # Phase 3
│   └── challenge/[challengeId]/    # Daily challenges
└── layout.tsx
```

### Key Components

#### 1. Learning Interface Components

```typescript
// components/learning/ConceptLayout.tsx
interface ConceptLayoutProps {
  conceptId: string;
  phase: 'intuition' | 'derivation' | 'synthesis';
  children: React.ReactNode;
}

// components/learning/IntuitionPhase.tsx
// - 3D visualization canvas
// - Interactive controls
// - Pattern recognition prompts
// - XP indicator

// components/learning/DerivationPhase.tsx
// - Step-by-step derivation interface
// - LaTeX input with validation
// - Hint system
// - Progress tracker

// components/learning/SynthesisPhase.tsx
// - Problem statement
// - Prediction interface
// - Simulation verification
// - Concept connections
```

#### 2. 3D Visualization Components

```typescript
// components/visualizations/SpacetimeVisualization.tsx
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Grid } from '@react-three/drei';

interface SpacetimeVisualizationProps {
  conceptId: string;
  interactiveParams: {
    mass?: number;
    velocity?: number;
    curvature?: number;
  };
  onPatternDiscovered?: (pattern: string) => void;
}

// Specific visualizations:
// - CurvedManifold.tsx
// - GeodesicPath.tsx
// - LightCone.tsx
// - SchwarzschildGeometry.tsx
// - StressEnergyTensor.tsx
```

#### 3. Derivation Components

```typescript
// components/derivation/DerivationStep.tsx
interface DerivationStepProps {
  stepNumber: number;
  prompt: string;
  expectedAnswer: string; // LaTeX
  hints: string[];
  onSubmit: (userAnswer: string) => void;
  onHintRequest: () => void;
}

// components/derivation/LatexEditor.tsx
// - CodeMirror with LaTeX mode
// - Real-time preview
// - Syntax highlighting
// - Auto-completion for common tensors

// components/derivation/HintSystem.tsx
// - Progressive hint disclosure
// - XP cost indicator
// - Hint history
```

#### 4. Gamification Components

```typescript
// components/gamification/XPBar.tsx
interface XPBarProps {
  currentXP: number;
  currentLevel: number;
  nextLevelXP: number;
}

// components/gamification/AchievementToast.tsx
// - Animated achievement notification
// - Confetti effect
// - XP reward display

// components/gamification/StreakCounter.tsx
// - Current streak display
// - Milestone indicators
// - Freeze status

// components/gamification/SkillTree.tsx
// - Interactive concept graph
// - Node states: locked, available, completed, mastered
// - Dependency lines
// - Progress percentage
```

#### 5. Dashboard Components

```typescript
// components/dashboard/ProgressOverview.tsx
// - XP by track (pie chart)
// - Recent achievements
// - Current streak
// - Next concept recommendation

// components/dashboard/LearningCalendar.tsx
// - Heatmap of daily activity
// - Streak visualization
// - Session history

// components/dashboard/ConceptMastery.tsx
// - List of concepts by status
// - Mastery scores
// - Review reminders
```

## State Management

### Client State (Zustand)

```typescript
// lib/store/uiStore.ts
interface UIStore {
  // 3D visualization state
  visualizationParams: Record<string, any>;
  setVisualizationParam: (key: string, value: any) => void;

  // Current learning session
  currentSessionStart: number | null;
  currentConceptId: string | null;
  startSession: (conceptId: string) => void;
  endSession: () => void;

  // UI preferences
  showHints: boolean;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  toggleHints: () => void;
  setDifficulty: (level: string) => void;
}

// lib/store/derivationStore.ts
interface DerivationStore {
  currentStep: number;
  userSteps: DerivationStep[];
  hintsUsedInSession: number;

  submitStep: (answer: string) => void;
  requestHint: () => void;
  resetDerivation: () => void;
}
```

### Server State (Convex Queries)

```typescript
// All data fetched reactively from Convex

// convex/users.ts
export const getCurrentUser = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    // ... fetch user data
  },
});

// convex/concepts.ts
export const getConceptProgress = query({
  args: { userId: v.id("users"), conceptId: v.string() },
  handler: async (ctx, args) => {
    // ... fetch concept progress
  },
});

export const updateConceptProgress = mutation({
  args: {
    userId: v.id("users"),
    conceptId: v.string(),
    updates: v.object({
      /* ... */
    }),
  },
  handler: async (ctx, args) => {
    // ... update progress
  },
});
```

## Key Features Implementation

### 1. Adaptive Difficulty System

```typescript
// lib/adaptive/difficultyCalculator.ts

interface PerformanceMetrics {
  hintsUsedRatio: number; // 0-1
  correctnessRate: number; // 0-1
  timeEfficiency: number; // 0-1
  consistencyScore: number; // 0-1
}

export function calculateNextDifficulty(
  currentDifficulty: number,
  metrics: PerformanceMetrics
): number {
  // Algorithm:
  // - High performance (low hints, high correctness) → increase difficulty
  // - Struggling (many hints, low correctness) → decrease difficulty
  // - Maintain flow state (85% success rate target)

  const performanceScore =
    metrics.correctnessRate * 0.4 +
    (1 - metrics.hintsUsedRatio) * 0.3 +
    metrics.timeEfficiency * 0.2 +
    metrics.consistencyScore * 0.1;

  if (performanceScore > 0.85) {
    return Math.min(currentDifficulty + 0.1, 1.0);
  } else if (performanceScore < 0.6) {
    return Math.max(currentDifficulty - 0.15, 0.0);
  }

  return currentDifficulty;
}
```

### 2. XP & Leveling System

```typescript
// lib/gamification/xpSystem.ts

export const XP_REWARDS = {
  // Derivation phase
  DERIVATION_COMPLETE_NO_HINTS: 100,
  DERIVATION_COMPLETE_FEW_HINTS: 75, // 1-2 hints
  DERIVATION_COMPLETE_MANY_HINTS: 50, // 3+ hints
  DERIVATION_STEP_CORRECT: 10,

  // Intuition phase
  PATTERN_DISCOVERED: 30,
  VISUALIZATION_EXPLORED: 20,
  INTUITION_PHASE_COMPLETE: 50,

  // Synthesis phase
  PROBLEM_SOLVED_FIRST_TRY: 80,
  PROBLEM_SOLVED_SECOND_TRY: 60,
  PROBLEM_SOLVED_MULTIPLE_TRIES: 40,
  PREDICTION_CORRECT: 25,

  // Challenges
  DAILY_CHALLENGE_COMPLETE: 100,
  DAILY_CHALLENGE_BONUS: 50, // under time limit

  // Streaks
  STREAK_MILESTONE_3: 50,
  STREAK_MILESTONE_7: 100,
  STREAK_MILESTONE_30: 500,
};

export function calculateLevel(totalXP: number): number {
  // Level curve: level = floor(sqrt(totalXP / 100))
  return Math.floor(Math.sqrt(totalXP / 100));
}

export function getXPForNextLevel(currentLevel: number): number {
  return (currentLevel + 1) ** 2 * 100;
}
```

### 3. Spaced Repetition Algorithm

```typescript
// lib/learning/spacedRepetition.ts

export function calculateNextReview(
  currentInterval: number,
  masteryScore: number,
  wasCorrect: boolean
): number {
  // SM-2 algorithm adaptation
  const easeFactor = 1.3 + (masteryScore / 100) * 1.7;

  if (!wasCorrect) {
    return Date.now() + 1 * 24 * 60 * 60 * 1000; // 1 day
  }

  const nextIntervalDays = currentInterval * easeFactor;
  return Date.now() + nextIntervalDays * 24 * 60 * 60 * 1000;
}
```

### 4. AI Tutor Integration

```typescript
// convex/ai/tutor.ts

import { action } from "./_generated/server";
import { v } from "convex/values";
import Anthropic from "@anthropic-ai/sdk";

export const getHint = action({
  args: {
    conceptId: v.string(),
    derivationStep: v.number(),
    userAttempt: v.string(),
    userLevel: v.string(),
  },
  handler: async (ctx, args): Promise<string> => {
    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    const response = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 500,
      messages: [{
        role: "user",
        content: `You are a GTR tutor. The student is working on ${args.conceptId}, step ${args.derivationStep}.

Their attempt: ${args.userAttempt}

Provide a helpful hint (not the answer) appropriate for a ${args.userLevel} level student.`,
      }],
    });

    return response.content[0].type === "text"
      ? response.content[0].text
      : "";
  },
});

export const validateDerivationStep = action({
  args: {
    conceptId: v.string(),
    stepNumber: v.number(),
    expectedAnswer: v.string(),
    userAnswer: v.string(),
  },
  handler: async (ctx, args): Promise<{
    isCorrect: boolean;
    feedback: string;
  }> => {
    // Use Claude to validate mathematical equivalence
    // Handle different but equivalent forms (e.g., tensor notation)
    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    const response = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 300,
      messages: [{
        role: "user",
        content: `Compare these two mathematical expressions for equivalence:

Expected: ${args.expectedAnswer}
Student's answer: ${args.userAnswer}

Are they mathematically equivalent? Respond with JSON: { "isCorrect": boolean, "feedback": string }`,
      }],
    });

    // Parse and return response
    const text = response.content[0].type === "text" ? response.content[0].text : "{}";
    return JSON.parse(text);
  },
});
```

## Curriculum Data Structure

```typescript
// data/curriculum.ts

export interface ConceptNode {
  id: string;
  title: string;
  description: string;
  category: 'foundations' | 'geometry' | 'curvature' | 'field-equations' | 'solutions';

  // Prerequisites
  prerequisites: string[]; // concept IDs

  // Content paths
  intuitionContent: {
    visualizationType: string;
    interactiveParams: Record<string, any>;
    prompts: string[];
    patterns: string[];
  };

  derivationContent: {
    steps: DerivationStep[];
    finalResult: string;
    keyInsights: string[];
  };

  synthesisContent: {
    problems: Problem[];
    simulations: Simulation[];
    connections: string[]; // related concept IDs
  };

  // Difficulty
  baseDifficulty: number; // 0-1
  estimatedTimeMinutes: number;
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
  type: 'prediction' | 'calculation' | 'conceptual';
  difficulty: 'easy' | 'medium' | 'hard';
  solution: string;
  xpReward: number;
}

// Example concept
export const METRIC_TENSOR_CONCEPT: ConceptNode = {
  id: 'metric-tensor',
  title: 'The Metric Tensor',
  description: 'Understanding how spacetime curvature is encoded',
  category: 'geometry',
  prerequisites: ['manifolds-intro', 'tensors-basics'],

  intuitionContent: {
    visualizationType: 'curved-surface-2d',
    interactiveParams: {
      curvatureRadius: { min: 1, max: 10, default: 5 },
      gridDensity: { min: 5, max: 20, default: 10 },
    },
    prompts: [
      'Place two points and observe the geodesic path',
      'How does changing curvature affect the path?',
      'What happens to parallel lines on this surface?',
    ],
    patterns: [
      'geodesics-curve-inward',
      'parallel-lines-converge',
      'distances-distorted',
    ],
  },

  derivationContent: {
    steps: [
      {
        stepNumber: 1,
        prompt: 'Write the general form of the line element in curved spacetime',
        expectedAnswer: 'ds^2 = g_{\\mu\\nu} dx^\\mu dx^\\nu',
        hints: [
          'Think about how we measure distances',
          'We need a tensor that relates coordinate differentials to proper distance',
          'Use Einstein summation notation',
        ],
        explanation: 'The metric tensor g_μν encodes all information about distances and angles in curved spacetime.',
      },
      // ... more steps
    ],
    finalResult: 'ds^2 = g_{\\mu\\nu} dx^\\mu dx^\\nu',
    keyInsights: [
      'The metric tensor completely determines the geometry',
      'It\'s symmetric: g_μν = g_νμ',
      'In flat spacetime, it reduces to the Minkowski metric',
    ],
  },

  synthesisContent: {
    problems: [
      {
        id: 'metric-tensor-problem-1',
        prompt: 'Given a metric with specific components, calculate the proper distance between two events',
        type: 'calculation',
        difficulty: 'medium',
        solution: '/* solution here */',
        xpReward: 60,
      },
    ],
    simulations: [
      {
        id: 'metric-schwarzschild-preview',
        description: 'See how the Schwarzschild metric curves spacetime around a mass',
      },
    ],
    connections: ['geodesics', 'christoffel-symbols', 'curvature-tensor'],
  },

  baseDifficulty: 0.5,
  estimatedTimeMinutes: 45,
};
```

## Performance Optimization

### 3D Rendering
- Use `useFrame` hooks efficiently
- Implement LOD (Level of Detail) for complex geometries
- Frustum culling for off-screen objects
- Instanced meshes for repeated elements
- WebGL shader optimization

### Data Loading
- Convex reactive queries (automatic caching)
- Optimistic updates for better UX
- Pagination for large datasets (derivation history)
- Lazy loading for concept content

### Code Splitting
- Route-based code splitting (Next.js automatic)
- Dynamic imports for heavy 3D components
- Lazy load visualization components

## Security Considerations

### Authentication
- Clerk for user authentication
- Convex built-in auth integration
- Secure session management

### Data Privacy
- User data isolated by userId in Convex
- No sharing of derivation attempts without consent
- Optional leaderboard participation

### API Security
- Convex auth checks in all queries/mutations
- Rate limiting on Claude API calls
- Environment variables for API keys

## Testing Strategy

### Unit Tests
- Vitest for TypeScript utilities
- Test XP calculations
- Test difficulty adjustment algorithms
- Test spaced repetition logic

### Component Tests
- React Testing Library
- Test derivation step validation
- Test hint system
- Test XP bar animations

### Integration Tests
- Test Convex mutations/queries
- Test Claude API integration
- Test end-to-end learning flow

### E2E Tests
- Playwright for critical user journeys
- Test complete concept completion
- Test achievement unlocking
- Test streak tracking

## Monitoring & Analytics

### Key Metrics to Track
- User engagement (DAU, session length)
- Concept completion rates
- Hint usage patterns
- Average mastery scores
- Streak retention
- Achievement unlock rates

### Error Tracking
- Sentry for error monitoring
- Console error tracking
- Failed Claude API calls

## Accessibility

### WCAG Considerations
- Keyboard navigation for all interactive elements
- Screen reader support for LaTeX (MathJax accessibility)
- High contrast mode for visualizations
- Customizable text sizes
- Alt text for visual concept diagrams

## Deployment Pipeline

### Development Workflow
1. Local development with Convex dev server
2. Feature branch deployment (Vercel preview)
3. Integration testing
4. Merge to main → production deployment

### Environment Variables
```bash
# .env.local
NEXT_PUBLIC_CONVEX_URL=<convex-url>
ANTHROPIC_API_KEY=<api-key>
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<clerk-key>
CLERK_SECRET_KEY=<clerk-secret>
```

### CI/CD
- GitHub Actions for linting/testing
- Vercel auto-deployment on push
- Convex auto-deployment on push

## Future Architecture Considerations

### Scalability
- Convex handles scaling automatically
- Vercel edge functions for global distribution
- CDN for static 3D assets

### Extensibility
- Plugin system for custom visualizations
- Community-contributed content
- Multi-language support (i18n)

### Mobile App
- React Native version sharing core logic
- Native 3D rendering (expo-gl)
- Offline mode with local storage

---

This architecture provides a solid foundation for building an engaging, scalable, and maintainable GTR learning platform while leveraging modern TypeScript tooling and best practices.

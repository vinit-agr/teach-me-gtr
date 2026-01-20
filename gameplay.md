# Teach Me GTR - User Flow & Gameplay Guide

## Overview

**Teach Me GTR** combines rigorous learning of General Relativity with RPG-style game mechanics. This document explains how users interact with the app, how the gameplay loop works, and how learning progression is structured.

---

## Complete User Journey

### 1. First-Time User Experience

#### Sign Up & Welcome
```
User arrives → Sign up (Clerk auth) → Welcome screen
```

**Welcome Screen:**
- Brief intro: "Master Einstein's masterpiece. One geodesic at a time."
- Quick overview of what GTR is
- Explain the gamification: "You'll level up by mastering concepts"
- Call to action: "Begin Your Journey"

#### Initial Diagnostic Assessment

Instead of a boring quiz, an interactive exploration:

```
┌─────────────────────────────────────────────────────────┐
│  "Let's discover what you already know about relativity" │
└─────────────────────────────────────────────────────────┘

Phase 1: Visual Recognition
→ Show 3D visualization of curved spacetime
→ Ask: "What do you think this represents?"
→ Multiple choice with "I don't know" option

Phase 2: Concept Familiarity
→ Show terms: "Metric Tensor", "Geodesic", "Schwarzschild"
→ User clicks familiar ones (no penalty for skipping)

Phase 3: Math Comfort
→ Show equation: g_μν dx^μ dx^ν
→ "Have you seen notation like this before?"
→ Rate comfort level: Never seen it / Looks familiar / I understand it

Result:
→ System determines starting difficulty
→ Unlocks appropriate starting concepts
→ Creates personalized learning path
```

**Outcome:**
- User level determined: Beginner / Intermediate / Advanced
- First 2-3 concepts unlocked in skill tree
- Tutorial mode enabled for first concept

---

### 2. Main Dashboard (Home Base)

After onboarding, users land on their personal dashboard:

```
┌─────────────────────────────────────────────────────────────┐
│                    TEACH ME GTR                              │
│                                                              │
│  Welcome back, Vinit! 👋                   Level 5 ⚡       │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 420/600 XP            │
│                                                              │
│  🔥 Current Streak: 7 days        🏆 Latest Achievement:     │
│     Keep it going!                   "Tensor Tamer"         │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│  📚 Continue Learning                                        │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  ▶ Riemann Curvature Tensor                         │   │
│  │    Derivation Phase • 23 minutes remaining          │   │
│  │    Progress: ████████░░░░░░ 65%                     │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
│  🎯 Today's Challenge                    ⏰ 5 hours left     │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Calculate geodesic deviation                        │   │
│  │  Difficulty: Hard • Bonus XP: +50                   │   │
│  │  [Start Challenge]                                   │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
│  📊 Your Progress                                            │
│  ┌──────────────┬──────────────┬──────────────┐           │
│  │ Derivation XP│ Visualizer XP│ Problem XP   │           │
│  │    240       │     180      │     150      │           │
│  │  ████░░░░░   │  ███░░░░░░   │  ██░░░░░░░  │           │
│  └──────────────┴──────────────┴──────────────┘           │
│                                                              │
│  [View Skill Tree]  [Profile]  [Leaderboard]               │
└─────────────────────────────────────────────────────────────┘
```

**Dashboard Components:**

1. **Header**: Name, level, XP bar (always visible)
2. **Streak Display**: Current streak with fire emoji intensity (🔥 = 3+, 🔥🔥 = 7+, 🔥🔥🔥 = 30+)
3. **Continue Learning**: Quick resume of in-progress concept
4. **Daily Challenge**: Time-limited challenge with bonus rewards
5. **Progress Overview**: XP breakdown by track (pie chart)
6. **Quick Actions**: Navigate to skill tree, profile, leaderboard

---

### 3. Skill Tree (Learning Path Visualization)

The skill tree shows the entire GTR curriculum as an interactive graph:

```
                    [Foundations]
                          │
              ┌───────────┼───────────┐
              │           │           │
    [Special Relativity]  │   [Equivalence Principle] ✓
         🔒               │            🌟
                          │
                  [Manifolds & Tensors] ✓
                          │
              ┌───────────┼───────────┐
              │                       │
      [Metric Tensor] 🌟     [Covariant Derivative] ✓
              │                       │
              └───────────┬───────────┘
                          │
                    [Geodesics] ⏳
                          │
              ┌───────────┼───────────┐
              │           │           │
    [Christoffel Symbols] │  [Parallel Transport]
           🔵             │         🔵
                          │
              [Riemann Curvature Tensor] 🔵
                          │
                  [Einstein Field Equations]
                          │
                    [Schwarzschild Solution]
                          │
              ┌───────────┼───────────┐
              │           │           │
       [Black Holes]  [Gravitational  [Cosmology]
           🔒          Waves]           🔒
                         🔒
```

**Node Status:**
- 🔒 **Gray (Locked)**: Prerequisites not met - hover shows what's needed
- 🔵 **Blue (Available)**: Ready to start - prerequisites completed
- ⏳ **Yellow (In Progress)**: Currently working on this
- ✓ **Green (Completed)**: Finished all three phases
- 🌟 **Gold (Mastered)**: Completed + high mastery score (>90%)

**Interactions:**
- Click any available node → Concept preview modal
- Hover → Tooltip with concept description and estimated time
- Zoom in/out, pan around the tree
- Filter by category (Foundations, Geometry, Curvature, etc.)

---

### 4. Concept Preview Modal

Before starting a concept, users see a preview:

```
┌────────────────────────────────────────────────────────┐
│  METRIC TENSOR                                    [X]  │
├────────────────────────────────────────────────────────┤
│                                                        │
│  "The metric tensor encodes all information about      │
│   distances and curvature in spacetime"                │
│                                                        │
│  Category: Differential Geometry                       │
│  Difficulty: ★★★☆☆                                     │
│  Estimated Time: 45 minutes                            │
│                                                        │
│  Prerequisites: ✓ Manifolds, ✓ Tensor Basics          │
│                                                        │
│  What You'll Learn:                                    │
│  • How to measure distances in curved spacetime        │
│  • The line element ds² = g_μν dx^μ dx^ν              │
│  • Connection to spacetime geometry                    │
│                                                        │
│  Learning Path:                                        │
│  Phase 1: Visualize curved surfaces (15 min)          │
│  Phase 2: Derive the metric tensor (20 min)           │
│  Phase 3: Apply to Schwarzschild metric (10 min)      │
│                                                        │
│  Rewards: 150 XP • Unlock "Geodesics" concept          │
│                                                        │
│  [Start Learning] or [View Prerequisites]              │
└────────────────────────────────────────────────────────┘
```

Click "Start Learning" → Begins Phase 1

---

### 5. Three-Phase Learning Cycle

This is the **core gameplay loop**. Every concept follows this pattern:

#### PHASE 1: INTUITION BUILDER (Visual/Spatial)

**Goal**: Build intuitive understanding before tackling math

```
┌─────────────────────────────────────────────────────────────┐
│  METRIC TENSOR • Intuition Phase                     Phase 1/3│
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Interactive 3D Visualization                               │
│  ┌───────────────────────────────────────────────────────┐ │
│  │                                                       │ │
│  │         [3D Curved Surface Visualization]             │ │
│  │                                                       │ │
│  │         • Place points                                │ │
│  │         • See geodesic paths                          │ │
│  │         • Adjust curvature                            │ │
│  │                                                       │ │
│  └───────────────────────────────────────────────────────┘ │
│                                                             │
│  Controls:                                                  │
│  Curvature: [━━━━●━━━━━] 0.5                              │
│  Grid Density: [━━━━━●━━━] 12                             │
│                                                             │
│  🎯 Your Task:                                             │
│  "Place two points and observe the shortest path           │
│   between them. What happens when you increase curvature?" │
│                                                             │
│  Observations: (free text input)                            │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ The path curves inward as curvature increases...    │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  💡 Pattern Recognition:                                    │
│  □ Geodesics curve with spacetime                          │
│  □ Parallel lines converge on curved surfaces              │
│  ✓ Distances are distorted by curvature (+20 XP!)         │
│                                                             │
│  [Continue to Derivation] (unlocked after 2/3 patterns)    │
└─────────────────────────────────────────────────────────────┘
```

**Gameplay Mechanics:**
- **Exploration**: Users manipulate parameters freely
- **Pattern Discovery**: System detects when users discover key patterns (e.g., geodesics curve)
- **XP Rewards**: +20 XP per pattern discovered
- **Progress Gate**: Must discover 2/3 patterns to proceed (keeps engagement)
- **No Wrong Answers**: Observations are saved, not judged

**XP Earned:**
- Pattern discovered: **+20 XP each**
- Phase completed: **+50 XP**
- Total: **~110-140 XP** depending on exploration

---

#### PHASE 2: DERIVATION (Mathematical Struggle)

**Goal**: Work through the mathematical derivation step-by-step

```
┌─────────────────────────────────────────────────────────────┐
│  METRIC TENSOR • Derivation Phase                   Phase 2/3│
├─────────────────────────────────────────────────────────────┤
│  Progress: Step 3 of 7                        Hints used: 1  │
│  ●●●○○○○                                                     │
│                                                             │
│  Previous Steps: (collapsible)                              │
│  ✓ Step 1: Define manifold coordinates                     │
│  ✓ Step 2: Express infinitesimal displacement              │
│                                                             │
│  Current Step:                                              │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│                                                             │
│  "Now express the proper distance ds in terms of            │
│   coordinate differentials dx^μ"                            │
│                                                             │
│  Your Answer: (LaTeX input with live preview)               │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ ds^2 = g_{\mu\nu} dx^\mu dx^\nu                     │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  Preview:                                                   │
│  ds² = g_μν dx^μ dx^ν                                      │
│                                                             │
│  [Submit Answer]  [Request Hint (-10 XP)]                  │
│                                                             │
│  💡 Stuck? Here's what to think about:                      │
│  • We need a way to relate coordinate changes to distance  │
│  • Think about the Pythagorean theorem in flat space       │
│  • In curved space, we need a generalization               │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**When User Submits:**

**If Correct:**
```
┌─────────────────────────────────────────────────────────────┐
│  ✓ Correct! +10 XP                                          │
│                                                             │
│  Explanation:                                               │
│  "The metric tensor g_μν acts as a generalized dot product, │
│   telling us how to compute distances from coordinate       │
│   differentials. This is the fundamental equation of        │
│   Riemannian geometry!"                                     │
│                                                             │
│  [Continue to Next Step]                                    │
└─────────────────────────────────────────────────────────────┘
```

**If Incorrect:**
```
┌─────────────────────────────────────────────────────────────┐
│  ✗ Not quite...                                             │
│                                                             │
│  Your answer: ds = g_μν dx^μ dx^ν                          │
│  Issue: Missing the squared term on the left side          │
│                                                             │
│  Hint: Remember we're computing the distance squared,       │
│        not the distance itself                              │
│                                                             │
│  [Try Again]  [Request Another Hint (-10 XP)]              │
└─────────────────────────────────────────────────────────────┘
```

**Hint System:**

First Hint (costs 10 XP):
```
💡 Hint 1:
"Think about the Pythagorean theorem: ds² = dx² + dy² + dz²
 In curved spacetime, we need a generalized version..."
```

Second Hint (costs 10 XP):
```
💡 Hint 2:
"We introduce the metric tensor g_μν to weight each coordinate.
 Use Einstein summation notation: g_μν dx^μ dx^ν"
```

Third Hint (costs 10 XP, basically the answer):
```
💡 Hint 3:
"The answer is: ds² = g_μν dx^μ dx^ν

 Where:
 - ds² is the proper distance squared
 - g_μν is the metric tensor
 - dx^μ, dx^ν are coordinate differentials
 - Summation over μ and ν is implied"
```

**Derivation Complete:**
```
┌─────────────────────────────────────────────────────────────┐
│  🎉 Derivation Complete!                                    │
│                                                             │
│  Final Result:                                              │
│  ds² = g_μν dx^μ dx^ν                                      │
│                                                             │
│  You completed this derivation with:                        │
│  • 7 steps                                                  │
│  • 1 hint used                                              │
│  • 18 minutes                                               │
│                                                             │
│  XP Earned: +75 XP (reduced from 100 due to hints)         │
│                                                             │
│  Key Insights:                                              │
│  ✓ The metric tensor encodes geometry                      │
│  ✓ It generalizes the Pythagorean theorem                  │
│  ✓ Symmetric: g_μν = g_νμ                                  │
│                                                             │
│  [Continue to Synthesis]                                    │
└─────────────────────────────────────────────────────────────┘
```

**XP Calculation:**
- Base: **100 XP** for completion
- Each step correct: **+10 XP**
- Penalties: **-10 XP per hint used**
- Time bonus: **+10 XP** if completed under estimated time

**Total Phase 2 XP: 50-100 XP** depending on performance

---

#### PHASE 3: SYNTHESIS (Application & Testing)

**Goal**: Apply what you learned to novel problems

```
┌─────────────────────────────────────────────────────────────┐
│  METRIC TENSOR • Synthesis Phase                    Phase 3/3│
├─────────────────────────────────────────────────────────────┤
│  Problem 1 of 3                                             │
│                                                             │
│  "Given the Schwarzschild metric:                           │
│                                                             │
│   ds² = -(1-2M/r)dt² + (1-2M/r)⁻¹dr² + r²dΩ²              │
│                                                             │
│   What happens to time measurements as you approach         │
│   the event horizon (r → 2M)?"                              │
│                                                             │
│  Your Prediction:                                           │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Time dilation increases, approaching infinity       │   │
│  │ as r → 2M. Clocks appear to stop at the horizon.   │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  [Submit Prediction]                                        │
│                                                             │
│  ─── After Submission ───                                   │
│                                                             │
│  ✓ Correct Analysis! +25 XP                                │
│                                                             │
│  Visualization:                                             │
│  [Interactive 3D: Clock ticking rate vs. distance from BH]  │
│                                                             │
│  Explanation:                                               │
│  "The g_tt component (1-2M/r) → 0 as r → 2M, causing       │
│   extreme time dilation. This is gravitational time         │
│   dilation - the closer to the mass, the slower time runs." │
│                                                             │
│  Connection to Previous Learning:                           │
│  → Equivalence Principle: Gravity affects time             │
│  → Metric Tensor: g_tt encodes time geometry               │
│                                                             │
│  [Next Problem]                                             │
└─────────────────────────────────────────────────────────────┘
```

**Problem Types:**

1. **Prediction Problems**: Predict outcome before simulation
2. **Calculation Problems**: Compute specific values
3. **Conceptual Problems**: Explain physical meaning

**After All Problems:**
```
┌─────────────────────────────────────────────────────────────┐
│  🏆 CONCEPT MASTERED!                                       │
│                                                             │
│  METRIC TENSOR                                              │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│                                                             │
│  Total XP Earned: +240 XP                                   │
│  Time Spent: 42 minutes                                     │
│  Mastery Score: 87%                                         │
│                                                             │
│  🎉 Achievement Unlocked: "Metric Maven"                   │
│     +100 bonus XP                                           │
│                                                             │
│  📈 LEVEL UP! You're now Level 6!                          │
│                                                             │
│  [Confetti Animation]                                       │
│                                                             │
│  Unlocked Concepts:                                         │
│  🔓 Geodesics                                               │
│  🔓 Christoffel Symbols                                     │
│                                                             │
│  Next Review Scheduled: 3 days from now                     │
│                                                             │
│  [Return to Dashboard]  [Continue to Next Concept]          │
└─────────────────────────────────────────────────────────────┘
```

**Phase 3 XP:**
- Problem solved (first try): **+80 XP**
- Problem solved (second try): **+60 XP**
- Problem solved (multiple tries): **+40 XP**
- Correct prediction: **+25 XP**
- Phase completion: **+50 XP**

**Total Phase 3 XP: 100-200 XP**

---

## Gamification Systems Deep Dive

### XP & Leveling

**XP Sources:**
- Pattern discovery: 20 XP each
- Derivation steps: 10 XP each
- Derivation completion: 50-100 XP
- Synthesis problems: 40-80 XP each
- Daily challenges: 100 XP + 50 bonus
- Achievements: 50-500 XP
- Streaks: 50-500 XP at milestones

**Leveling Formula:**
```
Level = floor(sqrt(totalXP / 100))

Examples:
100 XP = Level 1
400 XP = Level 2
900 XP = Level 3
2500 XP = Level 5
10000 XP = Level 10
```

**XP Required for Levels:**
- Level 1 → 2: 300 XP
- Level 2 → 3: 500 XP
- Level 5 → 6: 600 XP
- Level 10 → 11: 1100 XP

**Level Perks:**
- Every 5 levels: Unlock a "streak freeze" powerup
- Every 10 levels: Unlock advanced visualization features
- Level 20: Unlock community features
- Level 50: Unlock research paper walkthrough mode

---

### Three XP Tracks

Players earn XP across three parallel tracks:

#### 1. Derivation Master Track 🧮
**How to Earn:**
- Complete derivation phases
- Solve with minimal hints
- Fast completion times

**Milestones:**
- 500 XP: "Equation Enthusiast"
- 1000 XP: "Derivation Devotee"
- 2000 XP: "Tensor Tamer"
- 5000 XP: "Mathematics Master"

#### 2. Visualizer Track 🎨
**How to Earn:**
- Complete intuition phases
- Discover all patterns
- Explore visualizations thoroughly
- Spend time experimenting

**Milestones:**
- 500 XP: "Visual Learner"
- 1000 XP: "Spacetime Sculptor"
- 2000 XP: "Geometry Genius"
- 5000 XP: "Visualization Virtuoso"

#### 3. Problem Solver Track 🎯
**How to Earn:**
- Complete synthesis phases
- Correct predictions
- Daily challenges
- Solve without hints

**Milestones:**
- 500 XP: "Problem Tackler"
- 1000 XP: "Solution Seeker"
- 2000 XP: "Application Ace"
- 5000 XP: "Einstein's Heir"

**Track Balance:**
The game encourages balanced progress - bonuses for keeping tracks within 30% of each other.

---

### Achievement System

**Categories:**

#### Milestone Achievements 🎯
- "First Steps" - Complete first concept (100 XP)
- "Geodesic Graduate" - Complete 5 concepts (200 XP)
- "Tensor Titan" - Complete 10 concepts (500 XP)
- "Relativity Researcher" - Complete 20 concepts (1000 XP)

#### Mastery Achievements 🌟
- "Perfect Derivation" - Complete derivation with no hints (150 XP)
- "Speed Demon" - Complete concept in half the estimated time (200 XP)
- "Pattern Master" - Discover all patterns in first attempt (100 XP)
- "Mastery Maven" - Achieve 95%+ mastery score (250 XP)

#### Streak Achievements 🔥
- "Hot Streak" - 3 day streak (50 XP)
- "On Fire" - 7 day streak (100 XP)
- "Burning Bright" - 14 day streak (250 XP)
- "Unstoppable" - 30 day streak (500 XP)
- "Legendary" - 100 day streak (2000 XP)

#### Challenge Achievements 💪
- "Challenge Accepted" - Complete first daily challenge (100 XP)
- "Challenge Veteran" - Complete 10 challenges (300 XP)
- "Speed Runner" - Complete challenge under time limit (200 XP)
- "Perfect Week" - Complete 7 challenges in a row (500 XP)

#### Special Achievements 🏆
- "Schwarzschild Scholar" - Master black hole solutions (300 XP)
- "Wave Rider" - Master gravitational waves (300 XP)
- "Cosmic Explorer" - Master cosmology concepts (300 XP)
- "Einstein's Legacy" - Complete entire curriculum (5000 XP)

**Achievement Display:**
- Toast notification when unlocked
- Confetti animation
- Badge added to profile
- Shareable on social media (optional)

---

### Streak System

**How Streaks Work:**
- Visit app and complete at least one activity per day
- Activities count: Start/continue a concept, daily challenge, review session
- Streak increments at midnight (user's timezone)
- Miss a day = streak resets to 0

**Streak Freezes:**
- Earned at level milestones (5, 10, 15, etc.)
- Earned from special achievements
- Can hold max 3 at a time
- Auto-activated if you miss a day
- Saves your streak once

**Visual Representation:**
```
Current Streak: 🔥🔥 14 days

Calendar View:
M  T  W  T  F  S  S
✓  ✓  ✓  ✓  ✓  ✓  ✓
✓  ✓  ✓  ✓  ✓  ✓  ✓

Streak Freezes: ❄️ ❄️ (2 available)
```

**Streak Milestones:**
- 3 days: +50 XP, unlock bronze badge
- 7 days: +100 XP, unlock silver badge
- 14 days: +250 XP, unlock gold badge
- 30 days: +500 XP, special celebration
- 100 days: +2000 XP, legendary status

---

### Daily Challenges

**Challenge Generation:**
- New challenge every day at midnight (user timezone)
- Draws from completed concepts only
- Difficulty rotates: Easy → Medium → Hard → Easy
- Time-limited with bonus for speed

**Challenge Example:**
```
┌─────────────────────────────────────────────────────────────┐
│  🎯 TODAY'S CHALLENGE               ⏰ 18 hours remaining    │
├─────────────────────────────────────────────────────────────┤
│  "Calculate Christoffel Symbols"                            │
│                                                             │
│  Given metric:                                              │
│  ds² = -dt² + a²(t)(dx² + dy² + dz²)                       │
│                                                             │
│  Calculate Γᵗₓₓ                                             │
│                                                             │
│  Difficulty: Medium                                         │
│  Time Limit: 15 minutes                                     │
│  Rewards:                                                   │
│  • Base: 100 XP                                             │
│  • Speed Bonus: +50 XP (complete under 10 min)             │
│  • Perfect Bonus: +25 XP (no hints)                        │
│                                                             │
│  [Start Challenge]                                          │
│                                                             │
│  Your Best: 12 min 34 sec                                   │
└─────────────────────────────────────────────────────────────┘
```

**Challenge Leaderboard (Optional):**
- Top times for each challenge
- Opt-in only (privacy-first)
- Weekly leaderboard resets
- Special flair for top 10

---

### Adaptive Difficulty System

**How It Works:**

The system tracks your performance:
```typescript
Performance Metrics:
- Hints used ratio: (hints used / max hints)
- Correctness rate: (correct steps / total steps)
- Time efficiency: (actual time / estimated time)
- Consistency: (variance in performance)

Target: Keep you at ~85% success rate (flow state)
```

**Adjustments:**

If performing too well (>90% success, <1 hint per concept):
- Increase problem difficulty
- Reduce hint availability
- Suggest advanced concepts
- Add time challenges

If struggling (<60% success, >3 hints per concept):
- Simplify problems
- Provide more hints
- Suggest review sessions
- Recommend prerequisite concepts

**User Feedback:**
```
"How was that concept?"
😩 Too Hard  |  😐 Just Right  |  😴 Too Easy

Manual override available in settings.
```

---

### Spaced Repetition Reviews

**Review Scheduling:**

After completing a concept, reviews are scheduled:
```
First review: 1 day later
Second review: 3 days later
Third review: 7 days later
Fourth review: 14 days later
Fifth review: 30 days later
```

**Review Mode:**
- Condensed 10-15 minute session
- Key derivation steps only
- 2-3 synthesis problems
- Updates mastery score
- Reschedules next review

**Review Notifications:**
```
Dashboard reminder:
"📚 3 concepts ready for review"

Streak-friendly: Reviews count as daily activity
```

---

## Advanced Features

### AI Tutor (Claude Integration)

**Conversational Help:**
```
User: "I don't understand why the metric tensor is symmetric"

AI Tutor: "Great question! Let me explain with an analogy:

Think of the metric tensor as measuring 'distance' between
coordinate directions. The distance from x to y should be the
same as y to x, right? That's why g_xy = g_yx.

Mathematically, this comes from the line element:
ds² = g_μν dx^μ dx^ν

Since dx^μ dx^ν = dx^ν dx^μ (numbers commute), we need
g_μν = g_νμ for consistency.

Want me to show you a specific example?"

[Yes, show example] [I get it, thanks!]
```

**Smart Hints:**
- Contextual to your specific attempt
- Adapts to your level
- Progressive disclosure
- Socratic questioning

**Explanation Modes:**
- ELI5: Simple analogies
- Conceptual: Physical intuition
- Mathematical: Rigorous derivation
- Historical: How Einstein thought about it

---

### Learning Journal

Auto-captures your journey:
```
📖 Learning Journal

2026-01-20 - Metric Tensor
"Aha moment: The metric tensor is like a ruler that changes
shape based on spacetime curvature! It's not just about
distance, it's about how geometry works."

Struggles: Keeping track of index notation
Next time: Practice more with index gymnastics

2026-01-18 - Geodesics
"Finally understand why planets orbit! They're following
straight lines in curved spacetime."
```

Export journal as PDF or markdown.

---

## User Engagement Loops

### Daily Loop
```
1. Open app → Check streak
2. See daily challenge → Complete for bonus XP
3. Continue in-progress concept OR start new concept
4. Work through one phase (20-30 min)
5. Earn XP, maybe unlock achievement
6. Check dashboard → See progress
7. Close app, streak maintained ✓
```

### Weekly Loop
```
1. Complete 3-4 concepts
2. Unlock new concept areas
3. Complete daily challenges
4. Reach review milestones
5. See progress on skill tree
6. Maybe level up
7. Set goal for next week
```

### Monthly Loop
```
1. Complete major concept area (e.g., Differential Geometry)
2. Unlock achievements
3. Level up multiple times
4. See mastery score increase
5. Reach 30-day streak
6. Review early concepts (spaced repetition)
7. Start advanced topics
```

---

## Social Features (Optional)

### Shareable Content
- Achievement badges → Twitter/LinkedIn
- Concept completion → Social media
- Level ups → Celebration posts
- Learning journal entries → Blog export

### Leaderboards (Opt-in)
- Daily challenge times
- Weekly XP earned
- Total level ranking
- Fastest concept completions

### Community Features
- Discussion threads per concept
- Ask questions → Claude AI + community answers
- Share custom problems
- Collaborative problem solving

---

## Mobile Experience

**Responsive Design:**
- All features work on mobile
- 3D visualizations optimized for touch
- LaTeX input via mobile keyboard
- Portrait and landscape modes

**Progressive Web App:**
- Install to home screen
- Offline mode for review
- Push notifications for streaks
- Background sync

---

## Accessibility

**Keyboard Navigation:**
- Tab through all interactive elements
- Keyboard shortcuts for common actions
- Skip navigation links

**Screen Reader Support:**
- Alt text for visualizations
- ARIA labels for complex components
- MathML for equations (screen reader accessible)

**Visual Accessibility:**
- High contrast mode
- Adjustable text size
- Color-blind friendly palette
- Reduced motion option

---

## Summary: The Complete Gameplay Loop

```
Start → Onboarding → Dashboard
         ↓
    Select Concept (Skill Tree)
         ↓
    Phase 1: Intuition (Visualize)
    → Earn XP, discover patterns
         ↓
    Phase 2: Derivation (Math)
    → Earn XP, struggle productively
         ↓
    Phase 3: Synthesis (Apply)
    → Earn XP, test understanding
         ↓
    Concept Complete!
    → Achievement unlocked
    → New concepts unlocked
    → Level up?
         ↓
    Return to Dashboard
    → Daily challenge?
    → Continue next concept?
    → Review old concepts?
         ↓
    Repeat & Master GTR! 🚀
```

**Core Engagement Drivers:**
1. **Immediate feedback** - Know instantly if you're right
2. **Visible progress** - XP bars, skill tree, achievements
3. **Just-right difficulty** - Adaptive system keeps you challenged
4. **Daily habits** - Streaks and daily challenges
5. **Sense of mastery** - Watch concepts go from locked → mastered
6. **Aesthetic pleasure** - Beautiful math, smooth 3D visuals
7. **Autonomy** - Choose your path through skill tree

**Why This Works:**
- Transforms passive learning → active engagement
- Makes abstract math concrete and visual
- Rewards struggle and persistence
- Creates sustainable daily habits
- Provides clear sense of progress
- Maintains mathematical rigor throughout

---

*Master Einstein's masterpiece. One geodesic at a time.* 🚀

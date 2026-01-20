# Teach Me GTR - Implementation Plan

## Overview

This implementation plan breaks down the development of the GTR learning app into manageable phases, each with clear deliverables and success criteria. The plan is designed for a solo developer and emphasizes iterative development with early testing of core concepts.

**Total Estimated Timeline**: 8-12 weeks (part-time development)

**Development Approach**: Build → Test on Yourself → Iterate → Expand

---

## Phase 0: Project Setup & Infrastructure (Week 1)

### Goals
- Set up development environment
- Configure all core technologies
- Establish project structure
- Deploy hello-world version

### Tasks

#### 1. Initialize Next.js Project
```bash
npx create-next-app@latest teach-me-gtr --typescript --tailwind --app
cd teach-me-gtr
```

**Configuration:**
- TypeScript strict mode
- App Router (Next.js 14+)
- Tailwind CSS
- ESLint + Prettier

#### 2. Set Up Convex Backend
```bash
npm install convex
npx convex dev
```

**Tasks:**
- Initialize Convex project
- Create initial schema (users, conceptProgress)
- Set up Convex client in Next.js
- Test reactive query

#### 3. Configure Authentication (Clerk)
```bash
npm install @clerk/nextjs
```

**Tasks:**
- Set up Clerk account
- Configure sign-in/sign-up pages
- Integrate with Convex auth
- Test authentication flow

#### 4. Install Core Dependencies
```bash
# 3D visualization
npm install three @react-three/fiber @react-three/drei

# Math rendering
npm install katex react-katex

# UI components
npm install @radix-ui/react-* class-variance-authority clsx tailwind-merge

# State management
npm install zustand

# Animations
npm install framer-motion react-confetti

# Code editor for LaTeX
npm install @uiw/react-codemirror

# Utilities
npm install date-fns zod
```

#### 5. Project Structure Setup
```
/app
  /(auth)
    /sign-in
    /sign-up
  /(dashboard)
    /page.tsx
  /(learning)
    /concept/[conceptId]
  /layout.tsx

/components
  /learning
  /visualizations
  /derivation
  /gamification
  /dashboard
  /ui (shadcn components)

/convex
  /schema.ts
  /users.ts
  /concepts.ts
  /achievements.ts

/lib
  /store (Zustand)
  /utils
  /constants

/data
  /curriculum.ts

/public
  /assets
```

#### 6. Deploy Initial Version
- Deploy to Vercel (connect GitHub repo)
- Configure Convex production environment
- Test deployment pipeline

### Deliverables
- ✅ Next.js app running locally and deployed
- ✅ Convex backend connected and reactive
- ✅ Authentication working (Clerk)
- ✅ All dependencies installed
- ✅ Project structure established

### Success Criteria
- Can sign in/up successfully
- Can query/mutate Convex data
- Deployment pipeline working
- Development environment smooth

---

## Phase 1: MVP - Single Concept (Metric Tensor) (Weeks 2-3)

### Goals
- Build complete learning flow for ONE concept
- Implement all three phases (Intuition → Derivation → Synthesis)
- Test on yourself and validate learning approach
- **This phase is critical**: if learning flow doesn't work here, fix it before expanding

### Tasks

#### Week 2: Intuition Phase + Basic UI

**1. Build Concept Navigation**
- Simple concept page layout
- Phase selector (tabs: Intuition, Derivation, Synthesis)
- Progress indicator for current concept
- Basic XP display

**2. Create Curriculum Data Structure**
```typescript
// data/curriculum/metricTensor.ts
export const metricTensorConcept: ConceptNode = {
  // ... as defined in design.md
}
```

**3. Build 2D Curved Surface Visualization**
- Three.js scene setup with @react-three/fiber
- Parametric surface renderer (2D embedded in 3D)
- Interactive curvature control (slider)
- Geodesic path calculator and renderer
- Point placement system

**4. Implement Pattern Recognition System**
- Display prompts to user
- Track user interactions
- Detect pattern discoveries (e.g., "geodesics curve inward")
- Award XP for discoveries
- Convex mutation to save progress

**5. Basic Gamification - XP System**
- XP calculation functions
- XP bar component (animated)
- Level calculation
- Toast notifications for XP gains

#### Week 3: Derivation Phase + Synthesis Phase

**6. Build Derivation Interface**
- Step-by-step layout
- LaTeX input component (CodeMirror)
- Real-time LaTeX preview (KaTeX)
- Submit button with validation
- Display feedback (correct/incorrect)

**7. Implement Hint System**
- Hint button with XP cost display
- Progressive hint disclosure
- Track hints used per step
- Save hint usage to Convex

**8. Build Step Validation System**
- Client-side: exact string match (for MVP)
- Display expected vs. actual (if incorrect)
- Move to next step on correct answer
- Award XP based on hints used

**9. Implement Synthesis Phase**
- Problem display component
- User prediction input
- Simulation runner (reuse 2D visualization)
- Compare prediction to simulation
- Award XP for correct predictions

**10. Connect to Convex**
- Save derivation attempts
- Update concept progress
- Track XP earned
- Save completion status

### Deliverables
- ✅ Complete learning flow for Metric Tensor concept
- ✅ Intuition phase with interactive 3D visualization
- ✅ Derivation phase with step-by-step validation
- ✅ Synthesis phase with problems
- ✅ Basic XP system working
- ✅ All data saving to Convex

### Success Criteria
- **Critical**: You personally complete the Metric Tensor concept
- Learning feels engaging (not boring)
- Derivation struggle feels productive (not frustrating)
- XP rewards feel motivating
- Flow between phases is smooth

### Self-Testing Questions
1. Did you stay engaged for the full concept?
2. Did you learn something new about metric tensors?
3. Would you want to continue to the next concept?
4. What felt tedious or frustrating?
5. What felt rewarding?

**DECISION POINT**: If the learning flow doesn't feel right, iterate on this phase before moving forward.

---

## Phase 2: Core Gamification (Week 4)

### Goals
- Implement achievement system
- Add streak tracking
- Build dashboard to display progress
- Make gamification loop feel rewarding

### Tasks

#### 1. Achievement System
```typescript
// data/achievements.ts
export const ACHIEVEMENTS = [
  {
    id: 'first-concept',
    title: 'First Steps',
    description: 'Complete your first GTR concept',
    icon: '🎯',
    xpReward: 100,
    category: 'milestone',
  },
  // ... more achievements
];
```

**Implementation:**
- Check for achievement unlock conditions after actions
- Convex mutation to award achievements
- Achievement toast with confetti animation
- Achievement list in profile

#### 2. Streak System
- Track last active date
- Calculate current streak
- Daily streak increment
- Streak milestone achievements (3, 7, 14, 30 days)
- Streak freeze feature (earn through challenges)

#### 3. Dashboard Page
**Components:**
- Welcome header with name and level
- Current streak display with fire emoji
- XP by track (derivation, visualizer, problem-solver) - pie chart
- Recent achievements list
- "Continue Learning" button (next recommended concept)
- Progress overview (% of concepts completed)

#### 4. Profile Page
- User stats card
  - Total XP, Level
  - Concepts completed / total
  - Current and longest streak
- XP breakdown by track
- All achievements (locked/unlocked)
- Learning calendar heatmap

#### 5. Level-Up Animation
- Detect level up after XP gain
- Full-screen celebration animation
- Display new level prominently
- Special sound effect (optional)

### Deliverables
- ✅ Achievement system with 10+ achievements defined
- ✅ Streak tracking working
- ✅ Dashboard page showing progress
- ✅ Profile page with stats
- ✅ Level-up celebrations

### Success Criteria
- Achievements feel rewarding when unlocked
- Streaks motivate daily usage
- Dashboard provides clear sense of progress
- Level-ups feel significant

---

## Phase 3: Expand Curriculum (Weeks 5-6)

### Goals
- Add 4-5 more concepts across GTR curriculum
- Build skill tree visualization
- Implement prerequisite locking
- Create adaptive difficulty system

### Tasks

#### Week 5: Add Concepts + Skill Tree

**1. Define Additional Concepts**

Concepts to add:
1. **Principle of Equivalence** (Foundation)
   - Visualization: Elevator thought experiment
   - Derivation: Local inertial frames
   - Synthesis: Predict light bending

2. **Geodesics** (Geometry)
   - Visualization: Geodesic paths on sphere vs. flat space
   - Derivation: Geodesic equation from variational principle
   - Synthesis: Calculate geodesic for specific metric

3. **Christoffel Symbols** (Geometry)
   - Visualization: Parallel transport on curved surface
   - Derivation: Derive Christoffel symbols from metric
   - Synthesis: Compute for Schwarzschild metric

4. **Riemann Curvature Tensor** (Curvature)
   - Visualization: Geodesic deviation
   - Derivation: Commutator of covariant derivatives
   - Synthesis: Calculate components for 2D surface

5. **Einstein Field Equations** (Field Equations)
   - Visualization: Mass causes spacetime curvature
   - Derivation: Derive from action principle
   - Synthesis: Interpret each term physically

**2. Build Skill Tree Component**
```typescript
// components/dashboard/SkillTree.tsx
```

**Features:**
- Interactive graph visualization (could use react-flow or custom SVG)
- Nodes represent concepts
- Edges represent prerequisites
- Node colors:
  - 🔒 Gray: Locked (prerequisites not met)
  - 🟦 Blue: Available
  - 🟡 Yellow: In Progress
  - 🟢 Green: Completed
  - 🌟 Gold: Mastered
- Click node to navigate to concept
- Zoom and pan

**3. Implement Prerequisite System**
- Check prerequisites before allowing concept access
- Lock/unlock logic in Convex
- Display locked reason ("Complete X first")
- Recommend next available concept

**4. Create Concept Selection Flow**
- From dashboard: show recommended concept(s)
- From skill tree: click any available concept
- Display concept preview (description, estimated time, difficulty)
- "Start Learning" button

#### Week 6: Adaptive Difficulty

**5. Implement Difficulty Calculation**
```typescript
// lib/adaptive/difficultyCalculator.ts
```

**Metrics to track:**
- Hints used per concept
- Time spent per concept
- Correctness rate
- Completion rate

**Adjustments:**
- Easier concepts if struggling (< 60% success)
- Harder concepts if excelling (> 85% success)
- Modify problem difficulty
- Adjust hint availability

**6. Difficulty Indicator UI**
- Show current difficulty level
- "Too easy/too hard?" feedback buttons
- Manual difficulty override option

**7. Personalized Recommendations**
- Algorithm to suggest next concept based on:
  - Prerequisites met
  - Current difficulty level
  - User performance trends
  - Spaced repetition (review old concepts)

### Deliverables
- ✅ 5-6 concepts fully implemented
- ✅ Skill tree visualization
- ✅ Prerequisite locking system
- ✅ Adaptive difficulty working
- ✅ Personalized recommendations

### Success Criteria
- Skill tree provides clear learning path
- Unlocking concepts feels rewarding
- Difficulty adjusts appropriately
- Curriculum feels coherent and progressive

---

## Phase 4: Advanced Features (Weeks 7-8)

### Goals
- Add daily challenges
- Implement spaced repetition reviews
- Enhance visualizations
- Add AI tutor (Claude integration)

### Tasks

#### Week 7: Challenges + Reviews

**1. Daily Challenge System**
- Generate/select daily challenge (Convex scheduled function)
- Challenge page with timer
- Problem from any completed concept
- Leaderboard for challenge (optional)
- Bonus XP for completing under time limit

**2. Challenge Attempt Tracking**
- Save attempts to Convex
- Display personal best times
- Show solution after completion
- Award special challenge achievements

**3. Spaced Repetition System**
```typescript
// lib/learning/spacedRepetition.ts
```

**Implementation:**
- Calculate next review date after concept completion
- Use SM-2 algorithm (or simplified version)
- Queue reviews in Convex
- Show review reminders on dashboard
- Quick review mode (key questions only, not full concept)

**4. Review Mode**
- Condensed version of concept
- Key derivation steps only
- Quick synthesis problems
- Update mastery score after review
- Reschedule next review

#### Week 8: AI Tutor + Enhanced Visualizations

**5. Integrate Claude API**
```typescript
// convex/ai/tutor.ts
```

**Convex Actions:**
- `getHint`: Generate contextual hint
- `validateDerivationStep`: Check mathematical equivalence
- `explainConcept`: Adaptive explanation based on user level
- `generatePracticeProblems`: Create new problems

**6. Hint System Upgrade**
- AI-generated hints (progressive disclosure)
- Contextual to user's specific attempt
- Adjusts to user level
- Cost still deducts XP

**7. Enhanced Visualizations**
- Add 3D Schwarzschild geometry visualization
- Light cone tilting animation
- Gravitational lensing simulation
- Stress-energy tensor interactive demo
- Performance optimizations (LOD, instancing)

**8. Concept Connections**
- Display related concepts after completion
- Show how current concept connects to others
- Visual graph of concept relationships
- "Apply this to..." suggestions

### Deliverables
- ✅ Daily challenge system
- ✅ Spaced repetition reviews
- ✅ AI tutor integration (Claude)
- ✅ Enhanced 3D visualizations
- ✅ Concept connection system

### Success Criteria
- Daily challenges motivate regular engagement
- Reviews help retain knowledge
- AI hints are helpful and appropriate
- Visualizations are smooth (60 FPS)
- Concepts feel interconnected

---

## Phase 5: Polish & Optimization (Weeks 9-10)

### Goals
- Improve UX/UI based on self-testing
- Optimize performance
- Add animations and micro-interactions
- Implement accessibility features
- Write documentation

### Tasks

#### Week 9: UX/UI Polish

**1. Animation Pass**
- Page transitions (Framer Motion)
- XP bar animations
- Achievement unlock animations
- Concept unlock animations
- Loading states
- Micro-interactions (button hovers, etc.)

**2. Visual Design Refinement**
- Consistent color scheme
- Typography hierarchy
- Spacing and layout polish
- Dark mode support
- Mobile responsive design

**3. Onboarding Flow**
- Welcome screen for new users
- Interactive tutorial for first concept
- Explain gamification systems
- Guide through skill tree
- Tooltips for UI elements

**4. Error States & Edge Cases**
- Handle failed API calls gracefully
- Empty states (no achievements yet, etc.)
- Loading skeletons
- Offline message
- Session timeout handling

#### Week 10: Performance & Accessibility

**5. Performance Optimization**
- Code splitting (dynamic imports for 3D)
- Image optimization (Next.js Image)
- Lazy loading for heavy components
- Memoization for expensive calculations
- Bundle size analysis and reduction
- Three.js performance tuning

**6. Accessibility**
- Keyboard navigation
- Screen reader support (ARIA labels)
- Focus management
- Color contrast (WCAG AA)
- LaTeX accessibility (MathJax alt text)
- Reduced motion option

**7. Testing**
- Write unit tests for critical functions (XP calculation, difficulty adjustment)
- Component tests for key components
- E2E test for complete concept flow
- Test on different browsers
- Test on mobile devices

**8. Documentation**
```markdown
# README.md
- Project overview
- Tech stack
- Setup instructions
- Development workflow

# CURRICULUM.md
- List of all concepts
- Prerequisites map
- Content guidelines for adding new concepts

# CONTRIBUTING.md (if opening to community)
- How to add new concepts
- How to add visualizations
- Code style guidelines
```

### Deliverables
- ✅ Polished UI with smooth animations
- ✅ Comprehensive onboarding
- ✅ Performance optimized (Lighthouse score > 90)
- ✅ Accessibility compliant (WCAG AA)
- ✅ Test coverage for critical paths
- ✅ Complete documentation

### Success Criteria
- App feels polished and professional
- No jank or performance issues
- Keyboard navigation works throughout
- New users can onboard without confusion
- Codebase is well-documented

---

## Phase 6: Advanced Curriculum Expansion (Weeks 11-12)

### Goals
- Add advanced GTR topics
- Implement complex visualizations
- Add community features (optional)
- Prepare for potential public launch

### Tasks

#### 1. Advanced Concepts

Add 5-10 more advanced concepts:
- Schwarzschild Solution (full derivation)
- Kerr Metric (rotating black holes)
- Friedmann Equations (cosmology)
- Gravitational Waves
- Black Hole Thermodynamics
- Penrose Diagrams
- Wormhole Solutions
- AdS/CFT Correspondence (ambitious)

#### 2. Advanced Visualizations
- Black hole event horizon 3D
- Gravitational wave propagation
- Cosmological expansion simulation
- Penrose diagram interactive explorer
- Multiple black hole interactions

#### 3. Practice Problem Generator
- Use Claude to generate novel problems
- Difficulty-adjusted problems
- Step-by-step solution walkthroughs
- Problem bank for each concept

#### 4. Community Features (Optional)
- Discussion threads per concept
- Share achievements on social media
- Leaderboards (opt-in)
- User-generated explanations
- Collaborative problem solving

#### 5. Export & Sharing
- Export learning journal as PDF
- Share progress on social media
- Generate certificate of completion
- Export derivations as LaTeX documents

### Deliverables
- ✅ 20+ total concepts in curriculum
- ✅ Advanced visualizations
- ✅ Practice problem generator
- ✅ (Optional) Community features
- ✅ Export capabilities

### Success Criteria
- Complete GTR curriculum from foundations to advanced topics
- Visualizations for complex phenomena
- Sufficient practice problems per concept
- (Optional) Active community engagement

---

## Ongoing Maintenance & Iteration

### Regular Tasks
- Monitor user analytics (if shared publicly)
- Fix bugs reported
- Add new concepts based on feedback
- Optimize performance
- Keep dependencies updated
- Improve AI tutor prompts

### Content Expansion
- More visualization types
- More practice problems
- Historical context for concepts
- Real-world applications
- Research paper walkthroughs

### Feature Ideas for Future
- Mobile app (React Native)
- Voice interaction with AI tutor
- VR visualizations
- Multiplayer challenges
- Integration with physics simulation tools
- Export to Anki for spaced repetition

---

## Development Best Practices

### Version Control
- Feature branches for each major feature
- Descriptive commit messages
- Regular commits (don't let work pile up)
- Tag releases (v0.1.0, v0.2.0, etc.)

### Code Quality
- Use TypeScript strictly
- ESLint and Prettier configured
- Component comments for complex logic
- Type-safe Convex queries/mutations

### Testing Strategy
- Test XP calculations (critical for fairness)
- Test difficulty adjustments
- Test prerequisite locking
- E2E test for one complete concept flow
- Manual testing on each phase completion

### Documentation
- Comment complex algorithms
- Document data schemas
- Keep README updated
- Maintain CHANGELOG

---

## Milestones & Decision Points

### Milestone 1: End of Phase 1 ✅
**Criteria**: Single concept (Metric Tensor) fully functional and engaging

**Decision Point**: Does the learning flow work? Is it engaging?
- ✅ Yes → Proceed to Phase 2
- ❌ No → Iterate on learning approach, adjust difficulty, improve visualizations

### Milestone 2: End of Phase 3 ✅
**Criteria**: 5-6 concepts, skill tree, adaptive difficulty working

**Decision Point**: Does the curriculum feel coherent? Is the skill tree useful?
- ✅ Yes → Proceed to Phase 4
- ❌ No → Adjust concept ordering, improve transitions, fix prerequisite logic

### Milestone 3: End of Phase 5 ✅
**Criteria**: Polished MVP with 5-6 concepts, gamification, and AI tutor

**Decision Point**: Is this ready for personal daily use?
- ✅ Yes → Use daily for 2 weeks, then decide on public launch
- ❌ No → Polish further, fix UX issues

### Milestone 4: Public Launch (Optional) ✅
**Criteria**: 20+ concepts, polished UI, tested on multiple users

**Decision Point**: Share publicly?
- ✅ Yes → Prepare for feedback, marketing, scaling
- ❌ No → Keep as personal project, continue adding concepts

---

## Risk Mitigation

### Risk 1: Three.js visualizations too complex
**Mitigation**: Start with 2D embedded in 3D, gradually increase complexity. Use existing examples as reference.

### Risk 2: AI tutor (Claude) costs too high
**Mitigation**: Cache common hints, use cheaper models for simple validations, implement rate limiting.

### Risk 3: Curriculum too ambitious
**Mitigation**: Start with core concepts only (Phases 1-3). Advanced topics are optional (Phase 6).

### Risk 4: Derivations too hard to validate automatically
**Mitigation**: Use exact string matching for MVP, AI validation for flexibility. Provide clear expected format.

### Risk 5: Gamification feels gimmicky
**Mitigation**: Test on yourself rigorously. Adjust XP rewards, achievement criteria. Make it feel earned, not given.

### Risk 6: Loss of motivation mid-project
**Mitigation**: Phase 1 is the MVP - if you complete that, you have a usable tool. Each phase adds value independently.

---

## Success Metrics (Personal Use)

### After 1 Month
- [ ] Completed at least 3 concepts
- [ ] Maintained 7+ day streak
- [ ] Feel more confident in GTR understanding
- [ ] Enjoy using the app (not a chore)

### After 3 Months
- [ ] Completed 10+ concepts
- [ ] Can derive key equations from memory
- [ ] Can explain GTR concepts clearly to others
- [ ] Have working knowledge of Einstein Field Equations

### After 6 Months
- [ ] Completed full curriculum
- [ ] Can read GTR research papers
- [ ] Deep intuition for curved spacetime
- [ ] Considering sharing app publicly

---

## Technology Choices - Rationale

### Why Next.js?
- Server and client components
- Excellent performance
- Easy deployment on Vercel
- Great developer experience

### Why Convex?
- Real-time reactive queries (perfect for progress tracking)
- TypeScript-first API
- Built-in auth integration
- Serverless (no infrastructure management)
- Generous free tier

### Why Three.js?
- Industry-standard 3D library
- Massive community and examples
- React Three Fiber makes it React-friendly
- Performant with WebGL

### Why Clerk?
- Easy authentication setup
- Integrates with Convex
- Good free tier
- Professional UI components

### Why Claude API?
- Best for educational explanations
- Strong at mathematical reasoning
- Can validate equivalence of equations
- Conversational and adaptive

---

## Budget Considerations (if sharing publicly)

### Free Tiers
- **Vercel**: 100 GB-hours per month (plenty for personal use)
- **Convex**: 1M reads, 500K writes per month (generous)
- **Clerk**: 5,000 MAU (monthly active users) free
- **Claude API**: Pay-per-use, ~$0.003 per 1K input tokens

### Estimated Costs (Personal Use)
- Vercel: **$0/month** (free tier sufficient)
- Convex: **$0/month** (free tier sufficient)
- Clerk: **$0/month** (free tier sufficient)
- Claude API: **~$5-10/month** (moderate usage)

**Total: ~$5-10/month** for personal use

### If Scaling (100+ users)
- Vercel: **$20/month** (Pro plan)
- Convex: **$25/month** (Starter plan)
- Clerk: **$25/month** (Essential plan)
- Claude API: **~$50-100/month** (higher usage)

**Total: ~$120-170/month** for small user base

---

## Conclusion

This implementation plan provides a structured, iterative approach to building **Teach Me GTR**. The phased structure allows for:

1. **Early validation** (Phase 1): Test if the learning approach works before investing in full curriculum
2. **Progressive enhancement**: Each phase adds value independently
3. **Flexibility**: Phases 5-6 are optional enhancements
4. **Risk mitigation**: Decision points prevent over-investment in flawed approaches

**Key Success Factor**: Actually use the app yourself as you build it. Your engagement (or lack thereof) is the best indicator of whether the app is achieving its goal.

**Remember**: The goal is not to build a perfect app, but to build an app that makes learning GTR engaging and effective. Let your own learning experience guide the development.

**Start simple. Test constantly. Iterate based on what works.**

Good luck, and enjoy the journey through spacetime! 🚀

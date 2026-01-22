# Teach Me GTR

**Master Einstein's masterpiece. One geodesic at a time.**

An interactive, gamified learning platform for mastering General Theory of Relativity (GTR). Transform the complex journey of learning Einstein's field equations into an engaging, RPG-style adventure with 3D visualizations, step-by-step derivations, and motivating gamification.

## 🚀 Features

### Three-Phase Learning Cycle

Every GTR concept follows a proven learning pattern:

1. **Intuition Phase (Visual/Spatial)** 🎨
   - Interactive 3D visualizations using three.js
   - Manipulate parameters (mass, velocity, curvature)
   - Pattern recognition exercises
   - Earn XP for discovering patterns

2. **Derivation Phase (Mathematical Rigor)** 🧮
   - Step-by-step tensor derivations
   - LaTeX input with live preview
   - AI-powered hint system
   - Immediate validation and feedback

3. **Synthesis Phase (Application)** 🎯
   - Apply concepts to novel problems
   - Predict simulation outcomes
   - Connect to previous learning
   - Earn mastery badges

### Gamification System

- **XP & Leveling**: Three parallel tracks (Derivation Master, Visualizer, Problem Solver)
- **Achievement Badges**: Unlock milestones like "Tensor Tamer" and "Geodesic Master"
- **Streak System**: Daily learning streaks with freeze powerups
- **Adaptive Difficulty**: Content adjusts based on your performance
- **Skill Tree**: Visual progression through GTR curriculum

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript (strict mode)
- **Backend**: Convex (real-time reactive database)
- **Authentication**: Clerk
- **3D Graphics**: three.js with @react-three/fiber
- **Math Rendering**: KaTeX (fast LaTeX rendering)
- **UI**: Tailwind CSS + Radix UI
- **State Management**: Zustand + Convex
- **Deployment**: Vercel (frontend) + Convex Cloud (backend)

## 📦 Installation

### Prerequisites

- Node.js 18+ and npm
- Git

### Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/vinit-agr/teach-me-gtr.git
   cd teach-me-gtr
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up Convex**

   ```bash
   npx convex dev
   ```

   Follow the prompts to create a Convex project.

4. **Set up Clerk Authentication**

   - Create a Clerk account at [clerk.com](https://clerk.com)
   - Create a new application
   - Copy your API keys

5. **Configure environment variables**

   Create a `.env.local` file:

   ```env
   NEXT_PUBLIC_CONVEX_URL=<your-convex-url>
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<your-clerk-publishable-key>
   CLERK_SECRET_KEY=<your-clerk-secret-key>
   ```

6. **Run the development server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📚 Curriculum Structure

### Current Concepts (MVP)

1. **The Metric Tensor** (Geometry)
   - Understanding how spacetime curvature is encoded
   - ~45 minutes
   - 150 XP

### Planned Concepts

- Principle of Equivalence (Foundation)
- Geodesics (Geometry)
- Christoffel Symbols (Geometry)
- Riemann Curvature Tensor (Curvature)
- Einstein Field Equations (Field Equations)
- Schwarzschild Solution (Solutions)
- Kerr Metric (Solutions)
- Gravitational Waves (Applications)
- Cosmology (Applications)

## 🎮 How to Play

### 1. Dashboard
- View your progress, streak, and achievements
- See recommended next concepts
- Track XP across three learning tracks

### 2. Start a Concept
- Each concept has three phases you must complete in order
- Earn XP and unlock achievements as you progress

### 3. Phase 1: Intuition
- Explore 3D visualizations
- Manipulate interactive parameters
- Discover patterns to earn XP

### 4. Phase 2: Derivation
- Work through mathematical derivations step-by-step
- Type answers in LaTeX notation
- Use hints when stuck (costs XP)

### 5. Phase 3: Synthesis
- Solve problems applying what you learned
- Make predictions before running simulations
- Connect concepts together

### 6. Master & Progress
- Complete all three phases to master a concept
- Unlock new concepts in the skill tree
- Maintain your learning streak

## 📁 Project Structure

```
teach-me-gtr/
├── app/                          # Next.js app directory
│   ├── (dashboard)/             # Dashboard pages
│   ├── (learning)/              # Learning pages
│   │   └── concept/[conceptId]/ # Dynamic concept routes
│   │       ├── intuition/       # Phase 1
│   │       ├── derivation/      # Phase 2
│   │       └── synthesis/       # Phase 3
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Home page
├── components/                   # React components
│   ├── learning/                # Learning interface components
│   ├── visualizations/          # 3D visualizations (three.js)
│   ├── derivation/              # Derivation components
│   ├── gamification/            # XP, achievements, streaks
│   └── dashboard/               # Dashboard components
├── convex/                       # Convex backend
│   ├── schema.ts                # Database schema
│   ├── users.ts                 # User queries/mutations
│   ├── concepts.ts              # Concept progress
│   └── achievements.ts          # Achievement system
├── data/                         # Static data
│   └── curriculum/              # Concept definitions
│       ├── types.ts             # TypeScript types
│       ├── metricTensor.ts      # First concept
│       └── index.ts             # Curriculum exports
├── lib/                          # Utilities
│   ├── constants/               # XP rewards, etc.
│   ├── store/                   # Zustand stores
│   └── utils/                   # Helper functions
└── public/                       # Static assets
```

## 🧪 Development

### Running Tests

```bash
npm test
```

### Building for Production

```bash
npm run build
```

### Linting

```bash
npm run lint
```

## 🚢 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Convex Deployment

Convex automatically deploys when you push to production:

```bash
npx convex deploy
```

## 📖 Documentation

- [Vision Document](./vision.md) - Project philosophy and goals
- [Design Document](./design.md) - Technical architecture
- [Implementation Plan](./implementation_plan.md) - Development roadmap
- [Gameplay Guide](./gameplay.md) - User flow and mechanics

## 🤝 Contributing

This is currently a personal learning project, but contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Einstein, for the beautiful theory
- The physics education community
- Open source contributors

## 📬 Contact

Vinit Agrawal - [@vinit-agr](https://github.com/vinit-agr)

Project Link: [https://github.com/vinit-agr/teach-me-gtr](https://github.com/vinit-agr/teach-me-gtr)

---

**Happy Learning! 🚀**

*Master Einstein's masterpiece. One geodesic at a time.*

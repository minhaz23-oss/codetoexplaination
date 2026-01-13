# 🚀 Code to Explanation

> **Transform any GitHub repository into a comprehensive, AI-powered architecture explanation in seconds.**

An intelligent web application that analyzes GitHub repositories and generates detailed project documentation, including architecture insights, folder structure breakdowns, route mappings, and implementation guides—all powered by advanced AI.

![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19.2-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat-square&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.0-38B2AC?style=flat-square&logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

---

## ✨ Features

- 🔍 **Intelligent Repository Analysis** - Automatically scans GitHub repos to extract file structure, dependencies, and tech stack
- 🤖 **AI-Powered Explanations** - Uses OpenRouter AI to generate human-readable project documentation
- 📊 **Visual Architecture Breakdown** - Displays folder structure, routes, and implementation details in an intuitive UI
- 🎨 **Modern Glassmorphic UI** - Beautiful, animated interface built with TailwindCSS and GSAP
- ⚡ **Real-time Processing** - Live progress tracking with animated loading states
- 🔐 **GitHub API Integration** - Secure authentication with personal access tokens
- 📱 **Fully Responsive** - Works seamlessly on desktop, tablet, and mobile devices
- 🎯 **Tech Stack Detection** - Automatically identifies frameworks, databases, and tools used in the project

---

## 🎯 Use Cases

- **Onboarding New Developers** - Help team members understand project architecture quickly
- **Code Reviews** - Get a high-level overview before diving into code
- **Documentation Generation** - Automatically create project documentation
- **Learning & Education** - Understand how popular open-source projects are structured
- **Project Planning** - Analyze similar projects to inform your own architecture decisions

---

## 🛠️ Tech Stack

### Frontend
- **[Next.js 16](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - UI library
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[TailwindCSS 4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[GSAP](https://greensock.com/gsap/)** - Professional-grade animation library
- **[Lucide React](https://lucide.dev/)** - Beautiful icon library

### Backend & APIs
- **[OpenRouter AI](https://openrouter.ai/)** - AI model routing for intelligent analysis
- **[Octokit](https://github.com/octokit/octokit.js)** - GitHub REST API client
- **[Zod](https://zod.dev/)** - TypeScript-first schema validation

### UI Components
- **Custom Glassmorphic Components** - Reusable glass-effect UI elements
- **Animated Backgrounds** - Dynamic gradient animations
- **Loading Timelines** - Step-by-step progress indicators

---

## 📦 Installation

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js 18+** (LTS recommended)
- **npm** or **yarn** or **pnpm**
- **GitHub Personal Access Token** ([Setup Guide](#-github-token-setup))
- **OpenRouter API Key** ([Get one here](https://openrouter.ai/))

### Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/codetoexplaination.git
cd codetoexplaination
```

### Step 2: Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### Step 3: Configure Environment Variables

Create a [`.env.local`](.env.local) file in the root directory:

```env
# OpenRouter AI API Key (Required)
OPENROUTER_API_KEY="your_openrouter_api_key_here"

# GitHub Personal Access Token (Required)
GITHUB_TOKEN="your_github_token_here"
```

> ⚠️ **Important**: Never commit your [`.env.local`](.env.local) file to version control. It's already included in [`.gitignore`](.gitignore).

### Step 4: Run the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

---

## 🔑 GitHub Token Setup

To avoid GitHub API rate limits (60 requests/hour for unauthenticated requests), you need a Personal Access Token.

### Quick Setup

1. **Visit GitHub Settings**: [https://github.com/settings/tokens](https://github.com/settings/tokens)
2. **Generate New Token** → Select "Tokens (classic)"
3. **Set Permissions**:
   - ✅ `public_repo` (for public repositories)
   - ✅ `repo` (if you want to analyze private repos)
4. **Copy the Token** (starts with `ghp_...`)
5. **Add to `.env.local`**:
   ```env
   GITHUB_TOKEN="ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
   ```
6. **Restart the Dev Server**

📖 For detailed instructions, see [`GITHUB_TOKEN_SETUP.md`](GITHUB_TOKEN_SETUP.md)

---

## 🚀 Usage

### 1. Enter a GitHub Repository URL

On the homepage, paste any public GitHub repository URL:

```
https://github.com/vercel/next.js
https://github.com/facebook/react
https://github.com/microsoft/vscode
```

### 2. Generate Analysis

Click the **"Generate"** button. The app will:
- Fetch the repository file tree
- Analyze [`package.json`](package.json) for dependencies
- Detect tech stack and frameworks
- Extract routes and API endpoints
- Generate AI-powered explanations

### 3. View Results

The results page displays:
- **Project Overview** - Name, purpose, and description
- **Folder Structure** - Breakdown of key directories
- **Routes & Pages** - Frontend and backend endpoints
- **Tech Stack** - Detected frameworks and tools
- **Implementation Guide** - Features, prerequisites, and deployment info

### 4. Share Results

Click the **"Share"** button to copy the URL and share the analysis with your team.

---

## 📂 Project Structure

```
codetoexplaination/
├── app/                          # Next.js App Router
│   ├── api/                      # API routes
│   │   └── generate/             # Main analysis endpoint
│   │       └── route.ts          # POST handler for repo analysis
│   ├── generate/                 # Results page
│   │   └── page.tsx              # Analysis display UI
│   ├── layout.tsx                # Root layout with fonts
│   ├── page.tsx                  # Homepage with input form
│   └── globals.css               # Global styles & theme
├── components/                   # React components
│   ├── features/                 # Feature-specific components
│   │   ├── diagram-canvas.tsx    # (Future) Interactive diagram
│   │   ├── implementation-guide.tsx  # Implementation details display
│   │   ├── loading-timeline.tsx  # Animated loading steps
│   │   └── project-guide.tsx     # Project overview display
│   └── ui/                       # Reusable UI components
│       ├── animated-background.tsx   # Gradient background animation
│       ├── animated-input.tsx    # Input with icon animation
│       ├── glass-card.tsx        # Glassmorphic card component
│       ├── glow-button.tsx       # Button with glow effect
│       └── tech-stack-badge.tsx  # Tech stack pill badges
├── lib/                          # Core utilities
│   ├── ai.ts                     # OpenRouter AI integration
│   ├── analysis.ts               # Repository analysis logic
│   ├── github.ts                 # GitHub API client (Octokit)
│   └── utils.ts                  # Helper functions (cn, etc.)
├── public/                       # Static assets
├── .env.local                    # Environment variables (not in git)
├── .gitignore                    # Git ignore rules
├── GITHUB_TOKEN_SETUP.md         # GitHub token setup guide
├── next.config.ts                # Next.js configuration
├── package.json                  # Dependencies & scripts
├── postcss.config.mjs            # PostCSS configuration
├── README.md                     # This file
└── tsconfig.json                 # TypeScript configuration
```

---

## 🧩 Key Components

### [`lib/github.ts`](lib/github.ts)
Handles GitHub API interactions using Octokit:
- [`fetchRepoTree()`](lib/github.ts:14) - Retrieves recursive file tree
- [`fetchFileContent()`](lib/github.ts:49) - Fetches specific file contents
- [`parseGitHubUrl()`](lib/github.ts:68) - Extracts owner/repo from URL

### [`lib/analysis.ts`](lib/analysis.ts)
Analyzes repository structure:
- Detects tech stack from [`package.json`](package.json)
- Identifies database schemas (Prisma, SQL)
- Extracts routes (Next.js App Router, Pages Router)
- Maps major directories

### [`lib/ai.ts`](lib/ai.ts)
Generates AI-powered explanations:
- Uses OpenRouter API with GPT-4 models
- Structured JSON output with Zod validation
- Comprehensive prompts for accurate analysis

### [`app/api/generate/route.ts`](app/api/generate/route.ts)
Main API endpoint:
- Validates GitHub URL
- Orchestrates analysis and AI generation
- Returns structured JSON response

---

## 🎨 UI Components

### Glassmorphic Design System

All UI components follow a consistent glassmorphic design:

- **[`<GlassCard />`](components/ui/glass-card.tsx)** - Frosted glass container
- **[`<GlowButton />`](components/ui/glow-button.tsx)** - Button with neon glow effect
- **[`<AnimatedInput />`](components/ui/animated-input.tsx)** - Input with icon animation
- **[`<AnimatedBackground />`](components/ui/animated-background.tsx)** - Dynamic gradient background
- **[`<TechStackBadge />`](components/ui/tech-stack-badge.tsx)** - Pill-shaped tech badges

### Feature Components

- **[`<ProjectGuide />`](components/features/project-guide.tsx)** - Displays project overview, structure, and routes
- **[`<ImplementationGuide />`](components/features/implementation-guide.tsx)** - Shows features, prerequisites, and deployment
- **[`<LoadingTimeline />`](components/features/loading-timeline.tsx)** - Animated step-by-step progress indicator

---

## 🔧 Configuration

### Next.js Config ([`next.config.ts`](next.config.ts))

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Add custom configurations here
};

export default nextConfig;
```

### TailwindCSS Theme ([`app/globals.css`](app/globals.css))

Custom color palette:
```css
--color-neon-blue: #00f3ff;
--color-neon-purple: #bd00ff;
--color-neon-pink: #ff00bd;
```

Custom animations:
- `float` - Smooth up/down floating effect
- `pulse-glow` - Pulsing brightness animation

---

## 🚢 Deployment

### Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/codetoexplaination)

1. **Push to GitHub**
2. **Import to Vercel**
3. **Add Environment Variables**:
   - `OPENROUTER_API_KEY`
   - `GITHUB_TOKEN`
4. **Deploy** 🎉

### Deploy to Other Platforms

This is a standard Next.js app and can be deployed to:
- **Netlify** - Use the Next.js plugin
- **Railway** - Automatic Next.js detection
- **Docker** - Use the official Next.js Docker example
- **Self-hosted** - Run `npm run build && npm start`

---

## 📊 API Reference

### POST `/api/generate`

Analyzes a GitHub repository and generates documentation.

**Request Body:**
```json
{
  "url": "https://github.com/owner/repo"
}
```

**Response:**
```json
{
  "analysis": {
    "stack": ["Next.js", "React", "TailwindCSS"],
    "database": ["Prisma", "PostgreSQL"],
    "stats": {
      "files": 150
    }
  },
  "projectInfo": {
    "name": "Project Name",
    "purpose": "Brief description",
    "description": "Detailed explanation",
    "type": "Web App"
  },
  "structure": {
    "summary": "Overview of code organization",
    "directories": [
      { "name": "app", "description": "Next.js App Router" }
    ]
  },
  "routes": [
    {
      "path": "/",
      "type": "frontend",
      "description": "Homepage",
      "file": "app/page.tsx"
    }
  ],
  "implementation": {
    "features": ["Feature 1", "Feature 2"],
    "prerequisites": ["Node.js 18+"],
    "deployment": "Vercel"
  }
}
```

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Guidelines

- Follow the existing code style
- Write meaningful commit messages
- Add comments for complex logic
- Test your changes thoroughly
- Update documentation as needed

---

## 🐛 Troubleshooting

### Common Issues

**1. GitHub API Rate Limit**
```
Error: API rate limit exceeded
```
**Solution**: Add a GitHub Personal Access Token to [`.env.local`](.env.local) (see [GitHub Token Setup](#-github-token-setup))

**2. OpenRouter API Error**
```
Error: OpenRouter API Error: 401 Unauthorized
```
**Solution**: Verify your `OPENROUTER_API_KEY` in [`.env.local`](.env.local)

**3. Build Errors**
```
Error: Cannot find module '@/lib/...'
```
**Solution**: Ensure all dependencies are installed: `npm install`

**4. Environment Variables Not Loading**
**Solution**: Restart the development server after modifying [`.env.local`](.env.local)

---

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **[Next.js](https://nextjs.org/)** - The React framework for production
- **[OpenRouter](https://openrouter.ai/)** - AI model routing platform
- **[GitHub](https://github.com/)** - Code hosting and API
- **[Vercel](https://vercel.com/)** - Deployment platform
- **[TailwindCSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[GSAP](https://greensock.com/)** - Animation library

---

## 📧 Contact & Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/codetoexplaination/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/codetoexplaination/discussions)
- **Email**: your.email@example.com

---

## 🌟 Star History

If you find this project useful, please consider giving it a ⭐ on GitHub!

---

<div align="center">

**Built with ❤️ using Next.js, TailwindCSS, and AI**

[⬆ Back to Top](#-code-to-explanation)

</div>

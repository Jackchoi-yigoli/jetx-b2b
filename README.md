# JetX B2B Platform

A modern B2B management dashboard for car wash operations, built with Next.js 16, TypeScript, and Tailwind CSS.

## Features

- 📊 Dashboard with real-time KPIs and analytics
- 🏢 Multi-site management and monitoring
- 👥 Customer and operator management
- 💰 Transaction tracking and revenue analytics
- 🔧 Hardware monitoring and alerts
- 📱 Responsive design for all devices

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: Custom reusable components

## Getting Started

### Prerequisites

- Node.js 20+ installed
- npm, yarn, pnpm, or bun package manager

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
src/
├── app/              # Next.js App Router pages
│   ├── sites/        # Sites management page
│   └── transactions/ # Transactions page
├── components/
│   ├── layout/       # Layout components (Sidebar, Topbar, DashboardLayout)
│   └── ui/          # Reusable UI components (Card, KPICard)
```

## Deployment Options

### Option 1: Vercel (Recommended for Next.js)

The easiest and most optimized deployment for Next.js applications.

**Steps:**

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository: `Jackchoi-yigoli/jetx-b2b`
3. Vercel will automatically detect Next.js configuration
4. Click "Deploy"

Your app will be live at `https://jetx-b2b.vercel.app`

**Environment Variables (if needed):**
- Add any environment variables in Vercel dashboard under Settings > Environment Variables

### Option 2: Cloudflare Pages

Deploy your Next.js app on Cloudflare's global network.

**Steps:**

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navigate to Pages > Create a project
3. Connect to Git > Select `jetx-b2b` repository
4. Configure build settings:
   - **Framework preset**: Next.js
   - **Build command**: `npm run build`
   - **Build output directory**: `.next`
5. Click "Save and Deploy"

**Note**: This project includes `@cloudflare/next-on-pages` for Cloudflare compatibility.

### Option 3: AWS Amplify

Deploy to AWS with full control over infrastructure.

**Steps:**

1. Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify/)
2. Click "New app" > "Host web app"
3. Connect to GitHub and select `jetx-b2b` repository
4. Configure build settings:
   ```yaml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm ci
       build:
         commands:
           - npm run build
     artifacts:
       baseDirectory: .next
       files:
         - '**/*'
     cache:
       paths:
         - node_modules/**/*
   ```
5. Click "Save and deploy"

### Option 4: Netlify

Simple deployment with continuous integration.

**Steps:**

1. Go to [Netlify](https://app.netlify.com/start)
2. Import your GitHub repository
3. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
4. Click "Deploy site"

**Create `netlify.toml`:**
```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

## Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## Environment Variables

Create a `.env.local` file for local development:

```env
# Add your environment variables here
# Example:
# NEXT_PUBLIC_API_URL=https://api.example.com
```

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

## Repository

[GitHub Repository](https://github.com/Jackchoi-yigoli/jetx-b2b)

## License

MIT

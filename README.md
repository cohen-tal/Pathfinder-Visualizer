# Pathfinder Visualizer 

## Introduction
After seeing [Clement's](https://github.com/clementmihailescu/Pathfinding-Visualizer) pathfiner app I knew I wanted to implement one myself but using modern frameworks, technologies and design.

Pathfinder Visualizer is an application that aims to help users understand how various pathfinding algorithms work by visualizing them in real time.

## Overview
- Interactive grid for creating obstacles and defining weighted edges connecting the nodes.
- Real-time animations.
- Responsive design, compatible with various screen sizes.

## Available Algorithms
### Pathfinding
1. [Dijkstra's Algorithm](https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm)
2. [A* (A-Star) Algorithm](https://en.wikipedia.org/wiki/A*_search_algorithm)
3. [Bi-Directional A*](https://en.wikipedia.org/wiki/Bidirectional_search)
4. [BFS](https://en.wikipedia.org/wiki/Breadth-first_search)
5. [DFS](https://en.wikipedia.org/wiki/Depth-first_search)

### Maze Generation
1. Recursive Backtracking Algorithm ("Randomized Depth-First search")
2. Randomized Prim Algorithm

## Tech Used
- TypeScript
- React
- Next.js
- TailWindCSS
- Framer Motion


## Getting Started
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

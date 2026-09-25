# hancesoome — Portfolio

A modern, responsive portfolio site showcasing design, development, and support work. Built with React, TypeScript, and Tailwind CSS, with optional Supabase backend for project management.

**For personal use only — Hance Dagondon.**

**[Live site →](https://hancesoome.vercel.app)**

---

## Features

- **Multi-page portfolio** — Home, Work, About, Services, Playground, Contact
- **Project showcase** — Filterable work grid with project modals (cover image, gallery, problem/process/outcome, live links)
- **Dashboard** — Add, edit, and delete projects; required cover photo + optional project images; image uploads via Supabase Storage
- **Contact form** — Mailto-based form (name, email, project type, message)
- **Animations** — Page and component transitions with Motion (Framer Motion)
- **Responsive** — Mobile-first layout with Tailwind CSS
- **Optional backend** — Supabase for projects and images, or local API fallback

---

## Tech stack

| Area        | Stack |
|------------|--------|
| Framework  | React 19, Vite 6 |
| Language   | TypeScript |
| Styling    | Tailwind CSS v4 |
| Routing    | React Router v7 |
| Animation  | Motion (Framer Motion) |
| Icons      | Lucide React |
| Backend    | Supabase (projects, storage) or Express + SQLite fallback |

---

## Getting started

### Prerequisites

- **Node.js** 18+ and npm (or pnpm/yarn)

### 1. Clone and install

```bash
git clone https://github.com/your-username/hance-dagondon-portfolio.git
cd hance-dagondon-portfolio
npm install
```

### 2. Environment variables (optional)

For Supabase (projects + image uploads), create a `.env` in the project root:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

Without these, the app falls back to local API (`/api/projects`, `/api/upload`) when you run the dev server with `npm run dev`.

### 3. Run locally

```bash
# Dev server (Vite + optional Express API)
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) (or the port Vite prints).

### 4. Build for production

```bash
npm run build
npm run preview   # optional: preview production build locally
```

---

## Project structure

```
├── src/
│   ├── components/    # Layout, ProjectModal, etc.
│   ├── pages/         # Home, Work, About, Services, Playground, Contact, Dashboard
│   ├── services/      # Supabase client and project/image APIs
│   ├── lib/            # Supabase config, utilities
│   ├── constants/      # Skills, testimonials, etc.
│   ├── types.ts        # Shared TypeScript types
│   ├── App.tsx         # Routes and app shell
│   └── main.tsx        # Entry point
├── index.html
├── vite.config.ts
├── tailwind.config    # Tailwind v4 (via @tailwindcss/vite)
└── vercel.json        # SPA rewrites for Vercel
```

---

## Scripts

| Command        | Description |
|----------------|-------------|
| `npm run dev`  | Start Vite dev server (and optional API) |
| `npm run build`| Production build (output in `dist/`) |
| `npm run preview` | Serve production build locally |
| `npm run lint` | Type-check with `tsc --noEmit` |

---

## Deployment (Vercel)

The repo is set up for Vercel with SPA rewrites. To deploy:

1. Push to GitHub and import the project in Vercel.
2. Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in Vercel project settings if you use Supabase.
3. Deploy; the live URL will serve the single-page app correctly.

---

## License

This project is for **personal use only** by Hance Dagondon. All rights reserved. Not licensed for redistribution or commercial use by others.

---

*Designed with intention. Built with feeling.*

# BuildPro - Construction Project Management & Site ERP

<div align="center">
  <p><strong>Enterprise construction operations, financial tracking, workforce management, and site intelligence platform.</strong></p>

  [![Next.js](https://img.shields.io/badge/Next.js-16.2-black?style=flat-square&logo=next.js)](https://nextjs.org/)
  [![React](https://img.shields.io/badge/React-19.2-blue?style=flat-square&logo=react)](https://react.dev/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
  [![Supabase](https://img.shields.io/badge/Supabase-Database%20%26%20Auth-3ecf8e?style=flat-square&logo=supabase)](https://supabase.com/)
  [![License](https://img.shields.io/badge/License-MIT-orange?style=flat-square)](LICENSE)
</div>

---

## 🏗️ Overview

**BuildPro** is a modern, high-performance Construction Project Management platform built for project managers, general contractors, site engineers, and financial controllers. It streamlines site operations, tracks multi-billion capital allocations, oversees real-time workforce attendance, monitors material inventories, and delivers actionable project analytics.

---

## 🚀 Key Features & Modules

### 1. Executive Operations Dashboard
- **Site Telemetry Banner**: Real-time operational pulse, weather conditions, safety index (100% compliance tracking), daily attendance rates, and scheduled material deliveries.
- **Top-tier KPI Cards**: Active project counters, multi-site capital allocation meters, on-site workforce numbers, and material stock health with month-over-month trend indicators.
- **Monthly Expense Distribution**: Interactive multi-category spending trends (Materials, Labor, Equipment, Subcontracts) with dynamic timeframe filters (YTD vs. 6-Month view) and custom frosted glass tooltips.
- **Budget Allocation Donut**: High-fidelity Donut visualization with centered portfolio total, interactive slice inspection, and category progress bars.
- **Project Execution & Health**: Dual-view tracker comparing physical construction progress against financial budget burn rates with risk warning flags.
- **Critical Milestones & Deadlines**: Countdown indicators, target handover dates, and task completion metrics.
- **Active Project Portfolio**: Live project directory with instant search, status filter tabs, client tags, and budget utilization gauges.
- **Live Site Activity Feed**: Real-time event log tracking ready-mix concrete dispatches, safety sign-offs, and overtime logs.

### 2. Multi-Project Management
- Full project lifecycle management (Planning, Active, On Hold, Completed).
- Client details, location geotagging, budget allocation, and schedule tracking.
- Dedicated project sub-spaces for Budget, Materials, Workers, Documents, and Reports.

### 3. Financials & Budget Tracking
- Categorized expense logging (Materials, Labor, Equipment, Subcontractor, Permits, Other).
- Real-time budget variance calculation with utilization progress meters and risk warnings.

### 4. Materials & Supply Chain Control
- Track quantities ordered, used, and warehouse stock remaining.
- Automatic low-stock warning threshold alerts and supplier directory.

### 5. Site Workforce & Attendance
- Worker registry with role classifications (Masons, Carpenters, Electricians, Plumbers, Laborers) and wage rates.
- Daily digital attendance marker supporting Present, Absent, Half-Day, and Overtime logs with automatic hour calculations.

### 6. Document & Blueprints Vault
- Secure cloud storage for architectural blueprints, structural engineering drawings, permits, and site photographs.

### 7. Modern Enterprise Design System
- **Dark Enterprise Sidebar**: Collapsible, viewport-locked navigation with categorized sections, badge counts, and active glow indicators.
- **Header Bar**: Omni-search with `⌘K` keyboard shortcut, quick action drawer (`+ New Project`, `+ Log Material`, `+ Record Expense`), and live notification tray.
- **Modern Color Palette**: High-visibility safety orange/amber accents, deep slate elevations, and clean typography.

---

## 🛠️ Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router, Turbopack) |
| **UI Library** | [React 19](https://react.dev/), [shadcn/ui](https://ui.shadcn.com/), [Radix UI](https://www.radix-ui.com/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/), [tw-animate-css](https://www.npmjs.com/package/tw-animate-css) |
| **Data Visualization** | [Recharts](https://recharts.org/) |
| **Icons** | [Lucide React](https://lucide.dev/), [React Icons](https://react-icons.github.io/react-icons/) |
| **Backend / Database** | [Supabase](https://supabase.com/) (PostgreSQL, Row Level Security, Auth, Storage) |
| **Data Fetching** | [TanStack React Query v5](https://tanstack.com/query/latest) |
| **Forms & Validation** | [React Hook Form](https://react-hook-form.com/), [Zod](https://zod.dev/) |

---

## 📁 Directory Structure

```text
construction-pm/
├── app/
│   ├── layout.tsx              # Root HTML & Providers layout
│   ├── page.tsx                # Main Executive Dashboard
│   ├── globals.css             # Tailwind 4 tokens, glassmorphism & scrollbar styles
│   ├── providers.tsx           # React Query & Context providers
│   ├── projects/               # Project listing & creation
│   │   ├── new/                # Create project form
│   │   └── [id]/               # Single project workspace
│   │       ├── budget/         # Budget & expense management
│   │       ├── materials/      # Material inventory & stock
│   │       ├── workers/        # Site workforce & attendance
│   │       ├── documents/      # File attachments & blueprints
│   │       └── reports/        # Project-specific reports
│   └── reports/                # Global portfolio analytics & print reports
├── components/
│   ├── layout/
│   │   ├── dashboard-shell.tsx # Unified app shell wrapper
│   │   ├── sidebar.tsx         # Collapsible dark enterprise sidebar
│   │   ├── header.tsx          # Omni-search, quick actions, notifications
│   │   └── breadcrumbs.tsx     # Route breadcrumbs
│   ├── features/               # Domain-specific chart & list widgets
│   ├── shared/                 # StatCard, PageHeader, StatusBadge
│   └── ui/                     # shadcn/ui primitive components
├── lib/
│   ├── types.ts                # TypeScript interfaces & domain models
│   ├── constants.ts            # Navigation items, status definitions
│   ├── mock-data.ts            # Initial dataset for demonstration
│   ├── utils.ts                # Currency & date formatters, cn helper
│   └── supabase.ts             # Supabase client initialization
└── public/                     # Static assets & icons
```

---

## 🏁 Getting Started

### Prerequisites

Ensure you have the following installed:
* [Node.js](https://nodejs.org/) (version 18.17 or higher)
* [npm](https://www.npmjs.com/), [pnpm](https://pnpm.io/), or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/supunyasanthaofficial/construction-pm.git
   cd construction-pm
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

4. **Run the Development Server:**
   ```bash
   npm run dev
   ```

5. **Open the Application:**
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

---

## ⚙️ Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the Next.js development server with Turbopack |
| `npm run build` | Builds the optimized production application |
| `npm run start` | Runs the compiled production build |
| `npm run lint` | Runs ESLint to check for code quality and errors |

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

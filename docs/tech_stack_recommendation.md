# 🏗️ IndiaQuant Tech Stack Recommendation

> **Goal:** Achieve minimal maintenance overhead across Website, Android, and iOS while ensuring a simple, highly responsive, and performant user experience.

To meet the requirements of minimal maintenance, a true native feel on mobile, and SEO for viral web tools, the **Expo Universal App Architecture (React Native)** is the definitive choice for a solo developer. 

It provides the best of both worlds: a single codebase using React primitives that compiles to truly native UI on iOS/Android and standard DOM elements on the web.

---

## 🚀 The Core Stack: Expo Universal App

| Layer | Technology | Why |
| :--- | :--- | :--- |
| **Universal App** | **Expo Router (React Native)** | iOS + Android + Web from one codebase. File-based routing that compiles to true native mobile apps and static web pages (for SEO). |
| **Styling** | **NativeWind v4 (Tailwind)** | Exact same Tailwind classes on web and native. Huge productivity boost. |
| **UI Components** | **Shadcn (web) + RN UI Lib (native)** | Share business logic but render platform-optimized UI. |
| **Complex Charts** | **Victory Native (Skia)** + **D3.js** | Victory Native uses Skia for 60fps hardware-accelerated charting on mobile. |
| **Data Tables** | **TanStack Table + Virtual** | Handles 10,000+ row holdings tables (lot-level tax reports) without lag. |
| **Server State** | **TanStack Query** | Caching, background refresh, optimistic UI, API deduplication. |
| **Client State** | **Zustand** | Tiny, works perfectly on both web + native without boilerplate. |
| **URL State (Web)**| **Expo Router `useLocalSearchParams` + Zod** | Serializes tool states (e.g., SIP calculator inputs) to the URL for easy sharing. |

## 🔒 Finance & Mobile Specifics (Critical)

| Layer | Technology | Why |
| :--- | :--- | :--- |
| **Financial Math** | **`decimal.js` or `dinero.js`** | JS floating-point math (`0.1 + 0.2 = 0.30000000000000004`) will destroy tax calculations. This is a mandatory safety layer. |
| **CAS PDF Parsing** | **Client-Side (`pdf.js`)** | DO NOT send financial PDFs to a server. Parse them entirely on the device. Massive privacy/trust win, zero server/egress costs, avoids DPDP Act liabilities. |
| **Secure Storage** | **`expo-secure-store`** | Supabase JWTs and broker API keys must be stored in iOS Keychain / Android Keystore. |
| **Fast Local Storage** | **`react-native-mmkv`** | For offline mode caching (Phase 6). 30x faster than Async Storage, synchronous C++ backed. |
| **Privacy** | **`expo-screen-capture`** | Prevent users from taking screenshots of sensitive portfolio screens (standard for banking apps). |
| **PDF Generation** | **`expo-print` (Mobile) / `@media print` (Web)** | Generate Tax and Portfolio PDFs natively. Saves massive server CPU costs and avoids moving user data. |
| **Notifications** | **Expo Notifications** | Critical for "ELSS unlocking" or "LTCG harvesting" time-sensitive alerts. |

## ⚙️ Backend, Data & Infrastructure (Zero-Ops)

| Layer | Technology | Why |
| :--- | :--- | :--- |
| **Backend / DB** | **Supabase (Mumbai) + Postgres** | Standard Postgres handles 35-year EOD data (40M rows) easily with BRIN indexes. TimescaleDB is overkill unless capturing intraday ticks. |
| **Analytics & Data**| **FastAPI + Python (NumPy/Pandas)** | Runs heavy Monte Carlo, factor analysis, and complex XIRR aggregations that shouldn't block the JS thread. |
| **Cache / Queue** | **Upstash Redis (serverless)** | Pay-per-use Redis for rate-limiting NSE/BSE API fetches and hot-caching daily NAVs. |
| **Background Jobs** | **Inngest** | Scheduled jobs (midnight CDSL/NSDL sync, daily NAV sync), and queueing CAS PDF parsing. |
| **Monorepo** | **Turborepo** | Shared types between Python, Supabase, and Expo. Shared UI, cached builds. |
| **CDN / Storage** | **Cloudflare Pages + R2** | Mumbai PoP for fast web delivery, no egress fees for CAS PDF storage (delete after parse). |

## 🛠️ DevOps, Quality & Integrations

| Layer | Technology | Why |
| :--- | :--- | :--- |
| **Mobile CI/CD** | **EAS Build + EAS Update (OTA)** | Ship iOS without a Mac. Push hotfixes to users instantly without waiting for App Store review. |
| **Payments** | **Razorpay** | UPI + cards + EMI, Indian-first payment gateway. |
| **Error Tracking** | **Sentry (universal SDK)** | One dashboard for web + iOS + Android crashes. |
| **Product Analytics** | **PostHog** | Feature flags + funnel analysis (generous free tier). |
| **Email** | **Resend** | Transactional alerts, tax reports, OTPs. |
| **Language** | **TypeScript (strict)** | End-to-end type safety across the entire stack. |
| **Code Quality** | **Biome** | Fast, all-in-one linter and formatter (replaces Prettier + ESLint). |
| **Testing** | **Vitest + Playwright** | Unit testing for math logic + E2E for critical financial flows. |

---

## 🚫 Rejected Options (And Why)

| Rejected Option | Why |
| :--- | :--- |
| **Next.js + Separate React Native** | Two codebases, double maintenance, double bugs, impossible for a solo developer to maintain velocity. |
| **Capacitor** | While great for web developers, it runs the app in a WebView. It lacks the buttery-smooth "true native" feel, gesture handling, and hardware-accelerated charting (Skia) that Expo provides. |
| **Flutter** | Dart is a dead-end language outside of mobile, terrible web SEO for the viral Phase 0 tools, and a poor ecosystem for complex finance charting compared to React/JS. |
| **AWS (EC2/ECS/Lambda)** | Infra management overhead kills solo developer velocity. Supabase + Cloudflare gives you 95% of AWS capability at 10% of the maintenance burden. |
| **Firebase** | NoSQL is fundamentally wrong for financial data. You need relational JOIN queries for lot-level tax calculations and FIFO matching. Postgres is mandatory. |
| **Prisma ORM** | Adds a heavy abstraction layer between you and Postgres. Supabase's auto-generated types + direct SQL/RPC for complex queries is faster and more maintainable. |
| **GraphQL** | Over-engineered for this use case. Supabase's PostgREST API + TanStack Query is simpler, faster to build, and easier to debug. |
| **Redux Toolkit** | Massive boilerplate for state management. Zustand does 95% of what you need in 10% of the code. |
| **Kubernetes** | Operationally complex, expensive, completely unnecessary until 100K+ users. Serverless/PaaS solutions are superior for early stages. |

---

## 💡 Why This Expo Universal Stack Wins

1. **True Native Performance:** Unlike webviews, Expo compiles to actual iOS and Android native components. Scrolling 1,000 portfolio transactions will feel buttery smooth.
2. **One Codebase, Web SEO:** Expo Router now supports static rendering for the web. Your Phase 0 viral tools (Heatmap, SIP Calculator) will index perfectly on Google, while sharing the exact same logic as the mobile app.
3. **Over-The-Air Updates:** EAS Update lets you push bug fixes directly to users' phones without Apple/Google review. Critical for a finance app where a calculation bug needs instant patching.
4. **Zero Backend Maintenance:** By offloading auth, database, and APIs to Supabase, and background jobs to Inngest, you function as a full-stack team of one.

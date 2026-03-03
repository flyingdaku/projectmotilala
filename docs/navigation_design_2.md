<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# can you clarify is it mega menu hover drop down from top vs hub page concpet, how do they tie together, or it either one of these ?

Great question — they are **not alternatives**. They serve completely different users at completely different moments in the journey. Here is the exact mental model:

***

## They Target Two Different Users in Two Different Contexts

```
LOGGED-OUT USER                          LOGGED-IN USER
(Marketing site)                         (Inside the app)
        │                                        │
        ▼                                        ▼
  TOP NAV MEGA MENU                        LEFT SIDEBAR
  "What tools does                         "I know what I want,
   Artha have?"                             let me get to work."
        │                                        │
        ▼                                        ▼
  Hover → See all 25 tools               Click "Analytics"
  organized visually                             │
        │                                        ▼
        ▼                               HUB PAGE loads in
  Click → Land directly                 the main content area
  on that tool page                     "Which analytics tool
  (+ sign-up prompt)                     do I want today?"
```

They never conflict because they live in entirely separate surfaces.

***

## The Mega Menu: For the Logged-Out Marketing Site

This sits in your **public marketing website's top navigation**. Its job is purely **discovery and SEO**.

A first-time visitor who Googled "portfolio backtesting India" lands on your site. They see the top bar and hover over "Tools" or "Analytics":

```
[Artha]   Products ▼   Calculators ▼   Pricing   Learn   [Sign Up]

          ┌──────────────────────────────────────────────────────┐
          │  BACKTESTING              PORTFOLIO ANALYSIS         │
          │  ┄┄┄┄┄┄┄┄┄┄              ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄       │
          │  Asset Allocation  →      Portfolio X-Ray       →    │
          │  Backtest Portfolio →     Factor Analysis       →    │
          │  Dynamic Allocation →     Manager Performance   →    │
          │                                                      │
          │  TAX TOOLS                CALCULATORS               │
          │  ┄┄┄┄┄┄┄┄┄              ┄┄┄┄┄┄┄┄┄┄┄               │
          │  Tax Harvesting    →      SIP Calculator        →    │
          │  Direct vs Regular →      FIRE Calculator       →    │
          │  LTCG/STCG Report  →      Goal Planner          →    │
          └──────────────────────────────────────────────────────┘
```

Each item links to a **dedicated SEO-optimised page** for that tool — Google crawls every one of these links and understands Artha covers all 25 use cases. This is purely a logged-out, marketing, and SEO surface. **It disappears once the user logs in.**

***

## The Hub Page: For the Logged-In App User

Once the user is inside the app, the top mega menu is gone. The experience shifts to the left sidebar workbench. The Hub Page is what loads **in the main content area** when the user clicks a top-level sidebar category.

Think of it like this: **the sidebar is the chapter list; the Hub Page is the chapter's table of contents.**

```
LEFT SIDEBAR          │   MAIN CONTENT AREA (Hub Page loads here)
──────────────────────┼──────────────────────────────────────────
                      │
  Dashboard           │   ┌─── Analytics & Backtesting ─────────┐
  Portfolio           │   │                                      │
▶ Analytics  ← click  │   │  [Asset Allocation]  [Backtest Port] │
  Tax                 │   │  Test macro blends   Test your funds │
  Goals               │   │                                      │
                      │   │  [Dynamic Alloc]     [Manager Perf]  │
                      │   │  Market-timing       Alpha vs index  │
                      │   │                                      │
                      │   │  [Rolling Returns]   [Correlation]   │
                      │   │  Check consistency   Find overlap    │
                      │   └──────────────────────────────────────┘
```

The Hub Page does two things the sidebar link list cannot:

- It **shows** what each tool does in 5 words — the sidebar label "Backtest Dynamic Allocation" means nothing to a new user; the card with a subtitle makes it immediately clear
- It **surfaces tools the user didn't know existed**, increasing feature adoption and session depth

***

## When You Are Inside a Tool

Once the user clicks a specific tool card (say, "Backtest Portfolio"), the Hub Page is replaced by the tool's full workspace. At this point, a small **sub-tab bar** appears at the top of the workspace to let them jump between related tools without going back to the Hub Page:

```
Analytics  ›  Backtesting

[Asset Allocation]  [Backtest Portfolio ●]  [Dynamic Allocation]  [Manager Performance]
```

This is the third and final navigation layer — contextual tool-switching within a category. It is the equivalent of browser tabs within a single app section.

***

## The Complete Three-Layer System

| Layer | Surface | Who Sees It | Job |
| :-- | :-- | :-- | :-- |
| **Mega Menu** | Top nav, marketing site | Logged-out visitors | Discovery, SEO, first impressions |
| **Left Sidebar** | App shell, always visible | Logged-in users | Workflow orientation, "where am I?" |
| **Hub Page** | Main content area | Logged-in users, on category click | Feature discovery, tool selection |
| **Sub-tabs** | Top of workspace | Logged-in users, inside a tool | Quick switching between related tools |

Each layer handles one job only. Nothing overlaps. The user is never overwhelmed because at any given moment, they only see the layer relevant to their context.


You have hit on the exact edge case where standard advice breaks down. When a category has exactly 5–6 items, it occupies a frustrating middle ground: 
- It’s too many items to leave flat in the main sidebar (6 categories × 5 items = 30 items = cognitive overload).
- But it’s too *few* items to justify a full Hub Page (a Hub Page with only 5 cards looks empty and forces an unnecessary click).

Here is the 2025/2026 UX consensus on how to handle the "5-6 item" problem, specifically for data-heavy SaaS products.

***

### The Solution: The "Accordion + Subtext" Sidebar

Instead of a Hub page or a flying pop-out menu, you use a **Two-Tier Accordion Sidebar**, but with a modern twist: **Inline Descriptions**.

If you just list 5 tool names in an accordion, users still don't know what they do. But since you only have 5 items, you actually have enough vertical space to include a 1-liner description *directly inside the sidebar* when the accordion is expanded.

#### Visualizing the Interaction

**State 1: Collapsed (Clean & Scannable)**
```text
[Artha Logo]

  Dashboard
▶ Portfolio
▶ Analytics & Tools
  Tax Planning
  Goals
```

**State 2: User clicks "Analytics & Tools" (The Accordion Opens)**
```text
[Artha Logo]

  Dashboard
▶ Portfolio
▼ Analytics & Tools

    Asset Allocation
    Test macro asset blends across time
    
    Backtest Portfolio
    Test specific mutual funds and stocks
    
    Dynamic Allocation
    Market-timing and moving average models
    
    Manager Performance
    Analyze alpha vs index benchmarks
    
    Rolling Returns
    Check consistency over 3Y/5Y periods

▶ Tax Planning
  Goals
```

### Why This is Psychologically Superior for Your Specific App

1. **Eliminates the "Empty Room" Problem:** As you noted, a Hub Page with only 5 items feels like a waste of a click. The accordion keeps the user on their current screen while exposing the sub-tools. [eleken](https://www.eleken.co/blog-posts/accordion-ui)
2. **Contextual Learning:** By putting the 1-liner description directly under the tool name (in a smaller, muted font, e.g., `text-xs text-slate-400`), you teach the user what the tool does without forcing them to click it first. [linkedin](https://www.linkedin.com/pulse/saas-ux-series-8-essential-elements-sidebar-design-srikanth-kalakonda)
3. **Optimized for 5-6 Items:** If you had 15 items, an accordion with descriptions would require endless scrolling (bad UX). Because you *only* have 5-6 items, the expanded accordion pushes the lower categories down perfectly without breaking the viewport. [linkedin](https://www.linkedin.com/pulse/saas-ux-series-8-essential-elements-sidebar-design-srikanth-kalakonda)
4. **Maintains F-Pattern Scanning:** Users scan down the left edge. When the accordion opens, they just keep scanning down. If you used a "Flyout" menu (where hovering opens a menu to the right), it breaks the vertical scanning pattern and requires annoying mouse precision. [linkedin](https://www.linkedin.com/posts/vitalyfriedman_top-vs-side-navigation-in-complex-products-activity-7388137161138581504-wS50)

***

### Implementation Details (Crucial for it to feel Premium)

To make this feel like a modern, premium tool (and not a clunky 2010s WordPress menu), you must implement these UI details:

- **The Indentation:** The sub-items must be indented (e.g., `pl-8` or `ml-6`) to clearly show they are children of the main category. Add a subtle vertical connecting line (1px solid `--border`) on the left of the child items to anchor them visually.
- **The Typography Hierarchy:**
  - Category Name: `font-medium text-sm text-primary`
  - Sub-Tool Name: `font-medium text-sm text-primary`
  - Sub-Tool Description: `font-normal text-xs text-muted leading-tight`
- **The Active State:** When a user is currently using "Backtest Portfolio", that specific sub-item in the sidebar should be highlighted with your Amber accent (e.g., `bg-amber-500/10 border-l-2 border-amber-500 text-amber-600`), and the parent accordion must remain open.
- **Auto-Collapse (Optional but recommended):** If they open the "Tax" accordion, automatically close the "Analytics" accordion. This is called a "mutually exclusive accordion" and it ensures the sidebar never gets so long that a scrollbar appears. [salsa](https://salsa.digital/insights/accordion-ui-design-examples-inspiration-tips-and-best-practices)

### What Happens to the Mega Menu?
The strategy from the previous step remains exactly the same. 
- **Logged Out:** Top Mega Menu (for SEO and marketing).
- **Logged In:** Left Sidebar with Accordions + Descriptions (for fast, contextual workflow). 

You have correctly identified that a Hub Page is overkill for 5 items. The Accordion + Subtext pattern is the most elegant, frictionless way to handle this specific density of information.
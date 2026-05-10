# PluginBox Architecture Guide

## Overview

PluginBox is a **performance-optimized**, **type-safe** Telegram Mini App built with modern React patterns and Telegram-specific integrations.

## Core Principles

### 1. **Single Responsibility**
Each component has ONE clear purpose:
- `Button.tsx` → Interactive button with haptic feedback
- `Dropdown.tsx` → Dropdown menu with animations
- `Hub.tsx` → Main hub screen logic and layout

### 2. **Composition Over Inheritance**
- Base UI components (`Button`, `Card`, `Dropdown`) are composable
- Views combine these to create screens
- No class-based components (all functional)

### 3. **Context-Based State Management**
- `AppContext` handles global state
- Navigation, user data, Telegram integration
- Avoids prop drilling

### 4. **Type-Safe Development**
- Full TypeScript coverage
- Custom types in `src/types/index.ts`
- No `any` types (strict mode enabled)

## State Management Flow

```
AppProvider (contexts/AppContext.tsx)
├── Navigation State
│   ├── activeTab: "hub" | "store" | "socket"
│   ├── showSettings: boolean
│   └── storeView: "plugins" | "developers"
├── User State
│   └── userData: UserData
└── Telegram Integration
    ├── tg: TelegramWebApp
    └── hapticFeedback: (type) => void
```

### Reading State
```tsx
const { activeTab, setActiveTab, userData } = useApp();
```

### Updating State
```tsx
setActiveTab("store");
hapticFeedback("light");
```

## Component Hierarchy

### UI Components (Reusable)
```
Button
  ├── variant: "primary" | "secondary" | "ghost"
  ├── size: "sm" | "md" | "lg"
  └── haptic: boolean (default: true)

Card
  ├── variant: "glass" | "surface" | "outlined"
  ├── clickable: boolean
  └── onClick: () => void

Dropdown
  ├── options: DropdownOption[]
  ├── value: string
  ├── onChange: (value) => void
  └── icon?: ReactNode

SearchInput
  ├── placeholder: string
  ├── value: string
  ├── onChange: (e) => void
  └── icon?: ReactNode

Avatar
  ├── src?: string (image URL)
  ├── fallback: string (initials)
  ├── size: "sm" | "md" | "lg"
  └── status?: "online" | "idle" | "offline"

TabBar
  └── Uses TABS_CONFIG from constants
```

### View Components (Full-screen)
```
Hub
├── Welcome section
├── Search input
├── Filter dropdown (Dropdown component)
├── Plugins grid (extensible)
└── Empty state

Store
├── Header with view tabs
├── Search input
├── Plugins/Developers view
│   ├── Plugin cards
│   └── Developer cards
└── Empty states

Socket
├── Add socket form
├── Active connections list
└── Terminal logs (extensible)

Settings
├── Profile section
├── Preferences
├── Theme selector
├── About section
└── Danger zone (logout)
```

## Animation Strategy

### Entry Animations (Initial Load Only)
```tsx
useEffect(() => {
  setIsInitialRender(false); // Disable after first render
}, []);

// Only animate on initial render
{isInitialRender ? (
  <motion.h1 initial={{...}} animate={{...}}>
    Привет!
  </motion.h1>
) : (
  <h1>Привет!</h1>
)}
```

### Page Transitions
```tsx
<AnimatePresence mode="wait">
  {activeTab === "hub" && <Hub />}
  {activeTab === "store" && <Store />}
</AnimatePresence>
```
Uses simple fade (no slide) to keep UX smooth.

### Interaction Feedback
```tsx
// Spring animation for dropdown opens
transition={ANIMATION.easing.spring}

// Instant haptic on every interaction
onClick={() => hapticFeedback("light")}
```

## Data Flow Example: User Selects Filter

```
1. User clicks filter dropdown
   ↓
2. toggleDropdown() called
   - Haptic feedback: "light"
   - setIsFilterOpen(true)
   ↓
3. Dropdown animates open (spring easing)
   ↓
4. User selects filter option
   ↓
5. handleSelect() called
   - setActiveFilter(value)
   - setIsFilterOpen(false)
   - Haptic feedback: "selection"
   ↓
6. Selected option updates immediately
   Layout animation handles position smoothly
```

## Telegram Integration

### Initialization (in AppContext)
```tsx
useEffect(() => {
  const tg = window.Telegram?.WebApp;
  tg.ready(); // Signal to Telegram
  tg.setBackgroundColor("#0a0a0a");
  
  // Get user data
  const user = tg.initDataUnsafe?.user;
  setUserData({...});
}, []);
```

### Header Color Changes
```tsx
useEffect(() => {
  if (showSettings) {
    tg.setHeaderColor("#0a0a0a");
  } else if (activeTab === "hub") {
    tg.setHeaderColor("#131313");
  }
}, [activeTab, showSettings, tg]);
```

### Haptic Feedback Wrapper
```tsx
const hapticFeedback = (type: "light" | "medium" | "selection") => {
  if (tg?.HapticFeedback) {
    if (type === "selection") {
      tg.HapticFeedback.selectionChanged();
    } else {
      tg.HapticFeedback.impactOccurred(type);
    }
  }
};
```

## Styling Approach

### Design Tokens (constants/index.ts)
```tsx
export const COLORS = {
  background: "#0a0a0a",
  text: {
    primary: "#ffffff",
    secondary: "rgba(255, 255, 255, 0.6)",
  }
};

export const ANIMATION = {
  easing: {
    spring: { type: "spring", stiffness: 350, damping: 28 },
  },
  duration: {
    standard: 300,
  }
};
```

### Tailwind + CSS Variables
```css
:root {
  --glass-blur: blur(30px);
  --glass-border: 1px solid rgba(255, 255, 255, 0.08);
}

.glass-effect {
  background: var(--glass-bg);
  backdrop-filter: var(--glass-blur);
}
```

### Component Styling
```tsx
// Use cn() utility for class composition
className={cn(
  "px-4 py-2 rounded-full",
  variant === "primary" && "bg-white text-black",
  className // Allow overrides
)}
```

## Error Boundaries & Resilience

### Telegram Integration Fallback
```tsx
const hapticFeedback = (type) => {
  if (tg?.HapticFeedback) { // Check existence
    tg.HapticFeedback.impactOccurred(type);
  }
  // Silently fails if unavailable
};
```

### Image Loading
```tsx
const iconPath = `${tab.icon}${getCacheParam(tab.id)}`;
// Cache parameter prevents stale assets
```

## Performance Optimizations

1. **Animations Only on Init**
   - Initial animations play once
   - Page transitions use simple fade
   - No continuous re-renders

2. **Image Optimization**
   - Cache parameters for cache-busting
   - `loading="lazy"` on images
   - Remote patterns in Next config

3. **CSS Purging**
   - Tailwind removes unused styles
   - CSS bundle ~20KB gzipped

4. **Code Splitting**
   - Next.js automatic route splitting
   - Views only load when needed

5. **Layout Stability**
   - Fixed layout prevents CLS
   - Consistent spacing with Tailwind

## Extensibility Examples

### Adding a New View

1. Create `src/components/views/NewView.tsx`
```tsx
export const NewView = () => {
  const { /* context */ } = useApp();
  return <div>...</div>;
};
```

2. Add to `ViewType` in `src/types/index.ts`
```tsx
export type ViewType = "hub" | "store" | "socket" | "new";
```

3. Add to `TABS_CONFIG` in `src/constants/index.ts`
```tsx
{ id: "new", icon: "/Icons/New.PNG", label: "New" }
```

4. Import and render in `src/app/page.tsx`
```tsx
{activeTab === "new" && <NewView />}
```

### Adding a New UI Component

1. Create `src/components/ui/NewComponent.tsx`
2. Export from component
3. Use in views: `<NewComponent prop={value} />`

### Adding Global State

1. Add to `AppContextType` interface
2. Add state with `useState` in `AppProvider`
3. Expose via context value
4. Access with `useApp()`

## Testing Strategy

### Unit Tests (Components)
```tsx
describe("Button", () => {
  it("calls haptic feedback on click", () => {
    // Mock Telegram API
    // Verify haptic call
  });
});
```

### Integration Tests (Flows)
```tsx
describe("Filter Selection", () => {
  it("updates active filter and closes dropdown", () => {
    // Render Hub
    // Click dropdown
    // Select option
    // Verify state updated
  });
});
```

### Visual Regression
- Screenshot tests for screens
- Animation frame verification

## Deployment Checklist

- [ ] All types are checked (`npm run type-check`)
- [ ] No console errors or warnings
- [ ] Images optimized and cached properly
- [ ] Telegram script loaded in layout
- [ ] Environment variables set
- [ ] Mobile responsive verified
- [ ] Haptic feedback works
- [ ] Analytics integrated (if needed)

## Future Enhancements

1. **Real Data**
   - Connect to backend API
   - Plugin list from database
   - User authentication

2. **Advanced Features**
   - Plugin ratings & reviews
   - Developer profiles
   - Real socket management

3. **Analytics**
   - Track user interactions
   - Monitor performance
   - Error reporting

4. **Accessibility**
   - Screen reader testing
   - Keyboard navigation
   - High contrast mode

5. **Offline Support**
   - Service worker
   - Cache first strategy
   - Offline fallbacks

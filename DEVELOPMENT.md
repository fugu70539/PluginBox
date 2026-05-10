# Development Guide for PluginBox

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000
```

## Code Style & Conventions

### Component Structure
```tsx
"use client"; // Always add for interactive components

import React, { useState } from "react";
import { useApp } from "@/contexts/AppContext";
import { Button } from "@/components/ui/Button";

// Named export by default (for tree-shaking)
export const ComponentName = () => {
  const { state } = useApp();
  
  return <div>Content</div>;
};
```

### Naming Conventions
- **Components**: PascalCase (`Hub.tsx`, `Button.tsx`)
- **Functions**: camelCase (`handleClick`, `formatDate`)
- **Constants**: UPPER_SNAKE_CASE (`COLORS`, `ANIMATION`)
- **Types**: PascalCase (`UserData`, `ViewType`)
- **Files**: Match component name or kebab-case for utilities

### Import Order
```tsx
// 1. React/Next
import React, { useState } from "react";

// 2. Third-party
import { motion } from "framer-motion";

// 3. Internal (absolute imports with @/)
import { useApp } from "@/contexts/AppContext";
import { Button } from "@/components/ui/Button";

// 4. Styles
import styles from "./Component.module.css"; // if using
```

## Common Patterns

### Using Global State
```tsx
export const MyComponent = () => {
  const { activeTab, setActiveTab, hapticFeedback } = useApp();

  const handleChange = () => {
    hapticFeedback("light");
    setActiveTab("store");
  };

  return (
    <button onClick={handleChange}>
      Go to Store ({activeTab})
    </button>
  );
};
```

### Animation with Framer Motion
```tsx
import { motion, AnimatePresence } from "framer-motion";
import { ANIMATION } from "@/constants";

export const Card = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileTap={{ scale: 0.95 }}
        transition={ANIMATION.easing.spring}
      >
        Click me
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 200 }}
          >
            Content
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
```

### Creating New UI Component
```tsx
"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface MyComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
}

export const MyComponent = React.forwardRef<
  HTMLDivElement,
  MyComponentProps
>(({ className, variant = "primary", size = "md", disabled, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "rounded-full transition-all duration-200",
        variant === "primary" && "bg-white text-black",
        variant === "secondary" && "bg-white/10 text-white",
        size === "sm" && "px-3 py-2",
        size === "md" && "px-4 py-2.5",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      {...props}
    />
  );
});

MyComponent.displayName = "MyComponent";
```

### Handling Telegram User Data
```tsx
useEffect(() => {
  const tg = (window as any).Telegram?.WebApp;
  if (tg) {
    const userInfo = tg.initDataUnsafe?.user;
    if (userInfo?.first_name) {
      setUserName(userInfo.first_name);
    }
  }
}, []);
```

### Cache-Busting Images
```tsx
import { getCacheParam } from "@/lib/utils";

<img
  src={`/Icons/MyIcon.PNG${getCacheParam("myicon")}`}
  alt="My Icon"
/>
```

## Debugging Tips

### Enable React DevTools
```bash
npm run dev
# Then use React DevTools browser extension
```

### Check Telegram WebApp Availability
```tsx
console.log("Telegram available:", !!window.Telegram?.WebApp);
console.log("User data:", window.Telegram?.WebApp?.initDataUnsafe?.user);
```

### Monitor State Changes
```tsx
const { state } = useApp();

useEffect(() => {
  console.log("State updated:", state);
}, [state]);
```

### Animation Performance
- Use DevTools Performance tab to measure jank
- Avoid heavy computations in render
- Use `requestAnimationFrame` for smooth animations

## Adding Features

### Feature: Plugin Ratings

1. **Create Type** (`src/types/index.ts`)
```tsx
export interface PluginRating {
  pluginId: string;
  userId: string;
  score: number; // 1-5
  comment: string;
}
```

2. **Create Component** (`src/components/ui/Rating.tsx`)
```tsx
export const Rating = ({ score, onChange }: RatingProps) => {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <button
          key={i}
          onClick={() => onChange(i)}
          className={i <= score ? "text-yellow-400" : "text-white/20"}
        >
          ★
        </button>
      ))}
    </div>
  );
};
```

3. **Use in Plugin Card**
```tsx
<Rating score={plugin.rating} onChange={handleRate} />
```

4. **Add to Context** (if global)
```tsx
// In AppContext
const [userRatings, setUserRatings] = useState<PluginRating[]>([]);
```

### Feature: Search with Debounce

```tsx
import { useEffect, useState } from "react";

const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};

// Usage
const [searchQuery, setSearchQuery] = useState("");
const debouncedQuery = useDebounce(searchQuery, 300);

useEffect(() => {
  if (debouncedQuery) {
    // Perform search API call
  }
}, [debouncedQuery]);
```

## API Integration

### Setting Up API Client
```tsx
// src/lib/api.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export const api = {
  async getPlugins() {
    const res = await fetch(`${API_URL}/api/plugins`);
    return res.json();
  },

  async installPlugin(id: string) {
    const res = await fetch(`${API_URL}/api/plugins/${id}/install`, {
      method: "POST",
    });
    return res.json();
  },
};
```

### Using in Component
```tsx
import { api } from "@/lib/api";

const [plugins, setPlugins] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  api
    .getPlugins()
    .then(setPlugins)
    .finally(() => setLoading(false));
}, []);

if (loading) return <div>Loading...</div>;

return plugins.map((p) => <PluginCard key={p.id} plugin={p} />);
```

## Environment Variables

Create `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_TELEGRAM_BOT_USERNAME=@your_bot
```

Use in code:
```tsx
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
```

## Testing

### Run Tests
```bash
npm test
```

### Write a Test
```tsx
// __tests__/components/Button.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "@/components/ui/Button";

describe("Button", () => {
  it("renders with correct text", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("handles click events", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    fireEvent.click(screen.getByText("Click"));
    expect(handleClick).toHaveBeenCalled();
  });
});
```

## Performance Profiling

### Bundle Analysis
```bash
npm run build
# Check .next/static for sizes
```

### Runtime Performance
```tsx
import { useCallback, useMemo } from "react";

// Optimize expensive computations
const memoizedValue = useMemo(() => expensiveFunction(), [deps]);

// Prevent unnecessary function re-creations
const memoizedCallback = useCallback(() => {
  // Do something
}, [deps]);
```

## Common Issues & Solutions

### Issue: Styles not applying
**Solution**: Clear cache and rebuild
```bash
rm -rf .next
npm run build
```

### Issue: Telegram WebApp not defined
**Solution**: Check if script is loaded in layout
```html
<script src="https://telegram.org/js/telegram-web-app.js"></script>
```

### Issue: Images won't load
**Solution**: Add domain to next.config
```tsx
remotePatterns: [
  { protocol: "https", hostname: "example.com" }
]
```

### Issue: Animations cause jank
**Solution**: Use `will-change` and hardware acceleration
```css
.animated {
  will-change: transform, opacity;
  transform: translateZ(0);
}
```

## Git Workflow

```bash
# Create feature branch
git checkout -b feature/my-feature

# Make changes, commit
git add .
git commit -m "feat: add my feature"

# Push and create PR
git push origin feature/my-feature
```

### Commit Message Format
```
feat: add new rating component
fix: fix dropdown animation lag
docs: update README
refactor: simplify Hub component
style: update color palette
test: add button tests
chore: update dependencies
```

## Useful Links

- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [Framer Motion](https://www.framer.com/motion/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Telegram WebApp API](https://core.telegram.org/bots/webapps)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## Getting Help

1. Check existing GitHub issues
2. Review ARCHITECTURE.md for design patterns
3. Look at similar components for examples
4. Ask in team chat or create a discussion

Happy coding! 🚀

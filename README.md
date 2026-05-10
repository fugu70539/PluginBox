# PluginBox - Premium Telegram Mini App

A beautifully designed Telegram Mini App for discovering, managing, and rating plugins that work inline within Telegram chats.

## 🎨 Design Philosophy

- **Ultra-Minimalist**: Deep obsidian backgrounds with subtle glassmorphism effects
- **Web3 Aesthetic**: Professional developer-centric interface
- **Smooth UX**: Fluid animations only on initial load, minimal motion on navigation
- **Responsive**: Optimized for mobile-first design with 44px+ touch targets

## 🏗️ Project Structure

```
src/
├── app/                      # Next.js app router
│   ├── page.tsx             # Main page with router
│   ├── layout.tsx           # Root layout with providers
│   └── globals.css          # Global styles
├── components/
│   ├── ui/                  # Reusable UI components
│   │   ├── Button.tsx       # Primary button component
│   │   ├── Card.tsx         # Card wrapper
│   │   ├── Dropdown.tsx     # Dropdown menu
│   │   ├── Avatar.tsx       # User avatar
│   │   ├── SearchInput.tsx  # Search field
│   │   └── TabBar.tsx       # Bottom navigation
│   └── views/               # Full-screen views
│       ├── Hub.tsx          # Main hub with recommendations
│       ├── Store.tsx        # Plugin marketplace
│       ├── Socket.tsx       # Developer workspace
│       └── Settings.tsx     # User settings
├── contexts/
│   └── AppContext.tsx       # Global state & Telegram integration
├── types/
│   └── index.ts             # TypeScript type definitions
├── constants/
│   └── index.ts             # App constants, colors, animations
└── lib/
    └── utils.ts             # Helper functions
```

## 🎯 Key Features

### 1. **Hub Screen**
- User greeting with avatar & status
- Search functionality
- Filter dropdown with smooth animations
- Recommendations grid (extensible)

### 2. **Store Screen**
- Plugin discovery view
- Developer profiles view
- Search & filtering
- Install/open buttons

### 3. **Socket (Workshop) Screen**
- Manage WebSocket connections
- Add/remove sockets
- Real-time connection status
- Terminal-like logs (extensible)

### 4. **Settings Screen**
- Profile management
- Notification toggles
- Theme selection
- Account information
- Logout functionality

### 5. **Global Navigation**
- Bottom tab bar with icons & labels
- Smooth tab transitions
- Haptic feedback on interactions
- Settings modal overlay

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open `http://localhost:3000` in your browser (or use Telegram's preview)

## 🎨 Styling System

### Colors
- **Background**: `#0a0a0a` (deep obsidian)
- **Surface**: `#131313` (elevated surfaces)
- **Glass**: `rgba(255, 255, 255, 0.08)` with blur
- **Text**: White with opacity variations for hierarchy

### Animation Easing
- **Spring**: `stiffness: 350, damping: 28` (snappy, responsive)
- **Snappy**: `stiffness: 400, damping: 30` (more responsive)
- **Duration**: 
  - Short: 150ms
  - Standard: 300ms
  - Medium: 400ms
  - Long: 500ms

### Components Use

#### Dropdown (from Store version)
```tsx
<Dropdown
  options={[{ value: "all", label: "All" }]}
  value={activeFilter}
  onChange={setActiveFilter}
  label="Filter"
/>
```

#### Button
```tsx
<Button variant="primary" size="md" onClick={handleClick}>
  Action
</Button>
```

#### Card
```tsx
<Card variant="glass" clickable>
  Content
</Card>
```

## 🔧 Telegram Integration

The app uses Telegram WebApp API for:

1. **Initialization**
   - `tg.ready()` - Signal readiness
   - `tg.setHeaderColor()` - Dynamic header coloring
   - `tg.setBackgroundColor()` - Background theming

2. **User Data**
   - `tg.initDataUnsafe.user` - Get user info
   - Automatically synced to context

3. **Haptic Feedback**
   - Light impact on buttons
   - Selection change on navigation
   - Wrapper in `useApp().hapticFeedback()`

## 📱 Mobile Optimization

- Fixed layout prevents scroll jank
- Safe area insets for notches
- Large touch targets (44x44px minimum)
- Optimized for Telegram's constraints

## 🎬 Animation Strategy

- **Initial Load**: Full entrance animations (opacity, position)
- **Navigation**: Minimal transitions (fade only)
- **Interactions**: Quick feedback (scale, haptic)
- **Disabled on Reduce Motion**: System preference respected

## 📦 Dependencies

- **Next.js 14**: React framework
- **React 18**: UI library
- **Framer Motion**: Animation library
- **Tailwind CSS**: Utility-first styling
- **TypeScript**: Type safety

## 🔐 Type Safety

All components are fully typed with TypeScript. Check `src/types/index.ts` for:
- `ViewType` - App screen types
- `Plugin` - Plugin data structure
- `Developer` - Developer profile
- `TelegramWebApp` - Telegram API types

## 🎯 Best Practices

1. **Use Context** - Access app state via `useApp()`
2. **Reuse Components** - Don't repeat UI code
3. **Type Everything** - Leverage TypeScript
4. **Constants** - Use `COLORS`, `ANIMATION` from constants
5. **Haptic Feedback** - Always provide tactile feedback
6. **Accessibility** - Semantic HTML, proper ARIA labels

## 📊 File Size

- Bundle: ~150KB (gzipped)
- CSS: ~20KB (Tailwind purged)
- Optimized for slow networks

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
# Push to GitHub, auto-deploy on Vercel
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Self-hosted
```bash
npm run build
npm start
```

Set `NEXT_PUBLIC_APP_URL` environment variable for production.

## 🐛 Troubleshooting

### Telegram WebApp not initializing?
- Ensure script is loaded: `<script src="https://telegram.org/js/telegram-web-app.js"></script>`
- Check browser console for errors
- Verify `tg.ready()` is called

### Styles not applying?
- Clear Tailwind cache: `rm -rf .next`
- Rebuild: `npm run build`
- Check `tailwind.config.ts` paths

### Images not loading?
- Add domain to `next.config.mjs` remotePatterns
- Check `publicPath` in build

## 📄 License

Private - All rights reserved

## 👥 Contributing

Internal project - No external contributions

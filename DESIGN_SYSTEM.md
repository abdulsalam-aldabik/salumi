# Portfolio Design System - Quick Reference

## 🎨 Color System

### Primary Colors
```css
--primary: #1a1f36 (Navy Blue)
--accent: #00d4ff (Cyan)
--background: #ffffff (White)
```

### Color Variants
```css
--primary-dark: #131829
--primary-light: #2a3f56
--accent-dark: #00b8e6
--accent-light: #33ddff
--accent-glow: rgba(0, 212, 255, 0.3)
```

### Usage in Components
```jsx
className="bg-[#1a1f36] text-[#00d4ff]"
className="hover:bg-[#00b8e6]"
```

---

## 📐 Spacing System (8px base unit)

### Section Padding
```jsx
className="py-20 md:py-32 px-4"
// or use utility class:
className="section-container"
```

### Component Spacing
```jsx
// Cards
className="p-6 md:p-8"

// Buttons
className="px-6 py-3 md:px-8 md:py-4"

// Grids
className="gap-6 md:gap-8 lg:gap-10"
```

---

## 🎯 Component Classes

### Cards (Use Everywhere!)
```jsx
// Basic card
<Card className="card-base" />

// Card with gradient border
<Card className="card-gradient" />

// Manual classes
<Card className="bg-white border-2 border-gray-100 hover:border-accent/30 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2" />
```

### Buttons
```jsx
// Primary button
<button className="btn-primary">Click Me</button>

// Secondary button
<button className="btn-secondary">Click Me</button>

// Ghost button
<button className="btn-ghost">Click Me</button>
```

### Badges
```jsx
// Default badge
<Badge className="badge">React</Badge>

// Primary badge
<Badge className="badge-primary">AI/ML</Badge>

// Featured badge
<Badge className="badge-featured">Featured</Badge>
```

### Gradient Text
```jsx
<h1 className="gradient-text">Abdul Salam Aldabik</h1>
<h2 className="gradient-text-animated">Animated Title</h2>
```

---

## ✨ Animation System

### Transition Durations
```jsx
duration-200  // Fast - hover states (200ms)
duration-300  // Normal - button clicks (300ms)
duration-500  // Medium - card movements (500ms)
duration-800  // Slow - section reveals (800ms)
```

### Framer Motion Variants
```jsx
// Section fade in
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

// Stagger container
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};
```

### Common Animations
```jsx
// Hover lift
className="hover:-translate-y-2 transition-all duration-500"

// Scale on hover
className="hover:scale-105 transition-transform duration-300"

// Glow effect
className="hover:shadow-[0_0_30px_rgba(0,212,255,0.3)]"
```

---

## 🖼️ Visual Effects

### Shadows
```jsx
shadow-sm     // Subtle elevation
shadow-lg     // Default cards
shadow-2xl    // Hover states, modals
shadow-lg shadow-[#00d4ff]/20  // Colored shadow
```

### Glassmorphism
```jsx
className="glass"       // Light glass
className="glass-dark"  // Dark glass
className="glass-hover" // Interactive glass
```

### Glow Effects
```jsx
className="glow-cyan"        // Subtle glow
className="glow-cyan-strong" // Strong glow
className="text-glow"        // Text glow
```

---

## 📱 Responsive Breakpoints

```jsx
// Mobile first approach
className="text-2xl md:text-4xl lg:text-5xl"

// Padding
className="py-12 md:py-20 lg:py-32"

// Grid layouts
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
// or use utility:
className="grid-responsive"

// Spacing
className="gap-4 md:gap-6 lg:gap-8"
```

### Breakpoints
- Base: 0-640px (mobile)
- sm: 640px+ (large mobile)
- md: 768px+ (tablet)
- lg: 1024px+ (desktop)
- xl: 1280px+ (large desktop)
- 2xl: 1536px+ (extra large)

---

## 🎭 Interactive States

### Hover States
```jsx
className="hover:scale-105 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
```

### Focus States (Accessibility)
```jsx
className="focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00d4ff] focus-visible:ring-offset-2"
// or use utility:
className="focus-ring"
```

### Active States
```jsx
className="active:scale-95 active:shadow-inner"
```

---

## 🎨 Icon System (Lucide React)

### Icon Sizes
```jsx
className="w-4 h-4"  // Small (16px)
className="w-5 h-5"  // Medium (20px)
className="w-6 h-6"  // Large (24px)
className="w-8 h-8"  // XL (32px)

// or use utility classes:
className="icon-sm"
className="icon-md"
className="icon-lg"
className="icon-xl"
```

### Icon Colors
```jsx
className="text-gray-600"              // Default
className="text-[#00d4ff]"            // Active
className="group-hover:text-[#00d4ff]" // Hover
className="text-white/80"             // Light bg
```

---

## 📋 Typography Scale

```jsx
// Headings
<h1 className="text-5xl md:text-6xl lg:text-7xl font-bold" />
<h2 className="text-4xl md:text-5xl font-bold" />
<h3 className="text-3xl md:text-4xl font-semibold" />
<h4 className="text-2xl md:text-3xl font-semibold" />

// Body text
<p className="text-base md:text-lg leading-relaxed" />

// Small text
<span className="text-sm md:text-base" />
```

### Line Heights
```jsx
leading-tight    // 1.25 - Headings
leading-relaxed  // 1.625 - Body text
leading-normal   // 1.5 - Small text
```

---

## ✅ Component Checklist

Before committing any component, verify:

- [ ] Uses `#1a1f36` (primary) and `#00d4ff` (accent) colors
- [ ] Follows typography scale (`text-4xl`, `text-5xl`, etc.)
- [ ] Uses standard spacing (`py-20`, `gap-8`, etc.)
- [ ] Implements unified card style: `card-base` or manual classes
- [ ] Uses `duration-300` or `duration-500` for transitions
- [ ] Has proper hover states (`hover:-translate-y-2`, `hover:shadow-2xl`)
- [ ] Includes `focus-visible` states for accessibility
- [ ] Follows responsive patterns (mobile-first)
- [ ] Uses Framer Motion `fadeInUp` variant
- [ ] Icons are consistent size (`w-6 h-6`) and color

---

## 🚀 Quick Start Examples

### Section Template
```jsx
<section className="section-container bg-gray-50">
  <h2 className="section-title gradient-text">Section Title</h2>
  
  <div className="grid-responsive">
    {/* Content */}
  </div>
</section>
```

### Card Template
```jsx
<motion.div
  className="card-base group"
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
>
  <CardHeader>
    <CardTitle className="gradient-text">Title</CardTitle>
  </CardHeader>
  <CardContent>
    {/* Content */}
  </CardContent>
</motion.div>
```

### Button Group Template
```jsx
<div className="flex gap-4">
  <button className="btn-primary">
    <Icon className="icon-md" />
    Primary Action
  </button>
  
  <button className="btn-secondary">
    <Icon className="icon-md" />
    Secondary Action
  </button>
</div>
```

---

## 🎨 Utility Classes Reference

### Layout
- `.section-container` - Standard section padding & max-width
- `.content-wrapper` - Content max-width with responsive padding
- `.grid-responsive` - 1/2/3 column responsive grid
- `.grid-auto-fit` - Auto-fit grid with min 280px columns

### Effects
- `.glass` / `.glass-dark` / `.glass-hover` - Glassmorphism
- `.glow-cyan` / `.glow-cyan-strong` - Glow effects
- `.shimmer` - Shimmer loading effect
- `.skeleton` - Skeleton loading

### Animations
- `.animate-fadeIn` - Fade in animation
- `.animate-slideUp` - Slide up animation
- `.animate-pulse-glow` - Pulsing glow
- `.animate-float` - Floating animation
- `.delay-100` to `.delay-500` - Stagger delays

### Text
- `.gradient-text` - Static gradient text
- `.gradient-text-animated` - Animated gradient text
- `.truncate-1` / `.truncate-2` / `.truncate-3` - Line clamping

---

## 🔧 VS Code Snippets

Add these to your VS Code snippets for faster development:

```json
{
  "Design System Card": {
    "prefix": "dsc",
    "body": [
      "<Card className=\"card-base\">",
      "  <CardHeader>",
      "    <CardTitle className=\"gradient-text\">$1</CardTitle>",
      "  </CardHeader>",
      "  <CardContent>",
      "    $2",
      "  </CardContent>",
      "</Card>"
    ]
  },
  "Design System Button": {
    "prefix": "dsb",
    "body": [
      "<button className=\"btn-primary\">",
      "  $1",
      "</button>"
    ]
  }
}
```

---

## 📚 Full Example Component

```tsx
"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";

export function ExampleSection() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 }
    }
  };

  return (
    <section className="section-container bg-gray-50">
      <motion.h2 
        className="section-title gradient-text"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        Section Title
      </motion.h2>

      <div className="grid-responsive">
        <motion.div variants={fadeInUp}>
          <Card className="card-base group">
            <CardHeader>
              <Badge className="badge-featured w-fit">
                <Sparkles className="icon-sm" />
                Featured
              </Badge>
              <CardTitle className="mt-4">Card Title</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-base leading-relaxed text-gray-700">
                Card content here
              </p>
              
              <div className="mt-6 flex gap-4">
                <button className="btn-primary">
                  Primary Action
                </button>
                <button className="btn-secondary">
                  Secondary Action
                </button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
```

---

## 🎯 Pro Tips

1. **Always use utility classes first** before writing custom CSS
2. **Maintain 8px spacing grid** - use multiples of 8 (16, 24, 32, 40, etc.)
3. **Keep hover states consistent** - `hover:-translate-y-2` for cards, `hover:scale-105` for buttons
4. **Use Framer Motion for all animations** - provides better performance
5. **Test on mobile first** - ensure responsive design works on small screens
6. **Check accessibility** - always include focus states and ARIA labels
7. **Reuse components** - if you write something twice, make it a reusable component

---

**Last Updated:** ${new Date().toLocaleDateString()}
**Maintained by:** Abdul Salam Aldabik (Salumi)

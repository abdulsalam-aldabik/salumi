# Abdul Salam Aldabik - AI Engineer Portfolio

A modern, single-page portfolio website showcasing AI/ML and full-stack development projects.

## 🎨 Design Features

- **Color Scheme**: Navy blue (#1a1f36) primary, Cyan (#00d4ff) accent
- **Modern UI**: Clean, minimalist tech aesthetic
- **Responsive**: Mobile-first design with Tailwind breakpoints
- **Interactive**: Smooth animations with Framer Motion
- **Collapsible Sections**: Using shadcn/ui Accordion components

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (accordion, card, button, badge, separator)
- **Animations**: Framer Motion
- **Icons**: Lucide React

## 📁 Project Structure

```
my-portfolio/
├── app/
│   ├── globals.css          # Global styles with custom color scheme
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Main page composing all sections
├── components/
│   ├── Navigation.tsx        # Fixed navigation bar
│   ├── Hero.tsx              # Full-screen hero with animated background
│   ├── About.tsx             # About section with bio and stats
│   ├── Projects.tsx          # Project showcase with expandable cards
│   ├── Skills.tsx            # Categorized skills display
│   ├── Education.tsx         # Education timeline
│   ├── Contact.tsx           # Contact form and footer
│   └── ui/                   # shadcn/ui components
├── lib/
│   ├── data.ts               # Portfolio content data
│   └── utils.ts              # Utility functions
└── public/
    ├── icons/
    └── projects/             # Project images
```

## 🚀 Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run development server**:
   ```bash
   npm run dev
   ```

3. **Open browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📝 Customization

### Update Personal Information

Edit `lib/data.ts` to update:
- Personal details (name, email, location)
- Projects
- Skills
- Any other content

### Add Project Images

Place project images in `public/projects/` and update the `image` field in `lib/data.ts`

### Customize Colors

Edit `app/globals.css` to change the color scheme:
```css
:root {
  --navy: #1a1f36;      /* Primary color */
  --cyan: #00d4ff;       /* Accent color */
}
```

## 📱 Sections

1. **Hero** - Full-screen introduction with animated gradient background
2. **About** - Brief intro with collapsible biography and quick stats
3. **Projects** - Grid of project cards with expandable details
4. **Skills** - Categorized technical skills (AI/ML, Programming, Web Dev, DevOps, Hardware)
5. **Education** - Academic background with expandable course details
6. **Contact** - Contact form and social links

## ✨ Features

- ✅ Smooth scroll navigation
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Animated transitions (800ms duration)
- ✅ Hover effects on cards
- ✅ Collapsible sections for detailed content
- ✅ Modern gradient backgrounds
- ✅ TypeScript for type safety
- ✅ SEO-friendly structure

## 🔗 Links

- **GitHub**: [yourusername](https://github.com/yourusername)
- **LinkedIn**: [yourusername](https://linkedin.com/in/yourusername)
- **Email**: your.email@example.com

## 📄 License

MIT License - feel free to use this template for your own portfolio!

---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS

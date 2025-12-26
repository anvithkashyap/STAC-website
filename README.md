# STAC MoldTech Website

A modern, responsive website for STAC MoldTech - Precision Plastic Molding Specialists.

## Features

- **Modern Design**: Clean, industrial-modern aesthetic with bold typography and strong visual hierarchy
- **Responsive**: Mobile-first design that works seamlessly across all devices
- **Interactive 3D Experience**: WebGL-powered robot arm simulation using React Three Fiber
- **Smooth Animations**: GSAP-powered scroll animations and transitions
- **Performance Optimized**: Lazy loading, optimized images, and efficient bundling

## Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **React Router** - Client-side routing
- **GSAP** - Animation library
- **React Three Fiber** - 3D graphics (Three.js)
- **Lucide React** - Icon library

## Pages

1. **Home** - Hero section with animated background, core capabilities grid, stats counter, and CTAs
2. **About** - Company story, mission/vision, core values, timeline, and team section
3. **Services** - Comprehensive services grid with features, industries served, and process overview
4. **Interactive** - 3D robot arm simulation with manual controls and animation
5. **Contact** - Contact form, company info, Google Maps embed, and FAQ

## Getting Started

### Prerequisites

- Node.js 18+ (recommended: v22)
- npm or yarn

### Installation

```bash
# Use correct Node version (if using nvm)
nvm use

# Install dependencies
npm install

# Start development server
npm run dev
```

The site will be available at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
STAC/
├── Images/                 # Static images (logos, photos)
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── HeroSection.jsx
│   │   ├── ServiceCard.jsx
│   │   └── ContactForm.jsx
│   ├── pages/             # Page components
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Services.jsx
│   │   ├── Interactive.jsx
│   │   └── Contact.jsx
│   ├── styles/            # Global styles
│   │   └── index.css
│   ├── App.jsx            # Main app component
│   └── main.jsx           # Entry point
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js
```

## Color Palette

- **STAC Red**: `#8B1A1A` - Primary brand color
- **STAC Orange**: `#e86a0b` - Accent color for CTAs
- **Charcoal**: `#2D2D2D` - Dark text and backgrounds
- **Light Gray**: `#F5F5F5` - Section backgrounds

## Typography

- **Headings**: Montserrat (Bold, 700-800)
- **Body**: Open Sans (Regular, 400-600)

## Performance Considerations

- Images use lazy loading (`loading="lazy"`)
- 3D scene only loads on the Interactive page
- CSS is optimized with Tailwind's purge
- Fonts are preconnected for faster loading
- Animations use GPU-accelerated properties

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

© 2024 STAC MoldTech. All rights reserved.

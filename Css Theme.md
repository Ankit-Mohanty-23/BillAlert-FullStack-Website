# BillAlert Landing Page Theme Guide

## Core Color Palette

### Background Colors
- **Primary Background**: `bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900`
- **Secondary Background**: `bg-slate-800/50` (semi-transparent overlay)
- **Section Backgrounds**: 
  - `bg-gradient-to-r from-purple-900/50 to-pink-900/50`
  - `bg-gradient-to-r from-purple-600 to-pink-600`
  - `bg-slate-900` (footer)

### Brand Colors
- **Purple Accent**: `text-purple-400`, `bg-purple-600`, `border-purple-400`
- **Pink Accent**: `text-pink-400`, `bg-pink-600`
- **Gradient Text**: `bg-gradient-to-r from-purple-400 to-pink-400`
- **Button Gradients**: `bg-gradient-to-r from-purple-600 to-pink-600`

### Status/Accent Colors
- **Success Green**: `text-green-400`, `bg-green-600`
- **Warning Red**: `text-red-400`, `bg-red-500/20`
- **Info Blue**: `bg-blue-600`
- **Warning Yellow**: `text-yellow-400`

### Text Colors
- **Primary Text**: `text-white`
- **Secondary Text**: `text-gray-300`
- **Muted Text**: `text-gray-400`, `text-gray-500`
- **Light Text**: `text-purple-100`

## Typography Scale

### Headings
- **Hero Title**: `text-5xl md:text-7xl font-bold`
- **Section Headers**: `text-4xl font-bold`
- **Subsection Headers**: `text-2xl font-bold`
- **Card Titles**: `text-xl font-semibold`
- **Feature Titles**: `text-lg font-semibold`

### Body Text
- **Hero Subtitle**: `text-xl md:text-2xl`
- **Large Text**: `text-2xl`
- **Regular Text**: `text-lg`
- **Small Text**: Default size

## Layout & Spacing

### Container Widths
- **Main Container**: `max-w-6xl mx-auto`
- **Content Container**: `max-w-4xl mx-auto`
- **Text Container**: `max-w-3xl mx-auto`

### Padding & Margins
- **Section Padding**: `px-6 py-20`
- **Navigation**: `px-6 py-4`
- **Hero Section**: `px-6 pt-20 pb-32`
- **Card Padding**: `p-6`, `p-8`
- **Button Padding**: `px-6 py-2`, `px-8 py-4`

### Grid Systems
- **Feature Grid**: `grid md:grid-cols-2 lg:grid-cols-4 gap-8`
- **Stats Grid**: `grid md:grid-cols-3 gap-6`
- **Two Column**: `grid lg:grid-cols-2 gap-12`

## Interactive Elements

### Buttons
- **Primary CTA**: 
  ```
  bg-gradient-to-r from-purple-600 to-pink-600 
  hover:from-purple-700 hover:to-pink-700 
  text-white px-8 py-4 rounded-full text-lg font-semibold 
  transition-all duration-300 transform hover:scale-105
  ```

- **Secondary Button**:
  ```
  border-2 border-purple-400 text-purple-400 
  hover:bg-purple-400 hover:text-white 
  px-8 py-4 rounded-full text-lg font-semibold 
  transition-all duration-300
  ```

- **Nav Button**:
  ```
  bg-purple-600 hover:bg-purple-700 text-white 
  px-6 py-2 rounded-full 
  transition-all duration-300 transform hover:scale-105
  ```

### Cards & Components
- **Feature Cards**: 
  ```
  bg-gradient-to-br from-[color]-600 to-[color]-800 
  p-6 rounded-2xl 
  group-hover:scale-105 transition-transform duration-300
  ```

- **Content Cards**: 
  ```
  bg-slate-800/50 p-8 rounded-2xl
  ```

- **Highlighted Cards**: 
  ```
  bg-gradient-to-r from-red-500/20 to-orange-500/20 
  p-8 rounded-2xl border border-red-500/30
  ```

## Animation & Effects

### Transitions
- **Standard Transition**: `transition-all duration-300`
- **Long Transition**: `transition-all duration-500`
- **Transform Transition**: `transition-transform duration-300`

### Hover Effects
- **Scale on Hover**: `hover:scale-105`
- **Group Hover**: `group-hover:scale-105`

### Animations
- **Bounce Effect**: `animate-bounce`, `animate-bounce delay-700`
- **Fade In**: 
  ```
  transform transition-all duration-1000
  translate-y-0 opacity-100 / translate-y-10 opacity-0
  ```

### Floating Elements
- **Floating Icons**: 
  ```
  absolute top-[position] left/right-[position] animate-bounce
  bg-purple-600/20 p-4 rounded-full
  ```

## Component Patterns

### Icon Containers
- **Feature Icons**: `h-12 w-12 text-white mx-auto`
- **Floating Icons**: `h-8 w-8 text-purple-400`
- **List Icons**: `h-5 w-5 text-green-400`

### Brand Logo Pattern
```
<Bell className="h-8 w-8 text-purple-400" />
<span className="text-2xl font-bold text-white">BillAlert</span>
```

### Gradient Text Pattern
```
text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400
```

## Section Structure Template

```jsx
<section className="px-6 py-20 [background-variant]">
  <div className="max-w-6xl mx-auto">
    <h2 className="text-4xl font-bold text-white text-center mb-16">
      Section Title
    </h2>
    {/* Content */}
  </div>
</section>
```

## Key Theme Characteristics

1. **Dark Theme**: Slate-900 base with purple/pink accents
2. **Gradient Heavy**: Extensive use of gradients for backgrounds and text
3. **Rounded Design**: Consistent use of `rounded-2xl` and `rounded-full`
4. **Interactive**: Hover effects and transforms on most interactive elements
5. **Modern Spacing**: Generous padding and clean grid layouts
6. **Purple-Pink Brand**: Consistent purple-to-pink gradient brand identity
7. **Semi-transparent Overlays**: Use of `/50`, `/20` opacity variants
8. **Responsive**: Mobile-first approach with `md:` and `lg:` breakpoints

This theme creates a modern, professional SaaS landing page feel with strong visual hierarchy and engaging interactions.


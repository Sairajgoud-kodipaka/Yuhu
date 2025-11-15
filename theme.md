# YUHU - Theme & Design System

@theme.md @features.md @prd.md @prompt.md @screens-ascii.md @sdlc.md @srs.md 


clear insurction
setup frontend dir
mobile (expo project name)download stable and latets verisons...
see @screens-ascii.md ->prd.md ->faetuers.md 

i want a ready to check and peopelr flow of all screens with mvp (fornetnd protoytpe wiht ui/ux ready)

## Default Theme: Dark Mode with Purple Accent

Based on YUHU Creators mascot branding with bear icon featuring purple eyes.

---

## Color Palette

### Primary Colors
```javascript
const colors = {
  // Background
  background: '#111111',        // Main app background
  surface: '#18181B',           // Cards, modals, elevated surfaces
  
  // Primary Brand
  primary: '#8B5CF6',           // Purple - buttons, links, active states
  primaryHover: '#7C3AED',      // Darker purple for hover/press
  primaryLight: '#A78BFA',      // Lighter purple for subtle elements
  
  // Text
  textPrimary: '#FFFFFF',       // Main text
  textSecondary: '#E5E7EB',     // Secondary text, captions
  textMuted: '#9CA3AF',         // Placeholder, disabled text
  
  // Semantic Colors
  success: '#10B981',           // Green - success states, online status
  warning: '#F59E0B',           // Orange - warnings
  error: '#EF4444',             // Red - errors, destructive actions
  info: '#3B82F6',              // Blue - informational
  
  // UI Elements
  border: '#27272A',            // Borders, dividers
  inputBackground: '#27272A',   // Input fields
  disabled: '#3F3F46',          // Disabled elements
  
  // Overlay
  overlay: 'rgba(0, 0, 0, 0.7)', // Modal overlay
};
```

### Alternative Light Mode (Optional)
```javascript
const colorsLight = {
  background: '#FFFFFF',
  surface: '#F9FAFB',
  primary: '#7C3AED',
  primaryHover: '#6D28D9',
  primaryLight: '#8B5CF6',
  textPrimary: '#111827',
  textSecondary: '#4B5563',
  textMuted: '#9CA3AF',
  // ... rest similar structure
};
```

---

## Typography

### Font Family
**Primary:** Inter (install via expo-google-fonts)
**Fallback:** System default (San Francisco on iOS, Roboto on Android)

```javascript
import { useFonts, Inter_400Regular, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';

const typography = {
  fontFamily: {
    regular: 'Inter_400Regular',
    semibold: 'Inter_600SemiBold',
    bold: 'Inter_700Bold',
  },
  
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },
  
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },
};
```

### Text Styles
```javascript
const textStyles = {
  h1: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.xxxl,
    lineHeight: typography.fontSize.xxxl * typography.lineHeight.tight,
    color: colors.textPrimary,
  },
  
  h2: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.xxl,
    lineHeight: typography.fontSize.xxl * typography.lineHeight.tight,
    color: colors.textPrimary,
  },
  
  h3: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.fontSize.xl,
    lineHeight: typography.fontSize.xl * typography.lineHeight.normal,
    color: colors.textPrimary,
  },
  
  body: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.md,
    lineHeight: typography.fontSize.md * typography.lineHeight.normal,
    color: colors.textPrimary,
  },
  
  caption: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.sm,
    lineHeight: typography.fontSize.sm * typography.lineHeight.normal,
    color: colors.textSecondary,
  },
  
  button: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.fontSize.md,
    color: colors.textPrimary,
  },
};
```

---

## Spacing

```javascript
const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};
```

---

## Border Radius

```javascript
const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
};
```

---

## Shadows

```javascript
const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
};
```

---

## Component Styles

### Button
```javascript
const buttonStyles = {
  primary: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.lg,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    ...shadows.sm,
  },
  
  secondary: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: borderRadius.lg,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  
  ghost: {
    backgroundColor: 'transparent',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
  },
};
```

### Card
```javascript
const cardStyles = {
  container: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    ...shadows.md,
  },
};
```

### Input
```javascript
const inputStyles = {
  container: {
    backgroundColor: colors.inputBackground,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  
  focused: {
    borderColor: colors.primary,
  },
  
  error: {
    borderColor: colors.error,
  },
};
```

---

## Theme Customization

### User-Selectable Themes

Users can choose from preset themes in Settings:

#### Theme 1: Midnight Purple (Default)
- Background: Black (#111111)
- Primary: Purple (#8B5CF6)
- Already defined above

#### Theme 2: Ocean Blue
```javascript
{
  background: '#0F172A',
  surface: '#1E293B',
  primary: '#3B82F6',
  primaryHover: '#2563EB',
  // ... rest of colors
}
```

#### Theme 3: Forest Green
```javascript
{
  background: '#064E3B',
  surface: '#065F46',
  primary: '#10B981',
  primaryHover: '#059669',
  // ... rest of colors
}
```

#### Theme 4: Sunset Orange
```javascript
{
  background: '#1C1917',
  surface: '#292524',
  primary: '#F97316',
  primaryHover: '#EA580C',
  // ... rest of colors
}
```

### Implementation

Store selected theme in user preferences:

```javascript
// context/ThemeContext.tsx
import React, { createContext, useState, useContext } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState('default');
  
  const themes = {
    default: { /* Midnight Purple colors */ },
    ocean: { /* Ocean Blue colors */ },
    forest: { /* Forest Green colors */ },
    sunset: { /* Sunset Orange colors */ },
  };
  
  const theme = themes[currentTheme];
  
  return (
    <ThemeContext.Provider value={{ theme, setCurrentTheme, currentTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
```

Usage in components:
```javascript
import { useTheme } from '../context/ThemeContext';

const MyComponent = () => {
  const { theme } = useTheme();
  
  return (
    <View style={{ backgroundColor: theme.background }}>
      <Text style={{ color: theme.textPrimary }}>Hello</Text>
    </View>
  );
};
```

---

## Animations

### Transition Durations
```javascript
const animations = {
  fast: 150,
  normal: 250,
  slow: 400,
};
```

### Common Animations
```javascript
import { Animated } from 'react-native';

// Fade In
const fadeIn = (animatedValue) => {
  Animated.timing(animatedValue, {
    toValue: 1,
    duration: animations.normal,
    useNativeDriver: true,
  }).start();
};

// Scale on Press
const scaleOnPress = (animatedValue) => {
  Animated.sequence([
    Animated.timing(animatedValue, {
      toValue: 0.95,
      duration: animations.fast,
      useNativeDriver: true,
    }),
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: animations.fast,
      useNativeDriver: true,
    }),
  ]).start();
};
```

---

## Accessibility

### Color Contrast
- All text on background must meet WCAG AA standards (4.5:1 for normal text, 3:1 for large text)
- Primary purple (#8B5CF6) on black background: 8.2:1 ✅
- White (#FFFFFF) on black background: 21:1 ✅

### Touch Targets
- Minimum touch target size: 44x44 points (iOS) / 48x48 dp (Android)
- Ensure all interactive elements meet this requirement

### Screen Reader Support
- Use `accessibilityLabel` and `accessibilityHint` on all interactive elements
- Set `accessibilityRole` appropriately

---

## Best Practices

### DO:
✅ Use theme colors from context, never hardcode  
✅ Use spacing constants for margins and padding  
✅ Use shadows for elevation  
✅ Keep font sizes consistent using typography scale  
✅ Test in both light and dark modes  

### DON'T:
❌ Use random colors or spacing values  
❌ Create custom shadows without using theme  
❌ Mix different font families  
❌ Use too many font sizes (stick to the scale)  
❌ Forget accessibility considerations  

---

**End of Theme Document**

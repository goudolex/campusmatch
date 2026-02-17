import { Colors, Fonts } from "./Colors";

export const theme = {
  colors: {
    bg: Colors.light.background,
    text: Colors.light.text,
    muted: Colors.light.icon,
    border: "rgba(0,0,0,0.12)",
    primary: Colors.light.tint,
    primaryText: "#FFFFFF",
  },
  fonts: {
    sans: Fonts?.sans,
    serif: Fonts?.serif,
    rounded: Fonts?.rounded,
    mono: Fonts?.mono,
  },
  spacing: {
    xs: 8,
    sm: 12,
    md: 16,
    lg: 20,
    xl: 24,
  },
  radius: {
    sm: 10,
    md: 12,
    lg: 16,
  },
  type: {
    h1: 30,
    h2: 28,
    h3: 18,
    body: 16,
    small: 14,
  },
};

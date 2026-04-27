import { ColorUtils, IColor } from "./ColorUtils";

// 1. WCAG Relative Luminance calculation
export function getLuminance({ r, g, b }: IColor["rgb"]): number {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    const sRGB = c / 255;
    return sRGB <= 0.04045
      ? sRGB / 12.92
      : Math.pow((sRGB + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

// 2. Contrast Ratio calculation
export function getContrastRatio(c1: IColor["rgb"], c2: IColor["rgb"]): number {
  const l1 = getLuminance(c1);
  const l2 = getLuminance(c2);

  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);

  return (lighter + 0.05) / (darker + 0.05);
}

// 3. WCAG Rating (Updated to account for text size)
export function getContrastLevel(
  ratio: number,
  isLargeText: boolean = false,
): "AAA" | "AA" | "Fail" {
  // Large text (18pt+ regular or 14pt+ bold) has lower requirements
  if (isLargeText) {
    if (ratio >= 4.5) return "AAA";
    if (ratio >= 3.0) return "AA";
    return "Fail";
  }

  // Normal text requirements
  if (ratio >= 7) return "AAA";
  if (ratio >= 4.5) return "AA";
  return "Fail";
}

export interface IColorVariant {
  color: IColor["rgb"];
  luminance: number;
  pct: number;
}

export function generateVariants(base: IColor["rgb"]) {
  const hsl = ColorUtils.rgbToHsl(base);

  const steps = 11;

  const tints: IColorVariant[] = [];
  const shades: IColorVariant[] = [];

  for (let i = 0; i < steps; i++) {
    const t = i / (steps - 1); // 0 → 1

    // Tints (towards white)
    const c1 = ColorUtils.hslToRgb({
      ...hsl,
      l: hsl.l + (1 - hsl.l) * t,
      a: base.a,
    });
    tints.push({
      color: c1,
      luminance: getLuminance(c1),
      pct: (i * 100) / 10,
    });

    // Shades (towards black)
    const c2 = ColorUtils.hslToRgb({
      ...hsl,
      l: hsl.l * (1 - t),
      a: base.a,
    });
    shades.push({
      color: c2,
      luminance: getLuminance(c2),
      pct: (i * 100) / 10,
    });
  }

  return {
    tints,
    shades,
  };
}

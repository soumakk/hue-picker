import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { IColor } from "../components/lib/ColorUtils";

export function rgbToCmyk(color: IColor) {
  const { rgb } = color;
  // Normalize RGB values
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;

  // Calculate CMY
  let c = 1 - r;
  let m = 1 - g;
  let y = 1 - b;

  // Find the minimum of CMY values
  const minCmy = Math.min(c, m, y);

  // If the color is black, return early to avoid division by zero
  if (minCmy === 1) {
    return {
      c: 0,
      m: 0,
      y: 0,
      k: 1,
    };
  }

  // Calculate K (black key)
  const k = minCmy;

  // Calculate CMYK values
  c = (c - k) / (1 - k);
  m = (m - k) / (1 - k);
  y = (y - k) / (1 - k);

  return {
    c: (c * 100).toFixed(0),
    m: (m * 100).toFixed(0),
    y: (y * 100).toFixed(0),
    k: (k * 100).toFixed(0),
  };
}

export function rgbToHsl(color: IColor) {
  const { rgb } = color;

  // Normalize RGB values
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;

  // Find the maximum and minimum values among RGB
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);

  // Calculate lightness
  const lightness = (max + min) / 2;

  let hue = 0,
    saturation = 0;

  if (max === min) {
    // Achromatic (no hue)
    hue = 0;
    saturation = 0;
  } else {
    const delta = max - min;

    // Calculate saturation
    saturation =
      lightness > 0.5 ? delta / (2 - max - min) : delta / (max + min);

    // Calculate hue
    switch (max) {
      case r:
        hue = ((g - b) / delta + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        hue = ((b - r) / delta + 2) / 6;
        break;
      case b:
        hue = ((r - g) / delta + 4) / 6;
        break;
    }
  }

  return {
    h: Math.round(hue * 360),
    s: Math.round(saturation * 100),
    l: Math.round(lightness * 100),
  };
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function clamp(value: number, min: number, max: number) {
  return value < min ? min : value > max ? max : value;
}

export enum Formats {
  Code = "code",
  Raw = "raw",
  Json = "json",
}

export interface FormatOptions {
  format?: Formats | null;
}

export function formatRGB(
  rgb: IColor["rgb"],
  options: FormatOptions = {},
): string {
  const { format = Formats.Code } = options;
  const alpha = rgb.a !== undefined && rgb.a < 1;

  // Handle JSON format first
  if (format === Formats.Json) {
    const base = {
      r: Math.round(rgb.r),
      g: Math.round(rgb.g),
      b: Math.round(rgb.b),
    };
    const obj = alpha ? { ...base, a: Number(rgb.a.toFixed(2)) } : base;
    return JSON.stringify(obj)
      .replace(/([:,])/g, "$1 ")
      .replace(/{/g, "{ ")
      .replace(/}/g, " }");
  }

  // Pre-calculate string values for Code and Raw
  const r = rgb.r.toFixed(0);
  const g = rgb.g.toFixed(0);
  const b = rgb.b.toFixed(0);

  const values = alpha
    ? `${r}, ${g}, ${b}, ${rgb.a.toFixed(2)}`
    : `${r}, ${g}, ${b}`;

  // Handle Raw format
  if (format === Formats.Raw) {
    return values;
  }

  // Handle Code format (Default)
  return alpha ? `rgba(${values})` : `rgb(${values})`;
}

export function formatHSV(
  hsv: IColor["hsv"],
  options: FormatOptions = {},
): string {
  const { format = Formats.Code } = options;
  const alpha = hsv.a !== undefined && hsv.a < 1;

  // Handle JSON format first
  if (format === Formats.Json) {
    const base = {
      h: Math.round(hsv.h),
      s: Math.round(hsv.s),
      v: Math.round(hsv.v),
    };
    const obj = alpha ? { ...base, a: Number(hsv.a.toFixed(2)) } : base;
    return JSON.stringify(obj)
      .replace(/([:,])/g, "$1 ")
      .replace(/{/g, "{ ")
      .replace(/}/g, " }");
  }

  // Pre-calculate string values for Code and Raw
  const h = Math.round(hsv.h).toFixed(0);
  const s = Math.round(hsv.s).toFixed(0);
  const v = Math.round(hsv.v).toFixed(0);

  const values = alpha
    ? `${h}°, ${s}%, ${v}%, ${hsv.a.toFixed(2)}`
    : `${h}°, ${s}%, ${v}%`;

  // Handle Raw format
  if (format === Formats.Raw) {
    return values;
  }

  // Handle Code format (Default)
  return alpha ? `hsva(${values})` : `hsv(${values})`;
}

export function formatGLSL(
  color: IColor["glsl"],
  options: FormatOptions = {},
): string {
  const { format = Formats.Code } = options;
  const alpha = color.w !== undefined && color.w < 1;

  // Handle JSON format first
  if (format === Formats.Json) {
    const base = {
      x: Number(color.x.toFixed(3)),
      y: Number(color.y.toFixed(3)),
      z: Number(color.z.toFixed(3)),
    };
    const obj = alpha ? { ...base, w: Number(color.w.toFixed(2)) } : base;
    return JSON.stringify(obj)
      .replace(/([:,])/g, "$1 ")
      .replace(/{/g, "{ ")
      .replace(/}/g, " }");
  }

  // Pre-calculate string values for Code and Raw
  const x = color.x.toFixed(3);
  const y = color.y.toFixed(3);
  const z = color.z.toFixed(3);

  const values = alpha
    ? `${x}, ${y}, ${z}, ${color.w.toFixed(2)}`
    : `${x}, ${y}, ${z}`;

  // Handle Raw format
  if (format === Formats.Raw) {
    return values;
  }

  // Handle Code format (Default)
  return alpha ? `vec4(${values})` : `vec3(${values})`;
}

export function formatOKLCH(
  oklch: IColor["oklch"],
  options: FormatOptions = {},
): string {
  const { format = Formats.Code } = options;
  const alpha = oklch.a !== undefined && oklch.a < 1;

  // Handle JSON format first
  if (format === Formats.Json) {
    const base = {
      l: Number(oklch.l.toFixed(3)),
      c: Number(oklch.c.toFixed(3)),
      h: Math.round(oklch.h),
    };
    const obj = alpha ? { ...base, a: Number(oklch.a.toFixed(2)) } : base;
    return JSON.stringify(obj)
      .replace(/([:,])/g, "$1 ")
      .replace(/{/g, "{ ")
      .replace(/}/g, " }");
  }

  // Pre-calculate string values for Code and Raw
  // Lightness (l) is typically represented as a percentage in CSS
  const l = `${(oklch.l * 100).toFixed(0)}%`;
  const c = oklch.c.toFixed(3);
  const h = Math.round(oklch.h).toFixed(0);

  // OKLCH uses space-separated values and a slash for alpha
  const values = alpha
    ? `${l} ${c} ${h} / ${oklch.a.toFixed(2)}`
    : `${l} ${c} ${h}`;

  // Handle Raw format
  if (format === Formats.Raw) {
    return values;
  }

  // Handle Code format (Default)
  return `oklch(${values})`;
}

export function formatHEX(
  hex: IColor["hex"],
  options: FormatOptions = {},
): string {
  const { format = Formats.Code } = options;

  // Safely strip any existing hash so we have a reliable, clean base string
  const cleanHex = hex.replace(/^#/, "");

  // Handle JSON format first
  if (format === Formats.Json) {
    const obj = { value: `#${cleanHex}` };

    // Stringify and add spaces for readability
    return JSON.stringify(obj)
      .replace(/([:,])/g, "$1 ")
      .replace(/{/g, "{ ")
      .replace(/}/g, " }");
  }

  // Handle Raw format (no prefix)
  if (format === Formats.Raw) {
    return cleanHex;
  }

  // Handle Code format (Default, with prefix)
  return `#${cleanHex}`;
}

export enum Controls {
  RGB = "RGB",
  HSV = "HSV",
}

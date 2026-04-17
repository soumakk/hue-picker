import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { IColor } from "../lib/ColorUtils";

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

export function formatRGB(rgb: IColor["rgb"]) {
  const r = rgb.r.toFixed(0);
  const g = rgb.g.toFixed(0);
  const b = rgb.b.toFixed(0);
  const a = rgb.a.toFixed(0);
  return `rgb(${r}, ${g}, ${b});`;
}

export function formatHSV(hsv: IColor["hsv"]) {
  const h = Math.round(hsv.h).toFixed(0);
  const s = Math.round(hsv.s).toFixed(0);
  const v = Math.round(hsv.v).toFixed(0);
  const a = hsv.a.toFixed(0);
  return `hsv(${h}°, ${s}%, ${v}%);`;
}

export function formatHSL(hsl: IColor["hsl"]) {
  const h = Math.round(hsl.h).toFixed(0);
  const s = Math.round(hsl.s).toFixed(0);
  const l = Math.round(hsl.l).toFixed(0);
  const a = hsl.a.toFixed(0);
  return `hsl(${h}°, ${s}%, ${l}%);`;
}

export function formatGLSL(color: IColor["glsl"]) {
  const x = color.x.toFixed(3);
  const y = color.y.toFixed(3);
  const z = color.z.toFixed(3);
  return `vec3(${x}, ${y}, ${z});`;
}

export function formatOKLCH(color: IColor["oklch"]) {
  const l = color.l.toFixed(4);
  const c = color.c.toFixed(4);
  const h = color.h.toFixed(2);
  return `oklch(${l}, ${c}, ${h});`;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function clamp(value: number, min: number, max: number) {
  return value < min ? min : value > max ? max : value;
}

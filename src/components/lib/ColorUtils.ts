import { colornames } from "color-name-list";
import { clamp } from "../../utils/helpers";

export interface IColor {
  readonly hex: string;
  readonly rgb: IColorRgb;
  readonly hsv: IColorHsv;
  readonly glsl: IColorGlsl;
  readonly oklch: IColorOklch;
  readonly hsl: IColorHsl;
}

interface IColorGlsl {
  readonly x: number;
  readonly y: number;
  readonly z: number;
  readonly w: number;
}

interface IColorRgb {
  readonly r: number;
  readonly g: number;
  readonly b: number;
  readonly a: number;
}

interface IColorHsv {
  readonly h: number;
  readonly s: number;
  readonly v: number;
  readonly a: number;
}

interface IColorHsl {
  readonly h: number;
  readonly s: number;
  readonly l: number;
  readonly a: number;
}

export interface IColorOklch {
  readonly l: number;
  readonly c: number;
  readonly h: number;
  readonly a: number;
}

class ColorUtilsStatic {
  public convert<M extends keyof IColor, C extends IColor[M]>(
    model: M,
    color: C,
  ): IColor {
    let hex!: IColor["hex"];
    let rgb!: IColor["rgb"];
    let hsv!: IColor["hsv"];
    let glsl!: IColor["glsl"];
    let oklch!: IColor["oklch"];
    let hsl!: IColor["hsl"];

    if (model === "hex") {
      const value = color as IColor["hex"];

      hex = this.toHex(value);
      rgb = this.hex2rgb(hex);

      if (hex.startsWith("rgba")) {
        rgb = this.toRgb(hex);
        hex = this.rgb2hex(rgb);
      }

      hsv = this.rgb2hsv(rgb);
      glsl = this.rgbToGlsl(rgb);
      oklch = this.rgb2oklch(rgb);
    } else if (model === "rgb") {
      rgb = color as IColor["rgb"];
      hex = this.rgb2hex(rgb);
      hsv = this.rgb2hsv(rgb);
      glsl = this.rgbToGlsl(rgb);
      oklch = this.rgb2oklch(rgb);
    } else if (model === "hsv") {
      hsv = color as IColor["hsv"];
      rgb = this.hsv2rgb(hsv);
      hex = this.rgb2hex(rgb);
      glsl = this.rgbToGlsl(rgb);
      oklch = this.rgb2oklch(rgb);
    } else if (model === "glsl") {
      glsl = color as IColor["glsl"];
      rgb = this.glslToRgb(glsl);
      hex = this.rgb2hex(rgb);
      hsv = this.rgb2hsv(rgb);
      oklch = this.rgb2oklch(rgb);
    } else if (model === "oklch") {
      oklch = color as IColor["oklch"];
      rgb = this.oklch2rgb(oklch);
      hex = this.rgb2hex(rgb);
      hsv = this.rgb2hsv(rgb);
      glsl = this.rgbToGlsl(rgb);
    }

    return { hex, rgb, hsv, glsl, oklch, hsl };
  }

  public toHex(value: string): IColor["hex"] {
    value = value.toLowerCase();

    if (!value.startsWith("#")) {
      const ctx = document.createElement("canvas").getContext("2d");
      if (!ctx)
        throw new Error(
          "2d context not supported or canvas already initialized",
        );
      ctx.fillStyle = value;
      return ctx.fillStyle;
    }

    if (value.length === 4) {
      return `#${value[1]}${value[1]}${value[2]}${value[2]}${value[3]}${value[3]}`;
    } else if (value.length === 5) {
      const a = value[4];
      const hex = `#${value[1]}${value[1]}${value[2]}${value[2]}${value[3]}${value[3]}`;
      return a === "f" ? hex : `${hex}${a}${a}`;
    } else if (value.length === 7) {
      return value;
    } else if (value.length === 9) {
      return value.endsWith("ff") ? value.slice(0, 7) : value;
    }

    return "#000000";
  }

  public toRgb(value: string): IColor["rgb"] {
    const rgb: string[] = value.match(/\d+(\.\d+)?/gu) ?? [];
    const [r, g, b, a] = Array.from({ length: 4 }).map((_, i) =>
      clamp(+(rgb[i] ?? (i < 3 ? 0 : 1)), 0, i < 3 ? 255 : 1),
    );
    return { r, g, b, a };
  }

  public toHsv(value: string): IColor["hsv"] {
    const hsv: string[] = value.match(/\d+(\.\d+)?/gu) ?? [];
    const [h, s, v, a] = Array.from({ length: 4 }).map((_, i) =>
      clamp(+(hsv[i] ?? (i < 3 ? 0 : 1)), 0, i ? (i < 3 ? 100 : 1) : 360),
    );
    return { h, s, v, a };
  }

  public hex2rgb(hex: IColor["hex"]): IColor["rgb"] {
    if (hex.length === 4 || hex.length === 5) hex = this.toHex(hex);
    hex = hex.slice(1);
    let [r, g, b, a] = Array.from({ length: 4 }).map((_, i) =>
      parseInt(hex.slice(i * 2, i * 2 + 2), 16),
    );
    a = Number.isNaN(a) ? 1 : parseFloat((a / 255).toFixed(3));
    return { r, g, b, a };
  }

  public rgb2hsv({ r, g, b, a }: IColor["rgb"]): IColor["hsv"] {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const d = max - Math.min(r, g, b);

    let h = d
      ? (max === r
          ? (g - b) / d + (g < b ? 6 : 0)
          : max === g
            ? 2 + (b - r) / d
            : 4 + (r - g) / d) * 60
      : 0;
    let s = max ? (d / max) * 100 : 0;
    let v = max * 100;

    h = Math.round(h);
    // Left unrounded to preserve precision during conversion loops
    return { h, s, v, a };
  }

  public hsv2rgb({ h, s, v, a }: IColor["hsv"]): IColor["rgb"] {
    s /= 100;
    v /= 100;

    const i = ~~(h / 60);
    const f = h / 60 - i;
    const p = v * (1 - s);
    const q = v * (1 - s * f);
    const t = v * (1 - s * (1 - f));
    const index = i % 6;

    const r = Math.round([v, q, p, p, t, v][index] * 255);
    const g = Math.round([t, v, v, q, p, p][index] * 255);
    const b = Math.round([p, p, t, v, v, q][index] * 255);

    return { r, g, b, a };
  }

  public rgb2hex({ r, g, b, a }: IColor["rgb"]): IColor["hex"] {
    const [rr, gg, bb, aa] = [r, g, b, a].map((v, i) =>
      Math.round(i < 3 ? v : v * 255)
        .toString(16)
        .padStart(2, "0"),
    );
    return ["#", rr, gg, bb, aa === "ff" ? undefined : aa].join("");
  }

  public rgbToGlsl(rgb: IColor["rgb"]): IColor["glsl"] {
    const x = parseFloat((rgb.r / 255).toFixed(3));
    const y = parseFloat((rgb.g / 255).toFixed(3));
    const z = parseFloat((rgb.b / 255).toFixed(3));
    const w = rgb.a;
    return { x, y, z, w };
  }

  public glslToRgb(glsl: IColor["glsl"]): IColor["rgb"] {
    const r = Math.round(glsl.x * 255);
    const g = Math.round(glsl.y * 255);
    const b = Math.round(glsl.z * 255);
    const a = glsl.w;
    return { r, g, b, a };
  }

  public rgb2oklch({ r, g, b, a }: IColor["rgb"]): IColorOklch {
    const toLinear = (c: number) => {
      c /= 255;
      return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    };
    const rL = toLinear(r),
      gL = toLinear(g),
      bL = toLinear(b);

    const l = 0.4122214708 * rL + 0.5363325363 * gL + 0.0514459929 * bL;
    const m = 0.2119034982 * rL + 0.6806995451 * gL + 0.1073969566 * bL;
    const s = 0.0883024619 * rL + 0.2817188376 * gL + 0.6299787005 * bL;

    const l_ = Math.cbrt(l),
      m_ = Math.cbrt(m),
      s_ = Math.cbrt(s);
    const L = 0.2104542553 * l_ + 0.793617785 * m_ - 0.0040720468 * s_;
    const A = 1.9779984951 * l_ - 2.428592205 * m_ + 0.4505937099 * s_;
    const B = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.808675766 * s_;

    const C = Math.sqrt(A * A + B * B);
    let H = Math.atan2(B, A) * (180 / Math.PI);
    if (H < 0) H += 360;

    return { l: L, c: C, h: H, a };
  }

  public oklch2rgb({ l, c, h, a }: IColorOklch): IColor["rgb"] {
    const hr = h * (Math.PI / 180);
    const A = c * Math.cos(hr);
    const B = c * Math.sin(hr);

    const l_ = l + 0.3963377774 * A + 0.2158037573 * B;
    const m_ = l - 0.1055613458 * A - 0.0638541728 * B;
    const s_ = l - 0.0894841775 * A - 1.291485548 * B;
    const l_c = l_ * l_ * l_,
      m_c = m_ * m_ * m_,
      s_c = s_ * s_ * s_;

    const rL = 4.0767416621 * l_c - 3.3077115913 * m_c + 0.2309699292 * s_c;
    const gL = -1.2684380046 * l_c + 2.6097574011 * m_c - 0.3413193965 * s_c;
    const bL = -0.0041960863 * l_c - 0.7034186147 * m_c + 1.707614701 * s_c;

    const toGamma = (c: number) => {
      return c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - 0.055;
    };

    return {
      r: clamp(Math.round(toGamma(rL) * 255), 0, 255),
      g: clamp(Math.round(toGamma(gL) * 255), 0, 255),
      b: clamp(Math.round(toGamma(bL) * 255), 0, 255),
      a,
    };
  }

  public rgbToHsl({ r, g, b }: IColor["rgb"]) {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0,
      s = 0,
      l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }

      h /= 6;
    }

    return { h, s, l };
  }

  public hslToRgb({ h, s, l, a }: IColor["hsl"]): IColor["rgb"] {
    let r: number, g: number, b: number;

    if (s === 0) {
      r = g = b = l;
    } else {
      const hueToRgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };

      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;

      r = hueToRgb(p, q, h + 1 / 3);
      g = hueToRgb(p, q, h);
      b = hueToRgb(p, q, h - 1 / 3);
    }

    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255),
      a: a,
    };
  }
}

export const ColorUtils = new ColorUtilsStatic();

export function parseColorToRgb(
  colorStr: string,
): { color: IColorRgb; error: false } | { color: null; error: true } {
  let r = 0,
    g = 0,
    b = 0,
    a = 1;
  const str = colorStr.trim().toLowerCase();

  if (!str) return { color: null, error: true };

  // 1. HEX
  if (str.startsWith("#")) {
    let hex = str.slice(1);
    if (!/^([0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(hex)) {
      return { color: null, error: true };
    }
    if (hex.length === 3 || hex.length === 4) {
      hex = hex
        .split("")
        .map((c) => c + c)
        .join("");
    }
    r = parseInt(hex.slice(0, 2), 16);
    g = parseInt(hex.slice(2, 4), 16);
    b = parseInt(hex.slice(4, 6), 16);
    if (hex.length === 8) a = parseInt(hex.slice(6, 8), 16) / 255;
  }

  // 2. RGB / RGBA
  else if (str.startsWith("rgb")) {
    const matches = str.match(/[\d.]+/g);
    if (!matches || matches.length < 3) return { color: null, error: true };
    r = parseFloat(matches[0]);
    g = parseFloat(matches[1]);
    b = parseFloat(matches[2]);
    if (matches[3]) a = parseFloat(matches[3]);
  }

  // 3. GLSL / vec
  else if (str.startsWith("vec") || str.startsWith("glsl")) {
    const cleaned = str.replace(/^(vec[34]|glsl)/i, "");
    const matches = cleaned.match(/[\d.]+/g);
    if (!matches || matches.length < 3) return { color: null, error: true };
    r = parseFloat(matches[0]) * 255;
    g = parseFloat(matches[1]) * 255;
    b = parseFloat(matches[2]) * 255;
    if (matches[3]) a = parseFloat(matches[3]);
  }

  // 4. OKLCH
  else if (str.startsWith("oklch")) {
    const cleaned = str.replace(/^oklch\(/i, "").replace(/\)$/, "");
    const parts = cleaned.split(/[\s,/]+/).filter(Boolean);
    if (parts.length < 3) return { color: null, error: true };

    let okl = parseFloat(parts[0]);
    if (parts[0].includes("%")) okl /= 100;
    let okc = parseFloat(parts[1]);
    if (parts[1].includes("%")) okc = (okc / 100) * 0.4;
    const okh = parseFloat(parts[2]);
    if (parts[3]) {
      a = parseFloat(parts[3]);
      if (parts[3].includes("%")) a /= 100;
    }

    const tempRgb = ColorUtils.oklch2rgb({ l: okl, c: okc, h: okh, a });
    r = tempRgb.r;
    g = tempRgb.g;
    b = tempRgb.b;
  }

  // 5. Named color
  else {
    const match = colornames.find((c) => c.name.toLowerCase() === str);
    if (!match?.hex) return { color: null, error: true };

    let hex = match.hex.replace("#", "");
    if (hex.length === 3 || hex.length === 4) {
      hex = hex
        .split("")
        .map((c) => c + c)
        .join("");
    }
    r = parseInt(hex.slice(0, 2), 16);
    g = parseInt(hex.slice(2, 4), 16);
    b = parseInt(hex.slice(4, 6), 16);
    if (hex.length === 8) a = parseInt(hex.slice(6, 8), 16) / 255;
  }

  if (Number.isNaN(r) || Number.isNaN(g) || Number.isNaN(b)) {
    return { color: null, error: true };
  }

  return {
    color: {
      r: Math.round(Math.max(0, Math.min(255, r))),
      g: Math.round(Math.max(0, Math.min(255, g))),
      b: Math.round(Math.max(0, Math.min(255, b))),
      a: parseFloat(Math.max(0, Math.min(1, a)).toFixed(3)),
    },
    error: false,
  };
}

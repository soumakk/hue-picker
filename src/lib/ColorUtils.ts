import { clamp } from '../utils/helpers'

export interface IColor {
	readonly hex: string
	readonly rgb: IColorRgb
	readonly hsv: IColorHsv
	readonly glsl: IColorGlsl
	readonly hsl: IColorHsl
}

interface IColorGlsl {
	readonly x: number
	readonly y: number
	readonly z: number
	readonly w: number
}

interface IColorRgb {
	readonly r: number
	readonly g: number
	readonly b: number
	readonly a: number
}

interface IColorHsv {
	readonly h: number
	readonly s: number
	readonly v: number
	readonly a: number
}

interface IColorHsl {
	readonly h: number
	readonly s: number
	readonly l: number
	readonly a: number
}

class ColorUtilsStatic {
	public convert<M extends keyof IColor, C extends IColor[M]>(model: M, color: C): IColor {
		let hex: IColor['hex'] = this.toHex('#000000')
		let rgb: IColor['rgb'] = this.hex2rgb(hex)
		let hsv: IColor['hsv'] = this.rgb2hsv(rgb)
		let glsl: IColor['glsl'] = this.rgbToGlsl(rgb)
		let hsl: IColor['hsl'] = this.rgbToHsl(rgb)

		if (model === 'hex') {
			const value = color as IColor['hex']

			hex = this.toHex(value)
			rgb = this.hex2rgb(hex)

			if (hex.startsWith('rgba')) {
				rgb = this.toRgb(hex)
				hex = this.rgb2hex(rgb)
			}

			hsv = this.rgb2hsv(rgb)
			glsl = this.rgbToGlsl(rgb)
			hsl = this.rgbToHsl(rgb)
		} else if (model === 'rgb') {
			const value = color as IColor['rgb']

			rgb = value
			hex = this.rgb2hex(rgb)
			hsv = this.rgb2hsv(rgb)
			glsl = this.rgbToGlsl(rgb)
			hsl = this.rgbToHsl(rgb)
		} else if (model === 'hsv') {
			const value = color as IColor['hsv']

			hsv = value
			rgb = this.hsv2rgb(hsv)
			hex = this.rgb2hex(rgb)
			glsl = this.rgbToGlsl(rgb)
			hsl = this.rgbToHsl(rgb)
		} else if (model === 'glsl') {
			const value = color as IColor['glsl']

			glsl = value
			rgb = this.glslToRgb(glsl)
			hex = this.rgb2hex(rgb)
			hsv = this.rgb2hsv(rgb)
			hsl = this.rgbToHsl(rgb)
		} else if (model === 'hsl') {
			const value = color as IColor['hsl']

			hsl = value
			rgb = this.hslToRgb(hsl)
			hex = this.rgb2hex(rgb)
			hsv = this.rgb2hsv(rgb)
			glsl = this.rgbToGlsl(rgb)
		}

		return { hex, rgb, hsv, glsl, hsl }
	}

	public toHex(value: string): IColor['hex'] {
		if (!value.startsWith('#')) {
			const ctx = document.createElement('canvas').getContext('2d')

			if (!ctx) throw new Error('2d context not supported or canvas already initialized')

			ctx.fillStyle = value

			return ctx.fillStyle
		} else if (value.length === 4 || value.length === 5) {
			value = value
				.split('')
				.map((v, i) => (i ? (i < 4 ? v + v : v === 'f' ? undefined : v + v) : '#'))
				.join('')

			return value
		} else if (value.length === 7) {
			return value
		} else if (value.length === 9) {
			return value.endsWith('ff') ? value.slice(0, 7) : value
		}

		return '#000000'
	}

	public toRgb(value: string): IColor['rgb'] {
		const rgb: string[] = value.match(/\d+(\.\d+)?/gu) ?? []

		const [r, g, b, a] = Array.from({ length: 4 }).map((_, i) =>
			clamp(+(rgb[i] ?? (i < 3 ? 0 : 1)), 0, i < 3 ? 255 : 1)
		)

		return { r, g, b, a }
	}

	public toHsv(value: string): IColor['hsv'] {
		const hsv: string[] = value.match(/\d+(\.\d+)?/gu) ?? []

		const [h, s, v, a] = Array.from({ length: 4 }).map((_, i) =>
			clamp(+(hsv[i] ?? (i < 3 ? 0 : 1)), 0, i ? (i < 3 ? 100 : 1) : 360)
		)

		return { h, s, v, a }
	}

	public hex2rgb(hex: IColor['hex']): IColor['rgb'] {
		hex = hex.slice(1)

		let [r, g, b, a] = Array.from({ length: 4 }).map((_, i) =>
			parseInt(hex.slice(i * 2, i * 2 + 2), 16)
		)

		a = Number.isNaN(a) ? 1 : a / 255

		return { r, g, b, a }
	}

	public rgb2hsv({ r, g, b, a }: IColor['rgb']): IColor['hsv'] {
		r /= 255
		g /= 255
		b /= 255

		const max = Math.max(r, g, b)
		const d = max - Math.min(r, g, b)

		const h = d
			? (max === r
					? (g - b) / d + (g < b ? 6 : 0)
					: max === g
					? 2 + (b - r) / d
					: 4 + (r - g) / d) * 60
			: 0
		const s = max ? (d / max) * 100 : 0
		const v = max * 100

		return { h, s, v, a }
	}

	public hsv2rgb({ h, s, v, a }: IColor['hsv']): IColor['rgb'] {
		s /= 100
		v /= 100

		const i = ~~(h / 60)
		const f = h / 60 - i
		const p = v * (1 - s)
		const q = v * (1 - s * f)
		const t = v * (1 - s * (1 - f))
		const index = i % 6

		const r = [v, q, p, p, t, v][index] * 255
		const g = [t, v, v, q, p, p][index] * 255
		const b = [p, p, t, v, v, q][index] * 255

		return { r, g, b, a }
	}

	public rgb2hex({ r, g, b, a }: IColor['rgb']): IColor['hex'] {
		const [rr, gg, bb, aa] = [r, g, b, a].map((v, i) =>
			Math.round(i < 3 ? v : v * 255)
				.toString(16)
				.padStart(2, '0')
		)

		return ['#', rr, gg, bb, aa === 'ff' ? undefined : aa].join('')
	}

	public rgbToGlsl(rgb: IColor['rgb']): IColor['glsl'] {
		const x = parseFloat((rgb.r / 255).toFixed(3))
		const y = parseFloat((rgb.g / 255).toFixed(3))
		const z = parseFloat((rgb.b / 255).toFixed(3))
		const w = rgb.a
		return { x, y, z, w }
	}

	public glslToRgb(glsl: IColor['glsl']): IColor['rgb'] {
		const r = Math.round(glsl.x * 255)
		const g = Math.round(glsl.y * 255)
		const b = Math.round(glsl.z * 255)
		const a = glsl.w // Assuming alpha is already in the correct range
		return { r, g, b, a }
	}

	public rgbToHsl({ r, g, b, a }: IColor['rgb']): IColor['hsl'] {
		r /= 255
		g /= 255
		b /= 255

		const max = Math.max(r, g, b)
		const min = Math.min(r, g, b)
		let h = 0,
			s,
			l = (max + min) / 2

		if (max === min) {
			h = s = 0 // achromatic
		} else {
			const d = max - min
			s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

			switch (max) {
				case r:
					h = (g - b) / d + (g < b ? 6 : 0)
					break
				case g:
					h = (b - r) / d + 2
					break
				case b:
					h = (r - g) / d + 4
					break
			}

			h /= 6
		}

		h = Math.round(h * 360)
		s = Math.round(s * 100)
		l = Math.round(l * 100)

		return { h, s, l, a }
	}

	public hslToRgb({ h, s, l, a }: IColor['hsl']): IColor['rgb'] {
		s /= 100
		l /= 100

		const k = (n: number) => (n + h / 30) % 12
		const p = s * Math.min(l, 1 - l)
		const f = (n: number) => l - p * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))

		const r = Math.round(f(0) * 255)
		const g = Math.round(f(8) * 255)
		const b = Math.round(f(4) * 255)

		return { r, g, b, a }
	}
}

export const ColorUtils = new ColorUtilsStatic()

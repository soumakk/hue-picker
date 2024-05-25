import { SlidersHorizontal } from 'lucide-react'
import { useContext } from 'react'
import { ColorContext } from '../lib/ColorContext'
import { ColorUtils } from '../lib/ColorUtils'
import { GLSL_MAX } from '../utils/const'
import { formatGLSL } from '../utils/helpers'
import Controls from './Controls'

export default function GLSLControls() {
	const { color, setColor } = useContext(ColorContext)

	function handleInputChange(key: string, value: string) {
		let parsedValue = value ? parseFloat(value) : 0
		if (parsedValue > GLSL_MAX) {
			parsedValue = 1
		}
		setColor(ColorUtils.convert('glsl', Object.assign(color.glsl, { [key]: parsedValue })))
	}

	function handleSliderChange(key: string, value: number) {
		setColor(ColorUtils.convert('glsl', Object.assign(color.glsl, { [key]: value })))
	}

	return (
		<div className="">
			<p className="text-slate-500 font-semibold uppercase text-sm">GLSL</p>

			<div className="flex items-center gap-2 my-2">
				<div className="flex-1">
					<div className="inline-block px-4 py-2 bg-zinc-100 rounded-lg font-semibold text-zinc-800">{formatGLSL(color.glsl)}</div>
				</div>
				<button className="hover:bg-zinc-100 h-10 w-10 rounded-full grid place-content-center">
					<SlidersHorizontal className="h-5 w-5" />
				</button>
			</div>

			<div className="space-y-4">
				<Controls
					max={GLSL_MAX}
					step={0.001}
					value={`${color.glsl.x}`}
					title="x"
					handleInputChange={(value) => handleInputChange('x', value)}
					handleSliderChange={(value) => handleSliderChange('x', value)}
				/>
				<Controls
					max={GLSL_MAX}
					step={0.001}
					value={`${color.glsl.y}`}
					title="y"
					handleInputChange={(value) => handleInputChange('y', value)}
					handleSliderChange={(value) => handleSliderChange('y', value)}
				/>
				<Controls
					max={GLSL_MAX}
					step={0.001}
					value={`${color.glsl.z}`}
					title="z"
					handleInputChange={(value) => handleInputChange('z', value)}
					handleSliderChange={(value) => handleSliderChange('z', value)}
				/>
				<Controls
					max={1}
					step={0.001}
					value={`${color.glsl.w === 0 || color.glsl.w === 1 ? color.glsl.w : color.glsl.w.toFixed(2)}`}
					title="w"
					handleInputChange={(value) => handleInputChange('w', value)}
					handleSliderChange={(value) => handleSliderChange('w', value)}
				/>
			</div>
		</div>
	)
}

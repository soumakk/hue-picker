import { SlidersHorizontal } from 'lucide-react'
import { useContext } from 'react'
import ColorCodeDisplay from '../lib/ColorCodeDisplay'
import { ColorContext } from '../lib/ColorContext'
import { ColorUtils } from '../lib/ColorUtils'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion'
import { RGB_MAX } from '../utils/const'
import { formatRGB } from '../utils/helpers'
import Controls from './Controls'

export default function RGBControls() {
	const { color, setColor } = useContext(ColorContext)

	function handleInputChange(key: string, value: string) {
		let parsedValue
		if (key === 'a') {
			parsedValue = value ? parseFloat(value) : 0
		} else {
			parsedValue = value ? parseInt(value) : 0
			if (parsedValue > RGB_MAX) {
				parsedValue = 255
			}
		}

		setColor(ColorUtils.convert('rgb', Object.assign(color.rgb, { [key]: parsedValue })))
	}

	function handleSliderChange(key: string, value: number) {
		setColor(ColorUtils.convert('rgb', Object.assign(color.rgb, { [key]: value })))
	}

	return (
		<div className="">
			<Accordion type="single" collapsible>
				<AccordionItem value="rgb">
					<AccordionTrigger
						className="py-1 justify-start"
						trigger={
							<div className="hover:bg-zinc-100 h-8 w-8 rounded-full grid place-content-center">
								<SlidersHorizontal className="h-4 w-4" />
							</div>
						}
					>
						<p className="text-slate-500 font-semibold uppercase text-sm">RGB</p>
					</AccordionTrigger>

					<AccordionContent className="space-y-4 p-2">
						<Controls
							max={RGB_MAX}
							step={1}
							value={parseInt(`${color.rgb.r}`).toFixed(0)}
							title="Red"
							handleInputChange={(value) => handleInputChange('r', value)}
							handleSliderChange={(value) => handleSliderChange('r', value)}
						/>
						<Controls
							max={RGB_MAX}
							step={1}
							value={parseInt(`${color.rgb.g}`).toFixed(0)}
							title="Green"
							handleInputChange={(value) => handleInputChange('g', value)}
							handleSliderChange={(value) => handleSliderChange('g', value)}
						/>
						<Controls
							max={RGB_MAX}
							step={1}
							value={parseInt(`${color.rgb.b}`).toFixed(0)}
							title="Blue"
							handleInputChange={(value) => handleInputChange('b', value)}
							handleSliderChange={(value) => handleSliderChange('b', value)}
						/>
						<Controls
							max={1}
							step={0.001}
							value={`${color.rgb.a === 0 || color.rgb.a === 1 ? color.rgb.a : color.rgb.a.toFixed(2)}`}
							title="Alpha"
							handleInputChange={(value) => handleInputChange('a', value)}
							handleSliderChange={(value) => handleSliderChange('a', value)}
						/>
					</AccordionContent>
				</AccordionItem>
			</Accordion>

			<ColorCodeDisplay text={formatRGB(color.rgb)} />
		</div>
	)
}

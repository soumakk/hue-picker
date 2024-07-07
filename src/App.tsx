import { useContext } from 'react'
import { CirclePicker } from 'react-color'
import { ColorPicker } from 'react-color-palette'
import 'react-color-palette/css'
import ColorInfo from './components/ColorInfo'
import { ColorContext } from './lib/ColorContext'
import { ColorUtils } from './lib/ColorUtils'

function App() {
	const { color, setColor } = useContext(ColorContext)
	return (
		<div className="max-w-5xl mx-auto p-5">
			<div className="flex justify-center">
				<h1 className="text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-green-500 inline-block mx-auto text-4xl mt-4 mb-10 font-medium">
					Hue Picker
				</h1>
			</div>
			<div className="grid grid-cols-2 gap-8">
				<div className="">
					<ColorPicker height={400} color={color} onChange={(color) => setColor(ColorUtils.convert('rgb', color.rgb))} hideInput />
					<CirclePicker width="100%" color={color.hex} onChangeComplete={(color) => setColor(ColorUtils.convert('hex', color.hex))} />
				</div>
				<ColorInfo />
			</div>
		</div>
	)
}

export default App

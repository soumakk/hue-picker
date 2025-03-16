import GLSLControls from './GLSLControls'
import HSLControls from './HSLControls'
import HSVControls from './HSVControls'
import HexControls from './HexControls'
import RGBControls from './RGBControls'

export default function ColorInfo() {
	return (
		<div className="px-4 space-y-5 py-6">
			<HexControls />
			<RGBControls />
			<HSVControls />
			<HSLControls />
			<GLSLControls />

			{/* <div className="flex items-center gap-4">
				<p className="text-slate-500 font-semibold uppercase text-sm">cmyk</p>
				<p className="text-slate-800 font-semibold">{cmyk.c}</p>
				<p className="text-slate-800 font-semibold">{cmyk.m}</p>
				<p className="text-slate-800 font-semibold">{cmyk.y}</p>
				<p className="text-slate-800 font-semibold">{cmyk.k}</p>
			</div> */}
		</div>
	)
}

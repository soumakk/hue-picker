import { Slider } from "../../ui/slider";
import { MIN } from "../../utils/const";

export default function Controls({
  max,
  min,
  step,
  value,
  title,
  handleInputChange,
  handleSliderChange,
}: {
  min?: number;
  max: number;
  step: number;
  value: string;
  title: string;
  handleInputChange: (value: string) => void;
  handleSliderChange: (value: number) => void;
}) {
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <p className="font-medium">{title}</p>
        <input
          type="number"
          min={MIN}
          max={max}
          step={step}
          value={value}
          onChange={(e) => handleInputChange(e.target.value)}
          onClick={(e: any) => e.target.select()}
          className="w-16 ring-1 ring-zinc-200 bg-zinc-100 rounded-md px-2 py-1 select-all"
        />
      </div>

      <Slider
        value={[Number(value)]}
        min={MIN}
        max={max}
        step={step}
        onValueChange={(values: number[]) => handleSliderChange(values[0])}
      />
    </div>
  );
}

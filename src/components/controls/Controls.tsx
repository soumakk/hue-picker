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
  trackColor,
}: {
  min?: number;
  max: number;
  step: number;
  value: string;
  title: string;
  handleInputChange: (value: string) => void;
  handleSliderChange: (value: number) => void;
  trackColor?: string;
}) {
  return (
    <div className="flex justify-between gap-5 items-center">
      <p className="font-medium w-20 text-sm text-neutral-600">{title}</p>

      <div className="flex-1">
        <Slider
          value={[Number(value)]}
          min={MIN}
          max={max}
          step={step}
          onValueChange={(value) => {
            handleSliderChange(value as number);
          }}
          trackColor={trackColor}
        />
      </div>

      <input
        type="number"
        min={MIN}
        max={max}
        step={step}
        value={value}
        onChange={(e) => handleInputChange(e.target.value)}
        onClick={(e: any) => e.target.select()}
        className="w-16 ring-1 ring-neutral-200 rounded-md px-2 py-1 select-all"
      />
    </div>
  );
}

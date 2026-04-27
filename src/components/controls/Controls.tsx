import { Slider } from "../../ui/slider";
import { MIN } from "../../utils/const";
import { NumberInput } from "../utils/NumberInput";

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

      <NumberInput
        min={MIN}
        max={max}
        step={step}
        value={value}
        onChange={(value) => handleInputChange(value)}
      />
    </div>
  );
}

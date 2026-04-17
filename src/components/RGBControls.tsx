import { useContext } from "react";
import ColorCodeDisplay from "../lib/ColorCodeDisplay";
import { ColorContext } from "../lib/ColorContext";
import { ColorUtils } from "../lib/ColorUtils";
import { RGB_MAX } from "../utils/const";
import { formatRGB } from "../utils/helpers";
import Controls from "./Controls";

export default function RGBControls() {
  const { color, setColor } = useContext(ColorContext);

  function handleInputChange(key: string, value: string) {
    let parsedValue;
    if (key === "a") {
      parsedValue = value ? parseFloat(value) : 0;
    } else {
      parsedValue = value ? parseInt(value) : 0;
      if (parsedValue > RGB_MAX) {
        parsedValue = 255;
      }
    }

    setColor(
      ColorUtils.convert(
        "rgb",
        Object.assign(color.rgb, { [key]: parsedValue }),
      ),
    );
  }

  function handleSliderChange(key: string, value: number) {
    setColor(
      ColorUtils.convert("rgb", Object.assign(color.rgb, { [key]: value })),
    );
  }

  return (
    <div className="flex flex-col gap-8 my-5 px-2">
      <ColorCodeDisplay text={formatRGB(color.rgb)} />
      <Controls
        max={RGB_MAX}
        step={1}
        value={parseInt(`${color.rgb.r}`).toFixed(0)}
        title="Red"
        handleInputChange={(value) => handleInputChange("r", value)}
        handleSliderChange={(value) => handleSliderChange("r", value)}
      />
      <Controls
        max={RGB_MAX}
        step={1}
        value={parseInt(`${color.rgb.g}`).toFixed(0)}
        title="Green"
        handleInputChange={(value) => handleInputChange("g", value)}
        handleSliderChange={(value) => handleSliderChange("g", value)}
      />
      <Controls
        max={RGB_MAX}
        step={1}
        value={parseInt(`${color.rgb.b}`).toFixed(0)}
        title="Blue"
        handleInputChange={(value) => handleInputChange("b", value)}
        handleSliderChange={(value) => handleSliderChange("b", value)}
      />
      <Controls
        max={1}
        step={0.001}
        value={`${color.rgb.a === 0 || color.rgb.a === 1 ? color.rgb.a : color.rgb.a.toFixed(2)}`}
        title="Alpha"
        handleInputChange={(value) => handleInputChange("a", value)}
        handleSliderChange={(value) => handleSliderChange("a", value)}
      />
    </div>
  );
}

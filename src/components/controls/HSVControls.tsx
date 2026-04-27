import { useContext } from "react";
import { HUE_MAX, PCT_MAX } from "../../utils/const";
import Controls from "./Controls";
import { ColorContext } from "../lib/ColorContext";
import { ColorUtils } from "../lib/ColorUtils";

export default function HSVControls() {
  const { color, setColor } = useContext(ColorContext);

  function handleInputChange(key: string, value: string) {
    let parsedValue;
    if (key === "a") {
      parsedValue = value ? parseFloat(value) : 0;
    } else if (key === "h") {
      parsedValue = value ? parseInt(value) : 0;
      if (parsedValue > HUE_MAX) {
        parsedValue = HUE_MAX;
      }
    } else {
      parsedValue = value ? parseInt(value) : 0;
      if (parsedValue > PCT_MAX) {
        parsedValue = PCT_MAX;
      }
    }

    setColor(
      ColorUtils.convert(
        "hsv",
        Object.assign(color.hsv, { [key]: parsedValue }),
      ),
    );
  }

  function handleSliderChange(key: string, value: number) {
    setColor(
      ColorUtils.convert("hsv", Object.assign(color.hsv, { [key]: value })),
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <Controls
        max={HUE_MAX}
        step={1}
        value={Math.round(color.hsv.h).toFixed(0)}
        title="Hue"
        handleInputChange={(value) => handleInputChange("h", value)}
        handleSliderChange={(value) => handleSliderChange("h", value)}
        trackColor={getHsvSliderGradient("h", color.hsv)}
      />
      <Controls
        max={PCT_MAX}
        step={1}
        value={Math.round(color.hsv.s).toFixed(0)}
        title="Saturation"
        handleInputChange={(value) => handleInputChange("s", value)}
        handleSliderChange={(value) => handleSliderChange("s", value)}
        trackColor={getHsvSliderGradient("s", color.hsv)}
      />
      <Controls
        max={PCT_MAX}
        step={1}
        value={Math.round(color.hsv.v).toFixed(0)}
        title="Value"
        handleInputChange={(value) => handleInputChange("v", value)}
        handleSliderChange={(value) => handleSliderChange("v", value)}
        trackColor={getHsvSliderGradient("v", color.hsv)}
      />
      {/*<Controls
              max={1}
              step={0.001}
              value={`${color.hsv.a === 0 || color.hsv.a === 1 ? color.hsv.a : color.hsv.a.toFixed(2)}`}
              title="Alpha"
              handleInputChange={(value) => handleInputChange("a", value)}
              handleSliderChange={(value) => handleSliderChange("a", value)}
            />*/}
    </div>
  );
}

function getHsvSliderGradient(
  type: "h" | "s" | "v",
  hsv: { h: number; s: number; v: number },
) {
  const { h } = hsv;

  if (type === "h") {
    return `linear-gradient(to right,
      rgb(255,0,0),
      rgb(255,255,0),
      rgb(0,255,0),
      rgb(0,255,255),
      rgb(0,0,255),
      rgb(255,0,255),
      rgb(255,0,0)
    )`;
  }

  if (type === "s") {
    return `linear-gradient(to right, hsl(0,0%,50%), hsl(${h}, 100%, 50%))`;
  }

  if (type === "v") {
    return `linear-gradient(to right, hsl(0,0%,0%), hsl(${h}, 100%, 50%))`;
  }
}

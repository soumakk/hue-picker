import React, { useContext } from "react";
import { ColorPicker, Hue, Alpha } from "react-color-palette";
import "react-color-palette/css";
import { HUE_MAX, MIN, PCT_MAX } from "../../utils/const";
import { ColorContext } from "../lib/ColorContext";
import { ColorUtils } from "../lib/ColorUtils";

export default function ColorPickerCard() {
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

  return (
    <div className=" border shadow-sm rounded-2xl">
      <div className="px-5 py-5 flex flex-col gap-3 border-b">
        <h3 className="text-base font-medium">Color Picker</h3>
        <div id="main-picker">
          <ColorPicker
            height={400}
            color={color}
            onChange={(color) => {
              setColor(ColorUtils.convert("hsv", color.hsv));
            }}
            hideInput
            hideAlpha
          />
        </div>

        <div className="flex items-center gap-4">
          <p className="text-sm w-12">Hue</p>
          <Hue
            color={color}
            onChange={(color) => {
              setColor(ColorUtils.convert("hsv", color.hsv));
            }}
          />
          <input
            type="number"
            min={MIN}
            max={HUE_MAX}
            step={1}
            value={Math.round(color.hsv.h).toFixed(0)}
            onChange={(e) => handleInputChange("h", e.target.value)}
            onClick={(e: any) => e.target.select()}
            className="w-16 ml-2 ring-1 ring-neutral-200 rounded-md px-2 py-1 select-all"
          />
        </div>

        <div className="flex items-center gap-4">
          <p className="text-sm w-12">Alpha</p>
          <Alpha
            color={color}
            onChange={(color) => {
              setColor(ColorUtils.convert("hsv", color.hsv));
            }}
          />
          <input
            type="number"
            min={MIN}
            max={1}
            step={0.001}
            value={`${color.hsv.a === 0 || color.hsv.a === 1 ? color.hsv.a : color.hsv.a.toFixed(2)}`}
            onChange={(e) => handleInputChange("a", e.target.value)}
            onClick={(e: any) => e.target.select()}
            className="w-16 ml-2 ring-1 ring-neutral-200 rounded-md px-2 py-1 select-all"
          />
        </div>
      </div>

      <div className="p-5 flex flex-col gap-3">
        <h3 className="text-base font-medium">Preview</h3>
        <div className="w-full flex h-10 rounded-lg overflow-hidden">
          <div className="flex-1" style={{ backgroundColor: color.hex }}></div>
          <div
            className="flex-1"
            style={{
              background: `linear-gradient( 
                        rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a}),
                        rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})) left top / auto, 
                        conic-gradient(rgb(102, 102, 102) 0.25turn,
                        rgb(153, 153, 153) 0.25turn, rgb(153, 153, 153) 0.5turn, rgb(102, 102, 102) 0.5turn, 
                        rgb(102, 102, 102) 0.75turn, rgb(153, 153, 153) 0.75turn) left top / 12px 12px repeat`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}

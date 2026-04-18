import { Disclosure, DisclosurePanel } from "@headlessui/react";
import { useContext } from "react";
import ColorCodeDisplay from "../lib/ColorCodeDisplay";
import { ColorContext } from "../lib/ColorContext";
import { ColorUtils } from "../lib/ColorUtils";
import { GLSL_MAX } from "../utils/const";
import { formatGLSL } from "../utils/helpers";
import Controls from "./Controls";

export default function GLSLControls() {
  const { color, setColor } = useContext(ColorContext);

  function handleInputChange(key: string, value: string) {
    let parsedValue = value ? parseFloat(value) : 0;
    if (parsedValue > GLSL_MAX) {
      parsedValue = 1;
    }
    setColor(
      ColorUtils.convert(
        "glsl",
        Object.assign(color.glsl, { [key]: parsedValue }),
      ),
    );
  }

  function handleSliderChange(key: string, value: number) {
    setColor(
      ColorUtils.convert("glsl", Object.assign(color.glsl, { [key]: value })),
    );
  }

  return (
    <div className="flex flex-col gap-5 my-5">
      <Disclosure>
        <ColorCodeDisplay
          type="GLSL"
          values={{
            code: formatGLSL(color.glsl),
            value: formatGLSL(color.glsl, {
              prefix: false,
            }),
          }}
        />

        <DisclosurePanel
          transition
          className="origin-top transition duration-200 ease-out data-closed:-translate-y-6 data-closed:opacity-0"
        >
          <div className="ring-1 ring-slate-200 p-5 rounded-xl flex flex-col gap-6">
            <Controls
              max={GLSL_MAX}
              step={0.001}
              value={`${color.glsl.x}`}
              title="x"
              handleInputChange={(value) => handleInputChange("x", value)}
              handleSliderChange={(value) => handleSliderChange("x", value)}
            />
            <Controls
              max={GLSL_MAX}
              step={0.001}
              value={`${color.glsl.y}`}
              title="y"
              handleInputChange={(value) => handleInputChange("y", value)}
              handleSliderChange={(value) => handleSliderChange("y", value)}
            />
            <Controls
              max={GLSL_MAX}
              step={0.001}
              value={`${color.glsl.z}`}
              title="z"
              handleInputChange={(value) => handleInputChange("z", value)}
              handleSliderChange={(value) => handleSliderChange("z", value)}
            />
            {/*<Controls
              max={1}
              step={0.001}
              value={`${color.glsl.w === 0 || color.glsl.w === 1 ? color.glsl.w : color.glsl.w.toFixed(2)}`}
              title="w"
              handleInputChange={(value) => handleInputChange("w", value)}
              handleSliderChange={(value) => handleSliderChange("w", value)}
            />*/}
          </div>
        </DisclosurePanel>
      </Disclosure>
    </div>
  );
}

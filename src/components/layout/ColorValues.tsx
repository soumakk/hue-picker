import { useContext, useState } from "react";
import {
  formatGLSL,
  formatHEX,
  formatHSV,
  formatOKLCH,
  formatRGB,
  Formats,
} from "../../utils/helpers";
import ColorCodeDisplay from "./ColorCodeDisplay";
import { ColorContext } from "../lib/ColorContext";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { useAtom } from "jotai";
import { activeFormatAtom } from "../../utils/atoms";

const formats = [
  {
    label: "JS/CSS code",
    value: Formats.Code,
  },
  {
    label: "Raw values",
    value: Formats.Raw,
  },
  {
    label: "JSON object",
    value: Formats.Json,
  },
];

export default function ColorValues() {
  const { color } = useContext(ColorContext);
  const [active, setActive] = useAtom(activeFormatAtom);

  return (
    <div className="p-5 flex flex-col gap-3">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-medium ">Color Values</h3>

        <Select value={active} onValueChange={setActive} items={formats}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {formats?.map((f) => (
                <SelectItem value={f.value} key={f.value}>
                  {f.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <ColorCodeDisplay
        type="HEX"
        text={formatHEX(color.hex.toUpperCase(), { format: active })}
        noControls
      />
      <ColorCodeDisplay
        type="RGB"
        text={formatRGB(color.rgb, { format: active })}
      />
      <ColorCodeDisplay
        type="HSV"
        text={formatHSV(color.hsv, { format: active })}
      />
      <ColorCodeDisplay
        type="GLSL"
        text={formatGLSL(color.glsl, { format: active })}
      />
      <ColorCodeDisplay
        type="OKLCH"
        text={formatOKLCH(color.oklch, { format: active })}
      />
    </div>
  );
}

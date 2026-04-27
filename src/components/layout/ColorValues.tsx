import React, { useContext } from "react";
import HexControls from "../controls/HexControls";
import RGBControls from "../controls/RGBControls";
import ColorCodeDisplay from "./ColorCodeDisplay";
import {
  formatGLSL,
  formatHSV,
  formatOKLCH,
  formatRGB,
} from "../../utils/helpers";
import { ColorContext } from "./lib/ColorContext";

export default function ColorValues() {
  const { color } = useContext(ColorContext);

  return (
    <div className="p-5 flex flex-col gap-3">
      <h3 className="font-medium">Color Values</h3>

      <ColorCodeDisplay type="HEX" text={color.hex.toUpperCase()} noControls />
      <ColorCodeDisplay type="RGB" text={formatRGB(color.rgb)} />
      <ColorCodeDisplay type="HSV" text={formatHSV(color.hsv)} />
      <ColorCodeDisplay type="GLSL" text={formatGLSL(color.glsl)} />
      <ColorCodeDisplay type="OKLCH" text={formatOKLCH(color.oklch)} />
    </div>
  );
}

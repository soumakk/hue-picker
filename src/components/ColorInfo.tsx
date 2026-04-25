import ColorInput from "./ColorInputBox";
import ColorName from "./ColorName";
import GLSLControls from "./controls/GLSLControls";
import HexControls from "./controls/HexControls";
import HSVControls from "./controls/HSVControls";
import OKLCHControls from "./controls/OKLCHControls";
import RGBControls from "./controls/RGBControls";

export default function ColorInfo() {
  return (
    <div className="px-4 space-y-5 py-6">
      <ColorInput />

      <HexControls />
      <ColorName />
      <RGBControls />
      <HSVControls />
      <GLSLControls />
      <OKLCHControls />
    </div>
  );
}

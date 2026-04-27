import ColorInput from "../ColorInputBox";
import ColorAdjustment from "./ColorAdjustment";
import ColorValues from "./ColorValues";

export default function ColorControls() {
  return (
    <div className="border shadow-sm rounded-2xl divide-y">
      <ColorInput />
      <ColorValues />
      <ColorAdjustment />
    </div>
  );
}

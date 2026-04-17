import { useContext } from "react";
import { ColorContext } from "../lib/ColorContext";
import ColorCodeDisplay from "../lib/ColorCodeDisplay";
import { formatOKLCH } from "../utils/helpers";

export default function OKLCHControls() {
  const { color } = useContext(ColorContext);

  return (
    <div className="flex flex-col gap-8 my-5 px-2">
      <div className="text-slate-800 font-semibold ">
        <ColorCodeDisplay text={formatOKLCH(color.oklch)} />
      </div>
    </div>
  );
}

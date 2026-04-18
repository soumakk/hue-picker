import { useContext } from "react";
import { ColorContext } from "../lib/ColorContext";
import ColorCodeDisplay from "../lib/ColorCodeDisplay";

export default function HexControls() {
  const { color } = useContext(ColorContext);

  return (
    <div className="flex flex-col gap-8 my-5">
      <div className="text-slate-800 uppercase">
        <ColorCodeDisplay type="HEX" text={color.hex} noControls />
        {/* <input value={color.hex} className="ring-1 ring-zinc-300 px-3 py-1.5 rounded-lg" /> */}
      </div>
    </div>
  );
}

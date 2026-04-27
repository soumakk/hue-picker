import { useContext } from "react";
import { ColorContext } from "./layout/lib/ColorContext";
import ColorCodeDisplay from "./layout/ColorCodeDisplay";
import { colornames } from "color-name-list";

export default function ColorName() {
  const { color } = useContext(ColorContext);

  const matchingColor = colornames.find((c) => c.hex === color.hex);

  return (
    <div className="flex flex-col gap-8 my-5">
      <div className="text-slate-800 ">
        <ColorCodeDisplay
          type="NAME"
          text={matchingColor?.name ?? "-"}
          noControls
        />
        {/* <input value={color.hex} className="ring-1 ring-zinc-300 px-3 py-1.5 rounded-lg" /> */}
      </div>
    </div>
  );
}

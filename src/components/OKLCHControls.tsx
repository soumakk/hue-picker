import { useContext } from "react";
import { ColorContext } from "../lib/ColorContext";
import ColorCodeDisplay from "../lib/ColorCodeDisplay";
import { formatOKLCH } from "../utils/helpers";

export default function OKLCHControls() {
  const { color } = useContext(ColorContext);

  return (
    <div className="flex flex-col gap-8 my-5">
      <div className="text-slate-800 font-semibold ">
        <ColorCodeDisplay
          type="OKLCH"
          values={{
            code: formatOKLCH(color.oklch),
            value: formatOKLCH(color.oklch, {
              prefix: false,
            }),
          }}
          noControls
        />
      </div>
    </div>
  );
}

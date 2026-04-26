import React, { useContext } from "react";
import { ColorContext } from "../lib/ColorContext";
import { ColorUtils, generateVariants } from "../lib/ColorUtils";
import { cn } from "../utils/helpers";

export default function ColorPreview() {
  const { color, setColor } = useContext(ColorContext);
  const variants = generateVariants(color.rgb);

  return (
    <div className="flex items-center w-full gap-0">
      {variants?.map((v, idx) => (
        <button
          key={idx}
          className={cn(
            "h-12 flex-1  hover:flex-[2] transition-[flex] duration-200 outline-1 outline-offset-2 cursor-pointer ring-1 ring-black/5",
          )}
          onClick={() => setColor(ColorUtils.convert("rgb", v))}
          style={{ backgroundColor: ColorUtils.rgb2hex(v) }}
        ></button>
      ))}
    </div>
  );
}

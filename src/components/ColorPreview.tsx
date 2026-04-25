import React, { useContext } from "react";
import { ColorContext } from "../lib/ColorContext";
import { ColorUtils, generateVariants } from "../lib/ColorUtils";
import { cn } from "../utils/helpers";

export default function ColorPreview() {
  const { color, setColor } = useContext(ColorContext);
  const variants = generateVariants(color.rgb);

  return (
    <div className="flex items-center w-full gap-2">
      {variants?.map((v, idx) => (
        <button
          key={idx}
          className={cn(
            "h-20 flex-1 rounded-2xl hover:flex-[2] transition-[flex] duration-200 outline-1 outline-offset-2 cursor-pointer ring-1 ring-black/5",
            {
              "flex-[1.5] rounded-full cursor-default": idx === 2,
            },
          )}
          onClick={() => setColor(ColorUtils.convert("rgb", v))}
          style={{ backgroundColor: ColorUtils.rgb2hex(v) }}
        ></button>
      ))}
    </div>
  );
}

import React, { useContext } from "react";
import { ColorContext } from "../lib/ColorContext";
import { ColorUtils, generateVariants, IColorVariant } from "../lib/ColorUtils";
import { cn } from "../utils/helpers";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import useCopyToClipboard from "../utils/useCopyToClipboard";
import { toast } from "sonner";

export default function ColorPreview() {
  const { color } = useContext(ColorContext);
  const variants = generateVariants(color.rgb);

  return (
    <div className="border shadow-sm rounded-lg p-5 flex flex-col gap-3">
      <ColorPallete title="Shades" colors={variants.shades} />
      <ColorPallete title="Tints" colors={variants.tints} />
    </div>
  );
}

function ColorPallete({
  title,
  colors,
}: {
  title: string;
  colors: IColorVariant[];
}) {
  const { copyToClipboard } = useCopyToClipboard();
  function onCopy(text: string) {
    copyToClipboard(text);
    toast.success(`${text} is copied to clipboard`);
  }
  return (
    <>
      <h3 className="text-base font-medium">{title}</h3>

      <div className="flex items-center w-full gap-0 rounded-lg overflow-hidden">
        {colors?.map((v, idx) => (
          <Tooltip key={idx}>
            <TooltipTrigger
              render={
                <button
                  className={cn(
                    "h-12 flex-1 hover:flex-[2] transition-[flex] duration-200 outline-1 outline-offset-2 cursor-pointer",
                  )}
                  onClick={() => onCopy(ColorUtils.rgb2hex(v.color))}
                  style={{ backgroundColor: ColorUtils.rgb2hex(v.color) }}
                >
                  <span
                    className={cn(
                      "text-xs",
                      v.luminance > 0.5 ? "text-black" : "text-white",
                    )}
                  >
                    {v.pct}%
                  </span>
                </button>
              }
            ></TooltipTrigger>
            <TooltipContent>
              <span>{ColorUtils.rgb2hex(v.color)}</span>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </>
  );
}

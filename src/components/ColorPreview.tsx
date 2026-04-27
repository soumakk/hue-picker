import { useContext } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { cn } from "../utils/helpers";
import useCopyToClipboard from "../utils/useCopyToClipboard";
import { ColorContext } from "./layout/lib/ColorContext";
import { ColorUtils } from "./layout/lib/ColorUtils";
import { generateVariants, IColorVariant } from "./layout/lib/Utils";
import { HoverInfoPopover } from "./utils/HoverInfoPopover";

export default function ColorPreview() {
  const { color } = useContext(ColorContext);
  const variants = generateVariants(color.rgb);

  return (
    <div className="relative border shadow-sm rounded-2xl p-5 flex flex-col gap-3">
      <HoverInfoPopover
        bodyContent={
          <div className="flex flex-col gap-3 p-1">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="flex h-3 w-3 rounded-full bg-blue-300"></span>
                <h4 className="font-medium text-neutral-900">Tints</h4>
              </div>
              <p className="text-sm text-neutral-600 leading-snug">
                Your base color mixed with <strong>white</strong>. This makes it
                lighter, creating softer or pastel variations.
              </p>
            </div>

            <div className="h-px w-full bg-neutral-200"></div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="flex h-3 w-3 rounded-full bg-blue-900"></span>
                <h4 className="font-medium text-neutral-900">Shades</h4>
              </div>
              <p className="text-sm text-neutral-600 leading-snug">
                Your base color mixed with <strong>black</strong>. This makes it
                darker, creating deeper or richer variations.
              </p>
            </div>
          </div>
        }
      />

      <ColorPallete title="Tints" colors={variants.tints} />
      <ColorPallete title="Shades" colors={variants.shades} />
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
                  onClick={() =>
                    copyToClipboard(ColorUtils.rgb2hex(v.color)?.toUpperCase())
                  }
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
              <span className="uppercase">{ColorUtils.rgb2hex(v.color)}</span>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </>
  );
}

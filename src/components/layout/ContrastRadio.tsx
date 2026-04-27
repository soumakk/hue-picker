import { Check, Copy } from "lucide-react";
import { useContext, useMemo, useState } from "react";
import { ColorPicker } from "react-color-palette";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { cn } from "../../utils/helpers";
import useCopyToClipboard from "../../utils/useCopyToClipboard";
import { HoverInfoPopover } from "../utils/HoverInfoPopover";
import { ColorContext } from "../lib/ColorContext";
import { ColorUtils, IColor } from "../lib/ColorUtils";
import { getContrastRatio, getContrastLevel } from "../lib/Utils";

export default function ContrastRadio() {
  const { color, setColor } = useContext(ColorContext);
  const [foreground, setForeground] = useState(
    ColorUtils.convert("hex", "#ffffff"),
  );

  return (
    <div className=" border shadow-sm rounded-2xl relative">
      <div className="p-5 flex flex-col gap-3">
        <div className="flex items-center justify-between mb-2 ">
          <h3 className="font-medium">Contrast Checker</h3>

          <HoverInfoPopover
            bodyContent={
              <div>
                <p className="text-sm font-medium text-neutral-800">
                  What does this mean?
                </p>

                <p className="mt-1 text-sm text-neutral-600">
                  This score shows how easy your text is to read.
                </p>

                <div className="mt-3 space-y-1 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-600">AAA</span>
                    <span className="text-neutral-800 font-medium">
                      Very easy to read
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-neutral-600">AA</span>
                    <span className="text-neutral-800 font-medium">
                      Good for most people
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-neutral-600">Fail</span>
                    <span className="text-neutral-800 font-medium">
                      Hard to read
                    </span>
                  </div>
                </div>

                <p className="mt-3 text-xs text-neutral-500">
                  Based on WCAG accessibility guidelines
                </p>
              </div>
            }
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className=" flex flex-col gap-4">
            <ColorBlock color={color} title="Background" onChange={setColor} />
            <ColorBlock
              color={foreground}
              title="Foreground"
              onChange={setForeground}
            />
          </div>

          <ContrastPreview background={color.hex} foreground={foreground.hex} />
        </div>
      </div>
    </div>
  );
}

function ColorBlock({
  color,
  title,
  onChange,
}: {
  color: IColor;
  title: string;
  onChange: (value: IColor) => void;
}) {
  const { copyToClipboard, isCopied } = useCopyToClipboard();

  return (
    <div className="flex flex-col gap-2 items-stretch justify-center">
      <p className="text-sm text-neutral-500 ">{title}</p>

      <Popover>
        <PopoverTrigger>
          <div className="flex items-center gap-2 border rounded-xl p-1 bg-white hover:bg-neutral-50">
            <div
              className="h-12 w-12 rounded-lg border  "
              style={{ background: color.hex }}
            ></div>
            <p className="text-sm  text-left uppercase flex-1">{color.hex}</p>

            <button
              className="mr-2 hover:scale-110 transition-transform duration-200"
              onClick={(e) => {
                e.stopPropagation();
                copyToClipboard(color.hex?.toUpperCase());
              }}
            >
              {isCopied ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="h-4 w-4 text-neutral-500" />
              )}
            </button>
          </div>
        </PopoverTrigger>
        <PopoverContent className="shadow-md border p-0 overflow-hidden">
          <div id="mini-picker">
            <ColorPicker
              color={color}
              onChange={(color) => {
                onChange(ColorUtils.convert("hsv", color.hsv));
              }}
              // hideInput
            />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

function ContrastPreview({
  foreground,
  background,
}: {
  foreground: string;
  background: string;
}) {
  const contrast = useMemo(() => {
    const fgRgb = ColorUtils.hex2rgb(foreground);
    const bgRgb = ColorUtils.hex2rgb(background);
    const ratio = getContrastRatio(fgRgb, bgRgb);
    const level = getContrastLevel(ratio, true);

    return { ratio, level };
  }, [foreground, background]);

  return (
    <div
      className="flex flex-col justify-between rounded-xl border border-neutral-200 p-4 flex-1 col-span-2"
      style={{
        backgroundColor: background,
        color: foreground,
      }}
    >
      {/* Preview Text */}
      <div className="flex flex-1 items-center justify-center p-6">
        <h1 className="text-4xl font-semibold tracking-tight">Hello, World</h1>
      </div>

      {/* Contrast Info */}
      <div className="flex items-center justify-between">
        {/* Ratio */}
        <div className="flex flex-col items-center">
          <span className="text-2xl font-semibold">
            {contrast.ratio.toFixed(2)}
          </span>
          <span className="text-xs opacity-70">Contrast Ratio</span>
        </div>

        {/* WCAG */}
        <div className="flex flex-col items-center gap-1">
          <span
            className={cn(
              "text-sm font-medium px-3 py-1 rounded-full",
              contrast.level === "AAA" && " text-white bg-emerald-500",
              contrast.level === "AA" && " text-white bg-amber-500",
              contrast.level === "Fail" && " text-white bg-red-500",
            )}
          >
            {contrast.level}
          </span>
          <span className="text-xs opacity-70">WCAG Level</span>
        </div>
      </div>
    </div>
  );
}

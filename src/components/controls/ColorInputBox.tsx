import { ClipboardPaste, XCircle } from "lucide-react";
import { useContext, useRef } from "react";
import { ColorContext } from "../lib/ColorContext";
import { ColorUtils, parseColorToRgb } from "../lib/ColorUtils";

const ColorInput = () => {
  const { setColor } = useContext(ColorContext);
  const inputRef = useRef<HTMLInputElement>(null);

  function changeColor() {
    if (inputRef.current) {
      const result = parseColorToRgb(inputRef.current.value);

      if (!result.error) {
        // result.color is guaranteed to exist here
        setColor(ColorUtils.convert("rgb", result.color));
      }
    }
  }

  async function onPaste() {
    if (inputRef.current) {
      const text = await navigator.clipboard.readText();
      inputRef.current.value = text;
      changeColor();
    }
  }

  function onClear() {
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  return (
    <div className="p-5 flex flex-col gap-1">
      <h3 className="font-medium mb-2">Color Input</h3>

      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <input
            ref={inputRef}
            placeholder="Type or paste any color"
            type="text"
            className="h-14 w-full rounded-xl px-5 pr-24 border border-zinc-200"
            onChange={changeColor}
            // onKeyDown={(e) => {
            //   if (e.key === "Enter") {
            //     changeColor();
            //   }
            // }}
          />

          <XCircle
            onClick={onClear}
            className="absolute cursor-pointer text-neutral-400 right-4 top-1/2 -translate-y-1/2"
          />
        </div>

        <button className="border border-neutral-200 h-14 w-14 rounded-xl grid place-content-center bg-neutral-50 active:scale-110 transition-transform">
          <ClipboardPaste
            onClick={onPaste}
            className="cursor-pointer text-neutral-500 h-5 w-5"
          />
        </button>
      </div>
      <p className="text-xs text-neutral-400">
        Try: violet, #2797ff or rgb(23, 114, 204)
      </p>
    </div>
  );
};

export default ColorInput;

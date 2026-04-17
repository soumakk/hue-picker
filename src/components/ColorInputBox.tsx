import { useContext, useRef } from "react";
import { ColorUtils, parseColorToHsv } from "../lib/ColorUtils";
import { ColorContext } from "../lib/ColorContext";
import { ClipboardPaste } from "lucide-react";

const ColorInput = () => {
  const { setColor } = useContext(ColorContext);
  const inputRef = useRef<HTMLInputElement>(null);

  function changeColor() {
    if (inputRef.current) {
      const result = parseColorToHsv(inputRef.current.value);

      if (!result.error) {
        // result.color is guaranteed to exist here
        setColor(ColorUtils.convert("hsv", result.color));
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

  return (
    <div className="relative">
      <input
        ref={inputRef}
        placeholder="Type or paste any color"
        type="text"
        className="h-[48px] w-full bg-zinc-100 rounded-lg px-4 border border-zinc-200"
        onChange={changeColor}
        // onKeyDown={(e) => {
        //   if (e.key === "Enter") {
        //     changeColor();
        //   }
        // }}
      />

      <ClipboardPaste
        onClick={onPaste}
        className="absolute cursor-pointer text-zinc-600 right-4 top-1/2 -translate-y-1/2"
      />
    </div>
  );
};

export default ColorInput;

import { useContext, useRef } from "react";
import { ColorUtils, parseColorToHsv } from "../lib/ColorUtils";
import { ColorContext } from "../lib/ColorContext";
import { ClipboardPaste, Eraser } from "lucide-react";

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

  function onClear() {
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  return (
    <div className="relative">
      <input
        ref={inputRef}
        placeholder="Type or paste any color"
        type="text"
        className="h-16 w-full bg-zinc-100 rounded-xl px-5 border border-zinc-200"
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

      <Eraser
        onClick={onClear}
        className="absolute cursor-pointer text-zinc-500 right-14 top-1/2 -translate-y-1/2"
      />
    </div>
  );
};

export default ColorInput;

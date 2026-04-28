import { Clipboard, ClipboardCheck } from "lucide-react";
import { useHotkeys } from "react-hotkeys-hook";
import { cn } from "../../utils/helpers";
import useCopyToClipboard from "../../utils/useCopyToClipboard";

export default function ColorCodeDisplay({
  text,
  type,
  shortcut,
}: {
  text?: string;
  type: string;
  shortcut: string;
}) {
  const { copyToClipboard, isCopied } = useCopyToClipboard();

  useHotkeys(shortcut, (e) => {
    e.preventDefault();
    if (!isCopied) {
      if (text) {
        copyToClipboard(text);
      }
    }
  });

  function handleCopy() {
    if (!isCopied) {
      if (text) {
        copyToClipboard(text);
      }
    }
  }

  return (
    <div className="flex items-center gap-2 h-[50px]">
      <div className="w-12 text-sm text-neutral-600 font-medium">{type}</div>

      {text ? (
        <div className="flex items-center justify-between px-4 h-full border border-neutral-200 rounded-xl font-medium text-zinc-800  flex-1">
          <span className="select-all"> {text}</span>

          <div className="bg-neutral-100 rounded-md border border-neutral-200 text-neutral-500 py-1 px-2 text-xs font-semibold uppercase font-mono">
            {shortcut}
          </div>
        </div>
      ) : null}

      <button
        className={cn(
          "h-full w-14 hover:w-20 transition-all duration-150 rounded-xl grid place-content-center border border-neutral-200 active:scale-110",
          isCopied
            ? "bg-green-100 border-green-200"
            : "bg-neutral-100 border-neutral-200",
        )}
        onClick={handleCopy}
      >
        {isCopied ? (
          <div className="flex items-center gap-2 text-green-500">
            <ClipboardCheck className="h-5 w-5 " />
          </div>
        ) : (
          <Clipboard className="h-5 w-5 text-neutral-500" />
        )}
      </button>
    </div>
  );
}

import { Clipboard, ClipboardCheck } from "lucide-react";
import { toast } from "sonner";
import { cn } from "../../utils/helpers";
import useCopyToClipboard from "../../utils/useCopyToClipboard";

export default function ColorCodeDisplay({
  text,
  type,
}: {
  noControls?: boolean;
  values?: Record<string, string>;
  text?: string;
  type: string;
}) {
  const { copyToClipboard, isCopied } = useCopyToClipboard();

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
        <div className="flex items-center px-5 h-full border border-neutral-200 rounded-xl font-medium text-zinc-800 select-all flex-1">
          {text}
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

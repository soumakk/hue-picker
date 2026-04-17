import { Check, Clipboard } from "lucide-react";
import useCopyToClipboard from "../utils/useCopyToClipboard";

export default function ColorCodeDisplay({ text }: { text: string }) {
  const { copyToClipboard, isCopied } = useCopyToClipboard();
  return (
    <div className="flex items-center gap-2">
      <div className="inline-block px-4 py-3 bg-zinc-100 rounded-lg font-semibold text-zinc-800 select-all">
        {text}
      </div>

      {isCopied ? (
        <div className="pl-3 flex items-center gap-2 text-green-500">
          <Check className="h-5 w-5 " />
          <span>Copied</span>
        </div>
      ) : (
        <button
          className="hover:bg-zinc-100 h-10 w-10 rounded-full grid place-content-center"
          onClick={() => {
            copyToClipboard(text);
          }}
        >
          <Clipboard className="h-5 w-5 text-slate-800" />
        </button>
      )}
    </div>
  );
}

import {
  DisclosureButton,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import {
  Bolt,
  CheckIcon,
  ChevronDownIcon,
  Clipboard,
  ClipboardCheck,
} from "lucide-react";
import { useState } from "react";
import { cn } from "../../utils/helpers";
import useCopyToClipboard from "../../utils/useCopyToClipboard";

export default function ColorCodeDisplay({
  noControls,
  values,
  text,
  type,
}: {
  noControls?: boolean;
  values?: Record<string, string>;
  text?: string;
  type: string;
}) {
  const formats = Object.keys(values ?? {});
  const { copyToClipboard, isCopied } = useCopyToClipboard();
  const [selectedFormat, setSelectedFormat] = useState(formats?.[0]);

  function handleCopy() {
    if (!isCopied) {
      if (text) {
        copyToClipboard(text);
      } else if (values?.[selectedFormat]) {
        copyToClipboard(values[selectedFormat]);
      }
    }
  }

  return (
    <div className="flex items-center gap-2 h-[60px]">
      <div className="w-16 font-semibold">{type}</div>

      {text ? (
        <div className="flex items-center px-5 h-full bg-zinc-100 rounded-xl font-semibold text-zinc-800 select-all flex-1">
          {text}
        </div>
      ) : null}
      {!text ? (
        <Listbox value={selectedFormat} onChange={setSelectedFormat}>
          <ListboxButton className="relative flex-1 h-full flex items-center px-5 bg-zinc-100 rounded-xl text-zinc-800 font-semibold">
            <p className="text-left whitespace-nowrap">
              {values?.[selectedFormat]}
            </p>
            <ChevronDownIcon className="group pointer-events-none absolute top-4.5 right-3 size-4 text-slate-400" />
          </ListboxButton>
          <ListboxOptions
            anchor="bottom"
            transition
            className={cn(
              "bg-white z-10 shadow-sm p-1 mt-1 rounded-xl border border-slate-500/20 focus:outline-none  transition duration-100 ease-in data-leave:data-closed:opacity-0",
              noControls ? "w-[428px]" : "w-[356px]",
            )}
          >
            {formats?.map((format) => (
              <ListboxOption
                key={format}
                value={format}
                className="group flex gap-2 bg-white hover:bg-zinc-100 rounded-lg px-3 py-2 "
              >
                <CheckIcon className="invisible size-5 text-blue-500 group-data-[selected]:visible" />

                {values?.[format]}
              </ListboxOption>
            ))}
          </ListboxOptions>
        </Listbox>
      ) : null}
      {!noControls ? (
        <DisclosureButton className="hover:bg-amber-100 h-full w-16 hover:w-24 transition-all duration-150 rounded-xl grid place-content-center bg-amber-100">
          <Bolt className="h-6 w-6 text-amber-500" />
        </DisclosureButton>
      ) : null}
      <button
        className={cn(
          "h-full w-16 hover:w-24 transition-all duration-150 rounded-xl grid place-content-center ",
          isCopied ? "bg-green-100" : "bg-blue-100",
        )}
        onClick={handleCopy}
      >
        {isCopied ? (
          <div className="flex items-center gap-2 text-green-500">
            <ClipboardCheck className="h-6 w-6 " />
          </div>
        ) : (
          <Clipboard className="h-6 w-6 text-blue-500" />
        )}
      </button>
      {/*{isCopied ? (
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
      )}*/}
    </div>
  );
}

import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { InfoIcon } from "lucide-react";

export function HoverInfoPopover({
  bodyContent,
}: {
  bodyContent: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="absolute top-5 right-5"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger
          render={
            <button className="flex items-center justify-center">
              <InfoIcon className="h-4 w-4" />
            </button>
          }
        />
        <PopoverContent
          className="mt-4 rounded-lg border border-neutral-200 bg-neutral-50 p-4"
          side="left"
        >
          {bodyContent}
        </PopoverContent>
      </Popover>
    </div>
  );
}

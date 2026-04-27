import { NumberField } from "@base-ui/react/number-field";

export function NumberInput({
  min,
  max,
  step,
  value,
  onChange,
}: {
  min: number;
  max: number;
  step: number;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <NumberField.Root
      value={Number(value)}
      onValueChange={(value) => onChange(value?.toString() as string)}
      min={min}
      max={max}
      step={step}
      format={
        step < 1
          ? {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }
          : {}
      }
    >
      <NumberField.Group className="flex w-20 ring-1 ring-neutral-200 rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-neutral-900 bg-white">
        <NumberField.Input
          onClick={(e) => e.currentTarget.select()}
          className="w-full px-2 py-1 outline-none min-w-0"
        />

        {/* The Right-Side Controls Container */}
        <div className="flex flex-col border-l border-neutral-200 bg-neutral-50 shrink-0">
          <NumberField.Increment className="flex-1 flex items-center justify-center px-1.5 hover:bg-neutral-200 border-b border-neutral-200 cursor-default text-neutral-600">
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m18 15-6-6-6 6" />
            </svg>
          </NumberField.Increment>

          <NumberField.Decrement className="flex-1 flex items-center justify-center px-1.5 hover:bg-neutral-200 cursor-default text-neutral-600">
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </NumberField.Decrement>
        </div>
      </NumberField.Group>
    </NumberField.Root>
  );
}

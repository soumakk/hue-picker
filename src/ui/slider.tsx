"use client";

import { Slider as SliderPrimitive } from "@base-ui/react/slider";
import { cn } from "../utils/helpers";

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  trackColor,
  ...props
}: SliderPrimitive.Root.Props & {
  trackColor?: string;
}) {
  const _values = Array.isArray(value)
    ? value
    : Array.isArray(defaultValue)
      ? defaultValue
      : [min];

  return (
    <SliderPrimitive.Root
      data-slot="slider"
      className={cn(
        "relative flex w-full touch-none select-none items-center",
        className,
      )}
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      thumbAlignment="center"
      {...props}
    >
      <SliderPrimitive.Control className="relative flex w-full touch-none items-center select-none">
        {/* Track */}
        <SliderPrimitive.Track
          data-slot="slider-track"
          className="relative h-3 w-full grow overflow-hidden rounded-full"
          style={{
            background: trackColor ?? "#f4f4f5 ",
          }}
        >
          {/* Range */}
          <SliderPrimitive.Indicator
            data-slot="slider-range"
            className="absolute h-full bg-transparent"
          />
        </SliderPrimitive.Track>

        {Array.from({ length: _values.length }, (_, index) => (
          <SliderPrimitive.Thumb
            key={index}
            data-slot="slider-thumb"
            className={cn(
              "block h-6 w-6 rounded-full cursor-grab",
              "bg-white border border-neutral-300",
              "shadow-[0_1px_2px_rgba(0,0,0,0.1),0_2px_6px_rgba(0,0,0,0.08)]",

              // hover
              "hover:shadow-[0_2px_4px_rgba(0,0,0,0.12),0_4px_10px_rgba(0,0,0,0.12)]",

              // active (dragging)
              "active:cursor-grabbing active:scale-125",

              // focus
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40",

              // disabled
              "disabled:pointer-events-none disabled:opacity-50",
            )}
          />
        ))}
      </SliderPrimitive.Control>
    </SliderPrimitive.Root>
  );
}

export { Slider };

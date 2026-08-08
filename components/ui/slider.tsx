"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface SliderProps {
  value?: number[];
  defaultValue?: number[];
  min?: number;
  max?: number;
  step?: number;
  onValueChange?: (value: number[]) => void;
  className?: string;
}

const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  ({ value, defaultValue, min = 0, max = 100, step = 1, onValueChange, className }, ref) => {
    const [internalValue, setInternalValue] = React.useState(defaultValue?.[0] ?? min);
    const currentValue = value?.[0] ?? internalValue;

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = Number(event.target.value);
      if (value === undefined) setInternalValue(newValue);
      onValueChange?.([newValue]);
    };

    return (
      <div className={cn("relative flex w-full touch-none items-center", className)}>
        <input
          ref={ref}
          type="range"
          min={min}
          max={max}
          step={step}
          value={currentValue}
          onChange={handleChange}
          className="h-2 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-cyan-300"
        />
      </div>
    );
  }
);
Slider.displayName = "Slider";

export { Slider };

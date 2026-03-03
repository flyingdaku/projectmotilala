import * as React from "react";
import { cn } from "@/lib/utils";

const Switch = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, checked, onChange, ...props }, ref) => {
    return (
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={checked}
          onChange={onChange}
          ref={ref}
          {...props}
        />
        <div
          className={cn(
            "w-9 h-5 bg-[var(--border-strong)] peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[var(--accent-brand)] peer-focus:ring-offset-2 peer-focus:ring-offset-[var(--background)] rounded-full peer transition-colors",
            "after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-[var(--background)] after:rounded-full after:h-4 after:w-4 after:transition-all",
            "peer-checked:after:translate-x-[16px] peer-checked:bg-[var(--accent-brand)]",
            className
          )}
        ></div>
      </label>
    );
  }
);
Switch.displayName = "Switch";

export { Switch };

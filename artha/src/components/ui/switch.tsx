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
            "w-9 h-5 bg-[var(--border-strong)] peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[var(--brand-focus)] peer-focus:ring-offset-2 peer-focus:ring-offset-[var(--background)] rounded-full peer transition-colors",
            "after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-[var(--background)] after:border after:border-[var(--border)] after:rounded-full after:h-4 after:w-4 after:transition-all after:shadow-sm",
            "peer-checked:after:translate-x-[16px] peer-checked:bg-[var(--toggle-track-active)] peer-checked:after:bg-[var(--toggle-thumb-active)] peer-checked:after:border-[var(--toggle-thumb-active)]",
            className
          )}
        ></div>
      </label>
    );
  }
);
Switch.displayName = "Switch";

export { Switch };

import type { HTMLAttributes } from "react";

type MaterialSymbolWeight = 100 | 200 | 300 | 400 | 500 | 600 | 700;

interface IconProps extends Omit<HTMLAttributes<HTMLSpanElement>, "children"> {
  name: string;
  fill?: boolean;
  weight?: MaterialSymbolWeight;
  grade?: -25 | 0 | 200;
  opticalSize?: 20 | 24 | 40 | 48;
}

export function Icon({
  name,
  fill = false,
  weight = 400,
  grade = 0,
  opticalSize = 24,
  className,
  style,
  ...props
}: IconProps) {
  return (
    <span
      className={["material-symbols-outlined", className].filter(Boolean).join(" ")}
      style={{
        fontVariationSettings: `"FILL" ${fill ? 1 : 0}, "wght" ${weight}, "GRAD" ${grade}, "opsz" ${opticalSize}`,
        ...style,
      }}
      aria-hidden="true"
      {...props}
    >
      {name}
    </span>
  );
}

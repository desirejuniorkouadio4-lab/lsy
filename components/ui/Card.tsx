import { cn } from "@/lib/utils";

interface CardProps extends React.ComponentProps<"div"> {
  hover?: boolean;
  tone?: "paper" | "ivory" | "navy";
}

const TONES = {
  paper: "bg-white ring-1 ring-lsy-line",
  ivory: "bg-lsy-ivory ring-1 ring-lsy-line",
  navy: "bg-lsy-blue-900 text-white ring-1 ring-white/10",
};

export function Card({
  hover = false,
  tone = "paper",
  className,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-3xl shadow-soft",
        TONES[tone],
        hover &&
          "transition-all duration-300 hover:-translate-y-1 hover:shadow-card",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

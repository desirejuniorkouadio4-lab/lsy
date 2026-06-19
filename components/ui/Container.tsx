import { cn } from "@/lib/utils";

interface ContainerProps extends React.ComponentProps<"div"> {
  size?: "default" | "narrow" | "wide";
}

const SIZES = {
  default: "max-w-7xl",
  narrow: "max-w-4xl",
  wide: "max-w-[88rem]",
};

export function Container({
  className,
  size = "default",
  children,
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-5 sm:px-8 lg:px-10",
        SIZES[size],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

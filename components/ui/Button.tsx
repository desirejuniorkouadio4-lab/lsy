import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant =
  | "primary"
  | "gold"
  | "outline"
  | "outlineLight"
  | "ghost"
  | "white";
type Size = "sm" | "md" | "lg";

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-lsy-gold-500 focus-visible:ring-offset-2 disabled:opacity-60 disabled:pointer-events-none";

const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-lsy-blue-900 text-white shadow-soft hover:bg-lsy-blue-800 hover:shadow-card active:translate-y-px",
  gold: "bg-lsy-gold-500 text-lsy-blue-950 shadow-gold hover:bg-lsy-gold-400 active:translate-y-px",
  outline:
    "border border-lsy-blue-900/20 text-lsy-blue-900 hover:border-lsy-blue-900/40 hover:bg-lsy-blue-900/[0.04]",
  outlineLight:
    "border border-white/35 text-white hover:bg-white/10 hover:border-white/60",
  ghost: "text-lsy-blue-900 hover:bg-lsy-blue-900/[0.05]",
  white:
    "bg-white text-lsy-blue-900 shadow-soft hover:bg-lsy-ivory active:translate-y-px",
};

const SIZES: Record<Size, string> = {
  sm: "text-sm px-4 py-2",
  md: "text-[0.95rem] px-5 py-2.5",
  lg: "text-base px-7 py-3.5",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
}

type ButtonAsButton = CommonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", className, children } = props;
  const classes = cn(BASE, VARIANTS[variant], SIZES[size], className);

  if (props.href !== undefined) {
    const { href, ...rest } = props as ButtonAsLink;
    const external = /^https?:\/\//.test(href);
    return (
      <Link
        href={href}
        className={classes}
        {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
        {...stripCommon(rest)}
      >
        {children}
      </Link>
    );
  }

  const rest = stripCommon(props as ButtonAsButton & Record<string, unknown>);
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}

// Retire les props de style du reste passé aux éléments DOM.
function stripCommon<T extends Record<string, unknown>>(props: T) {
  const { variant, size, className, children, href, ...rest } =
    props as T & CommonProps & { href?: string };
  void variant;
  void size;
  void className;
  void children;
  void href;
  return rest;
}

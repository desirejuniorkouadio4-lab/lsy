import { cn } from "@/lib/utils";

interface PersonCardProps {
  name: string;
  role: string;
  bio?: string | null;
  initials?: string;
  className?: string;
}

export function PersonCard({ name, role, bio, initials, className }: PersonCardProps) {
  const ini = initials ?? name.split(" ").slice(0, 2).map((n) => n[0]).join("").toUpperCase();
  return (
    <div className={cn("rounded-2xl bg-white p-5 shadow-soft ring-1 ring-lsy-line", className)}>
      <div className="flex items-start gap-4">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-lsy-blue-900 font-display text-lg font-bold text-white">
          {ini}
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-bold text-lsy-blue-900">{name}</p>
          <p className="text-sm font-medium text-lsy-gold-600">{role}</p>
          {bio && <p className="mt-2 text-sm leading-relaxed text-lsy-muted line-clamp-3">{bio}</p>}
        </div>
      </div>
    </div>
  );
}

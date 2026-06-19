import Link from "next/link";
import {
  CalendarDays,
  FileText,
  GraduationCap,
  Megaphone,
  Network,
  ShieldCheck,
} from "lucide-react";
import { Container } from "@/components/ui/Container";

const DOCK_ITEMS = [
  {
    label: "Admission",
    description: "Conditions & procédure",
    href: "/admissions/vue-d-ensemble",
    icon: GraduationCap,
    accent: "bg-lsy-blue-700",
  },
  {
    label: "Communiqués",
    description: "Notes officielles",
    href: "/actualites/communiques",
    icon: Megaphone,
    accent: "bg-lsy-blue-800",
  },
  {
    label: "Documents",
    description: "Bibliothèque documentaire",
    href: "/documents",
    icon: FileText,
    accent: "bg-lsy-blue-800",
  },
  {
    label: "Calendrier",
    description: "Agenda scolaire",
    href: "/calendrier",
    icon: CalendarDays,
    accent: "bg-lsy-blue-800",
  },
  {
    label: "Portail",
    description: "Élèves, parents, enseignants",
    href: "/portail",
    icon: ShieldCheck,
    accent: "bg-lsy-blue-800",
  },
  {
    label: "Contact",
    description: "Nous écrire ou appeler",
    href: "/contact",
    icon: Network,
    accent: "bg-lsy-blue-800",
  },
];

export function QuickAccessDock() {
  return (
    <section
      aria-label="Accès rapides"
      className="relative z-10 -mt-10 pb-8 sm:-mt-12"
    >
      <Container>
        <div className="overflow-hidden rounded-3xl bg-white shadow-elevated ring-1 ring-lsy-blue-900/8">
          {/* Liseré doré en haut */}
          <div className="h-1 w-full bg-lsy-gold-500" aria-hidden />
          <div className="grid grid-cols-2 divide-x divide-y divide-lsy-line sm:grid-cols-3 lg:grid-cols-6">
            {DOCK_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex flex-col items-center gap-2.5 px-4 py-5 text-center transition-colors hover:bg-lsy-ivory"
                >
                  <span className="flex size-11 items-center justify-center rounded-2xl bg-lsy-blue-900/6 text-lsy-blue-800 transition-all group-hover:bg-lsy-gold-500 group-hover:text-lsy-blue-950">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <span className="space-y-0.5">
                    <span className="block text-[0.85rem] font-bold text-lsy-blue-900">
                      {item.label}
                    </span>
                    <span className="block text-[0.72rem] leading-tight text-lsy-muted">
                      {item.description}
                    </span>
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}

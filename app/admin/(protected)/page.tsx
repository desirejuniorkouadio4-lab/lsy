import type { Metadata } from "next";
import Link from "next/link";
import { Award, BookOpen, CalendarDays, FileText, Mail, Megaphone, Users } from "lucide-react";
import { db } from "@/lib/db";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Tableau de bord" };

async function getStats() {
  const [
    articles,
    communiques,
    events,
    documents,
    majors,
    messages,
    alumni,
  ] = await Promise.all([
    db.article.count({ where: { status: "PUBLISHED" } }),
    db.communique.count({ where: { status: "PUBLISHED" } }),
    db.event.count({ where: { status: "PUBLISHED" } }),
    db.document.count(),
    db.major.count(),
    db.contactMessage.count({ where: { status: "PENDING" } }),
    db.alumniProfile.count({ where: { status: "PENDING" } }),
  ]);
  return { articles, communiques, events, documents, majors, messages, alumni };
}

const STAT_CARDS = [
  { label: "Articles publiés", key: "articles", Icon: BookOpen, href: "/admin/articles", color: "text-lsy-blue-400" },
  { label: "Communiqués publiés", key: "communiques", Icon: Megaphone, href: "/admin/communiques", color: "text-lsy-gold-400" },
  { label: "Événements publiés", key: "events", Icon: CalendarDays, href: "/admin/evenements", color: "text-lsy-success" },
  { label: "Documents", key: "documents", Icon: FileText, href: "/admin/documents", color: "text-lsy-blue-300" },
  { label: "Majors enregistrés", key: "majors", Icon: Award, href: "/admin/majors", color: "text-lsy-gold-500" },
  { label: "Messages en attente", key: "messages", Icon: Mail, href: "/admin/messages", color: "text-lsy-orange" },
  { label: "Inscriptions alumni", key: "alumni", Icon: Users, href: "/admin/alumni", color: "text-lsy-blue-400" },
] as const;

export default async function AdminDashboard() {
  const stats = await getStats();

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Tableau de bord</h1>
        <p className="mt-1 text-sm text-white/40">
          Vue d&apos;ensemble du Lycée Scientifique de Yamoussoukro
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
        {STAT_CARDS.map(({ label, key, Icon, href, color }) => (
          <Link
            key={key}
            href={href}
            className="group rounded-2xl border border-white/8 bg-white/5 p-5 transition-all hover:border-white/15 hover:bg-white/8"
          >
            <div className="flex items-start justify-between">
              <p className="text-xs font-semibold text-white/40">{label}</p>
              <Icon className={cn("size-4 shrink-0", color)} aria-hidden />
            </div>
            <p className="mt-3 font-display text-3xl font-bold text-white">
              {stats[key]}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

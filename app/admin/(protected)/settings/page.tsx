import type { Metadata } from "next";
import { db } from "@/lib/db";
import { AdminSettings } from "@/components/admin/forms/AdminSettings";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Paramètres du site" };

const DEFAULT_MESSAGE = `C'est avec fierté et engagement que je m'adresse à vous au nom de la grande famille du Lycée Scientifique de Yamoussoukro — un établissement qui incarne depuis près de cinquante ans l'ambition scientifique de la Côte d'Ivoire.

Notre lycée a toujours été plus qu'un lieu d'apprentissage : c'est une communauté de rigueur, de discipline, d'innovation et de solidarité. Des générations d'élèves y ont forgé leur caractère, aiguisé leur intelligence et développé la vocation scientifique qui les anime encore aujourd'hui, qu'ils soient chercheurs, ingénieurs, médecins, enseignants ou entrepreneurs.

Nous traversons aujourd'hui une période de transformation importante avec le projet de réhabilitation de nos infrastructures. Cette modernisation est l'occasion de confirmer notre vocation et d'élever encore nos exigences, pour former les cadres scientifiques dont la Côte d'Ivoire et l'Afrique ont besoin.

À tous nos élèves, parents, enseignants et partenaires : merci de votre confiance. Ensemble, nous ferons du LSY un pôle d'excellence scientifique de référence pour l'Afrique de l'Ouest.`;

export default async function SettingsPage() {
  const rows = await db.siteSetting.findMany();
  const map = Object.fromEntries(rows.map((r) => [r.key, r.value]));

  return (
    <AdminSettings
      initialProviseurName={map["proviseur_name"] ?? site.proviseur.name}
      initialProviseurMessage={map["proviseur_message"] ?? DEFAULT_MESSAGE}
    />
  );
}

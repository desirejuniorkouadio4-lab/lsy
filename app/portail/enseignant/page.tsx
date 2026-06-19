import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = { title: "Espace enseignant" };

export default function PortailEnseignantPage() {
  redirect("/portail");
}

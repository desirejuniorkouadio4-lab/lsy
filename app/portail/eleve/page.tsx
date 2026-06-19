import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = { title: "Espace élève" };

export default function PortailElevePage() {
  redirect("/portail");
}

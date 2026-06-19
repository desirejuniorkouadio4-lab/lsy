import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = { title: "Espace parent" };

export default function PortailParentPage() {
  redirect("/portail");
}

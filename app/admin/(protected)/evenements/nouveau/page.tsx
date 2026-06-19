import type { Metadata } from "next";
import { EvenementForm } from "@/components/admin/forms/EvenementForm";
export const metadata: Metadata = { title: "Nouvel événement" };
export default function Page() { return <EvenementForm />; }

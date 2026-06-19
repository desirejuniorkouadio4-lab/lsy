import type { Metadata } from "next";
import { GalerieForm } from "@/components/admin/forms/GalerieForm";
export const metadata: Metadata = { title: "Nouvel album" };
export default function Page() { return <GalerieForm />; }

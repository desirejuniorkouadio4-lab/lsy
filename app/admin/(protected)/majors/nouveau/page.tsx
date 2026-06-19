import type { Metadata } from "next";
import { MajorForm } from "@/components/admin/forms/MajorForm";
export const metadata: Metadata = { title: "Ajouter un major" };
export default function Page() { return <MajorForm />; }

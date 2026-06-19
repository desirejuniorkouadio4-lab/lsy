import type { Metadata } from "next";
import { DocumentForm } from "@/components/admin/forms/DocumentForm";
export const metadata: Metadata = { title: "Nouveau document" };
export default function Page() { return <DocumentForm />; }

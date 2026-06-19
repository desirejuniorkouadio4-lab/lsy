import type { Metadata } from "next";
import { PartnerForm } from "@/components/admin/forms/PartnerForm";
export const metadata: Metadata = { title: "Nouveau partenaire" };
export default function Page() { return <PartnerForm />; }

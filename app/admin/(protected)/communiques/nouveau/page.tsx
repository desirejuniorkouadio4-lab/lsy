import type { Metadata } from "next";
import { CommuniqueForm } from "@/components/admin/forms/CommuniqueForm";
export const metadata: Metadata = { title: "Nouveau communiqué" };
export default function Page() { return <CommuniqueForm />; }

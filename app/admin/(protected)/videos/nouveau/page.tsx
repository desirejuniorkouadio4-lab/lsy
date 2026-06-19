import type { Metadata } from "next";
import { VideoForm } from "@/components/admin/forms/VideoForm";
export const metadata: Metadata = { title: "Nouvelle vidéo" };
export default function Page() { return <VideoForm />; }

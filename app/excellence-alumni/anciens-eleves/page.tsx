"use client";

import { useState } from "react";
import { CheckCircle2, Users } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { PageShell } from "@/components/layout/PageShell";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { CTASection } from "@/components/sections/CTASection";
import { Reveal } from "@/components/animations/Reveal";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type FormState = "idle" | "loading" | "success" | "error";

export default function AnciensElevesPage() {
  const [state, setState] = useState<FormState>("idle");
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    graduationYear: "",
    profession: "",
    message: "",
    wantsMentor: false,
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("loading");
    try {
      const res = await fetch("/api/alumni", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setState("success");
    } catch {
      setState("error");
    }
  }

  const fieldClass = cn(
    "w-full rounded-xl border border-lsy-line bg-white px-4 py-2.5 text-sm text-lsy-blue-900 placeholder:text-lsy-muted/60",
    "outline-none focus:border-lsy-blue-700 focus:ring-2 focus:ring-lsy-blue-700/15 transition",
  );

  return (
    <PageShell flush>
      <PageHero
        eyebrow="Excellence & Alumni"
        title="Anciens élèves"
        body="Rejoignez le réseau des anciens élèves du Lycée Scientifique de Yamoussoukro — plus de 50 ans de diplômés engagés."
        breadcrumbs={[
          { label: "Excellence & Alumni", href: "/excellence-alumni/majors" },
          { label: "Anciens élèves" },
        ]}
        pattern="constellation"
      />

      <section className="bg-lsy-paper py-20 lg:py-28">
        <Container>
          <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-5">
            {/* Sidebar info */}
            <Reveal className="lg:col-span-2">
              <div className="space-y-6">
                <SectionHeader
                  eyebrow="Réseau alumni"
                  title="Une communauté engagée"
                />
                <div className="rounded-3xl bg-lsy-blue-950 p-6 text-white">
                  <Users className="mb-3 size-8 text-lsy-gold-400" aria-hidden />
                  <p className="text-sm leading-relaxed text-white/75">
                    Le réseau des anciens élèves du LSY regroupe des ingénieurs, médecins,
                    chercheurs, entrepreneurs et hauts cadres de Côte d&apos;Ivoire et d&apos;Afrique.
                    Inscrivez-vous pour rester connecté et contribuer à l&apos;excellence de la nouvelle génération.
                  </p>
                </div>
                <ul className="space-y-3">
                  {[
                    "Accès à l'annuaire des anciens",
                    "Participation aux événements alumni",
                    "Contribution au programme de mentorat",
                    "Transmission de témoignages aux élèves",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-lsy-slate">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-lsy-success" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* Formulaire */}
            <Reveal delay={0.1} className="lg:col-span-3">
              {state === "success" ? (
                <div className="flex flex-col items-center justify-center rounded-3xl bg-white p-10 shadow-soft ring-1 ring-lsy-line text-center">
                  <CheckCircle2 className="mb-4 size-14 text-lsy-success" aria-hidden />
                  <p className="font-display text-2xl font-bold text-lsy-blue-900">
                    Inscription reçue !
                  </p>
                  <p className="mt-2 text-sm text-lsy-muted">
                    Merci de vous être inscrit au réseau alumni. L&apos;équipe du LSY vous contactera prochainement.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="rounded-3xl bg-white p-7 shadow-soft ring-1 ring-lsy-line space-y-5"
                >
                  <p className="font-bold text-lsy-blue-900">Rejoindre le réseau alumni</p>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-xs font-semibold text-lsy-blue-900">
                        Nom complet <span className="text-lsy-orange">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Kouassi Jean-Marc"
                        value={form.fullName}
                        onChange={(e) => setForm((f) => ({ ...f, fullName: e.target.value }))}
                        className={fieldClass}
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-semibold text-lsy-blue-900">
                        Email <span className="text-lsy-orange">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="jean@exemple.com"
                        value={form.email}
                        onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                        className={fieldClass}
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-semibold text-lsy-blue-900">
                        Année de sortie
                      </label>
                      <input
                        type="text"
                        placeholder="2015"
                        value={form.graduationYear}
                        onChange={(e) => setForm((f) => ({ ...f, graduationYear: e.target.value }))}
                        className={fieldClass}
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-semibold text-lsy-blue-900">
                        Profession actuelle
                      </label>
                      <input
                        type="text"
                        placeholder="Ingénieur, Médecin…"
                        value={form.profession}
                        onChange={(e) => setForm((f) => ({ ...f, profession: e.target.value }))}
                        className={fieldClass}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-semibold text-lsy-blue-900">
                      Message (optionnel)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Un mot pour vos anciens camarades…"
                      value={form.message}
                      onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                      className={cn(fieldClass, "resize-none")}
                    />
                  </div>

                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.wantsMentor}
                      onChange={(e) => setForm((f) => ({ ...f, wantsMentor: e.target.checked }))}
                      className="mt-0.5 size-4 rounded border-lsy-line accent-lsy-blue-900"
                    />
                    <span className="text-sm text-lsy-slate">
                      Je souhaite participer au programme de mentorat et accompagner les élèves actuels.
                    </span>
                  </label>

                  {state === "error" && (
                    <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
                      Une erreur s&apos;est produite. Veuillez réessayer.
                    </p>
                  )}

                  <Button type="submit" variant="primary" disabled={state === "loading"} className="w-full">
                    {state === "loading" ? "Envoi en cours…" : "Rejoindre le réseau"}
                  </Button>
                </form>
              )}
            </Reveal>
          </div>
        </Container>
      </section>

      <CTASection
        eyebrow="Mentorat"
        title="Accompagner les élèves d'aujourd'hui"
        buttons={[
          { label: "Programme de mentorat", href: "/excellence-alumni/mentorat", primary: true },
          { label: "Palmarès des majors", href: "/excellence-alumni/majors" },
        ]}
      />
    </PageShell>
  );
}

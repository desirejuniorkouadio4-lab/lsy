"use client";

import { useState } from "react";
import { CheckCircle2, Mail, MapPin, Phone } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { PageShell } from "@/components/layout/PageShell";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/animations/Reveal";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type FormState = "idle" | "loading" | "success" | "error";

export default function ContactPage() {
  const [state, setState] = useState<FormState>("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("loading");
    try {
      const res = await fetch("/api/contact", {
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
        eyebrow="Contact"
        title="Nous contacter"
        body="Une question, une demande d'information ou un partenariat ? Contactez l'équipe du Lycée Scientifique de Yamoussoukro."
        breadcrumbs={[{ label: "Contact" }]}
        pattern="wave"
      />

      <section className="bg-lsy-paper py-20 lg:py-28">
        <Container>
          <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-5">
            {/* Coordonnées */}
            <Reveal className="lg:col-span-2">
              <div className="space-y-6">
                <div className="rounded-3xl bg-lsy-blue-950 p-7 text-white space-y-5">
                  <p className="font-display text-xl font-bold">
                    Lycée Scientifique de Yamoussoukro
                  </p>
                  <ul className="space-y-4 text-sm text-white/75">
                    <li className="flex items-start gap-3">
                      <MapPin className="mt-0.5 size-4 shrink-0 text-lsy-gold-400" aria-hidden />
                      Yamoussoukro, Côte d&apos;Ivoire
                    </li>
                    <li className="flex items-start gap-3">
                      <Phone className="mt-0.5 size-4 shrink-0 text-lsy-gold-400" aria-hidden />
                      À confirmer par l&apos;administration
                    </li>
                    <li className="flex items-start gap-3">
                      <Mail className="mt-0.5 size-4 shrink-0 text-lsy-gold-400" aria-hidden />
                      contact@lsy.ci (à confirmer)
                    </li>
                  </ul>
                </div>

                <div className="rounded-2xl bg-lsy-ivory p-5 space-y-3">
                  <p className="font-semibold text-lsy-blue-900">Heures d&apos;accueil</p>
                  <ul className="space-y-1 text-sm text-lsy-muted">
                    <li>Lundi – Vendredi : 7h30 – 17h30</li>
                    <li>Samedi : 7h30 – 12h00</li>
                    <li>Dimanche et jours fériés : Fermé</li>
                  </ul>
                </div>
              </div>
            </Reveal>

            {/* Formulaire */}
            <Reveal delay={0.1} className="lg:col-span-3">
              {state === "success" ? (
                <div className="flex flex-col items-center justify-center rounded-3xl bg-white p-10 shadow-soft ring-1 ring-lsy-line text-center h-full min-h-[320px]">
                  <CheckCircle2 className="mb-4 size-14 text-lsy-success" aria-hidden />
                  <p className="font-display text-2xl font-bold text-lsy-blue-900">
                    Message envoyé !
                  </p>
                  <p className="mt-2 text-sm text-lsy-muted max-w-xs">
                    Merci pour votre message. L&apos;équipe du LSY vous répondra dans les plus brefs délais.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="rounded-3xl bg-white p-7 shadow-soft ring-1 ring-lsy-line space-y-5"
                >
                  <p className="font-bold text-lsy-blue-900">Envoyer un message</p>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-xs font-semibold text-lsy-blue-900">
                        Nom complet <span className="text-lsy-orange">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Votre nom"
                        value={form.name}
                        onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
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
                        placeholder="votre@email.com"
                        value={form.email}
                        onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                        className={fieldClass}
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-semibold text-lsy-blue-900">
                        Téléphone
                      </label>
                      <input
                        type="tel"
                        placeholder="+225 00 00 00 00 00"
                        value={form.phone}
                        onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                        className={fieldClass}
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-semibold text-lsy-blue-900">
                        Objet <span className="text-lsy-orange">*</span>
                      </label>
                      <select
                        required
                        value={form.subject}
                        onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
                        className={fieldClass}
                      >
                        <option value="">Sélectionner…</option>
                        <option value="Admissions">Admissions</option>
                        <option value="Partenariat">Partenariat</option>
                        <option value="Presse">Presse</option>
                        <option value="Autre">Autre</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-semibold text-lsy-blue-900">
                      Message <span className="text-lsy-orange">*</span>
                    </label>
                    <textarea
                      rows={5}
                      required
                      placeholder="Votre message…"
                      value={form.message}
                      onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                      className={cn(fieldClass, "resize-none")}
                    />
                  </div>

                  {state === "error" && (
                    <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
                      Une erreur s&apos;est produite. Veuillez réessayer.
                    </p>
                  )}

                  <Button type="submit" variant="primary" disabled={state === "loading"} className="w-full">
                    {state === "loading" ? "Envoi en cours…" : "Envoyer le message"}
                  </Button>
                </form>
              )}
            </Reveal>
          </div>
        </Container>
      </section>
    </PageShell>
  );
}

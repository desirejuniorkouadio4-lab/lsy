"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { PageHero } from "@/components/layout/PageHero";
import { PageShell } from "@/components/layout/PageShell";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { cn } from "@/lib/utils";
import { faqItems } from "@/data/admissions";

export default function FAQPage() {
  const reduced = useReducedMotion();
  const [open, setOpen] = useState<number | null>(null);

  const categories = Array.from(new Set(faqItems.map((f) => f.category)));

  return (
    <PageShell flush>
      <PageHero
        eyebrow="Admissions"
        title="Foire aux questions"
        body="Retrouvez les réponses aux questions les plus fréquentes sur les admissions au Lycée Scientifique de Yamoussoukro."
        breadcrumbs={[
          { label: "Admissions", href: "/admissions/vue-d-ensemble" },
          { label: "FAQ" },
        ]}
        pattern="wave"
      />

      <section className="bg-lsy-paper py-20 lg:py-28">
        <Container>
          <div className="mx-auto max-w-3xl space-y-14">
            {categories.map((cat) => {
              const items = faqItems.filter((f) => f.category === cat);
              const catLabel = cat === "processus" ? "Processus d'admission"
                : cat === "conditions" ? "Conditions requises"
                : cat === "vie" ? "Vie au lycée"
                : "Contact & informations";
              return (
                <div key={cat} className="space-y-4">
                  <SectionHeader eyebrow={catLabel} title="" />
                  <div className="space-y-2">
                    {items.map((item, idx) => {
                      const key = faqItems.indexOf(item);
                      const isOpen = open === key;
                      return (
                        <div
                          key={idx}
                          className="overflow-hidden rounded-2xl border border-lsy-line bg-white"
                        >
                          <button
                            onClick={() => setOpen(isOpen ? null : key)}
                            className="flex w-full items-start justify-between gap-4 p-5 text-left font-bold text-lsy-blue-900 transition-colors hover:bg-lsy-ivory"
                            aria-expanded={isOpen}
                          >
                            <span>{item.question}</span>
                            <ChevronDown
                              className={cn(
                                "mt-0.5 size-5 shrink-0 text-lsy-muted transition-transform",
                                isOpen && "rotate-180",
                              )}
                              aria-hidden
                            />
                          </button>
                          <AnimatePresence initial={false}>
                            {isOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{
                                  duration: reduced ? 0 : 0.25,
                                  ease: [0.22, 1, 0.36, 1],
                                }}
                              >
                                <div className="border-t border-lsy-line px-5 pb-5 pt-4">
                                  <p className="text-[0.95rem] leading-relaxed text-lsy-slate">
                                    {item.answer}
                                  </p>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>
    </PageShell>
  );
}

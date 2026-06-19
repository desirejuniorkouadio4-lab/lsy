/**
 * Configuration centrale du site — Lycée Scientifique de Yamoussoukro.
 * Les coordonnées marquées « à confirmer » doivent être validées par l'administration.
 */
export const site = {
  name: "Lycée Scientifique de Yamoussoukro",
  shortName: "LSY",
  tagline:
    "L'excellence scientifique au service de la Côte d'Ivoire et de l'Afrique.",
  description:
    "Établissement public d'excellence, le Lycée Scientifique de Yamoussoukro forme des générations d'élèves à fort potentiel scientifique dans un cadre fondé sur la rigueur, la discipline, l'innovation et l'ambition nationale.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://lsy.ci",
  legacyUrl: "https://lsy.ci",
  locale: "fr_CI",
  foundedYear: 1975,
  inaugurationYear: 1978,

  contact: {
    city: "Yamoussoukro",
    country: "Côte d'Ivoire",
    address: "Yamoussoukro, Côte d'Ivoire",
    addressNote: "Adresse postale complète à confirmer par l'administration.",
    email: "contact@lsy.ci",
    phoneDisplay: "À renseigner",
    phoneHref: "",
    note: "Coordonnées officielles à confirmer par l'administration du lycée.",
    mapsQuery: "Lycée Scientifique de Yamoussoukro, Yamoussoukro",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Lyc%C3%A9e+Scientifique+de+Yamoussoukro",
  },

  social: {
    facebook: "",
    youtube: "",
    linkedin: "",
    x: "",
  },

  designer: {
    name: "Digital Access – Web Access Solution",
    short: "Digital Access",
    url: "#",
  },
} as const;

export type SiteConfig = typeof site;

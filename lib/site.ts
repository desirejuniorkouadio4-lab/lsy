/**
 * Configuration centrale du site — Lycée Scientifique de Yamoussoukro.
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
    address: "BP 1069, Yamoussoukro, Côte d'Ivoire",
    email: "contact@lsy.ci",
    phoneDisplay: "27 30 64 07 88",
    phoneHref: "+22527306407 88",
    mapsQuery: "Lycée Scientifique de Yamoussoukro, Yamoussoukro",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Lyc%C3%A9e+Scientifique+de+Yamoussoukro",
  },

  proviseur: {
    name: "Soulemane COULIBALY",
    title: "Proviseur — Lycée Scientifique de Yamoussoukro",
    photoUrl: "/brand/Proviseur.jpg",
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

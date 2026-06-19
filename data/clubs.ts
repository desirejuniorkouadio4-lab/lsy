/**
 * Clubs et activités extrascolaires du LSY.
 * Données à enrichir par l'administration avec les responsables et photos officiels.
 */

export interface Club {
  name: string;
  category: "sciences" | "informatique" | "sport" | "culture" | "debat" | "environnement" | "lecture" | "arts";
  description: string;
  activities: string[];
  icon: string; // nom d'icône Lucide
  level?: string;
}

export const clubs: Club[] = [
  {
    name: "Club des Sciences",
    category: "sciences",
    icon: "FlaskConical",
    description:
      "Espace d'expérimentation et d'exploration scientifique en dehors des cours. Les membres réalisent des expériences originales, participent aux olympiades et présentent leurs travaux lors des journées portes ouvertes.",
    activities: [
      "Expériences de chimie et de physique",
      "Initiation à la recherche scientifique junior",
      "Préparation aux olympiades de mathématiques",
      "Visites de laboratoires et d'industries",
    ],
  },
  {
    name: "Club Informatique & Robotique",
    category: "informatique",
    icon: "Cpu",
    description:
      "Club dédié à la programmation, aux nouvelles technologies et à la robotique. Les membres développent des projets informatiques, apprennent à coder et s'initient aux bases de la robotique.",
    activities: [
      "Programmation Python et développement web",
      "Initiation à la robotique et à l'électronique",
      "Hackathons et défis de code",
      "Projets d'application pratique",
    ],
  },
  {
    name: "Club Environnement & Développement Durable",
    category: "environnement",
    icon: "Leaf",
    description:
      "Sensibilisation aux enjeux environnementaux, actions de préservation de l'environnement du lycée et projets en lien avec le développement durable en Côte d'Ivoire.",
    activities: [
      "Jardinage et plantation d'arbres dans l'enceinte du lycée",
      "Campagnes de sensibilisation à l'écologie",
      "Études sur la biodiversité locale",
      "Projets sur l'énergie solaire et renouvelable",
    ],
  },
  {
    name: "Club Lecture & Débat",
    category: "debat",
    icon: "BookOpen",
    description:
      "Espace d'expression, de lecture et de débat intellectuel. Les membres développent leur esprit critique, leur culture générale et leur capacité d'argumentation.",
    activities: [
      "Cercles de lecture autour de textes scientifiques et littéraires",
      "Débats thématiques sur des sujets d'actualité",
      "Ateliers d'écriture et de rédaction",
      "Préparation aux épreuves orales du BAC",
    ],
  },
  {
    name: "Section Sportive",
    category: "sport",
    icon: "Dumbbell",
    description:
      "Encadrement des activités sportives au sein du lycée : football, athlétisme, basketball et autres disciplines. Participation aux compétitions inter-lycées.",
    activities: [
      "Entraînements hebdomadaires encadrés",
      "Compétitions inter-lycées",
      "Tournois sportifs lors des journées LSY",
      "Initiation à différentes disciplines sportives",
    ],
  },
  {
    name: "Club Arts & Culture",
    category: "arts",
    icon: "Palette",
    description:
      "Expression artistique, culturelle et patrimoniale. Le club organise des activités artistiques et valorise les traditions culturelles ivoiriennes et africaines.",
    activities: [
      "Atelier dessin, peinture et arts graphiques",
      "Préparation des cérémonies culturelles du lycée",
      "Danses traditionnelles et modernes",
      "Projets de valorisation du patrimoine culturel ivoirien",
    ],
  },
];

export const sportsInfo = {
  disciplines: [
    "Football",
    "Athlétisme",
    "Basketball",
    "Volleyball",
    "Badminton",
    "Judo (à confirmer)",
  ],
  competitions: [
    "Jeux Scolaires de Côte d'Ivoire",
    "Tournois inter-lycées de Yamoussoukro",
    "Compétitions de la zone Centre",
  ],
  note: "Le programme sportif complet et le calendrier des compétitions sont disponibles auprès du service Vie Scolaire.",
};

export const internInfo = {
  description:
    "La grande majorité des élèves du LSY sont pensionnaires. L'internat est un élément central de la vie au lycée, favorisant la concentration, la solidarité entre élèves et l'encadrement continu.",
  features: [
    "Chambres partagées par promotions",
    "Encadrement permanent par des surveillants et des conseillers d'éducation",
    "Salles d'étude encadrées le soir",
    "Réfectoire avec trois repas par jour",
    "Espace de détente et de loisirs",
    "Service médical disponible",
  ],
  rules: [
    "Respect des horaires de lever, repas, étude et extinction des feux",
    "Interdiction des appareils électroniques personnels pendant les heures d'étude",
    "Tenue correcte obligatoire",
    "Sorties soumises à autorisation parentale et de l'administration",
  ],
  note: "Le règlement intérieur complet est remis à chaque élève en début d'année scolaire.",
};

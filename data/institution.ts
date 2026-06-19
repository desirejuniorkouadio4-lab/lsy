/**
 * Contenu éditorial statique pour les pages institutionnelles.
 * Les données marquées « à confirmer » doivent être validées par l'administration.
 */

export interface TimelineEvent {
  year: number;
  title: string;
  description: string;
  milestone?: boolean;
}

export const timeline: TimelineEvent[] = [
  {
    year: 1975,
    title: "Fondation du lycée",
    description:
      "Le Lycée Scientifique de Yamoussoukro est fondé dans la capitale politique de la Côte d'Ivoire, avec pour vocation de former les futures élites scientifiques du pays.",
    milestone: true,
  },
  {
    year: 1978,
    title: "Inauguration officielle",
    description:
      "Le lycée est officiellement inauguré et accueille ses premières promotions d'élèves, sélectionnés sur critères d'excellence à l'échelle nationale.",
    milestone: true,
  },
  {
    year: 1985,
    title: "Premières grandes promotions",
    description:
      "Les premières générations de diplômés du LSY intègrent les grandes universités nationales et les classes préparatoires africaines et européennes.",
  },
  {
    year: 1995,
    title: "Développement des laboratoires",
    description:
      "Modernisation et extension des laboratoires de physique, chimie et sciences de la vie et de la Terre, renforçant le caractère scientifique de l'établissement.",
  },
  {
    year: 2000,
    title: "Reconnaissance nationale",
    description:
      "Le LSY s'impose comme la référence nationale en matière d'enseignement secondaire scientifique, avec d'excellents taux de réussite au BAC.",
  },
  {
    year: 2010,
    title: "Essor de la recherche scientifique junior",
    description:
      "Lancement des premiers projets de recherche scientifique encadrés pour les élèves, participation aux olympiades nationales et africaines de mathématiques.",
  },
  {
    year: 2020,
    title: "Tournant numérique",
    description:
      "Introduction d'équipements numériques et d'espaces informatiques, début de la transition vers un environnement pédagogique hybride.",
  },
  {
    year: 2024,
    title: "Lancement de la réhabilitation",
    description:
      "Démarrage du projet de réhabilitation et de modernisation des infrastructures, financé dans le cadre du Plan National de Développement.",
    milestone: true,
  },
  {
    year: 2026,
    title: "Nouvelle ère",
    description:
      "Le LSY entre dans une phase de modernisation d'envergure nationale, avec l'ambition de devenir un pôle scientifique de référence pour l'Afrique de l'Ouest.",
    milestone: true,
  },
];

export interface Value {
  label: string;
  description: string;
  icon: string; // nom d'icône Lucide
}

export const values: Value[] = [
  {
    label: "Excellence",
    icon: "Award",
    description:
      "Viser le meilleur dans chaque discipline, encourager le dépassement de soi et cultiver une culture de la performance académique et morale.",
  },
  {
    label: "Discipline",
    icon: "Scale",
    description:
      "Respecter les règles de vie commune, développer l'autodiscipline et former des caractères capables de structurer leur action dans la durée.",
  },
  {
    label: "Rigueur",
    icon: "FlaskConical",
    description:
      "Aborder chaque problème avec méthode, précision et soin du détail — une exigence héritée de la pensée scientifique.",
  },
  {
    label: "Innovation",
    icon: "Lightbulb",
    description:
      "Encourager la curiosité, la créativité et l'expérimentation pour préparer les élèves aux défis technologiques et scientifiques du XXIe siècle.",
  },
  {
    label: "Responsabilité",
    icon: "ShieldCheck",
    description:
      "Agir avec conscience de son impact sur la communauté scolaire, la famille et la nation ; assumer ses choix et ses engagements.",
  },
  {
    label: "Patriotisme",
    icon: "Flag",
    description:
      "Porter en soi la fierté d'un lycée national, œuvrer pour le développement de la Côte d'Ivoire et de l'Afrique grâce au savoir.",
  },
  {
    label: "Ouverture",
    icon: "Globe",
    description:
      "S'ouvrir aux cultures, aux disciplines et aux idées du monde entier, former des esprits universels ancrés dans leur identité africaine.",
  },
];

export interface InfrastructureItem {
  name: string;
  description: string;
  category: "enseignement" | "sciences" | "vie" | "sport" | "numerique";
  status: "operationnel" | "en-renovation" | "a-venir";
  capacity?: string;
}

export const infrastructure: InfrastructureItem[] = [
  {
    name: "Salles de classe",
    description:
      "Salles équipées pour l'enseignement des sciences, des mathématiques et des lettres, dimensionnées pour des classes de taille réduite favorisant l'encadrement individualisé.",
    category: "enseignement",
    status: "operationnel",
    capacity: "À confirmer par l'administration",
  },
  {
    name: "Laboratoire de Physique",
    description:
      "Espace dédié aux travaux pratiques de physique : mécanique, optique, électricité. Équipements à renforcer dans le cadre du projet de réhabilitation.",
    category: "sciences",
    status: "en-renovation",
  },
  {
    name: "Laboratoire de Chimie",
    description:
      "Laboratoire pour les expériences de chimie organique et inorganique, avec hottes d'aspiration et équipements de sécurité.",
    category: "sciences",
    status: "en-renovation",
  },
  {
    name: "Laboratoire de SVT",
    description:
      "Espace d'étude des sciences de la vie et de la Terre, avec microscopes, collections biologiques et matériel de dissection.",
    category: "sciences",
    status: "operationnel",
  },
  {
    name: "Salle informatique",
    description:
      "Salle équipée d'ordinateurs pour l'enseignement de l'informatique et l'accès aux ressources numériques.",
    category: "numerique",
    status: "operationnel",
    capacity: "À confirmer par l'administration",
  },
  {
    name: "Bibliothèque",
    description:
      "Espace documentaire avec ouvrages scientifiques, encyclopédies, ressources pédagogiques et coin lecture.",
    category: "enseignement",
    status: "operationnel",
  },
  {
    name: "Internat",
    description:
      "Résidence interne pour les élèves pensionnaires, avec chambres, espaces de détente et encadrement permanent.",
    category: "vie",
    status: "operationnel",
    capacity: "À confirmer par l'administration",
  },
  {
    name: "Réfectoire",
    description:
      "Salle de restauration pour les élèves internes et demi-pensionnaires, fonctionnant sur trois services.",
    category: "vie",
    status: "operationnel",
  },
  {
    name: "Infirmerie",
    description:
      "Service médical avec personnel infirmier, disponible pour les soins courants et la gestion des urgences.",
    category: "vie",
    status: "operationnel",
  },
  {
    name: "Terrain de sport",
    description:
      "Espaces sportifs extérieurs pour la pratique du football, de l'athlétisme et d'autres disciplines collectives.",
    category: "sport",
    status: "operationnel",
  },
  {
    name: "Espace numérique (à venir)",
    description:
      "Futur espace collaboratif numérique prévu dans le cadre du projet de réhabilitation : salle de conférence connectée, espaces de travail en groupe.",
    category: "numerique",
    status: "a-venir",
  },
];

export const rehabilitationFacts = {
  context:
    "Le Lycée Scientifique de Yamoussoukro, fondé en 1975, entre dans une phase majeure de réhabilitation et de modernisation. Ce projet s'inscrit dans la politique nationale de renforcement de l'éducation de qualité en Côte d'Ivoire.",
  objectives: [
    "Moderniser les laboratoires de sciences pour les mettre au niveau des standards internationaux",
    "Rénover et étendre les capacités d'accueil des élèves",
    "Créer de nouveaux espaces numériques et collaboratifs",
    "Améliorer le cadre de vie des élèves internes",
    "Installer des équipements sportifs modernes",
    "Renforcer la sécurité et la durabilité des infrastructures existantes",
  ],
  statusNote:
    "L'avancement des travaux et les détails techniques sont à confirmer auprès de l'administration du lycée.",
};

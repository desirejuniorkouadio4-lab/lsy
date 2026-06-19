/**
 * Contenu éditorial statique pour les pages Académie & Innovation.
 */

export interface Subject {
  name: string;
  code: string;
  description: string;
  icon: string; // nom d'icône Lucide
  levels: string[];
  hoursPerWeek?: string;
}

export const subjects: Subject[] = [
  {
    name: "Mathématiques",
    code: "MATHS",
    icon: "Sigma",
    description:
      "Enseignement rigoureux des mathématiques pures et appliquées : algèbre, analyse, géométrie, probabilités et statistiques. Le LSY accorde une place centrale aux mathématiques comme socle de la pensée scientifique.",
    levels: ["4e", "3e", "Seconde", "Première", "Terminale"],
    hoursPerWeek: "Selon niveau (6 à 9h)",
  },
  {
    name: "Physique-Chimie",
    code: "PC",
    icon: "Atom",
    description:
      "Étude des lois fondamentales de la physique et de la chimie, des travaux pratiques encadrés et des applications industrielles. Accent mis sur la démarche expérimentale.",
    levels: ["4e", "3e", "Seconde", "Première", "Terminale"],
    hoursPerWeek: "Selon niveau (4 à 6h + TP)",
  },
  {
    name: "Sciences de la Vie et de la Terre",
    code: "SVT",
    icon: "Leaf",
    description:
      "Biologie cellulaire, génétique, écologie et géologie. Les élèves développent un regard scientifique sur le vivant et sur les grands équilibres de la planète.",
    levels: ["4e", "3e", "Seconde", "Première", "Terminale"],
    hoursPerWeek: "Selon niveau (3 à 5h + TP)",
  },
  {
    name: "Informatique",
    code: "INFO",
    icon: "Code2",
    description:
      "Algorithmique, programmation, systèmes d'information et culture numérique. Le LSY prépare ses élèves aux enjeux technologiques du XXIe siècle.",
    levels: ["Seconde", "Première", "Terminale"],
    hoursPerWeek: "2 à 3h selon niveau",
  },
  {
    name: "Français",
    code: "FR",
    icon: "BookOpen",
    description:
      "Littérature, expression écrite et orale, dissertation. La maîtrise du français est un vecteur essentiel de la rigueur et de la précision attendues au LSY.",
    levels: ["4e", "3e", "Seconde", "Première", "Terminale"],
  },
  {
    name: "Anglais",
    code: "ANG",
    icon: "Languages",
    description:
      "Langue vivante étrangère obligatoire. L'anglais est enseigné comme outil de communication scientifique internationale, essentiel pour accéder aux publications de recherche.",
    levels: ["4e", "3e", "Seconde", "Première", "Terminale"],
  },
  {
    name: "Philosophie",
    code: "PHILO",
    icon: "Brain",
    description:
      "Formation à la pensée critique, à l'argumentation rigoureuse et aux grands textes philosophiques. Discipline obligatoire en classe de Terminale.",
    levels: ["Terminale"],
  },
  {
    name: "Histoire-Géographie",
    code: "HG",
    icon: "Globe2",
    description:
      "Histoire du monde contemporain, géographie économique et politique, géopolitique africaine. Formation citoyenne et ouverture sur le monde.",
    levels: ["4e", "3e", "Seconde", "Première", "Terminale"],
  },
];

export interface Laboratory {
  name: string;
  description: string;
  equipment: string[];
  activities: string[];
  status: "actif" | "en-renovation" | "a-venir";
}

export const laboratories: Laboratory[] = [
  {
    name: "Laboratoire de Physique",
    description:
      "Espace de travaux pratiques dédié à la mécanique, l'optique, l'électricité et la thermodynamique. Les élèves y conduisent des expériences conformes aux programmes officiels.",
    equipment: [
      "Oscilloscopes",
      "Multimètres et ampèremètres",
      "Bancs d'optique",
      "Matériel de mécanique (pendules, plans inclinés)",
      "Générateurs de fonctions",
    ],
    activities: [
      "Étude des oscillations mécaniques",
      "Diffraction et interférence de la lumière",
      "Circuits électriques et lois d'Ohm",
      "Calorimétrie et thermodynamique",
    ],
    status: "en-renovation",
  },
  {
    name: "Laboratoire de Chimie",
    description:
      "Laboratoire équipé pour la chimie organique, inorganique et les titrages. Les travaux pratiques sont encadrés par des enseignants spécialisés et réalisés en groupes réduits.",
    equipment: [
      "Hottes d'aspiration",
      "Verrerie de laboratoire (béchers, erlenmeyers, burettes)",
      "Balances de précision",
      "pH-mètres",
      "Réfrigérants et plateaux chauffants",
    ],
    activities: [
      "Dosages et titrages acido-basiques",
      "Réactions d'oxydoréduction",
      "Extraction et identification de substances",
      "Chromatographie sur couche mince",
    ],
    status: "en-renovation",
  },
  {
    name: "Laboratoire de SVT",
    description:
      "Espace d'étude de la biologie cellulaire, de la génétique et des sciences de la Terre. Microscopes et matériel de dissection disponibles pour les classes.",
    equipment: [
      "Microscopes optiques",
      "Loupes binoculaires",
      "Matériel de dissection",
      "Collections biologiques et géologiques",
      "Modèles anatomiques",
    ],
    activities: [
      "Observation de cellules animales et végétales",
      "Etude de l'ADN et de la mitose",
      "Dissection de grenouilles et de fleurs",
      "Analyse de roches et de fossiles",
    ],
    status: "actif",
  },
  {
    name: "Salle informatique",
    description:
      "Espace équipé d'ordinateurs connectés pour l'enseignement de l'algorithmique, de la programmation et des outils numériques.",
    equipment: [
      "Postes informatiques équipés",
      "Logiciels de programmation (Python, etc.)",
      "Connexion Internet encadrée",
      "Vidéoprojecteur",
    ],
    activities: [
      "Programmation en Python",
      "Algorithmique et structures de données",
      "Outils de traitement de données",
      "Initiation à la robotique (en développement)",
    ],
    status: "actif",
  },
];

export interface Contest {
  name: string;
  level: "national" | "regional" | "africain" | "international";
  discipline: string;
  description: string;
  lsyParticipation?: string;
}

export const contests: Contest[] = [
  {
    name: "Concours Général (Côte d'Ivoire)",
    level: "national",
    discipline: "Toutes disciplines",
    description:
      "Compétition académique nationale récompensant les meilleurs élèves de terminale dans chaque discipline. Le LSY y présente ses meilleurs élèves chaque année.",
    lsyParticipation: "Participation régulière depuis la fondation du lycée.",
  },
  {
    name: "Olympiade Nationale de Mathématiques",
    level: "national",
    discipline: "Mathématiques",
    description:
      "Compétition nationale de résolution de problèmes mathématiques pour les lycéens. Les élèves du LSY sont parmi les participants les plus réguliers.",
    lsyParticipation:
      "Participation annuelle, avec plusieurs élèves présélectionnés pour les phases nationales.",
  },
  {
    name: "Pan African Mathematics Olympiad (PAMO)",
    level: "africain",
    discipline: "Mathématiques",
    description:
      "Olympiade de mathématiques panafricaine regroupant les meilleurs lycéens du continent. La Côte d'Ivoire y est représentée par des élèves issus du LSY.",
    lsyParticipation:
      "Représentation nationale à plusieurs reprises. Résultats à confirmer auprès de l'administration.",
  },
  {
    name: "Concours d'entrée en Classes Préparatoires",
    level: "national",
    discipline: "Sciences",
    description:
      "Concours sélectifs pour l'accès aux classes préparatoires (CPGE) en Côte d'Ivoire et en France. Le LSY prépare ses Terminales C et D à ces concours exigeants.",
    lsyParticipation:
      "De nombreux diplômés du LSY intègrent chaque année des classes préparatoires.",
  },
  {
    name: "Concours d'entrée aux Grandes Écoles",
    level: "international",
    discipline: "Sciences et ingénierie",
    description:
      "Concours préparés par les anciens élèves du LSY en CPGE, visant les grandes écoles d'ingénieurs et les ENS.",
    lsyParticipation:
      "Plusieurs anciens élèves du LSY ont réussi l'intégration dans des grandes écoles françaises et africaines.",
  },
];

export const juniorResearchInfo = {
  title: "Recherche Scientifique Junior au LSY",
  introduction:
    "Le Lycée Scientifique de Yamoussoukro encourage ses élèves à s'initier à la démarche de recherche scientifique dès le secondaire. Des projets tutorés permettent aux élèves volontaires de mener des investigations originales encadrées par les enseignants.",
  objectives: [
    "Initier les élèves à la méthode scientifique rigoureuse",
    "Développer la capacité d'investigation autonome",
    "Préparer les meilleurs profils aux études scientifiques supérieures",
    "Favoriser la culture de l'innovation et de la curiosité intellectuelle",
  ],
  domains: [
    "Mathématiques appliquées",
    "Physique expérimentale",
    "Biologie et environnement",
    "Chimie et matériaux",
    "Informatique et algorithmique",
  ],
  statusNote:
    "Programme en développement. Les détails de l'organisation, des projets en cours et des résultats sont à confirmer auprès de l'administration du lycée.",
};

import {
  Award,
  BedDouble,
  BookOpen,
  Building2,
  CalendarDays,
  Compass,
  Dumbbell,
  FileText,
  FlaskConical,
  Folders,
  GraduationCap,
  HandHeart,
  HardHat,
  HeartPulse,
  HelpCircle,
  Images,
  Landmark,
  Medal,
  Megaphone,
  Microscope,
  Network,
  Newspaper,
  PlayCircle,
  Presentation,
  Quote,
  Scale,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  UserCheck,
  Users,
  type LucideIcon,
} from "lucide-react";

export interface MegaLink {
  label: string;
  href: string;
  description: string;
  icon: LucideIcon;
}

export interface MegaFeature {
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  cta: string;
}

export interface NavItem {
  label: string;
  href: string;
  mega?: {
    intro?: string;
    links: MegaLink[];
    feature?: MegaFeature;
  };
}

export const primaryNav: NavItem[] = [
  { label: "Accueil", href: "/" },
  {
    label: "Le Lycée",
    href: "/le-lycee/presentation",
    mega: {
      intro:
        "Une institution publique d'excellence, fière de son héritage et tournée vers l'avenir.",
      links: [
        {
          label: "Présentation",
          href: "/le-lycee/presentation",
          description: "Identité, vocation nationale et positionnement scientifique.",
          icon: Building2,
        },
        {
          label: "Mot du Proviseur",
          href: "/le-lycee/mot-du-proviseur",
          description: "Message et vision éducative de la direction.",
          icon: Quote,
        },
        {
          label: "Histoire",
          href: "/le-lycee/histoire",
          description: "De la fondation aux 50 ans d'excellence.",
          icon: Landmark,
        },
        {
          label: "Mission, vision et valeurs",
          href: "/le-lycee/mission-vision-valeurs",
          description: "Ce qui guide chaque jour la communauté du LSY.",
          icon: Compass,
        },
        {
          label: "Administration",
          href: "/le-lycee/administration",
          description: "Organigramme, services et contacts.",
          icon: Network,
        },
        {
          label: "Infrastructures",
          href: "/le-lycee/infrastructures",
          description: "Salles, laboratoires, internat et espaces numériques.",
          icon: Landmark,
        },
        {
          label: "Réhabilitation",
          href: "/le-lycee/rehabilitation",
          description: "Le projet de modernisation et la nouvelle ère.",
          icon: HardHat,
        },
      ],
      feature: {
        eyebrow: "Nouvelle ère",
        title: "Une réhabilitation d'ampleur nationale",
        description:
          "Modernisation des laboratoires, extension des capacités d'accueil et nouveaux espaces numériques.",
        href: "/le-lycee/rehabilitation",
        cta: "Suivre la réhabilitation",
      },
    },
  },
  {
    label: "Admissions",
    href: "/admissions/vue-d-ensemble",
    mega: {
      intro:
        "Tout ce que les familles doivent savoir pour rejoindre le Lycée Scientifique.",
      links: [
        {
          label: "Vue d'ensemble",
          href: "/admissions/vue-d-ensemble",
          description: "Profils concernés, voies d'entrée et étapes clés.",
          icon: Compass,
        },
        {
          label: "Entrée en 4e",
          href: "/admissions/entree-en-4e",
          description: "Conditions, pièces à fournir et procédure DELC.",
          icon: GraduationCap,
        },
        {
          label: "Entrée en seconde",
          href: "/admissions/entree-en-seconde",
          description: "Conditions, BEPC et niveau scientifique attendu.",
          icon: GraduationCap,
        },
        {
          label: "Calendrier",
          href: "/admissions/calendrier",
          description: "Dépôt, commission, résultats et rentrée.",
          icon: CalendarDays,
        },
        {
          label: "Documents",
          href: "/admissions/documents",
          description: "Formulaires, notices et listes de pièces.",
          icon: FileText,
        },
        {
          label: "FAQ",
          href: "/admissions/faq",
          description: "Réponses aux questions les plus fréquentes.",
          icon: HelpCircle,
        },
      ],
      feature: {
        eyebrow: "Conditions d'admission",
        title: "Préparer un dossier solide",
        description:
          "Critères, calendrier et documents à réunir pour candidater sereinement.",
        href: "/admissions/vue-d-ensemble",
        cta: "Découvrir la procédure",
      },
    },
  },
  {
    label: "Académie & Innovation",
    href: "/academie-innovation/organisation-pedagogique",
    mega: {
      intro:
        "Un enseignement scientifique de haut niveau, des laboratoires à la recherche junior.",
      links: [
        {
          label: "Organisation pédagogique",
          href: "/academie-innovation/organisation-pedagogique",
          description: "Niveaux, encadrement, évaluation et discipline.",
          icon: Presentation,
        },
        {
          label: "Programmes",
          href: "/academie-innovation/programmes",
          description: "Disciplines scientifiques et littéraires.",
          icon: BookOpen,
        },
        {
          label: "Laboratoires",
          href: "/academie-innovation/laboratoires",
          description: "Physique, chimie, SVT, informatique et sécurité.",
          icon: FlaskConical,
        },
        {
          label: "Recherche scientifique junior",
          href: "/academie-innovation/recherche-scientifique-junior",
          description: "Projets d'élèves, encadrement et résultats.",
          icon: Microscope,
        },
        {
          label: "Ressources pédagogiques",
          href: "/academie-innovation/ressources-pedagogiques",
          description: "Sujets, corrigés et supports filtrables.",
          icon: Folders,
        },
        {
          label: "Examens et concours",
          href: "/academie-innovation/examens-et-concours",
          description: "BEPC, BAC, olympiades et grandes écoles.",
          icon: Award,
        },
      ],
      feature: {
        eyebrow: "Innovation",
        title: "Des laboratoires modernisés",
        description:
          "Travaux pratiques, robotique et culture de la recherche dès le secondaire.",
        href: "/academie-innovation/laboratoires",
        cta: "Explorer les laboratoires",
      },
    },
  },
  {
    label: "Vie au LSY",
    href: "/vie-au-lysee/internat",
    mega: {
      intro:
        "Un cadre de vie structuré, sain et stimulant, au service de la réussite.",
      links: [
        {
          label: "Internat",
          href: "/vie-au-lysee/internat",
          description: "Hébergement, encadrement et vie quotidienne.",
          icon: BedDouble,
        },
        {
          label: "Clubs",
          href: "/vie-au-lysee/clubs",
          description: "Sciences, robotique, débat, environnement, culture.",
          icon: Sparkles,
        },
        {
          label: "Santé et infirmerie",
          href: "/vie-au-lysee/sante-et-infirmerie",
          description: "Prise en charge, prévention et protocole d'urgence.",
          icon: HeartPulse,
        },
        {
          label: "Soutien psychologique",
          href: "/vie-au-lysee/soutien-psychologique",
          description: "Écoute, orientation et préparation mentale.",
          icon: HandHeart,
        },
        {
          label: "Sport et culture",
          href: "/vie-au-lysee/sport-et-culture",
          description: "Compétitions, cérémonies et activités artistiques.",
          icon: Dumbbell,
        },
        {
          label: "Règlement intérieur",
          href: "/vie-au-lysee/reglement-interieur",
          description: "Discipline, droits et devoirs des élèves.",
          icon: Scale,
        },
      ],
    },
  },
  {
    label: "Excellence & Alumni",
    href: "/excellence-alumni/majors",
    mega: {
      intro:
        "Des résultats qui inspirent et un réseau d'anciens engagés auprès du lycée.",
      links: [
        {
          label: "Majors",
          href: "/excellence-alumni/majors",
          description: "Les lauréats qui incarnent l'excellence du LSY.",
          icon: Medal,
        },
        {
          label: "Résultats",
          href: "/excellence-alumni/resultats",
          description: "Performances aux examens et distinctions.",
          icon: TrendingUp,
        },
        {
          label: "Concours et distinctions",
          href: "/excellence-alumni/concours-et-distinctions",
          description: "Olympiades, prix nationaux et internationaux.",
          icon: Award,
        },
        {
          label: "Anciens élèves",
          href: "/excellence-alumni/anciens-eleves",
          description: "Réseau, témoignages et parcours inspirants.",
          icon: Users,
        },
        {
          label: "Mentorat",
          href: "/excellence-alumni/mentorat",
          description: "Accompagner et inspirer les élèves d'aujourd'hui.",
          icon: UserCheck,
        },
      ],
      feature: {
        eyebrow: "Réseau alumni",
        title: "Rejoindre la communauté",
        description:
          "Anciens élèves : inscrivez-vous, témoignez et devenez mentor.",
        href: "/excellence-alumni/anciens-eleves",
        cta: "Rejoindre le réseau",
      },
    },
  },
  {
    label: "Actualités & Médias",
    href: "/actualites",
    mega: {
      intro: "Toute la vie du lycée : informations officielles, images et vidéos.",
      links: [
        {
          label: "Actualités",
          href: "/actualites",
          description: "Articles, catégories et temps forts.",
          icon: Newspaper,
        },
        {
          label: "Communiqués",
          href: "/actualites/communiques",
          description: "Notes officielles et informations aux familles.",
          icon: Megaphone,
        },
        {
          label: "Événements",
          href: "/actualites/evenements",
          description: "Agenda des rendez-vous à venir et passés.",
          icon: CalendarDays,
        },
        {
          label: "Galerie",
          href: "/medias/galerie",
          description: "Albums photos par année et par évènement.",
          icon: Images,
        },
        {
          label: "Web TV",
          href: "/medias/web-tv",
          description: "Reportages, cérémonies et témoignages.",
          icon: PlayCircle,
        },
      ],
      feature: {
        eyebrow: "Rester informé",
        title: "Suivre l'actualité du LSY",
        description:
          "Communiqués urgents, évènements et temps forts de la communauté.",
        href: "/actualites",
        cta: "Voir les actualités",
      },
    },
  },
  {
    label: "Portail",
    href: "/portail",
    mega: {
      intro:
        "Les futurs espaces numériques de la communauté scolaire (en préparation).",
      links: [
        {
          label: "Espace élève",
          href: "/portail/eleve",
          description: "Emploi du temps, ressources et notifications.",
          icon: GraduationCap,
        },
        {
          label: "Espace parent",
          href: "/portail/parent",
          description: "Communiqués, documents et suivi.",
          icon: Users,
        },
        {
          label: "Espace enseignant",
          href: "/portail/enseignant",
          description: "Dépôt de ressources et communiqués internes.",
          icon: Presentation,
        },
        {
          label: "Administration",
          href: "/portail/administration",
          description: "Gestion des contenus et du site.",
          icon: ShieldCheck,
        },
      ],
      feature: {
        eyebrow: "Accès sécurisé",
        title: "Le portail LSY",
        description:
          "Une plateforme unique pour élèves, parents, enseignants et administration.",
        href: "/portail",
        cta: "Découvrir le portail",
      },
    },
  },
];

/* — Actions principales du header — */
export const headerActions = {
  contact: { label: "Nous contacter", href: "/contact" },
  portal: { label: "Accéder au portail", href: "/portail" },
};

/* — Barre inférieure mobile — */
export interface BottomNavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export const bottomNav: BottomNavItem[] = [
  { label: "Accueil", href: "/", icon: Building2 },
  { label: "Admission", href: "/admissions/vue-d-ensemble", icon: GraduationCap },
  { label: "Actualités", href: "/actualites", icon: Newspaper },
  { label: "Documents", href: "/documents", icon: FileText },
  { label: "Portail", href: "/portail", icon: ShieldCheck },
];

/* — Liens secondaires rapides — */
export const quickLinks = [
  { label: "Conditions d'admission", href: "/admissions/vue-d-ensemble", icon: GraduationCap },
  { label: "Documents utiles", href: "/documents", icon: FileText },
  { label: "Communiqués", href: "/actualites/communiques", icon: Megaphone },
  { label: "Calendrier", href: "/calendrier", icon: CalendarDays },
  { label: "Réhabilitation", href: "/le-lycee/rehabilitation", icon: HardHat },
  { label: "Contact", href: "/contact", icon: Network },
];

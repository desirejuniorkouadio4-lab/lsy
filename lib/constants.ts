/**
 * Valeurs métier partagées (validées via Zod, affichées dans l'admin).
 * Stockées en String côté base (compatibilité SQLite / PostgreSQL).
 */

/* — Rôles utilisateurs — */
export const ROLES = [
  "SUPER_ADMIN",
  "ADMIN",
  "COMMUNICATION",
  "ACADEMIC_MANAGER",
  "LIFE_SCHOOL_MANAGER",
  "TEACHER",
  "STUDENT",
  "PARENT",
  "ALUMNI",
  "PARTNER",
] as const;
export type Role = (typeof ROLES)[number];

export const ROLE_LABELS: Record<Role, string> = {
  SUPER_ADMIN: "Super administrateur",
  ADMIN: "Administrateur LSY",
  COMMUNICATION: "Responsable communication",
  ACADEMIC_MANAGER: "Responsable académique",
  LIFE_SCHOOL_MANAGER: "Responsable vie scolaire",
  TEACHER: "Enseignant",
  STUDENT: "Élève",
  PARENT: "Parent",
  ALUMNI: "Ancien élève",
  PARTNER: "Partenaire",
};

/** Rôles disposant d'un accès au back-office. */
export const ADMIN_ROLES: Role[] = [
  "SUPER_ADMIN",
  "ADMIN",
  "COMMUNICATION",
  "ACADEMIC_MANAGER",
  "LIFE_SCHOOL_MANAGER",
];

/* — Statuts de publication — */
export const PUBLISH_STATUS = ["DRAFT", "PUBLISHED", "ARCHIVED"] as const;
export type PublishStatus = (typeof PUBLISH_STATUS)[number];

export const PUBLISH_STATUS_LABELS: Record<PublishStatus, string> = {
  DRAFT: "Brouillon",
  PUBLISHED: "Publié",
  ARCHIVED: "Archivé",
};

/* — Statuts des demandes (alumni, partenaires, messages) — */
export const REQUEST_STATUS = [
  "PENDING",
  "REVIEWED",
  "APPROVED",
  "REJECTED",
] as const;
export type RequestStatus = (typeof REQUEST_STATUS)[number];

export const REQUEST_STATUS_LABELS: Record<RequestStatus, string> = {
  PENDING: "En attente",
  REVIEWED: "Traité",
  APPROVED: "Approuvé",
  REJECTED: "Refusé",
};

/* — Publics cibles des communiqués — */
export const COMMUNIQUE_TARGETS = [
  "TOUS",
  "ELEVES",
  "PARENTS",
  "ENSEIGNANTS",
] as const;
export type CommuniqueTarget = (typeof COMMUNIQUE_TARGETS)[number];

export const COMMUNIQUE_TARGET_LABELS: Record<CommuniqueTarget, string> = {
  TOUS: "Tous les publics",
  ELEVES: "Élèves",
  PARENTS: "Parents",
  ENSEIGNANTS: "Enseignants",
};

/* — Types de documents — */
export const DOCUMENT_TYPES = [
  "Admission",
  "Communiqué",
  "Calendrier",
  "Règlement",
  "Sujet",
  "Corrigé",
  "Ressource pédagogique",
] as const;
export type DocumentType = (typeof DOCUMENT_TYPES)[number];

/* — Matières (filtres ressources / documents) — */
export const SUBJECTS = [
  "Mathématiques",
  "Physique-Chimie",
  "SVT",
  "Informatique",
  "Français",
  "Anglais",
  "Philosophie",
  "Histoire-Géographie",
] as const;

/* — Niveaux — */
export const LEVELS = [
  "4e",
  "3e",
  "Seconde",
  "Première",
  "Terminale",
] as const;

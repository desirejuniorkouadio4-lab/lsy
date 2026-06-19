/**
 * Contenu éditorial statique pour les pages d'admissions.
 * Les détails officiels (dates, pièces) doivent être confirmés par l'administration.
 */

export interface AdmissionStep {
  step: number;
  title: string;
  description: string;
  deadline?: string;
}

export const steps4e: AdmissionStep[] = [
  {
    step: 1,
    title: "Vérifier les conditions d'éligibilité",
    description:
      "Le candidat doit être scolarisé en classe de 5e dans un établissement public ou privé de Côte d'Ivoire, avoir obtenu de très bons résultats dans les matières scientifiques (mathématiques, sciences) et avoir le profil d'un élève sérieux et discipliné.",
  },
  {
    step: 2,
    title: "Retirer le dossier de candidature",
    description:
      "Le dossier de candidature est disponible auprès de la Direction des Lycées et Collèges (DELC) ou dans les établissements agréés. Il contient le formulaire d'inscription, la liste des pièces à fournir et le règlement d'admission.",
    deadline: "À confirmer par l'administration",
  },
  {
    step: 3,
    title: "Constituer et déposer le dossier",
    description:
      "Le dossier complet doit être déposé dans les délais fixés par la DELC. Veillez à inclure toutes les pièces requises et à respecter strictement la date limite.",
    deadline: "Selon calendrier DELC — à confirmer",
  },
  {
    step: 4,
    title: "Étude des dossiers",
    description:
      "Une commission d'admission examine les dossiers sur la base des résultats scolaires, notamment en mathématiques et en sciences. Les critères de sélection sont définis par la direction pédagogique.",
  },
  {
    step: 5,
    title: "Résultats et affectation",
    description:
      "Les résultats sont publiés par la DELC et les élèves admis reçoivent une notification officielle d'affectation. Les élèves non retenus peuvent être placés sur liste d'attente.",
    deadline: "Avant la rentrée scolaire — à confirmer",
  },
  {
    step: 6,
    title: "Inscription définitive et rentrée",
    description:
      "Les élèves admis doivent confirmer leur inscription dans les délais impartis en fournissant les documents complémentaires et en procédant au paiement des frais de scolarité.",
  },
];

export const steps2nd: AdmissionStep[] = [
  {
    step: 1,
    title: "Obtenir le BEPC avec mention",
    description:
      "L'admission en Seconde est conditionnée à l'obtention du BEPC avec un niveau scientifique élevé. Les candidats doivent avoir d'excellents résultats en mathématiques et en sciences.",
  },
  {
    step: 2,
    title: "Constituer le dossier de candidature",
    description:
      "Le dossier comprend les pièces d'état civil, le diplôme du BEPC ou le relevé de notes, et les bulletins scolaires des deux dernières années. La liste exacte est disponible auprès de la DELC.",
  },
  {
    step: 3,
    title: "Déposer le dossier dans les délais",
    description:
      "Le dépôt se fait selon les procédures définies par la Direction des Lycées et Collèges. Respectez strictement les dates limites.",
    deadline: "Selon calendrier DELC — à confirmer",
  },
  {
    step: 4,
    title: "Sélection et résultats",
    description:
      "La commission d'admission sélectionne les candidats sur la base des résultats académiques. Les élèves retenus sont affectés officiellement au LSY.",
  },
  {
    step: 5,
    title: "Inscription et rentrée",
    description:
      "Confirmation de l'inscription et prise en charge des formalités administratives avant la rentrée scolaire.",
  },
];

export interface RequiredDocument {
  name: string;
  note?: string;
}

export const requiredDocs4e: RequiredDocument[] = [
  { name: "Formulaire de candidature dûment rempli" },
  { name: "Extrait d'acte de naissance ou copie" },
  { name: "Deux photos d'identité récentes" },
  { name: "Bulletins scolaires de 6e et de 5e (trois trimestres)" },
  { name: "Certificat de scolarité de l'établissement d'origine" },
  { name: "Attestation médicale d'aptitude scolaire", note: "À faire établir par un médecin agréé" },
  { name: "Fiche de renseignements parents/tuteur" },
];

export const requiredDocs2nd: RequiredDocument[] = [
  { name: "Formulaire de candidature dûment rempli" },
  { name: "Extrait d'acte de naissance ou copie" },
  { name: "Deux photos d'identité récentes" },
  { name: "Diplôme du BEPC ou relevé de notes provisoire" },
  { name: "Bulletins scolaires de 4e et de 3e (trois trimestres chacun)" },
  { name: "Certificat de scolarité de l'établissement d'origine" },
  { name: "Attestation médicale d'aptitude scolaire" },
  { name: "Fiche de renseignements parents/tuteur" },
];

export interface FaqItem {
  question: string;
  answer: string;
  category: "processus" | "conditions" | "vie" | "contact";
}

export const faqItems: FaqItem[] = [
  {
    category: "conditions",
    question: "Quelles sont les conditions pour intégrer le LSY en 4e ?",
    answer:
      "Pour être admis en 4e, votre enfant doit être scolarisé en 5e et présenter d'excellents résultats scolaires, particulièrement en mathématiques et en sciences. La sélection est nationale et compétitive. Les critères précis sont définis par la Direction des Lycées et Collèges (DELC).",
  },
  {
    category: "conditions",
    question: "Mon enfant doit-il passer un examen d'entrée ?",
    answer:
      "L'admission se fait principalement sur dossier scolaire. Il n'y a pas d'examen écrit spécifique au LSY dans le processus habituel, mais un très bon niveau académique est requis. Les modalités exactes peuvent varier : renseignez-vous auprès de la DELC pour l'année en cours.",
  },
  {
    category: "processus",
    question: "Où retirer et déposer le dossier de candidature ?",
    answer:
      "Les dossiers de candidature sont disponibles auprès de la Direction des Lycées et Collèges (DELC), dans les centres régionaux compétents. Les détails de dépôt pour l'année en cours sont à confirmer directement auprès de la DELC ou de l'administration du LSY.",
  },
  {
    category: "processus",
    question: "Quand les résultats d'admission sont-ils publiés ?",
    answer:
      "Les résultats sont généralement publiés par la DELC avant la rentrée scolaire. Les élèves admis reçoivent une notification officielle d'affectation. Les dates précises pour l'année en cours sont à confirmer auprès de la DELC.",
  },
  {
    category: "vie",
    question: "Mon enfant devra-t-il être interne ?",
    answer:
      "La grande majorité des élèves du LSY sont pensionnaires (internes). L'internat est encadré par des surveillants et des conseillers d'éducation. Le lycée assure le logement, la restauration et l'encadrement scolaire permanent. Des modalités spécifiques pour les externes existent selon la situation — renseignez-vous auprès de l'administration.",
  },
  {
    category: "vie",
    question: "Quels sont les frais de scolarité ?",
    answer:
      "Les frais de scolarité sont fixés par l'État ivoirien et peuvent varier selon les années. Les détails pour l'année scolaire en cours sont à confirmer auprès de l'administration du lycée ou de la DELC.",
  },
  {
    category: "vie",
    question: "Peut-on visiter le lycée avant l'inscription ?",
    answer:
      "Des journées portes ouvertes sont organisées périodiquement pour permettre aux familles de découvrir le lycée, ses infrastructures et son ambiance. Consultez la section Événements pour connaître les prochaines dates, ou contactez directement l'administration.",
  },
  {
    category: "contact",
    question: "Qui contacter pour plus d'informations sur les admissions ?",
    answer:
      "Pour toute question relative aux admissions, contactez l'administration du Lycée Scientifique de Yamoussoukro (contact@lsy.ci) ou la Direction des Lycées et Collèges (DELC) de Côte d'Ivoire. Notre service d'accueil peut aussi répondre à vos questions.",
  },
  {
    category: "conditions",
    question: "Le LSY accepte-t-il des élèves en provenance d'autres pays ?",
    answer:
      "Le LSY est un établissement public ivoirien. Les conditions d'admission pour les élèves de nationalité étrangère ou scolarisés hors de Côte d'Ivoire sont à vérifier auprès de l'administration du lycée et de la DELC.",
  },
  {
    category: "processus",
    question: "Que faire si le dossier est incomplet ?",
    answer:
      "Un dossier incomplet risque d'être rejeté. Veillez à rassembler toutes les pièces demandées avant de soumettre votre candidature. Si vous avez un doute sur une pièce manquante, contactez l'administration du lycée avant la date limite.",
  },
];

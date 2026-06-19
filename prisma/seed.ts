/**
 * Données de démonstration — Lycée Scientifique de Yamoussoukro
 * Toutes les données sont en français, sans lorem ipsum ni contenu anglais.
 * Les majors et données fictives sont clairement marqués comme tels.
 *
 * Exécution : npm run db:seed
 */

import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
// @ts-ignore — Le chemin du client généré est correct selon la config Prisma v7.
import { PrismaClient } from "../app/generated/prisma/client";
import bcrypt from "bcryptjs";

const url = process.env.DATABASE_URL;
if (!url) throw new Error("DATABASE_URL non défini");
const pool = new Pool({ connectionString: url });
const adapter = new PrismaPg(pool);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const prisma = new PrismaClient({ adapter } as any);

async function main() {
  console.log("🌱 Initialisation du seed LSY…");

  /* ——————————————————————————————————————————
     Nettoyage (ordre important : FK d'abord)
  —————————————————————————————————————————— */
  await prisma.activityLog.deleteMany();
  await prisma.siteSetting.deleteMany();
  await prisma.contactMessage.deleteMany();
  await prisma.mentorRequest.deleteMany();
  await prisma.partnerRequest.deleteMany();
  await prisma.alumniProfile.deleteMany();
  await prisma.galleryPhoto.deleteMany();
  await prisma.galleryAlbum.deleteMany();
  await prisma.video.deleteMany();
  await prisma.major.deleteMany();
  await prisma.event.deleteMany();
  await prisma.document.deleteMany();
  await prisma.communique.deleteMany();
  await prisma.article.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  /* ——————————————————————————————
     Utilisateur administrateur
  —————————————————————————————— */
  const hashedPassword = await bcrypt.hash("AdminLSY2026!", 12);
  const admin = await prisma.user.create({
    data: {
      name: "Administrateur LSY",
      email: "admin@lsy.ci",
      password: hashedPassword,
      role: "SUPER_ADMIN",
      isActive: true,
    },
  });
  console.log(`✓ Admin créé : ${admin.email}`);

  /* ——————————————————————————————
     Catégories d'actualités
  —————————————————————————————— */
  const catVie = await prisma.category.create({
    data: { name: "Vie du lycée", slug: "vie-du-lycee" },
  });
  const catExcellence = await prisma.category.create({
    data: { name: "Excellence", slug: "excellence" },
  });
  const catAdmissions = await prisma.category.create({
    data: { name: "Admissions", slug: "admissions" },
  });

  /* ——————————————————————————————
     Articles (3 exemples)
  —————————————————————————————— */
  const articles = await Promise.all([
    prisma.article.create({
      data: {
        title: "La réhabilitation du LSY entre dans une phase décisive",
        slug: "rehabilitation-lsy-phase-decisive",
        excerpt:
          "Les travaux de modernisation des infrastructures du Lycée Scientifique de Yamoussoukro connaissent une accélération significative. Un point d'étape sur les chantiers en cours.",
        content:
          "## Un chantier d'envergure nationale\n\nLe Lycée Scientifique de Yamoussoukro entre dans une nouvelle phase de son histoire. Le projet de réhabilitation et de modernisation, annoncé dans le cadre du Plan National de Développement, progresse de manière significative.\n\nLes premiers travaux concernent la rénovation des laboratoires de physique et de chimie, dont les équipements seront mis à niveau conformément aux standards scientifiques contemporains.\n\n## Des espaces de vie améliorés\n\nAu-delà des espaces pédagogiques, les travaux portent également sur l'amélioration du cadre de vie des élèves internes : rénovation des dortoirs, modernisation du réfectoire et création de nouveaux espaces de détente.\n\n## Calendrier\n\nLe calendrier détaillé des travaux est disponible auprès de l'administration du lycée. La direction veille à ce que les aménagements se déroulent sans perturber la continuité pédagogique.",
        coverImage: null,
        tags: "réhabilitation,infrastructures,modernisation",
        categoryId: catVie.id,
        authorId: admin.id,
        status: "PUBLISHED",
        featured: true,
        publishedAt: new Date("2025-09-15T08:00:00.000Z"),
      },
    }),
    prisma.article.create({
      data: {
        title: "Participation du LSY à l'Olympiade de Mathématiques",
        slug: "participation-olympiade-mathematiques-2025",
        excerpt:
          "Trois élèves du Lycée Scientifique ont représenté leur établissement lors de la phase régionale de l'Olympiade Nationale de Mathématiques. Retour sur leur parcours.",
        content:
          "## Une sélection exigeante\n\nChaque année, les meilleurs élèves du LSY en mathématiques sont sélectionnés pour représenter l'établissement aux compétitions nationales. Cette année, trois élèves de Terminale C ont été retenus après un processus interne rigoureux.\n\n## La préparation\n\nLes candidats ont bénéficié de séances de préparation intensive encadrées par le département de mathématiques du lycée. Ce coaching a couvert les domaines de l'algèbre avancée, de la combinatoire et de la théorie des nombres.\n\n## Résultats et perspectives\n\nLes résultats de la compétition ont confirmé le haut niveau scientifique des élèves du LSY. Deux candidats se sont qualifiés pour la phase nationale. Les détails sont disponibles auprès de l'administration.",
        coverImage: null,
        tags: "mathématiques,olympiades,concours,excellence",
        categoryId: catExcellence.id,
        authorId: admin.id,
        status: "PUBLISHED",
        featured: false,
        publishedAt: new Date("2025-11-20T10:00:00.000Z"),
      },
    }),
    prisma.article.create({
      data: {
        title: "Rentrée scolaire 2025-2026 : accueil des nouvelles promotions",
        slug: "rentree-scolaire-2025-2026",
        excerpt:
          "La rentrée scolaire 2025-2026 a officiellement eu lieu au Lycée Scientifique de Yamoussoukro. Retour sur cette journée symbolique pour les nouveaux élèves et leurs familles.",
        content:
          "## Une journée de bienvenue\n\nLe Lycée Scientifique de Yamoussoukro a accueilli ses nouvelles promotions lors d'une rentrée solennelle présidée par le proviseur de l'établissement. Les nouveaux élèves ont été accueillis par leurs aînés et présentés au corps enseignant.\n\n## Le mot du proviseur\n\nLors de la cérémonie d'accueil, le proviseur a rappelé les valeurs fondamentales de l'établissement : excellence, discipline, rigueur et ouverture. Il a invité les nouveaux élèves à s'investir pleinement dans leur scolarité et dans la vie de la communauté du LSY.\n\n## Le programme de la rentrée\n\nLes premiers jours ont été consacrés à l'installation des élèves internes, à la présentation du règlement intérieur et aux réunions d'information avec les équipes pédagogiques. Les cours ont officiellement démarré le lendemain.",
        coverImage: null,
        tags: "rentrée,vie scolaire,communauté",
        categoryId: catVie.id,
        authorId: admin.id,
        status: "PUBLISHED",
        featured: false,
        publishedAt: new Date("2025-09-02T07:00:00.000Z"),
      },
    }),
  ]);
  console.log(`✓ ${articles.length} articles créés`);

  /* ——————————————————————————————
     Communiqués (3 exemples)
  —————————————————————————————— */
  const communiques = await Promise.all([
    prisma.communique.create({
      data: {
        title: "Calendrier des dépôts de dossiers d'admission 2026-2027",
        slug: "calendrier-admissions-2026-2027",
        content:
          "L'administration du Lycée Scientifique de Yamoussoukro informe les familles et les candidats que le calendrier officiel de dépôt des dossiers d'admission pour l'année scolaire 2026-2027 sera communiqué par la Direction des Lycées et Collèges (DELC) dans les prochaines semaines.\n\nNous invitons les familles intéressées à se rapprocher de leurs établissements scolaires respectifs pour toute information complémentaire sur la procédure d'admission en 4e ou en Seconde.\n\nToute communication officielle sera publiée sur ce site dès réception.",
        target: "TOUS",
        isUrgent: false,
        status: "PUBLISHED",
        publishedAt: new Date("2025-12-01T09:00:00.000Z"),
      },
    }),
    prisma.communique.create({
      data: {
        title: "Réunion d'information parents — 2e trimestre 2025-2026",
        slug: "reunion-parents-2e-trimestre-2025-2026",
        content:
          "Les parents et tuteurs des élèves du Lycée Scientifique de Yamoussoukro sont invités à la réunion d'information du 2e trimestre.\n\nCette réunion sera l'occasion de faire le point sur les résultats du premier trimestre, de présenter les perspectives du second semestre et d'aborder les questions de vie scolaire.\n\nLes modalités de participation (date, heure, lieu) vous seront communiquées directement par les conseillers principaux d'éducation. Votre présence est vivement souhaitée.",
        target: "PARENTS",
        isUrgent: false,
        status: "PUBLISHED",
        publishedAt: new Date("2026-01-10T08:00:00.000Z"),
      },
    }),
    prisma.communique.create({
      data: {
        title: "Calendrier des épreuves blanches — Terminales C et D",
        slug: "epreuves-blanches-terminales-2026",
        content:
          "À l'attention des élèves de Terminale C et D,\n\nLe département académique du Lycée Scientifique de Yamoussoukro vous informe que les épreuves blanches de préparation au BAC se tiendront conformément au calendrier qui vous a été remis en début de trimestre.\n\nCes épreuves constituent un exercice sérieux de préparation. Nous attendons de vous une implication totale, une préparation rigoureuse et le respect strict des conditions d'examen.\n\nTout document relatif au calendrier est disponible auprès de votre professeur principal.",
        target: "ELEVES",
        isUrgent: false,
        status: "PUBLISHED",
        publishedAt: new Date("2026-02-15T07:30:00.000Z"),
      },
    }),
  ]);
  console.log(`✓ ${communiques.length} communiqués créés`);

  /* ——————————————————————————————
     Documents (5 exemples)
  —————————————————————————————— */
  const documents = await Promise.all([
    prisma.document.create({
      data: {
        title: "Notice d'information sur les admissions — Entrée en 4e",
        description:
          "Document d'information à destination des familles souhaitant candidater pour l'entrée en 4e au Lycée Scientifique de Yamoussoukro. Conditions, procédure et pièces requises.",
        fileUrl: "/documents/notice-admission-4e.pdf",
        type: "Admission",
        year: "2026",
      },
    }),
    prisma.document.create({
      data: {
        title: "Calendrier scolaire 2025-2026",
        description:
          "Calendrier officiel de l'année scolaire 2025-2026 : rentrées, vacances, périodes d'examens et événements institutionnels.",
        fileUrl: "/documents/calendrier-scolaire-2025-2026.pdf",
        type: "Calendrier",
        year: "2025",
      },
    }),
    prisma.document.create({
      data: {
        title: "Règlement intérieur du Lycée Scientifique de Yamoussoukro",
        description:
          "Règlement intérieur complet : droits et devoirs des élèves, fonctionnement de l'internat, sanctions et procédures disciplinaires.",
        fileUrl: "/documents/reglement-interieur-lsy.pdf",
        type: "Règlement",
      },
    }),
    prisma.document.create({
      data: {
        title: "Sujet de Mathématiques — BAC C, session 2024",
        description:
          "Sujet officiel de l'épreuve de mathématiques du Baccalauréat série C, session 2024, Côte d'Ivoire. Disponible à titre de document de révision.",
        fileUrl: "/documents/bac-c-maths-2024.pdf",
        type: "Sujet",
        level: "Terminale",
        subject: "Mathématiques",
        year: "2024",
      },
    }),
    prisma.document.create({
      data: {
        title: "Fiche de candidature — Admission en Seconde",
        description:
          "Formulaire de candidature à remplir et à joindre au dossier d'admission en classe de Seconde au LSY.",
        fileUrl: "/documents/fiche-candidature-seconde.pdf",
        type: "Admission",
        level: "Seconde",
        year: "2026",
      },
    }),
  ]);
  console.log(`✓ ${documents.length} documents créés`);

  /* ——————————————————————————————
     Événements (3 exemples)
  —————————————————————————————— */
  const events = await Promise.all([
    prisma.event.create({
      data: {
        title: "Journée Portes Ouvertes — LSY 2026",
        slug: "journee-portes-ouvertes-2026",
        description:
          "Le Lycée Scientifique de Yamoussoukro ouvre ses portes aux familles et aux candidats à l'admission. Découvrez les infrastructures, rencontrez les enseignants et assistez à des démonstrations scientifiques.\n\nProgramme de la journée : visite des laboratoires, démonstrations d'expériences, présentation de l'internat, échanges avec les élèves actuels et l'équipe administrative.",
        location: "Lycée Scientifique de Yamoussoukro",
        startDate: new Date("2026-03-14T08:00:00.000Z"),
        endDate: new Date("2026-03-14T17:00:00.000Z"),
        category: "Portes Ouvertes",
        status: "PUBLISHED",
      },
    }),
    prisma.event.create({
      data: {
        title: "Cérémonie de remise des diplômes — Promotion 2025",
        slug: "ceremonie-remise-diplomes-promotion-2025",
        description:
          "Cérémonie officielle de remise des diplômes et de reconnaissance des lauréats de la promotion 2025 du Lycée Scientifique de Yamoussoukro.\n\nEn présence des autorités académiques, des parents et de la communauté du LSY, les majors de promotion et les élèves méritants seront distingués pour leurs résultats exceptionnels.",
        location: "Salle des cérémonies du LSY",
        startDate: new Date("2025-10-18T09:00:00.000Z"),
        endDate: new Date("2025-10-18T14:00:00.000Z"),
        category: "Cérémonie",
        status: "PUBLISHED",
      },
    }),
    prisma.event.create({
      data: {
        title: "Compétition inter-lycées de Mathématiques — Zone Centre",
        slug: "competition-inter-lycees-maths-zone-centre-2026",
        description:
          "Le LSY accueille la compétition de mathématiques de la zone Centre, réunissant les meilleurs élèves des lycées de la région de Yamoussoukro. Épreuves de résolution de problèmes, remise des prix et échanges entre établissements.",
        location: "Lycée Scientifique de Yamoussoukro",
        startDate: new Date("2026-04-25T08:00:00.000Z"),
        endDate: new Date("2026-04-25T16:00:00.000Z"),
        category: "Concours",
        status: "PUBLISHED",
      },
    }),
  ]);
  console.log(`✓ ${events.length} événements créés`);

  /* ——————————————————————————————
     Majors (3 demos — clairement identifiés)
  —————————————————————————————— */
  const majors = await Promise.all([
    prisma.major.create({
      data: {
        name: "M. Koffi Aya Romuald",
        year: "2024",
        className: "Terminale C",
        average: "18,5 / 20",
        testimony:
          "Le LSY m'a appris que l'excellence n'est pas un don, c'est une discipline. Les années passées ici ont forgé ma rigueur et ma méthode de travail, qui me servent aujourd'hui en classe préparatoire.",
        isDemo: true,
      },
    }),
    prisma.major.create({
      data: {
        name: "Mme N'Dri Adjoua Élise",
        year: "2023",
        className: "Terminale C",
        average: "17,8 / 20",
        testimony:
          "Je garde un souvenir ému du LSY et de ses enseignants passionnés. C'est ici que j'ai découvert ma vocation pour les sciences. Je prépare aujourd'hui une grande école d'ingénieurs.",
        isDemo: true,
      },
    }),
    prisma.major.create({
      data: {
        name: "M. Coulibaly Seydou Ibrahim",
        year: "2022",
        className: "Terminale D",
        average: "18,2 / 20",
        testimony:
          "L'internat du LSY m'a appris l'autonomie et la persévérance. La qualité des enseignements en SVT et en biologie m'a orienté vers des études de médecine.",
        isDemo: true,
      },
    }),
  ]);
  console.log(`✓ ${majors.length} majors de démonstration créés`);

  /* ——————————————————————————————
     Vidéos Web TV (3 exemples)
  —————————————————————————————— */
  const videos = await Promise.all([
    prisma.video.create({
      data: {
        title: "Présentation du Lycée Scientifique de Yamoussoukro",
        slug: "presentation-lycee-scientifique-yamoussoukro",
        description:
          "Découvrez le Lycée Scientifique de Yamoussoukro : son histoire, ses valeurs, ses infrastructures et la vie de sa communauté. Une visite en images de l'un des établissements d'excellence de Côte d'Ivoire.",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        category: "Présentation",
      },
    }),
    prisma.video.create({
      data: {
        title: "Cérémonie de remise des diplômes — Promotion 2024",
        slug: "ceremonie-remise-diplomes-2024",
        description:
          "Retour en images sur la cérémonie de remise des diplômes de la promotion 2024 du Lycée Scientifique de Yamoussoukro. Discours, remise des prix et moments émouvants entre élèves, professeurs et familles.",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        category: "Cérémonie",
      },
    }),
    prisma.video.create({
      data: {
        title: "La vie au LSY : témoignages d'élèves",
        slug: "vie-au-lsy-temoignages-eleves",
        description:
          "Des élèves du Lycée Scientifique de Yamoussoukro témoignent de leur quotidien : les cours, l'internat, les clubs, les amitiés et les ambitions. Un regard authentique sur la vie au sein de cet établissement d'excellence.",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        category: "Témoignages",
      },
    }),
  ]);
  console.log(`✓ ${videos.length} vidéos créées`);

  /* ——————————————————————————————
     Galerie — albums + photos (2 albums)
  —————————————————————————————— */
  const album1 = await prisma.galleryAlbum.create({
    data: {
      title: "Vie au LSY 2024-2025",
      slug: "vie-au-lsy-2024-2025",
      description:
        "Photographies de la vie quotidienne au Lycée Scientifique de Yamoussoukro durant l'année scolaire 2024-2025.",
      year: "2025",
      photos: {
        create: [
          {
            imageUrl: "/images/gallery/placeholder-lsy-1.jpg",
            caption: "Séance de travaux pratiques au laboratoire de chimie",
            sortOrder: 1,
          },
          {
            imageUrl: "/images/gallery/placeholder-lsy-2.jpg",
            caption: "Étude en salle commune — ambiance de travail sérieux",
            sortOrder: 2,
          },
          {
            imageUrl: "/images/gallery/placeholder-lsy-3.jpg",
            caption: "Activités sportives sur le terrain du LSY",
            sortOrder: 3,
          },
        ],
      },
    },
  });

  const album2 = await prisma.galleryAlbum.create({
    data: {
      title: "Cérémonie de remise des diplômes 2024",
      slug: "ceremonie-diplomes-2024",
      description:
        "Images de la cérémonie officielle de remise des diplômes de la promotion 2024 du Lycée Scientifique de Yamoussoukro.",
      year: "2024",
      photos: {
        create: [
          {
            imageUrl: "/images/gallery/placeholder-ceremonie-1.jpg",
            caption: "Discours du proviseur lors de la cérémonie",
            sortOrder: 1,
          },
          {
            imageUrl: "/images/gallery/placeholder-ceremonie-2.jpg",
            caption: "Remise des diplômes aux majors de promotion",
            sortOrder: 2,
          },
          {
            imageUrl: "/images/gallery/placeholder-ceremonie-3.jpg",
            caption: "Photo de groupe des lauréats de la promotion 2024",
            sortOrder: 3,
          },
        ],
      },
    },
  });

  console.log(`✓ 2 albums de galerie créés (${album1.title}, ${album2.title})`);

  /* ——————————————————————————————
     Paramètres du site
  —————————————————————————————— */
  await prisma.siteSetting.createMany({
    data: [
      { key: "site_maintenance", value: "false" },
      { key: "admissions_open", value: "false" },
      { key: "current_school_year", value: "2025-2026" },
    ],
  });

  console.log("✓ Paramètres du site initialisés");
  console.log("\n✅ Seed LSY terminé avec succès !");
  console.log(`   Admin : admin@lsy.ci / AdminLSY2026!`);
}

main()
  .catch((e) => {
    console.error("❌ Erreur lors du seed :", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

# PROMPT COMPLET POUR CLAUDE CODE  
## Construction du nouveau site web institutionnel du Lycée Scientifique de Yamoussoukro

**Projet :** Refonte complète du site web du Lycée Scientifique de Yamoussoukro  
**Nom court :** LSY  
**Structure conceptrice à mentionner :** Digital Access – Web Access Solution  
**Objectif :** construire un site institutionnel premium, moderne, fluide, administrable, responsive et évolutif vers un portail scolaire complet.  
**Niveau attendu :** excellent, crédible, institutionnel, scientifique, élégant et à la hauteur d’un lycée national d’excellence.

---

# 1. Mission confiée à Claude Code

Tu dois construire un site web complet pour le **Lycée Scientifique de Yamoussoukro**, à partir de zéro ou en refonte complète si un projet existe déjà.

Le site ne doit surtout pas ressembler à une succession de blocs génériques empilés.  
Il doit avoir une vraie direction artistique, une composition visuelle travaillée, des transitions fluides, une expérience mobile soignée et une identité institutionnelle forte.

Le rendu attendu est celui d’un **grand établissement scientifique d’excellence**, avec une ambiance :

- institutionnelle ;
- moderne ;
- prestigieuse ;
- scientifique ;
- fluide ;
- élégante ;
- rassurante pour les parents ;
- inspirante pour les élèves ;
- crédible pour les partenaires et autorités éducatives.

Le site doit devenir une vitrine numérique officielle, mais aussi une base évolutive pour un futur portail élèves, parents, enseignants, alumni et administration.

---

# 2. Contraintes non négociables

## 2.1. Qualité visuelle

Ne produis pas un site banal composé de blocs rectangulaires empilés les uns sous les autres.

Chaque page doit avoir une composition travaillée :

- sections éditoriales avec rythme visuel ;
- alternance entre zones pleines, zones aérées, grilles asymétriques et contenus immersifs ;
- hiérarchie typographique forte ;
- vrais espaces de respiration ;
- micro-interactions sobres ;
- animations utiles, jamais excessives ;
- navigation claire ;
- design premium institutionnel ;
- rendu mobile pensé séparément du desktop.

## 2.2. Interdictions

Ne pas utiliser :

- lorem ipsum ;
- textes génériques de template ;
- contenus anglais de démonstration ;
- images universitaires américaines sans rapport ;
- sections répétitives identiques ;
- animations trop agressives ;
- design façon landing page commerciale ;
- couleurs criardes ;
- effets gadgets ;
- pages vides ;
- boutons non fonctionnels ;
- liens cassés ;
- fausses statistiques non signalées ;
- contenus non validables.

## 2.3. Obligation de cohérence

Toutes les pages doivent respecter :

- la même charte graphique ;
- la même logique éditoriale ;
- une navigation cohérente ;
- un ton institutionnel ;
- une hiérarchie claire ;
- un responsive impeccable.

---

# 3. Positionnement du site

## Message central

> **Lycée Scientifique de Yamoussoukro — L’excellence scientifique au service de la Côte d’Ivoire et de l’Afrique.**

## Promesse du site

Le nouveau site doit montrer que le LSY est :

- un établissement public d’excellence ;
- un symbole historique de la formation scientifique en Côte d’Ivoire ;
- un lieu de rigueur, de discipline et d’innovation ;
- un cadre d’apprentissage pour les meilleurs profils scientifiques ;
- une institution en pleine modernisation ;
- un futur pôle national de développement scientifique.

## Piliers éditoriaux

1. **Institution** : histoire, mission, administration, infrastructures.
2. **Excellence** : sciences, résultats, majors, concours, innovation.
3. **Communauté** : élèves, parents, enseignants, alumni, partenaires.
4. **Services numériques** : admission, documents, portail, communiqués, ressources.

---

# 4. Signature et attribution Digital Access

Le site doit intégrer discrètement mais clairement la signature de conception.

## Footer obligatoire

Dans le pied de page :

> © Lycée Scientifique de Yamoussoukro — Tous droits réservés.  
> Site conçu et développé par **Digital Access – Web Access Solution**.

La mention peut être cliquable si un lien Digital Access est fourni plus tard.  
En attendant, utiliser un lien neutre `#` ou ne pas mettre de lien.

## Page mentions légales

Inclure une mention :

> Conception, développement et accompagnement technique : **Digital Access – Web Access Solution**.

---

# 5. Identité visuelle

## 5.1. Logo

Utiliser le logo fourni du Lycée Scientifique de Yamoussoukro.  
S’il est présent dans le dossier du projet, le placer dans :

```txt
/public/brand/logo-lsy.png
/public/brand/logo-lsy-white.png
/public/brand/favicon.png
```

Si le logo n’est pas encore optimisé, prévoir un composant `LogoLSY` qui affiche correctement le logo sur fond clair et sur fond sombre.

## 5.2. Couleurs

Créer une charte CSS avec variables.

Couleurs recommandées :

```css
--lsy-blue-950: #06113A;
--lsy-blue-900: #0A1A4A;
--lsy-blue-800: #142B6F;
--lsy-blue-700: #1E3A8A;
--lsy-gold-500: #D6A329;
--lsy-gold-400: #E8BD4E;
--lsy-ivory: #F8F5EC;
--lsy-paper: #FFFCF5;
--lsy-slate: #334155;
--lsy-muted: #64748B;
--lsy-line: #E5E7EB;
--lsy-success: #138A4B;
--lsy-orange: #F28C28;
```

## 5.3. Utilisation des couleurs

- Bleu nuit : identité principale, header, footer, hero, surfaces institutionnelles.
- Or : accents d’excellence, bordures fines, boutons secondaires, détails.
- Blanc / ivoire : fonds de lecture.
- Vert et orange : rappels discrets de la Côte d’Ivoire, uniquement en accents mesurés.
- Gris bleuté : textes secondaires.

## 5.4. Typographie

Utiliser une combinaison moderne :

- `Manrope` ou `Inter` pour les textes et interfaces ;
- `Playfair Display`, `Lora` ou `Merriweather` pour certains titres institutionnels, citations ou pages historiques.

Ne pas surcharger.  
La typographie doit être lisible et élégante.

## 5.5. Style visuel

Le site doit donner une impression :

- premium ;
- scientifique ;
- académique ;
- national ;
- fiable ;
- contemporain.

Prévoir :

- arrière-plans subtils avec motifs scientifiques ;
- formes géométriques discrètes ;
- courbes légères ;
- lignes fines ;
- cartes élégantes ;
- images avec masques arrondis ;
- transitions douces ;
- ombres très légères ;
- usage maîtrisé du glassmorphism sur certaines zones seulement.

---

# 6. Stack technique recommandée

Construire avec :

- Next.js App Router ;
- TypeScript ;
- Tailwind CSS ;
- Framer Motion pour animations ;
- Lucide React pour icônes ;
- Prisma ORM ;
- SQLite en développement ;
- PostgreSQL compatible production ;
- Auth.js ou système d’authentification simple et sécurisé ;
- Zod pour validation ;
- React Hook Form pour formulaires ;
- next-sitemap ou génération sitemap native ;
- shadcn/ui uniquement si bien personnalisé, pas de rendu générique.

## Important

Si le projet existe déjà, analyser d’abord :

```bash
ls
cat package.json
```

Puis adapter sans casser l’existant.  
Si le projet est vierge, créer une application Next.js propre.

---

# 7. Objectif fonctionnel global

Le site doit comprendre :

- pages institutionnelles ;
- actualités ;
- communiqués ;
- événements ;
- documents ;
- galerie ;
- Web TV ;
- admission ;
- pages académiques ;
- pages vie scolaire ;
- pages alumni ;
- pages partenaires ;
- espace d’administration ;
- base de données ;
- formulaires ;
- recherche ;
- SEO ;
- responsive ;
- animations ;
- signature Digital Access.

---

# 8. Architecture des routes

Créer l’arborescence suivante :

```txt
/
├── le-lycee
│   ├── presentation
│   ├── mot-du-proviseur
│   ├── histoire
│   ├── mission-vision-valeurs
│   ├── administration
│   ├── infrastructures
│   └── rehabilitation
│
├── admissions
│   ├── vue-d-ensemble
│   ├── entree-en-4e
│   ├── entree-en-seconde
│   ├── calendrier
│   ├── documents
│   └── faq
│
├── academie-innovation
│   ├── organisation-pedagogique
│   ├── programmes
│   ├── laboratoires
│   ├── recherche-scientifique-junior
│   ├── ressources-pedagogiques
│   └── examens-et-concours
│
├── vie-au-lysee
│   ├── internat
│   ├── clubs
│   ├── sante-et-infirmerie
│   ├── soutien-psychologique
│   ├── sport-et-culture
│   └── reglement-interieur
│
├── excellence-alumni
│   ├── majors
│   ├── resultats
│   ├── concours-et-distinctions
│   ├── anciens-eleves
│   └── mentorat
│
├── actualites
│   ├── [slug]
│   ├── communiques
│   ├── evenements
│   └── categorie/[slug]
│
├── medias
│   ├── galerie
│   └── web-tv
│
├── soutenir-le-lycee
│   ├── devenir-partenaire
│   ├── devenir-mentor
│   └── faire-un-don
│
├── documents
├── calendrier
├── portail
│   ├── eleve
│   ├── parent
│   ├── enseignant
│   └── administration
│
├── contact
├── faq
├── recherche
├── mentions-legales
├── politique-de-confidentialite
├── admin
│   ├── login
│   ├── dashboard
│   ├── actualites
│   ├── communiques
│   ├── documents
│   ├── evenements
│   ├── galerie
│   ├── web-tv
│   ├── majors
│   ├── alumni
│   ├── partenaires
│   ├── messages
│   ├── utilisateurs
│   └── parametres
└── api
```

---

# 9. Navigation principale

Créer un menu desktop professionnel :

1. Accueil
2. Le Lycée
3. Admissions
4. Académie & Innovation
5. Vie au LSY
6. Excellence & Alumni
7. Actualités & Médias
8. Portail

Ajouter deux actions visibles :

- `Nous contacter`
- `Accéder au portail`

## Mega menu

Les menus suivants doivent avoir un mega menu élégant :

### Le Lycée

- Présentation
- Mot du Proviseur
- Histoire
- Mission, vision et valeurs
- Administration
- Infrastructures
- Réhabilitation

### Admissions

- Vue d’ensemble
- Entrée en 4e
- Entrée en seconde
- Calendrier
- Documents
- FAQ

### Académie & Innovation

- Organisation pédagogique
- Programmes
- Laboratoires
- Recherche scientifique junior
- Ressources pédagogiques
- Examens et concours

### Vie au LSY

- Internat
- Clubs
- Santé et infirmerie
- Soutien psychologique
- Sport et culture
- Règlement intérieur

### Excellence & Alumni

- Majors
- Résultats
- Concours et distinctions
- Anciens élèves
- Mentorat

### Actualités & Médias

- Actualités
- Communiqués
- Événements
- Galerie
- Web TV

---

# 10. Navigation mobile

Créer une expérience mobile différente du desktop.

## Barre inférieure mobile obligatoire

Sur mobile, ajouter une bottom navigation fixe avec :

- Accueil
- Admission
- Actualités
- Documents
- Portail

## Menu mobile

Le menu mobile doit être :

- plein écran ou panneau latéral élégant ;
- rapide ;
- hiérarchisé ;
- avec recherche ;
- avec actions rapides : appeler, écrire, itinéraire.

Ne pas simplement réduire le menu desktop.

---

# 11. Composants UI à créer

Créer une bibliothèque de composants :

```txt
components/
├── layout/
│   ├── Header.tsx
│   ├── MegaMenu.tsx
│   ├── MobileNav.tsx
│   ├── BottomMobileNav.tsx
│   ├── Footer.tsx
│   └── PageShell.tsx
│
├── home/
│   ├── HeroLSY.tsx
│   ├── QuickAccessDock.tsx
│   ├── LegacySection.tsx
│   ├── NewEraSection.tsx
│   ├── AdmissionPreview.tsx
│   ├── AcademicExcellence.tsx
│   ├── LifeAtLSY.tsx
│   ├── NewsHighlights.tsx
│   ├── AlumniPreview.tsx
│   └── PartnersBand.tsx
│
├── sections/
│   ├── SectionHeader.tsx
│   ├── EditorialSplit.tsx
│   ├── Timeline.tsx
│   ├── StatsRibbon.tsx
│   ├── FeatureGrid.tsx
│   ├── ImmersiveBanner.tsx
│   ├── FloatingCards.tsx
│   ├── DocumentList.tsx
│   ├── NewsCard.tsx
│   ├── EventCard.tsx
│   ├── MajorCard.tsx
│   ├── ClubCard.tsx
│   ├── PersonCard.tsx
│   ├── PartnerCard.tsx
│   └── CTASection.tsx
│
├── animations/
│   ├── Reveal.tsx
│   ├── Stagger.tsx
│   ├── CountUp.tsx
│   └── MagneticButton.tsx
│
├── forms/
│   ├── ContactForm.tsx
│   ├── AlumniForm.tsx
│   ├── PartnerForm.tsx
│   └── MentorForm.tsx
│
└── brand/
    ├── LogoLSY.tsx
    ├── DigitalAccessSignature.tsx
    └── ScientificPattern.tsx
```

---

# 12. Direction artistique de la page d’accueil

La page d’accueil doit être le meilleur exemple du niveau attendu.

## 12.1. Hero premium

Créer un hero immersif avec :

- fond bleu nuit ;
- image du lycée ou visuel institutionnel ;
- overlay subtil ;
- logo LSY ;
- titre puissant ;
- sous-titre ;
- boutons ;
- chiffres clés ;
- forme graphique scientifique ;
- animation d’apparition douce ;
- scroll indicator discret.

### Texte hero

Titre :

> Lycée Scientifique de Yamoussoukro

Sous-titre :

> L’excellence scientifique au service de la Côte d’Ivoire et de l’Afrique.

Description :

> Institution de référence, le LSY forme des générations d’élèves à fort potentiel scientifique dans un cadre fondé sur la rigueur, la discipline, l’innovation et l’ambition nationale.

Boutons :

- Découvrir le lycée
- Conditions d’admission
- Suivre la réhabilitation

## 12.2. Dock d’accès rapide

Sous le hero, créer une barre flottante ou un dock élégant :

- Admission
- Communiqués
- Documents
- Calendrier
- Portail
- Contact

Ce dock doit être visuellement plus avancé qu’une grille classique.

## 12.3. Section héritage

Créer une section éditoriale avec timeline courte :

- 1975 : fondation/construction ;
- 1978 : inauguration ;
- 50 ans d’excellence ;
- nouvelle ère de modernisation.

Ne pas inventer de chiffres non validés.  
Si un chiffre n’est pas confirmé, écrire “à renseigner par l’administration”.

## 12.4. Section “Nouvelle ère du LSY”

Créer une section forte avec composition immersive.

Contenus :

- réhabilitation ;
- extension ;
- laboratoires ;
- espaces numériques ;
- classes préparatoires ;
- Centre National de Développement Scientifique.

Style :

- fond bleu nuit ;
- cartes vitrées ;
- chiffres ;
- image large ;
- animation douce au scroll.

## 12.5. Section Admission

Créer un bloc clair pour les parents :

- Entrée en 4e ;
- Entrée en seconde ;
- conditions ;
- calendrier ;
- documents ;
- FAQ.

Design : deux cartes principales avec comparaison claire, mais élégante.

## 12.6. Section Académie & Innovation

Présenter :

- mathématiques ;
- physique-chimie ;
- SVT ;
- informatique ;
- laboratoires ;
- recherche scientifique junior ;
- concours et olympiades.

Utiliser une mise en page dynamique avec icônes scientifiques.

## 12.7. Section Vie au LSY

Présenter :

- internat ;
- clubs ;
- sport ;
- infirmerie ;
- soutien psychologique ;
- culture.

Utiliser une composition en mosaïque, pas une grille banale.

## 12.8. Section Actualités

Afficher :

- actualités récentes ;
- communiqués ;
- événements.

Créer un système de tags.

## 12.9. Section Alumni

Mettre en avant :

- anciens élèves ;
- témoignages ;
- mentorat ;
- soutien au lycée.

## 12.10. Section Partenaires

Bande sobre avec logos, si disponibles.  
Sinon utiliser des cartes “Partenaire institutionnel”, “Partenaire scientifique”, “Partenaire alumni”.

---

# 13. Pages institutionnelles

Chaque page doit utiliser un template éditorial premium :

- breadcrumb ;
- hero interne ;
- titre fort ;
- introduction ;
- contenu structuré ;
- visuels ;
- encadrés ;
- CTA final ;
- liens vers pages connexes.

## 13.1. Présentation

Créer une page qui présente :

- identité du lycée ;
- vocation nationale ;
- positionnement scientifique ;
- public cible ;
- rôle dans l’éducation ivoirienne.

## 13.2. Mot du Proviseur

Prévoir :

- espace photo ;
- citation ;
- message institutionnel ;
- signature ;
- bouton contact administration.

Mettre un texte temporaire propre si le mot officiel n’est pas fourni, avec mention “Texte à valider par l’administration”.

## 13.3. Histoire

Créer une timeline visuelle avancée.

Inclure :

- fondation ;
- inauguration ;
- grandes générations ;
- 50 ans ;
- réhabilitation ;
- avenir.

## 13.4. Mission, vision et valeurs

Créer une page élégante en trois grands axes :

- Mission ;
- Vision ;
- Valeurs.

Valeurs :

- Excellence ;
- Discipline ;
- Innovation ;
- Responsabilité ;
- Patriotisme ;
- Ouverture.

## 13.5. Administration

Créer :

- organigramme ;
- cartes responsables ;
- services ;
- contacts.

## 13.6. Infrastructures

Créer une page avec :

- grille éditoriale ;
- galerie ;
- cartes infrastructures ;
- état actuel ;
- modernisation prévue.

## 13.7. Réhabilitation

Page stratégique.

Sections :

- contexte ;
- objectifs ;
- travaux ;
- impacts ;
- calendrier ;
- FAQ ;
- galerie avant/après.

---

# 14. Pages Admissions

## 14.1. Vue d’ensemble

Créer une page très claire pour parents.

Sections :

- pourquoi intégrer le LSY ;
- profils concernés ;
- deux voies d’entrée ;
- étapes ;
- documents ;
- FAQ ;
- contact.

## 14.2. Entrée en 4e

Inclure :

- conditions ;
- procédure ;
- pièces à fournir ;
- date limite ;
- dépôt ;
- résultats ;
- note importante : informations à confirmer auprès des services officiels.

## 14.3. Entrée en seconde

Inclure :

- conditions générales ;
- BEPC ;
- niveau scientifique ;
- matières clés ;
- documents ;
- calendrier.

## 14.4. Calendrier

Créer une timeline annuelle :

- dépôt ;
- étude des dossiers ;
- commission ;
- résultats ;
- rentrée.

## 14.5. Documents

Créer une bibliothèque filtrable :

- admission ;
- communiqués ;
- calendriers ;
- règlements ;
- pédagogie.

## 14.6. FAQ

Créer une FAQ accordéon avec recherche.

---

# 15. Pages Académie & Innovation

Créer des pages riches, pas simplement textuelles.

## Pages

- Organisation pédagogique
- Programmes
- Laboratoires
- Recherche scientifique junior
- Ressources pédagogiques
- Examens et concours

## Exigences

Chaque page doit intégrer :

- hero interne ;
- introduction ;
- contenus structurés ;
- cartes ;
- visuels ;
- CTA ;
- liens connexes.

## Ressources pédagogiques

Créer un système de filtre :

- niveau ;
- matière ;
- type ;
- année.

---

# 16. Pages Vie au LSY

Pages :

- Internat
- Clubs
- Santé et infirmerie
- Soutien psychologique
- Sport et culture
- Règlement intérieur

## Clubs

Prévoir des catégories :

- sciences ;
- informatique ;
- robotique ;
- environnement ;
- lecture ;
- débat ;
- sport ;
- culture.

## Infirmerie

Ne pas laisser une page vide.  
Créer une page informative claire avec horaires à renseigner.

## Soutien psychologique

Créer une page rassurante, sobre, humaine.

---

# 17. Pages Excellence & Alumni

Pages :

- Majors
- Résultats
- Concours et distinctions
- Anciens élèves
- Mentorat

## Majors

Créer cartes de majors :

- nom ;
- année ;
- classe ;
- moyenne ;
- témoignage ;
- photo.

Si les données ne sont pas disponibles, créer un tableau “à renseigner”.

## Alumni

Créer :

- présentation du réseau ;
- formulaire d’inscription ;
- témoignages ;
- mentorat ;
- soutien.

---

# 18. Actualités & Médias

## Actualités

Créer un module complet :

- liste ;
- détail ;
- catégories ;
- tags ;
- auteur ;
- image ;
- date ;
- SEO.

## Communiqués

Créer :

- liste filtrable ;
- badge urgence si nécessaire ;
- PDF téléchargeable ;
- public cible : élèves, parents, enseignants, tous.

## Événements

Créer :

- calendrier ;
- événements à venir ;
- événements passés ;
- fiches événements.

## Galerie

Créer :

- albums ;
- lightbox ;
- filtres ;
- années.

## Web TV

Créer :

- vidéos ;
- intégrations YouTube ;
- catégories ;
- page détail si nécessaire.

---

# 19. Soutenir le lycée

Pages :

- Devenir partenaire
- Devenir mentor
- Faire un don

## Important

La page “Faire un don” doit contenir une mention :

> Les modalités officielles de contribution seront communiquées après validation par l’administration du lycée.

Ne pas intégrer de paiement sans validation.

---

# 20. Portail

Le portail peut être livré en version préparatoire, mais propre.

## Portail public

Créer `/portail` avec 4 cartes :

- Élève ;
- Parent ;
- Enseignant ;
- Administration.

Chaque carte explique les futures fonctionnalités.

## Authentification

Prévoir le socle technique :

- login ;
- rôles ;
- dashboard ;
- redirection selon rôle.

## Rôles

```txt
SUPER_ADMIN
ADMIN
COMMUNICATION
ACADEMIC_MANAGER
LIFE_SCHOOL_MANAGER
TEACHER
STUDENT
PARENT
ALUMNI
PARTNER
```

---

# 21. Back-office administrateur

Créer un dashboard propre et fonctionnel.

## Modules admin

```txt
/admin/dashboard
/admin/actualites
/admin/communiques
/admin/documents
/admin/evenements
/admin/galerie
/admin/web-tv
/admin/majors
/admin/alumni
/admin/partenaires
/admin/messages
/admin/utilisateurs
/admin/parametres
```

## Fonctionnalités minimales

Pour chaque module :

- liste ;
- création ;
- modification ;
- suppression ;
- statut publié/brouillon ;
- recherche ;
- filtres ;
- actions rapides.

## Dashboard

Afficher :

- nombre d’actualités ;
- communiqués récents ;
- documents ;
- messages reçus ;
- demandes alumni ;
- demandes partenaires ;
- événements à venir.

---

# 22. Modèle de données Prisma

Créer un schéma Prisma comprenant au minimum :

```prisma
model User {
  id        String   @id @default(cuid())
  name      String
  email     String   @unique
  password  String?
  role      Role     @default(STUDENT)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

enum Role {
  SUPER_ADMIN
  ADMIN
  COMMUNICATION
  ACADEMIC_MANAGER
  LIFE_SCHOOL_MANAGER
  TEACHER
  STUDENT
  PARENT
  ALUMNI
  PARTNER
}

model Article {
  id          String   @id @default(cuid())
  title       String
  slug        String   @unique
  excerpt     String
  content     String
  coverImage  String?
  categoryId  String?
  category    Category? @relation(fields: [categoryId], references: [id])
  status      PublishStatus @default(DRAFT)
  publishedAt DateTime?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model Category {
  id        String    @id @default(cuid())
  name      String
  slug      String    @unique
  articles  Article[]
}

model Communique {
  id          String   @id @default(cuid())
  title       String
  slug        String   @unique
  content     String
  target      String
  fileUrl     String?
  isUrgent    Boolean  @default(false)
  status      PublishStatus @default(DRAFT)
  publishedAt DateTime?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model Document {
  id          String   @id @default(cuid())
  title       String
  description String?
  fileUrl     String
  type        String
  level       String?
  subject     String?
  year        String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model Event {
  id          String   @id @default(cuid())
  title       String
  slug        String   @unique
  description String
  location    String?
  startDate   DateTime
  endDate     DateTime?
  coverImage  String?
  status      PublishStatus @default(DRAFT)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model GalleryAlbum {
  id          String   @id @default(cuid())
  title       String
  slug        String   @unique
  description String?
  photos      GalleryPhoto[]
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model GalleryPhoto {
  id        String   @id @default(cuid())
  albumId   String
  album     GalleryAlbum @relation(fields: [albumId], references: [id])
  imageUrl  String
  caption   String?
  createdAt DateTime @default(now())
}

model Video {
  id          String   @id @default(cuid())
  title       String
  slug        String   @unique
  description String?
  videoUrl    String
  thumbnail   String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model Major {
  id          String   @id @default(cuid())
  name        String
  year        String
  className   String
  average     String?
  photoUrl    String?
  testimony   String?
  createdAt   DateTime @default(now())
}

model AlumniProfile {
  id          String   @id @default(cuid())
  fullName    String
  email       String
  graduationYear String?
  profession  String?
  message     String?
  status      RequestStatus @default(PENDING)
  createdAt   DateTime @default(now())
}

model PartnerRequest {
  id          String   @id @default(cuid())
  organization String
  contactName  String
  email        String
  phone        String?
  message      String
  status       RequestStatus @default(PENDING)
  createdAt    DateTime @default(now())
}

model ContactMessage {
  id        String   @id @default(cuid())
  name      String
  email     String
  subject   String
  message   String
  status    RequestStatus @default(PENDING)
  createdAt DateTime @default(now())
}

enum PublishStatus {
  DRAFT
  PUBLISHED
  ARCHIVED
}

enum RequestStatus {
  PENDING
  REVIEWED
  APPROVED
  REJECTED
}
```

Adapter si nécessaire, mais couvrir ces besoins.

---

# 23. Données de démonstration propres

Créer un seed Prisma avec des données réalistes et propres.

## Utilisateur admin

```txt
Email : admin@lsy.ci
Mot de passe : AdminLSY2026!
Rôle : SUPER_ADMIN
```

Hasher le mot de passe.

## Données à créer

- 3 actualités ;
- 3 communiqués ;
- 5 documents ;
- 3 événements ;
- 4 clubs ;
- 3 majors fictifs clairement marqués “données de démonstration à remplacer” ;
- 3 vidéos ;
- 2 albums galerie ;
- 3 partenaires institutionnels à renseigner.

Ne pas utiliser de contenu anglais ou lorem ipsum.

---

# 24. Contenus éditoriaux de base

## Présentation courte

> Le Lycée Scientifique de Yamoussoukro est un établissement d’excellence dédié à la formation d’élèves à fort potentiel scientifique. Sa vocation est de promouvoir la rigueur, l’innovation, la discipline et la réussite académique au service du développement de la Côte d’Ivoire et de l’Afrique.

## Mission

> Offrir un enseignement scientifique de haut niveau, former des esprits rigoureux, encourager l’innovation et préparer les élèves aux défis académiques, technologiques et humains du XXIe siècle.

## Vision

> Devenir un pôle national et africain de référence pour la formation scientifique, l’innovation éducative et la préparation des futures élites scientifiques.

## Valeurs

- Excellence ;
- Discipline ;
- Rigueur ;
- Responsabilité ;
- Innovation ;
- Patriotisme ;
- Ouverture.

## Réhabilitation

> Le Lycée Scientifique de Yamoussoukro entre dans une nouvelle phase de son histoire avec un projet de réhabilitation et de modernisation visant à améliorer les infrastructures, renforcer les capacités d’accueil, moderniser les laboratoires et offrir aux élèves un environnement d’apprentissage adapté aux exigences scientifiques contemporaines.

---

# 25. Animations et interactions

Utiliser Framer Motion ou CSS moderne.

## Animations attendues

- reveal au scroll ;
- apparition progressive des titres ;
- animation légère des chiffres ;
- hover élégant sur cartes ;
- mega menu fluide ;
- transitions entre pages ;
- effet parallax très léger sur le hero ;
- carrousel fluide pour actualités/galerie ;
- accordéons animés ;
- boutons avec micro-interaction.

## Limites

- animations rapides et fluides ;
- respecter `prefers-reduced-motion` ;
- ne pas ralentir le site ;
- ne pas animer de longs textes inutilement ;
- éviter les effets gadgets.

---

# 26. SEO

Implémenter :

- metadata par page ;
- Open Graph ;
- Twitter cards ;
- sitemap ;
- robots.txt ;
- canonical URLs ;
- structured data `EducationalOrganization` ;
- URLs propres ;
- images alt ;
- redirections depuis anciennes pages si connues.

## Mots-clés à cibler

- Lycée Scientifique de Yamoussoukro ;
- LSY ;
- admission Lycée Scientifique de Yamoussoukro ;
- lycée d’excellence Côte d’Ivoire ;
- lycée scientifique Côte d’Ivoire ;
- réhabilitation Lycée Scientifique de Yamoussoukro ;
- classes préparatoires Côte d’Ivoire ;
- excellence scientifique Côte d’Ivoire.

---

# 27. Accessibilité

Respecter :

- contraste suffisant ;
- navigation clavier ;
- labels formulaires ;
- alt images ;
- focus visible ;
- aria-labels ;
- textes lisibles ;
- tailles de police correctes ;
- pas de dépendance à la couleur seule.

---

# 28. Performance

Objectifs :

- pages rapides ;
- images optimisées ;
- lazy loading ;
- composants client uniquement quand nécessaire ;
- éviter JavaScript excessif ;
- utiliser Server Components par défaut ;
- charger Framer Motion uniquement sur composants utiles ;
- optimiser les polices ;
- lighthouse mobile élevé.

---

# 29. Formulaires

Créer avec validation :

## Contact

Champs :

- nom ;
- email ;
- sujet ;
- message.

## Alumni

Champs :

- nom complet ;
- email ;
- année de sortie ;
- profession ;
- message ;
- souhait de devenir mentor.

## Partenaire

Champs :

- organisation ;
- nom du contact ;
- email ;
- téléphone ;
- type de partenariat ;
- message.

## Mentor

Champs :

- nom ;
- email ;
- domaine ;
- disponibilité ;
- message.

Enregistrer en base.  
Afficher message de confirmation.  
Prévoir protection anti-spam simple.

---

# 30. Recherche interne

Créer `/recherche`.

Fonctionnalités :

- champ de recherche global ;
- résultats par type :
  - actualités ;
  - communiqués ;
  - documents ;
  - pages ;
  - événements.
- affichage clair ;
- état vide élégant.

---

# 31. Gestion documents

Créer une bibliothèque documentaire publique `/documents`.

Filtres :

- catégorie ;
- niveau ;
- matière ;
- année ;
- type.

Types :

- Admission ;
- Communiqué ;
- Calendrier ;
- Règlement ;
- Sujet ;
- Corrigé ;
- Ressource pédagogique.

---

# 32. Calendrier

Créer `/calendrier`.

Afficher :

- événements ;
- dates admissions ;
- examens ;
- activités scolaires ;
- réunions ;
- vacances si renseignées.

Design : calendrier lisible + liste chronologique.

---

# 33. Footer

Le footer doit être complet et professionnel.

Colonnes :

1. Lycée Scientifique de Yamoussoukro
2. Accès rapides
3. Le Lycée
4. Ressources
5. Contact

Inclure :

- adresse ;
- téléphone à renseigner ;
- email à renseigner ;
- réseaux sociaux si fournis ;
- mentions légales ;
- politique de confidentialité ;
- signature Digital Access.

---

# 34. Pages légales

## Mentions légales

Inclure :

- éditeur du site : Lycée Scientifique de Yamoussoukro ;
- responsable de publication : à renseigner ;
- hébergeur : à renseigner ;
- conception : Digital Access – Web Access Solution ;
- propriété intellectuelle ;
- contact.

## Politique de confidentialité

Inclure :

- données collectées ;
- formulaires ;
- finalités ;
- durée de conservation ;
- droits des utilisateurs ;
- contact ;
- cookies si utilisés.

---

# 35. Qualité attendue du code

Le code doit être :

- propre ;
- typé ;
- modulaire ;
- maintenable ;
- organisé ;
- sans duplication excessive ;
- sans composants inutiles ;
- sans dead code ;
- compatible build production.

## Structure recommandée

```txt
app/
components/
lib/
data/
prisma/
public/
styles/
types/
```

## Commandes à prévoir

```bash
npm run dev
npm run build
npm run lint
npx prisma migrate dev
npx prisma db seed
```

---

# 36. Tests et validation

Avant de terminer, exécuter :

```bash
npm run lint
npm run build
```

Corriger toutes les erreurs.

Vérifier :

- toutes les pages principales ;
- responsive mobile ;
- menu desktop ;
- menu mobile ;
- formulaires ;
- dashboard admin ;
- SEO metadata ;
- absence de lorem ipsum ;
- absence de liens cassés ;
- signature Digital Access ;
- qualité visuelle.

---

# 37. Résultat attendu

À la fin, le projet doit contenir un site complet, propre et professionnel, avec :

- une page d’accueil premium ;
- toutes les pages institutionnelles ;
- admissions ;
- académie ;
- vie scolaire ;
- excellence ;
- alumni ;
- actualités ;
- médias ;
- documents ;
- calendrier ;
- portail ;
- back-office ;
- base de données ;
- responsive ;
- animations ;
- SEO ;
- signature Digital Access.

---

# 38. Consigne finale importante

Ne livre pas un simple squelette.  
Ne livre pas un site plat.  
Ne livre pas une succession de cartes génériques.

Construis un site qui donne réellement l’impression d’un établissement national d’excellence scientifique.

Chaque page doit être utilisable, lisible, élégante et cohérente.  
Le design doit être moderne, institutionnel et fluide.  
Les animations doivent renforcer l’expérience sans distraire.

Le résultat doit pouvoir être présenté au Lycée Scientifique de Yamoussoukro comme une proposition professionnelle sérieuse portée par :

## Digital Access – Web Access Solution

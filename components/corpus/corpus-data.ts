export interface Annotation {
  name: string
  type: string
  description: string
  examples: string[]
}

export interface CorpusItem {
  id: number
  title: string
  language: string
  documents: string
  description?: string
  annotations?: Annotation[]
}

export const corpusData: CorpusItem[] = [
  {
    id: 1,
    title: "Corpus arabe contemporain",
    language: "Arabe",
    documents: "1250",
    description: "Collection de textes arabes contemporains issus de diverses sources médiatiques et littéraires.",
    annotations: [
      {
        name: "Entités nommées",
        type: "Sémantique",
        description: "Annotation des personnes, lieux, organisations et autres entités nommées",
        examples: ["محمد (Personne)", "القاهرة (Lieu)", "الأمم المتحدة (Organisation)"],
      },
      {
        name: "Analyse morphologique",
        type: "Morphologie",
        description: "Décomposition des mots en racines, préfixes et suffixes",
        examples: ["كتب → ك + تب (préfixe + racine)", "يكتبون → ي + كتب + ون (préfixe + racine + suffixe)"],
      },
      {
        name: "Relations syntaxiques",
        type: "Syntaxe",
        description: "Annotation des relations grammaticales entre les mots",
        examples: ["sujet-verbe", "verbe-objet", "nom-adjectif"],
      },
    ],
  },
  {
    id: 2,
    title: "Corpus arabe classique",
    language: "Arabe",
    documents: "850",
    description: "Textes classiques arabes incluant de la poésie, de la prose et des textes religieux.",
    annotations: [
      {
        name: "Analyse rhétorique",
        type: "Stylistique",
        description: "Identification des figures de style et des structures rhétoriques",
        examples: ["métaphore", "allitération", "parallélisme"],
      },
      {
        name: "Analyse métrique",
        type: "Poétique",
        description: "Annotation des schémas métriques dans la poésie arabe",
        examples: ["بحر الطويل", "بحر البسيط", "بحر الكامل"],
      },
    ],
  },
  {
    id: 3,
    title: "Corpus dialectal maghrébin",
    language: "Arabe dialectal",
    documents: "620",
    description: "Collection de textes en dialectes arabes du Maghreb (Maroc, Algérie, Tunisie).",
    annotations: [
      {
        name: "Variations dialectales",
        type: "Dialectologie",
        description: "Annotation des variations lexicales et phonétiques entre dialectes",
        examples: ["ماشي/موش (négation)", "دابا/توا (maintenant)"],
      },
      {
        name: "Emprunts linguistiques",
        type: "Lexical",
        description: "Identification des mots empruntés à d'autres langues",
        examples: ["طوموبيل (automobile, du français)", "سبيطار (hôpital, de l'espagnol)"],
      },
    ],
  },
  {
    id: 4,
    title: "Corpus parallèle arabe-français",
    language: "Arabe/Français",
    documents: "430",
    description: "Textes alignés en arabe et français pour la traduction automatique.",
    annotations: [
      {
        name: "Alignement de phrases",
        type: "Traduction",
        description: "Correspondance entre phrases arabes et françaises",
        examples: ["مرحبا بالعالم ↔ Bonjour le monde", "كيف حالك؟ ↔ Comment vas-tu?"],
      },
      {
        name: "Divergences de traduction",
        type: "Traduction",
        description: "Annotation des cas où la traduction littérale n'est pas possible",
        examples: ["Expressions idiomatiques", "Références culturelles"],
      },
    ],
  },
  {
    id: 5,
    title: "Corpus parallèle arabe-anglais",
    language: "Arabe/Anglais",
    documents: "580",
    description: "Textes alignés en arabe et anglais pour la traduction automatique.",
    annotations: [
      {
        name: "Alignement lexical",
        type: "Traduction",
        description: "Correspondance entre mots arabes et anglais",
        examples: ["كتاب ↔ book", "مدرسة ↔ school"],
      },
    ],
  },
  {
    id: 6,
    title: "Corpus de presse arabe",
    language: "Arabe",
    documents: "920",
    description: "Articles de presse en arabe provenant de différents journaux et médias en ligne.",
    annotations: [
      {
        name: "Analyse de sentiment",
        type: "Sémantique",
        description: "Annotation de la polarité des opinions exprimées",
        examples: ["Positif", "Négatif", "Neutre"],
      },
      {
        name: "Thématique",
        type: "Contenu",
        description: "Classification des articles par thème",
        examples: ["Politique", "Économie", "Sport", "Culture"],
      },
    ],
  },
  {
    id: 7,
    title: "Corpus littéraire arabe",
    language: "Arabe",
    documents: "340",
    description: "Œuvres littéraires arabes modernes incluant romans, nouvelles et essais.",
    annotations: [
      {
        name: "Analyse narrative",
        type: "Littéraire",
        description: "Structure narrative et éléments du récit",
        examples: ["Personnages", "Cadre spatio-temporel", "Point de vue narratif"],
      },
    ],
  },
  {
    id: 8,
    title: "Corpus technique arabe",
    language: "Arabe",
    documents: "210",
    description: "Textes techniques et scientifiques en arabe couvrant divers domaines.",
    annotations: [
      {
        name: "Terminologie spécialisée",
        type: "Lexical",
        description: "Identification et classification des termes techniques",
        examples: ["مصطلحات طبية (termes médicaux)", "مصطلحات تقنية (termes techniques)"],
      },
    ],
  },
]

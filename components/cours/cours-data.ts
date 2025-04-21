export interface CourseModule {
  title: string
  duration: string
  completed: boolean
}

export interface Course {
  id: number
  title: string
  instructor: string
  rating: number
  numRatings?: number
  image?: string
  description?: string
  progress?: number
  userRating?: number
  modules?: CourseModule[]
}

export const coursData: Course[] = [
  {
    id: 1,
    title: "Résolution des Co-Références et Compréhension du Langage Naturel (NLU)",
    instructor: "Utilisateur A",
    rating: 4.6,
    numRatings: 124,
    image: "/placeholder.svg?height=160&width=300&text=NLU",
    description:
      "Ce cours vous permettra de comprendre et d'implémenter des techniques avancées pour la résolution des co-références et la compréhension du langage naturel en arabe.",
    progress: 0,
    modules: [
      {
        title: "Introduction à la compréhension du langage naturel",
        duration: "45 min",
        completed: false,
      },
      {
        title: "Fondements de la résolution des co-références",
        duration: "1h 15min",
        completed: false,
      },
      {
        title: "Techniques d'analyse contextuelle",
        duration: "1h 30min",
        completed: false,
      },
      {
        title: "Implémentation d'un système de résolution",
        duration: "2h",
        completed: false,
      },
      {
        title: "Évaluation et optimisation",
        duration: "1h",
        completed: false,
      },
    ],
  },
  {
    id: 2,
    title: "Traitement Automatique de la Langue Arabe",
    instructor: "Utilisateur B",
    rating: 4.8,
    numRatings: 87,
    image: "/placeholder.svg?height=160&width=300&text=TAL",
    description:
      "Une introduction complète au traitement automatique de la langue arabe, couvrant les aspects morphologiques, syntaxiques et sémantiques.",
    progress: 30,
    modules: [
      {
        title: "Introduction au TAL arabe",
        duration: "30 min",
        completed: true,
      },
      {
        title: "Morphologie de l'arabe",
        duration: "1h 45min",
        completed: false,
      },
      {
        title: "Analyse syntaxique",
        duration: "2h",
        completed: false,
      },
      {
        title: "Traitement sémantique",
        duration: "1h 30min",
        completed: false,
      },
    ],
  },
  {
    id: 3,
    title: "Analyse Morphologique de l'Arabe",
    instructor: "Utilisateur C",
    rating: 4.5,
    numRatings: 56,
    image: "/placeholder.svg?height=160&width=300&text=Morphologie",
    description:
      "Ce cours se concentre sur l'analyse morphologique de la langue arabe, en explorant sa complexité et les méthodes computationnelles pour la traiter.",
    progress: 0,
    modules: [
      {
        title: "Structure morphologique de l'arabe",
        duration: "1h",
        completed: false,
      },
      {
        title: "Racines et schèmes",
        duration: "1h 15min",
        completed: false,
      },
      {
        title: "Algorithmes d'analyse morphologique",
        duration: "1h 30min",
        completed: false,
      },
    ],
  },
  {
    id: 4,
    title: "Intelligence Artificielle pour le TAL",
    instructor: "Utilisateur D",
    rating: 4.7,
    numRatings: 102,
    image: "/placeholder.svg?height=160&width=300&text=IA+TAL",
    description:
      "Apprenez à utiliser les techniques d'intelligence artificielle et d'apprentissage automatique pour résoudre des problèmes de traitement du langage naturel.",
    progress: 65,
    modules: [
      {
        title: "Introduction à l'IA pour le TAL",
        duration: "45 min",
        completed: true,
      },
      {
        title: "Apprentissage supervisé pour le TAL",
        duration: "1h 30min",
        completed: true,
      },
      {
        title: "Réseaux de neurones et TAL",
        duration: "2h",
        completed: false,
      },
      {
        title: "Transformers et BERT",
        duration: "1h 45min",
        completed: false,
      },
    ],
  },
  {
    id: 5,
    title: "Apprentissage Profond pour le NLP",
    instructor: "Utilisateur E",
    rating: 4.9,
    numRatings: 78,
    image: "/placeholder.svg?height=160&width=300&text=Deep+Learning",
    description:
      "Un cours avancé sur l'application des techniques d'apprentissage profond au traitement du langage naturel, avec un focus sur la langue arabe.",
    progress: 0,
    modules: [
      {
        title: "Fondements de l'apprentissage profond",
        duration: "1h",
        completed: false,
      },
      {
        title: "RNN et LSTM pour le traitement de séquences",
        duration: "1h 30min",
        completed: false,
      },
      {
        title: "Architectures basées sur l'attention",
        duration: "2h",
        completed: false,
      },
      {
        title: "Fine-tuning de modèles pré-entraînés",
        duration: "1h 15min",
        completed: false,
      },
    ],
  },
]

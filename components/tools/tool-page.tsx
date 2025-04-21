"use client"

import { useState } from "react"
import { ToolEntet } from "./tool-entet"
import { Tool } from "./tool"

export function ToolPage() {
  const [tools, setTools] = useState([
    {
      id: 1,
      author: "Dr. Ahmed Mahmoud",
      avatar: "/placeholder.svg?height=40&width=40",
      date: "2 heures",
      title: "Analyseur morphologique pour l'arabe",
      content:
        "Je partage un nouvel outil d'analyse morphologique pour l'arabe que j'ai développé. Il permet de décomposer les mots en racines, préfixes et suffixes avec une précision de 95%. L'outil est disponible en open source sur GitHub.",
      likes: 100,
      comments: 15,
      liked: false,
    },
    {
      id: 2,
      author: "Prof. Layla Karim",
      avatar: "/placeholder.svg?height=40&width=40",
      date: "1 jour",
      title: "Détecteur de dialectes arabes",
      content:
        "Voici un outil que j'ai développé pour identifier automatiquement les différents dialectes arabes dans un texte. Il peut distinguer entre les dialectes égyptien, levantin, maghrébin et du Golfe avec une précision de 87%.",
      likes: 75,
      comments: 8,
      liked: false,
    },
    {
      id: 3,
      author: "Dr. Mohammed Ali",
      avatar: "/placeholder.svg?height=40&width=40",
      date: "3 jours",
      title: "Générateur de texte arabe",
      content:
        "Je suis heureux de partager ce générateur de texte arabe basé sur GPT. Il peut produire des textes cohérents en arabe standard moderne ainsi qu'en dialectes régionaux. Idéal pour les tests d'applications ou la création de contenu.",
      likes: 62,
      comments: 10,
      liked: false,
    },
  ])

  const handleLike = (id: number) => {
    setTools(
      tools.map((tool) => {
        if (tool.id === id) {
          return {
            ...tool,
            likes: tool.liked ? tool.likes - 1 : tool.likes + 1,
            liked: !tool.liked,
          }
        }
        return tool
      }),
    )
  }

  return (
    <div className="space-y-6">
      <ToolEntet />
      <div className="space-y-4">
        {tools.map((tool) => (
          <Tool key={tool.id} tool={tool} onLike={() => handleLike(tool.id)} />
        ))}
      </div>
    </div>
  )
}

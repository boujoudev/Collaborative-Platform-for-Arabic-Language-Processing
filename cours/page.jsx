"use client"

import { useState } from "react"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import MainLayout from "@/components/main-layout"

export default function CoursPage() {
  const [activeFilter, setActiveFilter] = useState("all")

  return (
    <MainLayout>
      <div className="mb-4 rounded-lg bg-white p-6 shadow">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Cours</h2>
          <Button className="bg-[#1a237e] hover:bg-[#0D47A1]" onClick={() => alert("Nouveau cours ajouté")}>
            + Nouvelle Cour
          </Button>
        </div>
      </div>

      <div className="mb-4">
        <Button
          variant="outline"
          className={`${activeFilter === "all" ? "bg-[#E3F2FD] border-[#0D47A1] text-[#0D47A1]" : ""}`}
          onClick={() => setActiveFilter("all")}
        >
          All
        </Button>
      </div>

      <h3 className="mb-4 text-xl font-semibold">Quel sera votre prochain sujet d'apprentissage ?</h3>

      <div className="mb-8">
        <h4 className="mb-4 text-lg font-medium">Recommandé pour vous</h4>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <CourseCard
            image="/placeholder.svg?height=150&width=250"
            title="Résolution des Co-Références et Compréhension du Langage Naturel (NLU)"
            instructor="Hassen Aissa"
            rating={4.6}
            onClick={() => alert("Accès au cours...")}
          />

          <CourseCard
            image="/placeholder.svg?height=150&width=250"
            title="Résolution des Co-Références et Compréhension du Langage Naturel (NLU)"
            instructor="Hassen Aissa"
            rating={4.6}
            onClick={() => alert("Accès au cours...")}
          />

          <CourseCard
            image="/placeholder.svg?height=150&width=250"
            title="Résolution des Co-Références et Compréhension du Langage Naturel (NLU)"
            instructor="Hassen Aissa"
            rating={4.6}
            onClick={() => alert("Accès au cours...")}
          />
        </div>
      </div>

      <div>
        <h4 className="mb-4 text-lg font-medium">Cours à l'affiche dans la catégorie Analyse de Sentiments</h4>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <CourseCard
            image="/placeholder.svg?height=150&width=250"
            title="Résolution des Co-Références et Compréhension du Langage Naturel (NLU)"
            instructor="Hassen Aissa"
            rating={4.6}
            onClick={() => alert("Accès au cours...")}
          />

          <CourseCard
            image="/placeholder.svg?height=150&width=250"
            title="Résolution des Co-Références et Compréhension du Langage Naturel (NLU)"
            instructor="Hassen Aissa"
            rating={4.6}
            onClick={() => alert("Accès au cours...")}
          />

          <CourseCard
            image="/placeholder.svg?height=150&width=250"
            title="Résolution des Co-Références et Compréhension du Langage Naturel (NLU)"
            instructor="Hassen Aissa"
            rating={4.6}
            onClick={() => alert("Accès au cours...")}
          />
        </div>
      </div>
    </MainLayout>
  )
}

function CourseCard({ image, title, instructor, rating, onClick }) {
  return (
    <div
      className="overflow-hidden rounded-lg bg-white shadow transition-shadow hover:shadow-md hover:cursor-pointer"
      onClick={onClick}
    >
      <img src={image || "/placeholder.svg"} alt={title} className="h-40 w-full object-cover" />
      <div className="p-4">
        <h3 className="mb-2 font-medium">{title}</h3>
        <p className="mb-2 text-sm text-gray-600">{instructor}</p>
        <div className="flex items-center">
          <span className="mr-1 font-medium text-amber-500">{rating}</span>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-4 w-4 ${star <= Math.floor(rating) ? "fill-amber-500 text-amber-500" : "text-gray-300"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

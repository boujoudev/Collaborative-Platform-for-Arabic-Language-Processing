"use client"

import { useState } from "react"
import { MoreHorizontal, ThumbsUp, MessageSquare, Share2 } from "lucide-react"
import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import MainLayout from "@/components/main-layout"

export default function BibliothequePage() {
  const [activeFilter, setActiveFilter] = useState("all")

  return (
    <MainLayout>
      <div className="mb-4 rounded-lg bg-white p-6 shadow">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Bibliothèque Virtuelle</h2>
          <Button className="bg-[#1a237e] hover:bg-[#0D47A1]" onClick={() => alert("Nouvelle ressource ajoutée")}>
            + Nouvelle Ressources bibliographiques
          </Button>
        </div>
      </div>

      <div className="mb-4 flex items-center gap-2">
        <Button
          variant="outline"
          className={`${activeFilter === "all" ? "bg-[#E3F2FD] border-[#0D47A1] text-[#0D47A1]" : ""}`}
          onClick={() => setActiveFilter("all")}
        >
          All
        </Button>
        <Button
          variant="outline"
          className={`${activeFilter === "type" ? "bg-[#E3F2FD] border-[#0D47A1] text-[#0D47A1]" : ""}`}
          onClick={() => setActiveFilter("type")}
        >
          Type
        </Button>
      </div>

      <div className="space-y-4">
        <ResourceItem
          avatar="/placeholder.svg?height=40&width=40"
          username="Hassen Aissa"
          time="4 hr. ago"
          title="Thèses de doctorat sur le TALN"
          thumbnail="/placeholder.svg?height=100&width=80"
          resume="Résumé...."
          onDownload={() => alert("Téléchargement en cours...")}
          onDetails={() => alert("Affichage des détails...")}
          likes="10K"
          comments="5K"
          onLike={() => alert("Vous avez aimé cette ressource")}
          onComment={() => alert("Commentaire en cours...")}
          onShare={() => alert("Partage en cours...")}
        />

        <ResourceItem
          avatar="/placeholder.svg?height=40&width=40"
          username="Hassen Aissa"
          time="4 hr. ago"
          title="Articles de recherche sur le TAL arabe reconnaissance d'entités nommées"
          thumbnail="/placeholder.svg?height=100&width=80"
          resume="Résumé...."
          onDownload={() => alert("Téléchargement en cours...")}
          onDetails={() => alert("Affichage des détails...")}
          likes="10K"
          comments="5K"
          onLike={() => alert("Vous avez aimé cette ressource")}
          onComment={() => alert("Commentaire en cours...")}
          onShare={() => alert("Partage en cours...")}
        />

        <ResourceItem
          avatar="/placeholder.svg?height=40&width=40"
          username="Hassen Aissa"
          time="4 hr. ago"
          title="Thèses de doctorat sur le TALN"
          thumbnail="/placeholder.svg?height=100&width=80"
          resume="Résumé...."
          onDownload={() => alert("Téléchargement en cours...")}
          onDetails={() => alert("Affichage des détails...")}
          likes="10K"
          comments="5K"
          onLike={() => alert("Vous avez aimé cette ressource")}
          onComment={() => alert("Commentaire en cours...")}
          onShare={() => alert("Partage en cours...")}
        />
      </div>
    </MainLayout>
  )
}

function ResourceItem({
  avatar,
  username,
  time,
  title,
  thumbnail,
  resume,
  onDownload,
  onDetails,
  likes,
  comments,
  onLike,
  onComment,
  onShare,
}) {
  return (
    <div className="rounded-lg bg-white p-4 shadow">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <img src={avatar || "/placeholder.svg"} alt={username} />
          </Avatar>
          <div>
            <div className="font-medium">{username}</div>
            <div className="text-xs text-gray-500">{time}</div>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={() => alert("Options supplémentaires")}>
          <MoreHorizontal className="h-5 w-5" />
        </Button>
      </div>

      <div className="flex gap-4">
        <div className="h-32 w-24 flex-shrink-0 overflow-hidden rounded border">
          <img src={thumbnail || "/placeholder.svg"} alt={title} className="h-full w-full object-cover" />
        </div>
        <div className="flex-1">
          <h3 className="mb-2 text-lg font-semibold">{title}</h3>
          <p className="mb-4 text-gray-600">{resume}</p>
          <div className="flex gap-2">
            <Button className="bg-[#0D47A1]" onClick={onDownload}>
              Télécharger
            </Button>
            <Button variant="outline" onClick={onDetails}>
              Détails
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-4 border-t pt-3">
        <Button variant="ghost" size="sm" className="flex items-center gap-1 text-gray-600" onClick={onLike}>
          <ThumbsUp className="h-4 w-4" />
          {likes}
        </Button>
        <Button variant="ghost" size="sm" className="flex items-center gap-1 text-gray-600" onClick={onComment}>
          <MessageSquare className="h-4 w-4" />
          {comments}
        </Button>
        <Button variant="ghost" size="sm" className="flex items-center gap-1 text-gray-600" onClick={onShare}>
          <Share2 className="h-4 w-4" />
          Share
        </Button>
      </div>
    </div>
  )
}

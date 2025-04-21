"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { ToolCard } from "./tool-card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function ToolsPage() {
  const [tools, setTools] = useState([
    {
      id: 1,
      author: "Dr. Ahmed Mahmoud",
      avatar: "/placeholder.svg?height=40&width=40",
      date: "2 heures",
      title: "Analyseur morphologique pour l'arabe",
      content:
        "Je partage un nouvel outil d'analyse morphologique pour l'arabe que j'ai développé. Il permet de décomposer les mots en racines, préfixes et suffixes avec une précision de 95%. L'outil est disponible en open source sur GitHub.",
      likes: 45,
      comments: 12,
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
      likes: 32,
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
      likes: 28,
      comments: 5,
      liked: false,
    },
  ])

  const [newToolTitle, setNewToolTitle] = useState("")
  const [newToolContent, setNewToolContent] = useState("")
  const [newToolType, setNewToolType] = useState("analysis")

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

  const addNewTool = () => {
    if (newToolTitle.trim() && newToolContent.trim()) {
      const newTool = {
        id: tools.length + 1,
        author: "Vous",
        avatar: "/placeholder.svg?height=40&width=40",
        date: "À l'instant",
        title: newToolTitle,
        content: newToolContent,
        likes: 0,
        comments: 0,
        liked: false,
      }

      setTools([newTool, ...tools])
      setNewToolTitle("")
      setNewToolContent("")
      setNewToolType("analysis")
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl font-semibold">Outils Linguistiques</h2>
            <p className="text-muted-foreground">
              Cette section comprend des outils pour le traitement automatique de la langue arabe, incluant l'analyse de
              texte et le traitement de la parole.
            </p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-[#1e2b7a] hover:bg-[#162058]">
                <Plus className="mr-2 h-4 w-4" /> Nouvel Outil
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Ajouter un nouvel outil</DialogTitle>
                <DialogDescription>Partagez un outil linguistique avec la communauté.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Titre</Label>
                  <Input
                    id="title"
                    value={newToolTitle}
                    onChange={(e) => setNewToolTitle(e.target.value)}
                    placeholder="Nom de l'outil"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="type">Type d'outil</Label>
                  <Select value={newToolType} onValueChange={setNewToolType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez un type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="analysis">Analyse de texte</SelectItem>
                      <SelectItem value="generation">Génération de texte</SelectItem>
                      <SelectItem value="translation">Traduction</SelectItem>
                      <SelectItem value="speech">Traitement de la parole</SelectItem>
                      <SelectItem value="other">Autre</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newToolContent}
                    onChange={(e) => setNewToolContent(e.target.value)}
                    placeholder="Décrivez l'outil et son utilisation..."
                    className="min-h-[150px]"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={addNewTool}>Publier</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="space-y-4">
          {tools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} onLike={() => handleLike(tool.id)} />
          ))}
        </div>
      </div>
    </div>
  )
}

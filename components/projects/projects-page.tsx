"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { ProjectCard } from "./project-card"
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

export function ProjectsPage() {
  const [projects, setProjects] = useState([
    {
      id: 1,
      author: "Dr. Ahmed Mahmoud",
      avatar: "/placeholder.svg?height=40&width=40",
      date: "2 heures",
      title: "Traitement de language",
      subtitle: "Traitment des erreures",
      description:
        "Ce projet vise à développer un système de détection et de correction automatique des erreurs dans les textes arabes. Nous utilisons des techniques d'apprentissage profond pour identifier les erreurs grammaticales, orthographiques et stylistiques.",
      status: "notFinish",
      responsible: "Dr. Ahmed Mahmoud",
      likes: 100,
      comments: 15,
      liked: false,
    },
    {
      id: 2,
      author: "Prof. Layla Karim",
      avatar: "/placeholder.svg?height=40&width=40",
      date: "1 jour",
      title: "Analyse des dialectes arabes",
      subtitle: "Classification automatique",
      description:
        "Projet de recherche sur la classification automatique des dialectes arabes. Nous développons des modèles capables de distinguer entre les différents dialectes régionaux et de les classifier avec précision.",
      status: "inProgress",
      responsible: "Prof. Layla Karim",
      likes: 75,
      comments: 8,
      liked: false,
    },
    {
      id: 3,
      author: "Dr. Mohammed Ali",
      avatar: "/placeholder.svg?height=40&width=40",
      date: "3 jours",
      title: "Traduction automatique arabe-français",
      subtitle: "Modèle neuronal",
      description:
        "Développement d'un modèle de traduction automatique neuronal pour la paire de langues arabe-français. Le projet inclut la création de corpus parallèles et l'entraînement de modèles basés sur les transformers.",
      status: "completed",
      responsible: "Dr. Mohammed Ali",
      likes: 62,
      comments: 10,
      liked: false,
    },
  ])

  const [newProjectTitle, setNewProjectTitle] = useState("")
  const [newProjectSubtitle, setNewProjectSubtitle] = useState("")
  const [newProjectDescription, setNewProjectDescription] = useState("")
  const [newProjectStatus, setNewProjectStatus] = useState("notFinish")

  const handleLike = (id: number) => {
    setProjects(
      projects.map((project) => {
        if (project.id === id) {
          return {
            ...project,
            likes: project.liked ? project.likes - 1 : project.likes + 1,
            liked: !project.liked,
          }
        }
        return project
      }),
    )
  }

  const addNewProject = () => {
    if (newProjectTitle.trim() && newProjectDescription.trim()) {
      const newProject = {
        id: projects.length + 1,
        author: "Vous",
        avatar: "/placeholder.svg?height=40&width=40",
        date: "À l'instant",
        title: newProjectTitle,
        subtitle: newProjectSubtitle,
        description: newProjectDescription,
        status: newProjectStatus,
        responsible: "Vous",
        likes: 0,
        comments: 0,
        liked: false,
      }

      setProjects([newProject, ...projects])
      setNewProjectTitle("")
      setNewProjectSubtitle("")
      setNewProjectDescription("")
      setNewProjectStatus("notFinish")
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Projets de Recherche</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-[#1e2b7a] hover:bg-[#162058]">
              <Plus className="mr-2 h-4 w-4" /> Nouveau Projet
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Créer un nouveau projet</DialogTitle>
              <DialogDescription>Partagez votre projet de recherche avec la communauté.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Titre</Label>
                <Input
                  id="title"
                  value={newProjectTitle}
                  onChange={(e) => setNewProjectTitle(e.target.value)}
                  placeholder="Titre de votre projet"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="subtitle">Sous-titre</Label>
                <Input
                  id="subtitle"
                  value={newProjectSubtitle}
                  onChange={(e) => setNewProjectSubtitle(e.target.value)}
                  placeholder="Sous-titre ou domaine spécifique"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="status">Statut</Label>
                <Select value={newProjectStatus} onValueChange={setNewProjectStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez un statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="notFinish">Non commencé</SelectItem>
                    <SelectItem value="inProgress">En cours</SelectItem>
                    <SelectItem value="completed">Terminé</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newProjectDescription}
                  onChange={(e) => setNewProjectDescription(e.target.value)}
                  placeholder="Décrivez votre projet en détail..."
                  className="min-h-[150px]"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={addNewProject}>Publier</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} onLike={() => handleLike(project.id)} />
        ))}
      </div>
    </div>
  )
}

"use client"

import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
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
import { useState } from "react"

export function ToolEntet() {
  const [newToolTitle, setNewToolTitle] = useState("")
  const [newToolContent, setNewToolContent] = useState("")

  const addNewTool = () => {
    // Cette fonction serait normalement connectée au composant parent
    if (newToolTitle && newToolContent) {
      alert("Nouvel outil ajouté : " + newToolTitle)
      setNewToolTitle("")
      setNewToolContent("")
    }
  }

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
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
    </div>
  )
}

"use client"

import { useState } from "react"
import {
  ChevronDown,
  MoreHorizontal,
  ThumbsUp,
  MessageSquare,
  Share2,
  ChevronLeft,
  ChevronRight,
  Plus,
  Download,
  Info,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useSwipeable } from "react-swipeable"
import { ressources } from "./bibliotheque-data"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

export function Bibliotheque() {
  const [currentPage, setCurrentPage] = useState(0)
  const [filter, setFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [resourcesList, setResourcesList] = useState(ressources)
  const [newComment, setNewComment] = useState("")
  const [commentingOn, setCommentingOn] = useState<number | null>(null)
  const [selectedResource, setSelectedResource] = useState<number | null>(null)

  const itemsPerPage = 2
  const filteredResources = resourcesList.filter(
    (r) =>
      (filter === "all" || r.type.toLowerCase() === filter.toLowerCase()) &&
      (typeFilter === "all" || r.category === typeFilter),
  )

  const totalPages = Math.ceil(filteredResources.length / itemsPerPage)
  const currentItems = filteredResources.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1)
    }
  }

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handlers = useSwipeable({
    onSwipedUp: () => nextPage(),
    onSwipedDown: () => prevPage(),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  })

  const handleLike = (id: number) => {
    setResourcesList(
      resourcesList.map((resource) => {
        if (resource.id === id) {
          // Convertir le nombre de likes en nombre, ajouter 1, puis reconvertir en chaîne
          const currentLikes = Number.parseInt(resource.likes.replace(/[^\d]/g, ""))
          const newLikes = currentLikes + 1
          return {
            ...resource,
            likes: `${newLikes}K`,
            hasLiked: true,
          }
        }
        return resource
      }),
    )
  }

  const handleComment = (id: number) => {
    setCommentingOn(id)
  }

  const submitComment = () => {
    if (newComment.trim() && commentingOn) {
      setResourcesList(
        resourcesList.map((resource) => {
          if (resource.id === commentingOn) {
            // Convertir le nombre de commentaires en nombre, ajouter 1, puis reconvertir en chaîne
            const currentComments = Number.parseInt(resource.comments.replace(/[^\d]/g, ""))
            const newComments = currentComments + 1
            return {
              ...resource,
              comments: `${newComments}K`,
              userComments: [...(resource.userComments || []), { text: newComment, user: "Vous" }],
            }
          }
          return resource
        }),
      )
      setNewComment("")
      setCommentingOn(null)
    }
  }

  const handleShare = (id: number) => {
    // Simuler le partage en affichant une alerte
    alert(`Ressource partagée avec succès !`)
  }

  const [newResourceTitle, setNewResourceTitle] = useState("")
  const [newResourceType, setNewResourceType] = useState("Thèse")
  const [newResourceResume, setNewResourceResume] = useState("")

  const addNewResource = () => {
    if (newResourceTitle.trim() && newResourceResume.trim()) {
      const newResource = {
        id: resourcesList.length + 1,
        type: newResourceType,
        title: newResourceTitle,
        author: "Utilisateur",
        authorAvatar: "/placeholder.svg?height=40&width=40",
        timeAgo: "À l'instant",
        resume: newResourceResume,
        thumbnail: "/placeholder.svg?height=128&width=96",
        likes: "0",
        comments: "0",
        hasLiked: false,
        userComments: [],
        category: "taln",
        downloadUrl: "#",
        details: {
          abstract: newResourceResume,
          keywords: ["TAL", "Arabe", "Recherche"],
          publicationDate: new Date().toLocaleDateString(),
          publisher: "Université",
          pages: "10-20",
          language: "Français",
        },
      }

      setResourcesList([newResource, ...resourcesList])
      setNewResourceTitle("")
      setNewResourceResume("")
    }
  }

  const openResourceDetails = (id: number) => {
    setSelectedResource(id)
  }

  const handleDownload = (id: number) => {
    const resource = resourcesList.find((r) => r.id === id)
    if (resource) {
      alert(`Téléchargement de "${resource.title}" en cours...`)
      // Ici, vous pourriez rediriger vers une URL de téléchargement réelle
    }
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Bibliothèque Virtuelle</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-[#1e2b7a] hover:bg-[#162058]">
              <Plus className="mr-2 h-4 w-4" /> Nouvelle Ressource bibliographique
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Ajouter une nouvelle ressource</DialogTitle>
              <DialogDescription>
                Complétez les informations pour ajouter une nouvelle ressource à la bibliothèque.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Titre
                </Label>
                <Input
                  id="title"
                  value={newResourceTitle}
                  onChange={(e) => setNewResourceTitle(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">
                  Type
                </Label>
                <Select value={newResourceType} onValueChange={setNewResourceType}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Sélectionner un type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Thèse">Thèse</SelectItem>
                    <SelectItem value="Article">Article</SelectItem>
                    <SelectItem value="Livre">Livre</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="resume" className="text-right">
                  Résumé
                </Label>
                <Textarea
                  id="resume"
                  value={newResourceResume}
                  onChange={(e) => setNewResourceResume(e.target.value)}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={addNewResource}>
                Ajouter
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex gap-2 mb-6">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              {filter === "all" ? "Tous les types" : filter} <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setFilter("all")}>Tous les types</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilter("thèse")}>Thèses</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilter("article")}>Articles</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilter("livre")}>Livres</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              {typeFilter === "all" ? "Toutes catégories" : typeFilter} <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setTypeFilter("all")}>Toutes catégories</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTypeFilter("taln")}>TALN</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTypeFilter("tal")}>TAL</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTypeFilter("linguistique")}>Linguistique</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div {...handlers} className="space-y-6">
        {currentItems.map((resource) => (
          <div key={resource.id} className="bg-white rounded-lg shadow border p-4">
            <div className="flex items-start justify-between">
              <div className="flex gap-3">
                <Avatar>
                  <AvatarImage src={resource.authorAvatar || "/placeholder.svg?height=40&width=40"} />
                  <AvatarFallback>{resource.author.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{resource.author}</div>
                  <div className="text-sm text-gray-500">{resource.timeAgo}</div>
                </div>
              </div>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-5 w-5" />
              </Button>
            </div>

            <div className="mt-4 flex gap-4">
              <div className="w-24 h-32 bg-gray-200 flex-shrink-0">
                <img
                  src={resource.thumbnail || "/placeholder.svg?height=128&width=96"}
                  alt={resource.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{resource.title}</h3>
                <p className="text-gray-600 mt-1">{resource.resume}</p>

                <div className="flex justify-end gap-2 mt-4">
                  <Button variant="outline" onClick={() => handleDownload(resource.id)}>
                    <Download className="mr-1 h-4 w-4" />
                    Télécharger
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" onClick={() => openResourceDetails(resource.id)}>
                        <Info className="mr-1 h-4 w-4" />
                        Détails
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl">
                      <DialogHeader>
                        <DialogTitle>{resource.title}</DialogTitle>
                        <DialogDescription>
                          {resource.type} par {resource.author}
                        </DialogDescription>
                      </DialogHeader>

                      <Tabs defaultValue="overview" className="mt-4">
                        <TabsList>
                          <TabsTrigger value="overview">Aperçu</TabsTrigger>
                          <TabsTrigger value="details">Détails</TabsTrigger>
                          <TabsTrigger value="references">Références</TabsTrigger>
                        </TabsList>
                        <TabsContent value="overview" className="p-4">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="md:col-span-2">
                              <h3 className="text-lg font-medium mb-2">Résumé</h3>
                              <p>{resource.resume}</p>

                              <h3 className="text-lg font-medium mt-4 mb-2">Mots-clés</h3>
                              <div className="flex flex-wrap gap-2">
                                {resource.details?.keywords?.map((keyword, idx) => (
                                  <Badge key={idx} variant="outline">
                                    {keyword}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <div className="border rounded-lg p-4">
                              <div className="mb-4">
                                <img
                                  src={resource.thumbnail || "/placeholder.svg?height=128&width=96"}
                                  alt={resource.title}
                                  className="w-full h-40 object-cover rounded-md"
                                />
                              </div>
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <span className="text-sm text-muted-foreground">Type:</span>
                                  <span className="text-sm font-medium">{resource.type}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-sm text-muted-foreground">Date:</span>
                                  <span className="text-sm font-medium">
                                    {resource.details?.publicationDate || "N/A"}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-sm text-muted-foreground">Langue:</span>
                                  <span className="text-sm font-medium">{resource.details?.language || "N/A"}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-sm text-muted-foreground">Pages:</span>
                                  <span className="text-sm font-medium">{resource.details?.pages || "N/A"}</span>
                                </div>
                              </div>
                              <div className="mt-4">
                                <Button className="w-full" onClick={() => handleDownload(resource.id)}>
                                  <Download className="mr-2 h-4 w-4" /> Télécharger
                                </Button>
                              </div>
                            </div>
                          </div>
                        </TabsContent>
                        <TabsContent value="details" className="p-4">
                          <div className="space-y-4">
                            <h3 className="text-lg font-medium mb-2">Informations détaillées</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="border rounded-lg p-4">
                                <h4 className="font-medium mb-2">Auteur</h4>
                                <p className="text-sm">{resource.author}</p>
                                <p className="text-xs text-muted-foreground mt-1">
                                  {resource.details?.publisher || "Université"}
                                </p>
                              </div>
                              <div className="border rounded-lg p-4">
                                <h4 className="font-medium mb-2">Publication</h4>
                                <p className="text-sm">{resource.details?.publicationDate || "N/A"}</p>
                                <p className="text-xs text-muted-foreground mt-1">
                                  {resource.details?.publisher || "N/A"}
                                </p>
                              </div>
                            </div>
                            <div className="border rounded-lg p-4">
                              <h4 className="font-medium mb-2">Résumé complet</h4>
                              <p className="text-sm">{resource.details?.abstract || resource.resume}</p>
                            </div>
                          </div>
                        </TabsContent>
                        <TabsContent value="references" className="p-4">
                          <div className="space-y-4">
                            <h3 className="text-lg font-medium mb-2">Références</h3>
                            <p className="text-sm text-muted-foreground">
                              Aucune référence disponible pour cette ressource.
                            </p>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>

            {resource.userComments && resource.userComments.length > 0 && (
              <div className="mt-3 pt-3 border-t">
                <h4 className="text-sm font-medium mb-2">Commentaires:</h4>
                {resource.userComments.map((comment, idx) => (
                  <div key={idx} className="text-sm mb-2 bg-gray-50 p-2 rounded">
                    <span className="font-medium">{comment.user}:</span> {comment.text}
                  </div>
                ))}
              </div>
            )}

            <div className="flex items-center gap-4 mt-4 pt-2 border-t">
              <Button
                variant="ghost"
                size="sm"
                className={`flex items-center gap-1 ${resource.hasLiked ? "text-blue-600" : ""}`}
                onClick={() => handleLike(resource.id)}
              >
                <ThumbsUp className="h-4 w-4" />
                <span>{resource.likes}</span>
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-1"
                    onClick={() => handleComment(resource.id)}
                  >
                    <MessageSquare className="h-4 w-4" />
                    <span>{resource.comments}</span>
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Ajouter un commentaire</DialogTitle>
                  </DialogHeader>
                  <Textarea
                    placeholder="Écrivez votre commentaire ici..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="min-h-[100px]"
                  />
                  <DialogFooter>
                    <Button onClick={submitComment}>Publier</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-1"
                onClick={() => handleShare(resource.id)}
              >
                <Share2 className="h-4 w-4" />
                <span>Partager</span>
              </Button>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          <Button variant="outline" size="icon" onClick={prevPage} disabled={currentPage === 0}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={nextPage} disabled={currentPage === totalPages - 1}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  )
}

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { PostCard } from "./post-card"
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

export function ForumPage() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: "Dr. Ahmed Mahmoud",
      avatar: "/placeholder.svg?height=40&width=40",
      date: "2 heures",
      title: "Traitement de language",
      content:
        "Je travaille actuellement sur un projet de traitement automatique de la langue arabe et je rencontre des difficultés avec la désambiguïsation des mots. Avez-vous des suggestions d'approches ou d'outils qui pourraient m'aider ?",
      likes: 100,
      comments: 15,
      liked: false,
    },
    {
      id: 2,
      author: "Prof. Layla Karim",
      avatar: "/placeholder.svg?height=40&width=40",
      date: "1 jour",
      title: "Analyse morphologique de l'arabe",
      content:
        "Quels sont les meilleurs outils open source pour l'analyse morphologique de l'arabe ? J'ai essayé MADAMIRA mais je cherche d'autres alternatives pour comparer les performances.",
      likes: 75,
      comments: 8,
      liked: false,
    },
    {
      id: 3,
      author: "Dr. Mohammed Ali",
      avatar: "/placeholder.svg?height=40&width=40",
      date: "3 jours",
      title: "Corpus parallèles arabe-français",
      content:
        "Je suis à la recherche de corpus parallèles arabe-français pour entraîner un modèle de traduction automatique. Si vous connaissez des ressources de qualité, merci de les partager.",
      likes: 62,
      comments: 10,
      liked: false,
    },
  ])

  const [newPostTitle, setNewPostTitle] = useState("")
  const [newPostContent, setNewPostContent] = useState("")

  const handleLike = (id: number) => {
    setPosts(
      posts.map((post) => {
        if (post.id === id) {
          return {
            ...post,
            likes: post.liked ? post.likes - 1 : post.likes + 1,
            liked: !post.liked,
          }
        }
        return post
      }),
    )
  }

  const addNewPost = () => {
    if (newPostTitle.trim() && newPostContent.trim()) {
      const newPost = {
        id: posts.length + 1,
        author: "Vous",
        avatar: "/placeholder.svg?height=40&width=40",
        date: "À l'instant",
        title: newPostTitle,
        content: newPostContent,
        likes: 0,
        comments: 0,
        liked: false,
      }

      setPosts([newPost, ...posts])
      setNewPostTitle("")
      setNewPostContent("")
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Forum de Discussion</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-[#1e2b7a] hover:bg-[#162058]">
              <Plus className="mr-2 h-4 w-4" /> Nouvelle Discussion
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Créer une nouvelle discussion</DialogTitle>
              <DialogDescription>Partagez vos questions, idées ou découvertes avec la communauté.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Titre</Label>
                <Input
                  id="title"
                  value={newPostTitle}
                  onChange={(e) => setNewPostTitle(e.target.value)}
                  placeholder="Titre de votre discussion"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="content">Contenu</Label>
                <Textarea
                  id="content"
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  placeholder="Décrivez votre sujet en détail..."
                  className="min-h-[150px]"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={addNewPost}>Publier</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} onLike={() => handleLike(post.id)} />
        ))}
      </div>
    </div>
  )
}

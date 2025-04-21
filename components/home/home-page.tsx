"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Calendar, FileText, MessageSquare } from "lucide-react"
import { useState } from "react"
import { PostCard } from "../forum/post-card"

export function HomePage() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: "Dr. Ahmed Mahmoud",
      avatar: "/placeholder.svg?height=40&width=40",
      date: "2 heures",
      title: "Avancées récentes en reconnaissance de l'écriture arabe",
      content:
        "Je viens de publier un article sur les dernières avancées en matière de reconnaissance de l'écriture arabe manuscrite utilisant des réseaux de neurones profonds. Les résultats montrent une amélioration significative par rapport aux méthodes traditionnelles.",
      likes: 45,
      comments: 12,
      liked: false,
    },
    {
      id: 2,
      author: "Prof. Layla Karim",
      avatar: "/placeholder.svg?height=40&width=40",
      date: "1 jour",
      title: "Ressources pour l'analyse morphologique de l'arabe",
      content:
        "Je partage avec vous une collection de ressources pour l'analyse morphologique de la langue arabe que j'ai compilée pour mes étudiants. Elle comprend des outils, des corpus annotés et des articles de référence.",
      likes: 32,
      comments: 8,
      liked: false,
    },
  ])

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

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <h2 className="text-xl font-semibold">Accueil</h2>
          <div className="bg-[#1e2b7a] text-white p-4 rounded-lg">
            <h3 className="font-semibold text-lg">TAL-Arabe Platform</h3>
            <p className="text-sm">Partagez vos découvertes et suivez les dernières avancées en TAL arabe.</p>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Utilisateur" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <Input placeholder="Partagez vos découvertes, publications ou ressources..." className="flex-1" />
          </div>

          <div className="border-t pt-4 flex justify-around">
            <Button variant="outline" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" /> Forum
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" /> Événement
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <FileText className="h-4 w-4" /> Ressources
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} onLike={() => handleLike(post.id)} />
        ))}
      </div>
    </div>
  )
}

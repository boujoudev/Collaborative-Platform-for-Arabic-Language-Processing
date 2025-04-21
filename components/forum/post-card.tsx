"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { MoreHorizontal, MessageSquare, Share2, ThumbsUp, ThumbsDown } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"

interface Post {
  id: number
  author: string
  avatar: string
  date: string
  title: string
  content: string
  likes: number
  comments: number
  liked?: boolean
}

interface PostCardProps {
  post: Post
  onLike: () => void
}

export function PostCard({ post, onLike }: PostCardProps) {
  const [expanded, setExpanded] = useState(false)
  const [newComment, setNewComment] = useState("")

  const toggleExpand = () => {
    setExpanded(!expanded)
  }

  const handleShare = () => {
    alert("Publication partagée !")
  }

  const submitComment = () => {
    if (newComment.trim()) {
      alert("Commentaire ajouté : " + newComment)
      setNewComment("")
    }
  }

  return (
    <Card>
      <CardHeader className="p-4 pb-0">
        <div className="flex items-start justify-between">
          <div className="flex gap-3">
            <Avatar>
              <AvatarImage src={post.avatar || "/placeholder.svg"} alt={post.author} />
              <AvatarFallback>{post.author.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{post.author}</div>
              <div className="text-xs text-muted-foreground">{post.date}</div>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Signaler</DropdownMenuItem>
              <DropdownMenuItem>Masquer</DropdownMenuItem>
              <DropdownMenuItem>Copier le lien</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <h3 className="font-semibold mb-2">{post.title}</h3>
        <p className={`text-sm ${expanded ? "" : "line-clamp-3"}`}>{post.content}</p>
        {post.content.length > 150 && (
          <Button variant="link" onClick={toggleExpand} className="p-0 h-auto text-xs mt-1">
            {expanded ? "Voir moins" : "Voir plus"}
          </Button>
        )}
      </CardContent>
      <CardFooter className="p-4 pt-0 flex flex-wrap gap-2">
        <div className="flex items-center bg-muted rounded-md overflow-hidden">
          <Button variant="ghost" size="sm" className={`px-2 ${post.liked ? "text-blue-600" : ""}`} onClick={onLike}>
            <ThumbsUp className="h-4 w-4 mr-1" />
            {post.likes}
          </Button>
          <div className="h-4 w-px bg-border"></div>
          <Button variant="ghost" size="sm" className="px-2">
            <ThumbsDown className="h-4 w-4" />
          </Button>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" size="sm" className="flex items-center">
              <MessageSquare className="h-4 w-4 mr-1" />
              {post.comments} Commentaires
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Commentaires</DialogTitle>
              <DialogDescription>Participez à la discussion en ajoutant votre commentaire.</DialogDescription>
            </DialogHeader>
            <div className="max-h-[300px] overflow-y-auto space-y-4 my-4">
              <div className="border rounded-md p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Avatar className="h-6 w-6">
                    <AvatarFallback>U1</AvatarFallback>
                  </Avatar>
                  <span className="font-medium text-sm">Utilisateur 1</span>
                </div>
                <p className="text-sm">
                  Très intéressant ! Avez-vous essayé d'utiliser des transformers pour cette tâche ?
                </p>
              </div>
              <div className="border rounded-md p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Avatar className="h-6 w-6">
                    <AvatarFallback>U2</AvatarFallback>
                  </Avatar>
                  <span className="font-medium text-sm">Utilisateur 2</span>
                </div>
                <p className="text-sm">Je travaille sur un sujet similaire. Pourrions-nous échanger des idées ?</p>
              </div>
            </div>
            <Textarea
              placeholder="Ajoutez votre commentaire..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="min-h-[100px]"
            />
            <DialogFooter>
              <Button onClick={submitComment}>Commenter</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Button variant="ghost" size="sm" className="flex items-center" onClick={handleShare}>
          <Share2 className="h-4 w-4 mr-1" />
          Partager
        </Button>
      </CardFooter>
    </Card>
  )
}

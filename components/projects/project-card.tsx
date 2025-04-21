"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { MoreHorizontal, MessageSquare, Share2, ThumbsUp, ThumbsDown, Link2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

interface ProjectProps {
  id: number
  author: string
  avatar: string
  date: string
  title: string
  subtitle: string
  description: string
  status: "notFinish" | "inProgress" | "completed"
  responsible: string
  likes: number
  comments: number
  liked?: boolean
}

interface ProjectCardProps {
  project: ProjectProps
  onLike: () => void
}

export function ProjectCard({ project, onLike }: ProjectCardProps) {
  const [expanded, setExpanded] = useState(false)

  const toggleExpand = () => {
    setExpanded(!expanded)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "notFinish":
        return "text-amber-600"
      case "inProgress":
        return "text-blue-600"
      case "completed":
        return "text-green-600"
      default:
        return "text-gray-600"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "notFinish":
        return "Non commencé"
      case "inProgress":
        return "En cours"
      case "completed":
        return "Terminé"
      default:
        return status
    }
  }

  return (
    <Card>
      <CardHeader className="p-4 pb-0">
        <div className="flex items-start justify-between">
          <div className="flex gap-3">
            <Avatar>
              <AvatarImage src={project.avatar || "/placeholder.svg"} alt={project.author} />
              <AvatarFallback>{project.author.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{project.author}</div>
              <div className="text-xs text-muted-foreground">{project.date}</div>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="text-red-600">Signaler</DropdownMenuItem>
              <DropdownMenuItem>Masquer</DropdownMenuItem>
              <DropdownMenuItem>Copier le lien</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <h3 className="font-semibold">{project.title}</h3>
        <h4 className="text-sm font-medium text-muted-foreground mb-2">{project.subtitle}</h4>

        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <span className="font-medium">Statut :</span>
            <Badge variant="outline" className={getStatusColor(project.status)}>
              {getStatusText(project.status)}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium">Responsable :</span>
            <span>{project.responsible || project.author}</span>
          </div>
          <div>
            <span className="font-medium">Description :</span>
            <p className={`mt-1 ${expanded ? "" : "line-clamp-2"}`}>{project.description}</p>
            {project.description.length > 100 && (
              <Button variant="link" onClick={toggleExpand} className="p-0 h-auto text-xs mt-1">
                {expanded ? "Voir moins" : "Voir plus"}
              </Button>
            )}
          </div>
        </div>

        <Button variant="outline" size="sm" className="mt-3">
          <Link2 className="h-4 w-4 mr-1" /> Détails du projet
        </Button>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex flex-wrap gap-2">
        <div className="flex items-center bg-muted rounded-md overflow-hidden">
          <Button variant="ghost" size="sm" className={`px-2 ${project.liked ? "text-blue-600" : ""}`} onClick={onLike}>
            <ThumbsUp className="h-4 w-4 mr-1" />
            {project.likes}
          </Button>
          <div className="h-4 w-px bg-border"></div>
          <Button variant="ghost" size="sm" className="px-2">
            <ThumbsDown className="h-4 w-4" />
          </Button>
        </div>

        <Button variant="ghost" size="sm" className="flex items-center">
          <MessageSquare className="h-4 w-4 mr-1" />
          {project.comments} Commentaires
        </Button>

        <Button variant="ghost" size="sm" className="flex items-center">
          <Share2 className="h-4 w-4 mr-1" />
          Partager
        </Button>
      </CardFooter>
    </Card>
  )
}

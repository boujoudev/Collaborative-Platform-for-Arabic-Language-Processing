"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { MoreHorizontal, ThumbsUp, ThumbsDown, MessageSquare, Share2, Bell } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface EvenementProps {
  id: number
  title: string
  author: string
  authorAvatar: string
  date: string
  deadline: string
  location: string
  description: string
  likes: number
  comments: number
}

export function EvenementCard({
  id,
  title,
  author,
  authorAvatar,
  date,
  deadline,
  location,
  description,
  likes: initialLikes,
  comments,
}: EvenementProps) {
  const [likes, setLikes] = useState(initialLikes)
  const [liked, setLiked] = useState(false)
  const [disliked, setDisliked] = useState(false)
  const [interested, setInterested] = useState(false)
  const [expanded, setExpanded] = useState(false)

  const handleLike = () => {
    if (liked) {
      setLikes(likes - 1)
      setLiked(false)
    } else {
      if (disliked) {
        setLikes(likes + 2)
        setDisliked(false)
      } else {
        setLikes(likes + 1)
      }
      setLiked(true)
    }
  }

  const handleDislike = () => {
    if (disliked) {
      setLikes(likes + 1)
      setDisliked(false)
    } else {
      if (liked) {
        setLikes(likes - 2)
        setLiked(false)
      } else {
        setLikes(likes - 1)
      }
      setDisliked(true)
    }
  }

  const toggleInterested = () => {
    setInterested(!interested)
  }

  const toggleExpanded = () => {
    setExpanded(!expanded)
  }

  return (
    <Card className="mb-4">
      <CardHeader className="p-4 pb-0">
        <div className="flex items-start justify-between">
          <div className="flex gap-3">
            <Avatar>
              <AvatarImage src={authorAvatar || "/placeholder.svg?height=40&width=40"} alt={author} />
              <AvatarFallback>{author.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{author}</div>
              <div className="text-xs text-muted-foreground">{date}</div>
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
        <h3 className="font-semibold text-lg mb-2">{title}</h3>
        <div className="space-y-2">
          <div className="flex items-start gap-2">
            <span className="font-medium text-sm">Date limite:</span>
            <span className="text-sm">{deadline}</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-medium text-sm">Lieu:</span>
            <span className="text-sm">{location}</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-medium text-sm">Description:</span>
            <div className={`text-sm ${expanded ? "" : "line-clamp-2"}`}>{description}</div>
          </div>
          {description.length > 100 && (
            <Button variant="link" onClick={toggleExpanded} className="p-0 h-auto text-xs">
              {expanded ? "Voir moins" : "Voir plus"}
            </Button>
          )}
        </div>
        <div className="mt-4">
          <Button
            variant={interested ? "default" : "outline"}
            size="sm"
            onClick={toggleInterested}
            className={interested ? "bg-[#1e2b7a] hover:bg-[#162058]" : ""}
          >
            <Bell className="mr-2 h-4 w-4" />
            {interested ? "Intéressé" : "Marquer comme intéressé"}
          </Button>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex flex-wrap gap-2 border-t mt-4">
        <div className="flex items-center bg-muted rounded-md overflow-hidden">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`px-2 ${liked ? "text-blue-600" : ""}`}
                  onClick={handleLike}
                >
                  <ThumbsUp className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>J'aime</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <span className="px-2">{likes}</span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`px-2 ${disliked ? "text-red-600" : ""}`}
                  onClick={handleDislike}
                >
                  <ThumbsDown className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Je n'aime pas</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <Button variant="ghost" size="sm" className="flex items-center gap-1">
          <MessageSquare className="h-4 w-4 mr-1" />
          <span>{comments} Commentaires</span>
        </Button>

        <Button variant="ghost" size="sm" className="flex items-center gap-1">
          <Share2 className="h-4 w-4 mr-1" />
          <span>Partager</span>
        </Button>
      </CardFooter>
    </Card>
  )
}

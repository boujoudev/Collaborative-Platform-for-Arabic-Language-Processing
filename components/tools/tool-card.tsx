"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { MoreHorizontal, MessageSquare, Share2, ThumbsUp, ThumbsDown } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface ToolProps {
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

interface ToolCardProps {
  tool: ToolProps
  onLike: () => void
}

export function ToolCard({ tool, onLike }: ToolCardProps) {
  const [expanded, setExpanded] = useState(false)
  const [showMenu, setShowMenu] = useState(false)

  const toggleExpand = () => {
    setExpanded(!expanded)
  }

  return (
    <Card className="mb-4">
      <CardHeader className="p-4 pb-0">
        <div className="flex items-start justify-between">
          <div className="flex gap-3">
            <Avatar>
              <AvatarImage src={tool.avatar || "/placeholder.svg"} alt={tool.author} />
              <AvatarFallback>{tool.author.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{tool.author}</div>
              <div className="text-xs text-muted-foreground">{tool.date}</div>
            </div>
          </div>
          <DropdownMenu open={showMenu} onOpenChange={setShowMenu}>
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
        <h3 className="font-semibold mb-2">{tool.title}</h3>
        <p className={`text-sm ${expanded ? "" : "line-clamp-3"}`}>{tool.content}</p>
        {tool.content.length > 150 && (
          <Button variant="link" onClick={toggleExpand} className="p-0 h-auto text-xs mt-1">
            {expanded ? "Voir moins" : "Voir plus"}
          </Button>
        )}
      </CardContent>
      <CardFooter className="p-4 pt-0 flex flex-wrap gap-2">
        <div className="flex items-center bg-muted rounded-md overflow-hidden">
          <Button variant="ghost" size="sm" className={`px-2 ${tool.liked ? "text-blue-600" : ""}`} onClick={onLike}>
            <ThumbsUp className="h-4 w-4 mr-1" />
            {tool.likes}
          </Button>
          <div className="h-4 w-px bg-border"></div>
          <Button variant="ghost" size="sm" className="px-2">
            <ThumbsDown className="h-4 w-4" />
          </Button>
        </div>

        <Button variant="ghost" size="sm" className="flex items-center">
          <MessageSquare className="h-4 w-4 mr-1" />
          {tool.comments} Commentaires
        </Button>

        <Button variant="ghost" size="sm" className="flex items-center">
          <Share2 className="h-4 w-4 mr-1" />
          Partager
        </Button>
      </CardFooter>
    </Card>
  )
}

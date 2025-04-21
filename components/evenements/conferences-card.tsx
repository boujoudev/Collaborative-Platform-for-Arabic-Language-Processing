"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ExternalLink } from "lucide-react"

export function ConferencesCard() {
  const conferences = [
    {
      id: 1,
      name: "Hassan Aissa",
      avatar: "/placeholder.svg?height=40&width=40",
      title: "Titre de la conférence",
    },
    {
      id: 2,
      name: "Rachid nagaz",
      avatar: "/placeholder.svg?height=40&width=40",
      title: "Titre de la conférence",
    },
    {
      id: 3,
      name: "alt ahssen imad",
      avatar: "/placeholder.svg?height=40&width=40",
      title: "Titre de la conférence",
    },
    {
      id: 4,
      name: "aisaoui radoune",
      avatar: "/placeholder.svg?height=40&width=40",
      title: "Titre de la conférence",
    },
  ]

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Conférences en Ligne</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {conferences.map((conference) => (
          <div key={conference.id} className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={conference.avatar || "/placeholder.svg"} alt={conference.name} />
              <AvatarFallback>{conference.name.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-sm truncate">{conference.name}</h4>
              <p className="text-xs text-muted-foreground truncate">{conference.title}</p>
            </div>
            <Button size="sm" variant="outline" className="flex-shrink-0">
              Répondre
            </Button>
          </div>
        ))}
        <Button variant="link" size="sm" className="w-full flex items-center justify-center">
          Voir toutes les Conférences en Ligne <ExternalLink className="ml-1 h-3 w-3" />
        </Button>
      </CardContent>
    </Card>
  )
}

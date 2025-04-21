import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Video } from "lucide-react"

export function ConferenceSuggestions() {
  const conferences = [
    {
      id: 1,
      title: "WANLP 2023: Workshop on Arabic Natural Language Processing",
      date: "15-16 Décembre 2023",
      location: "En ligne",
    },
    {
      id: 2,
      title: "ANLP 2024: Arabic Natural Language Processing Conference",
      date: "10-12 Mars 2024",
      location: "En ligne",
    },
  ]

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">Conférences en ligne</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {conferences.map((conference) => (
          <div key={conference.id} className="space-y-2">
            <h4 className="font-medium text-sm">{conference.title}</h4>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Calendar className="h-3.5 w-3.5" />
              <span>{conference.date}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Video className="h-3.5 w-3.5" />
              <span>{conference.location}</span>
            </div>
            <Button size="sm" variant="outline" className="w-full">
              S'inscrire
            </Button>
          </div>
        ))}
        <Button variant="link" size="sm" className="w-full">
          Voir toutes les conférences
        </Button>
      </CardContent>
    </Card>
  )
}

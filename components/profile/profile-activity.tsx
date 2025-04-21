import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, FileText, MessageSquare, ThumbsUp } from "lucide-react"

export function ProfileActivity() {
  const activities = [
    {
      type: "comment",
      title: "A commenté sur",
      content: "Analyse morphologique de l'arabe dialectal",
      time: "Il y a 2 heures",
    },
    {
      type: "like",
      title: "A aimé",
      content: "Nouvelles ressources pour le TAL arabe",
      time: "Il y a 5 heures",
    },
    {
      type: "post",
      title: "A publié",
      content: "Avancées récentes en reconnaissance de l'écriture arabe",
      time: "Il y a 1 jour",
    },
    {
      type: "resource",
      title: "A partagé une ressource",
      content: "Corpus parallèle arabe-français",
      time: "Il y a 3 jours",
    },
    {
      type: "comment",
      title: "A commenté sur",
      content: "Méthodes d'évaluation pour la traduction automatique",
      time: "Il y a 4 jours",
    },
  ]

  const getIcon = (type: string) => {
    switch (type) {
      case "comment":
        return <MessageSquare className="h-4 w-4 text-blue-600" />
      case "like":
        return <ThumbsUp className="h-4 w-4 text-blue-600" />
      case "post":
        return <MessageSquare className="h-4 w-4 text-blue-600" />
      case "resource":
        return <FileText className="h-4 w-4 text-blue-600" />
      default:
        return <MessageSquare className="h-4 w-4 text-blue-600" />
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Activités récentes</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex gap-3 pb-4 border-b last:border-0 last:pb-0">
            <div className="mt-0.5">
              <div className="bg-blue-50 p-2 rounded-full">{getIcon(activity.type)}</div>
            </div>
            <div className="flex-1">
              <p className="text-sm">
                <span className="font-medium">{activity.title}</span>{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  {activity.content}
                </a>
              </p>
              <p className="text-xs text-muted-foreground flex items-center mt-1">
                <Clock className="h-3 w-3 mr-1" />
                {activity.time}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

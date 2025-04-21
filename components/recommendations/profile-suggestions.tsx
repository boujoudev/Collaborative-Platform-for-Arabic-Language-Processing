import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { UserPlus } from "lucide-react"

export function ProfileSuggestions() {
  const suggestions = [
    {
      id: 1,
      name: "Dr. Sarah Ahmed",
      role: "Chercheuse en TAL",
      institution: "Université du Caire",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      name: "Prof. Karim Benali",
      role: "Professeur en linguistique computationnelle",
      institution: "Université d'Alger",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">Suggestions pour vous</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {suggestions.map((suggestion) => (
          <div key={suggestion.id} className="flex items-start gap-3">
            <Avatar>
              <AvatarImage src={suggestion.avatar || "/placeholder.svg"} alt={suggestion.name} />
              <AvatarFallback>{suggestion.name.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-sm truncate">{suggestion.name}</h4>
              <p className="text-xs text-muted-foreground truncate">{suggestion.role}</p>
              <p className="text-xs text-muted-foreground truncate">{suggestion.institution}</p>
            </div>
            <Button size="sm" variant="outline" className="flex-shrink-0">
              <UserPlus className="h-4 w-4 mr-1" /> Suivre
            </Button>
          </div>
        ))}
        <Button variant="link" size="sm" className="w-full">
          Voir toutes les suggestions
        </Button>
      </CardContent>
    </Card>
  )
}

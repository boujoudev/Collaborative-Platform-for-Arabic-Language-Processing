import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, ExternalLink } from "lucide-react"

export function ToolSuggestions() {
  const tools = [
    {
      id: 1,
      title: "MADAMIRA",
      description: "Outil d'analyse morphologique pour l'arabe standard moderne",
      type: "Analyse morphologique",
    },
    {
      id: 2,
      title: "CAMeL Tools",
      description: "Suite d'outils pour le traitement de la langue arabe",
      type: "Traitement du texte",
    },
  ]

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">Outils recommandés</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {tools.map((tool) => (
          <div key={tool.id} className="space-y-2">
            <div className="flex justify-between items-start">
              <h4 className="font-medium text-sm">{tool.title}</h4>
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">{tool.type}</span>
            </div>
            <p className="text-xs text-muted-foreground">{tool.description}</p>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="flex-1">
                <Download className="h-3.5 w-3.5 mr-1" /> Télécharger
              </Button>
              <Button size="sm" variant="outline" className="flex-1">
                <ExternalLink className="h-3.5 w-3.5 mr-1" /> Visiter
              </Button>
            </div>
          </div>
        ))}
        <Button variant="link" size="sm" className="w-full">
          Voir plus d'outils
        </Button>
      </CardContent>
    </Card>
  )
}

import { Card, CardContent } from "@/components/ui/card"

interface CorpusCardProps {
  id: number
  title: string
  language: string
  documents: string
}

export function CorpusCard({ title, language, documents }: CorpusCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md cursor-pointer">
      <CardContent className="p-4">
        <h3 className="font-medium mb-2">{title}</h3>
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>{language}</span>
          <span>{documents} documents</span>
        </div>
      </CardContent>
    </Card>
  )
}

import { Download, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface BibliothequeCardProps {
  id: number
  title: string
  author: string
  type: string
  timeAgo: string
  price?: string
}

export function BibliothequeCard({ title, author, type, timeAgo, price }: BibliothequeCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="p-4 pb-2 flex flex-row justify-between items-center space-y-0">
        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
          {type}
        </Badge>
        <span className="text-xs text-muted-foreground">{timeAgo}</span>
      </CardHeader>
      <CardContent className="p-4 pt-2 pb-2">
        <h3 className="font-medium text-base line-clamp-2">{title}</h3>
      </CardContent>
      <CardFooter className="p-4 pt-2 flex flex-col items-start space-y-3">
        <span className="text-sm text-muted-foreground">{author}</span>
        <div className="flex w-full justify-between gap-2">
          <Button variant="outline" size="sm" className="flex-1">
            <Download className="mr-1 h-4 w-4" />
            Télécharger
          </Button>
          <Button variant="secondary" size="sm" className="flex-1">
            <Info className="mr-1 h-4 w-4" />
            Détails
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

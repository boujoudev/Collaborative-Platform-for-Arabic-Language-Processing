import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface CoursCardProps {
  id: string
  title: string
  instructor: string
  progress: number
}

export function CoursCard({ title, instructor, progress }: CoursCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md cursor-pointer">
      <CardContent className="p-4 pb-2">
        <h3 className="font-medium text-base mb-1">{title}</h3>
        <span className="text-sm text-muted-foreground">{instructor}</span>
      </CardContent>
      <CardFooter className="p-4 pt-2">
        <div className="w-full">
          <Progress value={progress} className="h-2" />
        </div>
      </CardFooter>
    </Card>
  )
}

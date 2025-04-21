import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Edit, MessageSquare, UserPlus } from "lucide-react"

export function ProfileHeader() {
  return (
    <Card>
      <CardContent className="p-0">
        <div className="relative">
          <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-800"></div>
          <div className="absolute -bottom-12 left-6">
            <Avatar className="h-24 w-24 border-4 border-white">
              <AvatarImage src="/profile-image.png" alt="Aksouh Raouf" />
              <AvatarFallback>AR</AvatarFallback>
            </Avatar>
          </div>
          <div className="absolute top-4 right-4 flex gap-2">
            <Button variant="outline" size="sm" className="bg-white">
              <MessageSquare className="h-4 w-4 mr-1" /> Message
            </Button>
            <Button variant="outline" size="sm" className="bg-white">
              <UserPlus className="h-4 w-4 mr-1" /> Suivre
            </Button>
            <Button variant="outline" size="sm" className="bg-white">
              <Edit className="h-4 w-4 mr-1" /> Modifier
            </Button>
          </div>
        </div>

        <div className="pt-14 px-6 pb-6">
          <h2 className="text-xl font-bold">Aksouh Raouf</h2>
          <p className="text-muted-foreground">Researcher in Arabic Natural Language Processing</p>
          <p className="text-muted-foreground">University of Science and Technology 'Houari Boumediene'</p>
          <div className="mt-2">
            <Button variant="link" className="p-0 h-auto text-primary">
              Contact information
            </Button>
          </div>
          <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
            <div>
              <span className="font-medium text-foreground">91</span> Abonnés
            </div>
            <div>
              <span className="font-medium text-foreground">202</span> Abonnements
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

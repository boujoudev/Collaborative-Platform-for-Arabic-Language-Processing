import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProfileHeader } from "./profile-header"
import { ProfileInformation } from "./profile-information"
import { ProfileActivity } from "./profile-activity"

export function ProfilePage() {
  return (
    <div className="space-y-6">
      <ProfileHeader />

      <Tabs defaultValue="information" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="information">Informations</TabsTrigger>
          <TabsTrigger value="activity">Activités</TabsTrigger>
          <TabsTrigger value="publications">Publications</TabsTrigger>
        </TabsList>
        <TabsContent value="information">
          <ProfileInformation />
        </TabsContent>
        <TabsContent value="activity">
          <ProfileActivity />
        </TabsContent>
        <TabsContent value="publications">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium mb-4">Publications</h3>
            <p className="text-muted-foreground">Aucune publication pour le moment.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

import { ProfileHeader } from "@/components/profile/profile-header"
import { ProfileTabs } from "@/components/profile/profile-tabs"
import { ProjectsPage } from "@/components/projects/projects-page"

export default function ProfileProjects() {
  return (
    <div className="space-y-6">
      <ProfileHeader />
      <ProfileTabs />
      <ProjectsPage />
    </div>
  )
}

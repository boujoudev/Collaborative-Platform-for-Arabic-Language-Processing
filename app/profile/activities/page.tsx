import { ProfileHeader } from "@/components/profile/profile-header"
import { ProfileTabs } from "@/components/profile/profile-tabs"
import { ProfileActivity } from "@/components/profile/profile-activity"

export default function ProfileActivities() {
  return (
    <div className="space-y-6">
      <ProfileHeader />
      <ProfileTabs />
      <ProfileActivity />
    </div>
  )
}

import { ProfileHeader } from "@/components/profile/profile-header"
import { ProfileTabs } from "@/components/profile/profile-tabs"
import { ProfileInformation } from "@/components/profile/profile-information"

export default function Profile() {
  return (
    <div className="space-y-6">
      <ProfileHeader />
      <ProfileTabs />
      <ProfileInformation />
    </div>
  )
}

import { ProfileSuggestions } from "../recommendations/profile-suggestions"
import { ConferenceSuggestions } from "../recommendations/conference-suggestions"
import { ToolSuggestions } from "../recommendations/tool-suggestions"

export function HomeSidebar() {
  return (
    <div className="space-y-6">
      <ProfileSuggestions />
      <ConferenceSuggestions />
      <ToolSuggestions />
    </div>
  )
}

import { Search, MessageCircle, Bell, ChevronDown } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function Header() {
  return (
    <header className="bg-[#1e2b7a] text-white p-3 flex items-center justify-between">
      <div className="text-xl font-bold">TAL-Arabe Platform</div>

      <div className="relative max-w-md w-full mx-4">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-gray-400" />
        </div>
        <Input
          type="search"
          placeholder="Search..."
          className="pl-10 pr-4 py-2 w-full bg-white text-black rounded-full border-none"
        />
      </div>

      <div className="flex items-center gap-4">
        <MessageCircle className="h-6 w-6" />
        <Bell className="h-6 w-6" />
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src="/profile-image.png" alt="Aksouh Raouf" />
            <AvatarFallback>AR</AvatarFallback>
          </Avatar>
          <span>Aksouh Raouf</span>
          <ChevronDown className="h-4 w-4" />
        </div>
      </div>
    </header>
  )
}

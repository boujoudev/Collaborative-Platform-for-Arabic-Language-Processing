import { HomePage } from "@/components/home/home-page"
import { HomeSidebar } from "@/components/home/home-sidebar"

export default function Home() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2">
        <HomePage />
      </div>
      <div className="hidden md:block">
        <HomeSidebar />
      </div>
    </div>
  )
}

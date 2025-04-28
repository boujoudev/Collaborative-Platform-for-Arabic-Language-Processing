"use client"
import { useState } from "react"
import { Search, MessageCircle, Bell, ChevronDown } from "lucide-react"
import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter, usePathname } from "next/navigation"
import { MessagePanel } from "@/components/message-panel"
import { NotificationPanel } from "@/components/notification-panel"

export default function MainLayout({ children }) {
  const router = useRouter()
  const pathname = usePathname()
  const [showMessages, setShowMessages] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)

  return (
    <div className="min-h-screen bg-[#F5F7FB]">
      {/* Top Navigation Bar */}
      <header className="flex h-14 items-center justify-between bg-[#1a237e] px-4 text-white">
        <div className="flex items-center gap-4">
          <button
            className="text-lg font-semibold"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              router.push("/")
            }}
          >
            TAL-Arabe Platform
          </button>
        </div>
        <div className="relative mx-auto w-1/3">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input placeholder="Search..." className="h-9 w-full rounded-full bg-white pl-10 pr-4 text-black" />
        </div>
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            className="text-white"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              alert("Menu déroulant")
            }}
          >
            Untitled <ChevronDown className="ml-1 h-4 w-4" />
          </Button>
          <MessageCircle
            className="h-6 w-6 cursor-pointer"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setShowMessages(!showMessages)
              setShowNotifications(false)
            }}
          />
          <Bell
            className="h-6 w-6 cursor-pointer"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setShowNotifications(!showNotifications)
              setShowMessages(false)
            }}
          />
          <Avatar
            className="h-8 w-8 cursor-pointer"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              router.push("/profile")
            }}
          >
            <img src="/placeholder.svg?height=32&width=32" alt="User" />
          </Avatar>
          <ChevronDown
            className="h-4 w-4 cursor-pointer"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              alert("Menu utilisateur")
            }}
          />
        </div>
      </header>

      {/* Messages Panel */}
      {showMessages && <MessagePanel onClose={() => setShowMessages(false)} />}

      {/* Notifications Panel */}
      {showNotifications && <NotificationPanel onClose={() => setShowNotifications(false)} />}

      <div className="mx-auto flex max-w-7xl gap-6 p-4">
        {/* Left Sidebar */}
        <div className="w-64 shrink-0">
          <div className="rounded-lg bg-white shadow">
            <SidebarItem icon="home" label="Home" href="/" active={pathname === "/"} />
            <SidebarItem icon="forum" label="Forum de Discussion" href="/forum" active={pathname === "/forum"} />
            <SidebarItem icon="evenements" label="événements" href="/evenements" active={pathname === "/evenements"} />
            <SidebarItem icon="outils" label="Outils Linguistiques" href="/outils" active={pathname === "/outils"} />
            <SidebarItem icon="projets" label="Projets de Recherche" href="/projets" active={pathname === "/projets"} />
            <SidebarItem
              icon="bibliotheque"
              label="Bibliothèque Virtuelle"
              href="/bibliotheque"
              active={pathname === "/bibliotheque"}
            />
            <SidebarItem icon="corpus" label="Corpus" href="/corpus" active={pathname === "/corpus"} />
            <SidebarItem icon="cours" label="Cours" href="/cours" active={pathname === "/cours"} />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">{children}</div>

        {/* Right Sidebar - Footer */}
        <div className="w-72 shrink-0">
          <div className="text-center text-xs text-gray-500">
            <p className="mb-1">À propos</p>
            <p className="mb-1">
              La Plateforme TAL Arabe est dédiée à la recherche et au développement dans le domaine du traitement
              automatique de la langue arabe.
            </p>
            <p className="mb-1">
              <Button
                variant="link"
                className="h-auto p-0 text-xs text-gray-500"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  router.push("/privacy")
                }}
              >
                Politique de confidentialité
              </Button>{" "}
              |{" "}
              <Button
                variant="link"
                className="h-auto p-0 text-xs text-gray-500"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  router.push("/terms")
                }}
              >
                Condition d'utilisation
              </Button>{" "}
              |{" "}
              <Button
                variant="link"
                className="h-auto p-0 text-xs text-gray-500"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  router.push("/legal")
                }}
              >
                Mentions légales
              </Button>
            </p>
            <p className="mb-1">
              <Button
                variant="link"
                className="h-auto p-0 text-xs text-gray-500"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  router.push("/more")
                }}
              >
                PLUS
              </Button>
            </p>
            <p>© 2023 Plateforme TAL Arabe. Tous droits réservés.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// Modifier la fonction SidebarItem pour utiliser le router
function SidebarItem({ icon, label, href, active }) {
  const router = useRouter()

  const getIcon = () => {
    switch (icon) {
      case "home":
        return <HomeIcon className={`h-5 w-5 ${active ? "text-white" : "text-[#1a237e]"}`} />
      case "forum":
        return <ForumIcon className={`h-5 w-5 ${active ? "text-white" : "text-[#1a237e]"}`} />
      case "evenements":
        return <EventIcon className={`h-5 w-5 ${active ? "text-white" : "text-[#1a237e]"}`} />
      case "outils":
        return <ToolsIcon className={`h-5 w-5 ${active ? "text-white" : "text-[#1a237e]"}`} />
      case "projets":
        return <ProjectsIcon className={`h-5 w-5 ${active ? "text-white" : "text-[#1a237e]"}`} />
      case "bibliotheque":
        return <LibraryIcon className={`h-5 w-5 ${active ? "text-white" : "text-[#1a237e]"}`} />
      case "corpus":
        return <CorpusIcon className={`h-5 w-5 ${active ? "text-white" : "text-[#1a237e]"}`} />
      case "cours":
        return <CoursesIcon className={`h-5 w-5 ${active ? "text-white" : "text-[#1a237e]"}`} />
      default:
        return null
    }
  }

  return (
    <button
      type="button"
      className={`flex w-full items-center gap-3 p-3 text-left ${active ? "bg-[#1a237e] text-white" : "text-[#1a237e] hover:bg-gray-100"}`}
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        router.push(href)
      }}
    >
      {getIcon()}
      <span className="font-medium">{label}</span>
    </button>
  )
}

// Custom Icons
function HomeIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
      <polyline points="9 22 9 12 15 12 15 22"></polyline>
    </svg>
  )
}

function ForumIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
    </svg>
  )
}

function EventIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
      <line x1="16" y1="2" x2="16" y2="6"></line>
      <line x1="8" y1="2" x2="8" y2="6"></line>
      <line x1="3" y1="10" x2="21" y2="10"></line>
    </svg>
  )
}

function ToolsIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="3"></circle>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
    </svg>
  )
}

function ProjectsIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
    </svg>
  )
}

function LibraryIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
    </svg>
  )
}

function CorpusIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
    </svg>
  )
}

function CoursesIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
    </svg>
  )
}

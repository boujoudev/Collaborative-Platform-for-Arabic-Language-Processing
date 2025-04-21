"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import {
  Home,
  MessageSquare,
  Calendar,
  Settings,
  Briefcase,
  BookOpen,
  Database,
  GraduationCap,
  User,
} from "lucide-react"

export default function Sidebar() {
  const pathname = usePathname()

  const navItems = [
    { name: "Accueil", href: "/home", icon: Home },
    { name: "Forum de Discussion", href: "/forum", icon: MessageSquare },
    { name: "Événements", href: "/evenements", icon: Calendar },
    { name: "Outils Linguistiques", href: "/outils", icon: Settings },
    { name: "Projets de Recherch", href: "/projets", icon: Briefcase },
    { name: "Bibliothèque Virtuelle", href: "/bibliotheque", icon: BookOpen },
    { name: "Corpus", href: "/corpus", icon: Database },
    { name: "Cours", href: "/cours", icon: GraduationCap },
    { name: "Profil", href: "/profile", icon: User },
  ]

  return (
    <aside className="w-64 border-r bg-white">
      <nav className="p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href))

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-3 rounded-md transition-colors ${
                isActive ? "bg-[#1e2b7a] text-white" : "hover:bg-gray-100"
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.name}</span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}

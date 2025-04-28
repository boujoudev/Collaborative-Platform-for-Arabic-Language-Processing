"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Avatar } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()

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
          <Avatar className="h-8 w-8 cursor-pointer">
            <img src="/placeholder.svg?height=32&width=32" alt="User" />
          </Avatar>
        </div>
      </header>

      <div className="mx-auto flex max-w-7xl gap-6 p-4">
        {/* Left Sidebar */}
        <div className="w-64 shrink-0">
          <div className="rounded-lg bg-white shadow">
            <SidebarItem icon="bibliotheque" label="Bibliothèque Virtuelle" />
            <SidebarItem icon="corpus" label="Corpus" />
            <SidebarItem icon="cours" label="Cours" />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="mb-4 rounded-lg bg-white p-6 shadow">
            <h2 className="mb-4 text-2xl font-bold">Ressources</h2>
            <div className="space-y-4">
              <div className="rounded-lg border p-4">
                <h3 className="text-lg font-semibold">Bibliothèque Virtuelle</h3>
                <p className="text-gray-600">Accédez à notre collection de ressources et publications en TAL Arabe.</p>
              </div>
              <div className="rounded-lg border p-4">
                <h3 className="text-lg font-semibold">Corpus</h3>
                <p className="text-gray-600">Explorez nos corpus de textes arabes pour vos recherches.</p>
              </div>
              <div className="rounded-lg border p-4">
                <h3 className="text-lg font-semibold">Cours</h3>
                <p className="text-gray-600">Découvrez nos cours et formations en TAL Arabe.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function SidebarItem({ icon, label, active }) {
  const getIcon = () => {
    switch (icon) {
      case "bibliotheque":
        return <LibraryIcon className="h-5 w-5 text-[#1a237e]" />
      case "corpus":
        return <CorpusIcon className="h-5 w-5 text-[#1a237e]" />
      case "cours":
        return <CoursesIcon className="h-5 w-5 text-[#1a237e]" />
      default:
        return null
    }
  }

  return (
    <button
      className={`flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-gray-100 ${
        active ? "bg-gray-100" : ""
      }`}
    >
      {getIcon()}
      <span className="text-sm font-medium">{label}</span>
    </button>
  )
}

function LibraryIcon({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
    </svg>
  )
}

function CorpusIcon({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  )
}

function CoursesIcon({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  )
}

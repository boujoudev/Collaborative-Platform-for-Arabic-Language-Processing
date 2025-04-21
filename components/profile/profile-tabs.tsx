"use client"

import { usePathname, useRouter } from "next/navigation"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useEffect, useState } from "react"

export function ProfileTabs() {
  const router = useRouter()
  const pathname = usePathname()
  const [activeTab, setActiveTab] = useState("information")

  useEffect(() => {
    if (pathname.includes("/profile/projects")) {
      setActiveTab("projects")
    } else if (pathname.includes("/profile/activities")) {
      setActiveTab("activities")
    } else if (pathname.includes("/profile/posts")) {
      setActiveTab("posts")
    } else {
      setActiveTab("information")
    }
  }, [pathname])

  const handleTabChange = (value: string) => {
    setActiveTab(value)
    switch (value) {
      case "information":
        router.push("/profile")
        break
      case "posts":
        router.push("/profile/posts")
        break
      case "projects":
        router.push("/profile/projects")
        break
      case "activities":
        router.push("/profile/activities")
        break
    }
  }

  return (
    <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="information">Informations</TabsTrigger>
        <TabsTrigger value="posts">Publications</TabsTrigger>
        <TabsTrigger value="projects">Projets</TabsTrigger>
        <TabsTrigger value="activities">Activités</TabsTrigger>
      </TabsList>
    </Tabs>
  )
}

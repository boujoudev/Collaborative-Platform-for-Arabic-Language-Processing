"use client"

import { useState } from "react"
import { EvenementEntet } from "./evenement-entet"
import { EvenementCard } from "./evenement-card"
import { ConferencesCard } from "./conferences-card"

export function EvenementsPage() {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Conférence Internationale sur le TAL 2025",
      author: "Hassan Aissa",
      authorAvatar: "/placeholder.svg?height=40&width=40",
      date: "4 hr. ago",
      deadline: "2025-03-01",
      location: "Paris",
      description:
        "Cette conférence internationale réunira des chercheurs du monde entier pour discuter des avancées récentes dans le domaine du traitement automatique de la langue arabe. Des sessions plénières, des ateliers et des présentations de posters sont au programme.",
      likes: 10,
      comments: 5,
    },
    {
      id: 2,
      title: "Workshop sur l'IA et le Traitement de l'Arabe",
      author: "Hassan Aissa",
      authorAvatar: "/placeholder.svg?height=40&width=40",
      date: "4 hr. ago",
      deadline: "2025-04-15",
      location: "Rabat",
      description:
        "Ce workshop se concentrera sur l'application des techniques d'intelligence artificielle au traitement de la langue arabe. Des experts présenteront les dernières avancées et des sessions pratiques permettront aux participants de se familiariser avec les outils et méthodes.",
      likes: 8,
      comments: 3,
    },
    {
      id: 3,
      title: "Séminaire sur l'Analyse Morphologique de l'Arabe",
      author: "Rachid Nagaz",
      authorAvatar: "/placeholder.svg?height=40&width=40",
      date: "1 day ago",
      deadline: "2025-05-20",
      location: "Alger",
      description:
        "Ce séminaire abordera les défis spécifiques de l'analyse morphologique de la langue arabe. Les participants découvriront les approches computationnelles pour traiter la complexité morphologique de l'arabe et les applications pratiques dans divers domaines.",
      likes: 15,
      comments: 7,
    },
  ])

  const handleAddEvent = (event: { title: string; deadline: Date; location: string; description: string }) => {
    const newEvent = {
      id: events.length + 1,
      title: event.title,
      author: "Aksouh Raouf",
      authorAvatar: "/profile-image.png",
      date: "À l'instant",
      deadline: event.deadline.toISOString().split("T")[0],
      location: event.location,
      description: event.description,
      likes: 0,
      comments: 0,
    }
    setEvents([newEvent, ...events])
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2">
        <div className="bg-white rounded-lg shadow p-6">
          <EvenementEntet onAddEvent={handleAddEvent} />
          <h3 className="text-lg font-medium mb-4">Événements à venir</h3>
          <div className="space-y-4">
            {events.map((event) => (
              <EvenementCard
                key={event.id}
                id={event.id}
                title={event.title}
                author={event.author}
                authorAvatar={event.authorAvatar}
                date={event.date}
                deadline={event.deadline}
                location={event.location}
                description={event.description}
                likes={event.likes}
                comments={event.comments}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="hidden md:block">
        <ConferencesCard />
      </div>
    </div>
  )
}

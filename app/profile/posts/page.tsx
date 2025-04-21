import { ProfileHeader } from "@/components/profile/profile-header"
import { ProfileTabs } from "@/components/profile/profile-tabs"
import { PostCard } from "@/components/forum/post-card"

export default function ProfilePosts() {
  const posts = [
    {
      id: 1,
      author: "Aymene Meghni",
      avatar: "/placeholder.svg?height=40&width=40",
      date: "2 jours",
      title: "Analyse des dialectes maghrébins",
      content:
        "Je travaille actuellement sur un projet d'analyse des dialectes maghrébins. Nous avons collecté un corpus de textes en dialectes algérien, marocain et tunisien, et nous développons des modèles de classification pour les distinguer automatiquement.",
      likes: 28,
      comments: 7,
      liked: false,
    },
    {
      id: 2,
      author: "Aymene Meghni",
      avatar: "/placeholder.svg?height=40&width=40",
      date: "1 semaine",
      title: "Nouvelle ressource pour l'analyse morphologique",
      content:
        "Je suis heureux de partager une nouvelle ressource que j'ai développée pour l'analyse morphologique de l'arabe. Il s'agit d'un lexique annoté de plus de 50 000 mots avec leurs décompositions morphologiques complètes.",
      likes: 42,
      comments: 15,
      liked: false,
    },
  ]

  return (
    <div className="space-y-6">
      <ProfileHeader />
      <ProfileTabs />
      <div className="space-y-4">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} onLike={() => {}} />
        ))}
      </div>
    </div>
  )
}

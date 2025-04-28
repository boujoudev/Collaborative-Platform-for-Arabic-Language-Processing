"use client"

import { useState } from "react"
import { Search, MoreHorizontal, Download, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import MainLayout from "@/components/main-layout"

export default function CorpusPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [corpusList, setCorpusList] = useState([
    {
      id: 1,
      title: "Corpus Dialectal Maghrébin",
      description:
        "Corpus de textes en dialectes maghrébins (marocain, algérien, tunisien) avec annotations morphosyntaxiques.",
      size: "2.4 GB",
      entries: "120,000 phrases",
      tags: ["Dialectal", "Maghrébin", "Annoté"],
      type: "dialectal",
    },
    {
      id: 2,
      title: "Corpus Journalistique Arabe Standard",
      description:
        "Collection d'articles de presse en arabe standard moderne provenant de diverses sources médiatiques du monde arabe.",
      size: "4.7 GB",
      entries: "250,000 articles",
      tags: ["Standard", "Journalistique", "Non-annoté"],
      type: "standard",
    },
    {
      id: 3,
      title: "Corpus Littéraire Classique",
      description: "Textes littéraires classiques arabes du 8ème au 14ème siècle, incluant poésie et prose.",
      size: "1.8 GB",
      entries: "50,000 textes",
      tags: ["Classique", "Littéraire", "Annoté"],
      type: "standard",
    },
    {
      id: 4,
      title: "Corpus Parallèle Arabe-Français",
      description:
        "Corpus parallèle de textes en arabe standard et leur traduction en français, alignés au niveau des phrases.",
      size: "3.2 GB",
      entries: "180,000 paires de phrases",
      tags: ["Parallèle", "Multilingue", "Aligné"],
      type: "annotated",
    },
    {
      id: 5,
      title: "Corpus de Réseaux Sociaux",
      description: "Collection de posts et commentaires extraits des réseaux sociaux en dialectes arabes variés.",
      size: "5.1 GB",
      entries: "500,000 messages",
      tags: ["Dialectal", "Réseaux sociaux", "Contemporain"],
      type: "dialectal",
    },
  ])

  const [filteredCorpus, setFilteredCorpus] = useState(corpusList)
  const [showNewCorpusForm, setShowNewCorpusForm] = useState(false)
  const [newCorpusTitle, setNewCorpusTitle] = useState("")
  const [newCorpusDescription, setNewCorpusDescription] = useState("")

  const handleTabChange = (tab) => {
    setActiveTab(tab)

    if (tab === "all") {
      setFilteredCorpus(corpusList)
    } else {
      setFilteredCorpus(corpusList.filter((corpus) => corpus.type === tab))
    }
  }

  const handleAddNewCorpus = (e) => {
    e.preventDefault()
    e.stopPropagation()

    if (showNewCorpusForm) {
      if (newCorpusTitle && newCorpusDescription) {
        const newCorpus = {
          id: corpusList.length + 1,
          title: newCorpusTitle,
          description: newCorpusDescription,
          size: "1.2 GB",
          entries: "50,000 phrases",
          tags: ["Nouveau", "Non-annoté"],
          type: "standard",
        }

        const updatedList = [...corpusList, newCorpus]
        setCorpusList(updatedList)
        setFilteredCorpus(activeTab === "all" ? updatedList : updatedList.filter((c) => c.type === activeTab))

        // Réinitialiser le formulaire
        setNewCorpusTitle("")
        setNewCorpusDescription("")
        setShowNewCorpusForm(false)
      }
    } else {
      setShowNewCorpusForm(true)
    }
  }

  return (
    <MainLayout>
      <div className="mb-4 rounded-lg bg-white p-6 shadow">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Corpus</h2>
          <div className="flex gap-2">
            <Input
              placeholder="Rechercher dans les corpus..."
              className="w-64"
              prefix={<Search className="h-4 w-4 text-gray-400" />}
              onChange={(e) => {
                const searchTerm = e.target.value.toLowerCase()
                if (searchTerm) {
                  setFilteredCorpus(
                    corpusList.filter(
                      (corpus) =>
                        corpus.title.toLowerCase().includes(searchTerm) ||
                        corpus.description.toLowerCase().includes(searchTerm),
                    ),
                  )
                } else {
                  setFilteredCorpus(activeTab === "all" ? corpusList : corpusList.filter((c) => c.type === activeTab))
                }
              }}
            />
            <Button className="bg-[#1a237e] hover:bg-[#0D47A1]" onClick={handleAddNewCorpus}>
              {showNewCorpusForm ? "Ajouter" : "+ Nouveau corpus"}
            </Button>
          </div>
        </div>

        {showNewCorpusForm && (
          <div className="mt-4 p-4 border rounded-md">
            <h3 className="text-lg font-medium mb-3">Ajouter un nouveau corpus</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium mb-1">Titre</label>
                <Input
                  value={newCorpusTitle}
                  onChange={(e) => setNewCorpusTitle(e.target.value)}
                  placeholder="Titre du corpus"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  value={newCorpusDescription}
                  onChange={(e) => setNewCorpusDescription(e.target.value)}
                  placeholder="Description du corpus"
                  className="w-full p-2 border rounded-md"
                  rows={3}
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowNewCorpusForm(false)}>
                  Annuler
                </Button>
                <Button
                  className="bg-[#1a237e]"
                  disabled={!newCorpusTitle || !newCorpusDescription}
                  onClick={handleAddNewCorpus}
                >
                  Ajouter
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mb-4 flex items-center gap-2">
        <Button
          variant="outline"
          className={`${activeTab === "all" ? "bg-[#E3F2FD] border-[#0D47A1] text-[#0D47A1]" : ""}`}
          onClick={() => handleTabChange("all")}
        >
          Tous
        </Button>
        <Button
          variant="outline"
          className={`${activeTab === "dialectal" ? "bg-[#E3F2FD] border-[#0D47A1] text-[#0D47A1]" : ""}`}
          onClick={() => handleTabChange("dialectal")}
        >
          Corpus Dialectaux
        </Button>
        <Button
          variant="outline"
          className={`${activeTab === "standard" ? "bg-[#E3F2FD] border-[#0D47A1] text-[#0D47A1]" : ""}`}
          onClick={() => handleTabChange("standard")}
        >
          Arabe Standard
        </Button>
        <Button
          variant="outline"
          className={`${activeTab === "annotated" ? "bg-[#E3F2FD] border-[#0D47A1] text-[#0D47A1]" : ""}`}
          onClick={() => handleTabChange("annotated")}
        >
          Corpus Annotés
        </Button>
      </div>

      <div className="space-y-4">
        {filteredCorpus.map((corpus) => (
          <CorpusItem
            key={corpus.id}
            title={corpus.title}
            description={corpus.description}
            size={corpus.size}
            entries={corpus.entries}
            tags={corpus.tags}
          />
        ))}
      </div>
    </MainLayout>
  )
}

function CorpusItem({ title, description, size, entries, tags }) {
  const [isDownloading, setIsDownloading] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  const handleDownload = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDownloading(true)
    // Simuler un téléchargement
    setTimeout(() => {
      setIsDownloading(false)
      console.log(`Téléchargement du corpus: ${title}`)
    }, 2000)
  }

  const handleDetails = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setShowDetails(!showDetails)
  }

  return (
    <div className="rounded-lg bg-white p-4 shadow">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-lg font-semibold">{title}</h3>
        <Button
          variant="ghost"
          size="icon"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            console.log("Options supplémentaires")
          }}
        >
          <MoreHorizontal className="h-5 w-5" />
        </Button>
      </div>

      <p className="mb-3 text-gray-700">{description}</p>

      <div className="mb-3 flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <span key={index} className="rounded bg-[#E3F2FD] px-2 py-1 text-xs text-[#0D47A1]">
            {tag}
          </span>
        ))}
      </div>

      <div className="mb-4 flex items-center justify-between text-sm text-gray-500">
        <div>Taille: {size}</div>
        <div>Entrées: {entries}</div>
      </div>

      {showDetails && (
        <div className="mb-4 p-3 bg-gray-50 rounded-md">
          <h4 className="font-medium mb-2">Détails du corpus</h4>
          <p className="text-sm text-gray-600 mb-2">
            Ce corpus contient des données linguistiques annotées pour le traitement automatique de la langue arabe.
          </p>
          <div className="text-sm">
            <div className="flex justify-between py-1 border-b">
              <span className="font-medium">Format:</span>
              <span>XML, TXT</span>
            </div>
            <div className="flex justify-between py-1 border-b">
              <span className="font-medium">Date de création:</span>
              <span>12/05/2022</span>
            </div>
            <div className="flex justify-between py-1 border-b">
              <span className="font-medium">Dernière mise à jour:</span>
              <span>03/02/2023</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="font-medium">Licence:</span>
              <span>CC BY-NC-SA</span>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-end gap-2">
        <Button variant="outline" className="flex items-center gap-1" onClick={handleDetails}>
          <FileText className="h-4 w-4" />
          {showDetails ? "Masquer détails" : "Détails"}
        </Button>
        <Button className="flex items-center gap-1 bg-[#0D47A1]" onClick={handleDownload} disabled={isDownloading}>
          {isDownloading ? (
            <>
              <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></span>
              Téléchargement...
            </>
          ) : (
            <>
              <Download className="h-4 w-4" />
              Télécharger
            </>
          )}
        </Button>
      </div>
    </div>
  )
}

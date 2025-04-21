"use client"

import { useState } from "react"
import { useSwipeable } from "react-swipeable"
import { ChevronLeft, ChevronRight, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { corpusData } from "./corpus-data"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

export function Corpus() {
  const [currentPage, setCurrentPage] = useState(0)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCorpus, setSelectedCorpus] = useState<number | null>(null)
  const itemsPerPage = 6

  const filteredCorpus = corpusData.filter((corpus) => corpus.title.toLowerCase().includes(searchQuery.toLowerCase()))
  const totalPages = Math.ceil(filteredCorpus.length / itemsPerPage)
  const currentItems = filteredCorpus.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1)
    }
  }

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handlers = useSwipeable({
    onSwipedUp: () => nextPage(),
    onSwipedDown: () => prevPage(),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  })

  const openCorpusDetails = (id: number) => {
    setSelectedCorpus(id)
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Corpus Linguistiques</h2>
        <div className="relative max-w-xs">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Rechercher..."
            className="pl-9 pr-4 py-2 rounded-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div {...handlers} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentItems.map((corpus) => (
          <Dialog key={corpus.id}>
            <DialogTrigger asChild>
              <div
                className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => openCorpusDetails(corpus.id)}
              >
                <h3 className="font-medium mb-2">{corpus.title}</h3>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>{corpus.language}</span>
                  <span>{corpus.documents} documents</span>
                </div>
              </div>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>{corpus.title}</DialogTitle>
                <DialogDescription>
                  Corpus linguistique en {corpus.language} avec {corpus.documents} documents
                </DialogDescription>
              </DialogHeader>

              <Tabs defaultValue="overview" className="mt-4">
                <TabsList>
                  <TabsTrigger value="overview">Aperçu</TabsTrigger>
                  <TabsTrigger value="annotations">Annotations</TabsTrigger>
                  <TabsTrigger value="statistics">Statistiques</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="p-4">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium mb-2">Description</h3>
                      <p>
                        {corpus.description ||
                          "Ce corpus contient une collection de textes en langue arabe annotés pour diverses tâches de traitement automatique du langage."}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-2">Contenu</h3>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Nombre de documents: {corpus.documents}</li>
                        <li>Nombre de mots: {Math.floor(Math.random() * 1000000) + 500000}</li>
                        <li>Nombre de phrases: {Math.floor(Math.random() * 100000) + 50000}</li>
                      </ul>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="annotations" className="p-4">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium mb-2">Annotations disponibles</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {corpus.annotations?.map((annotation, index) => (
                        <div key={index} className="border rounded-lg p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium">{annotation.name}</h4>
                              <p className="text-sm text-gray-600 mt-1">{annotation.description}</p>
                            </div>
                            <Badge variant="outline" className="bg-primary/10 text-primary">
                              {annotation.type}
                            </Badge>
                          </div>
                          <div className="mt-3 text-sm">
                            <span className="text-gray-500">Exemples:</span>
                            <div className="mt-1 bg-gray-50 p-2 rounded">{annotation.examples.join(", ")}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="statistics" className="p-4">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium mb-2">Statistiques du corpus</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="border rounded-lg p-4 text-center">
                        <div className="text-3xl font-bold text-primary">{corpus.documents}</div>
                        <div className="text-sm text-gray-500 mt-1">Documents</div>
                      </div>
                      <div className="border rounded-lg p-4 text-center">
                        <div className="text-3xl font-bold text-primary">{corpus.annotations?.length || 0}</div>
                        <div className="text-sm text-gray-500 mt-1">Types d'annotations</div>
                      </div>
                      <div className="border rounded-lg p-4 text-center">
                        <div className="text-3xl font-bold text-primary">{Math.floor(Math.random() * 100) + 20}%</div>
                        <div className="text-sm text-gray-500 mt-1">Couverture</div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="flex justify-end mt-4">
                <Button>Télécharger le corpus</Button>
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          <Button variant="outline" size="icon" onClick={prevPage} disabled={currentPage === 0}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={nextPage} disabled={currentPage === totalPages - 1}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  )
}

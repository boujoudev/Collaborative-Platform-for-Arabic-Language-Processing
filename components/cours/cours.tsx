"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown, ChevronLeft, ChevronRight, Star, Plus, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useSwipeable } from "react-swipeable"
import { coursData } from "./cours-data"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"

export function Cours() {
  const [filter, setFilter] = useState("all")
  const carouselRef = useRef<HTMLDivElement>(null)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [maxSlides, setMaxSlides] = useState(0)
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null)
  const [userRating, setUserRating] = useState<number>(0)
  const [hoverRating, setHoverRating] = useState<number>(0)
  const [courses, setCourses] = useState(coursData)
  const [newCourseTitle, setNewCourseTitle] = useState("")
  const [newCourseDescription, setNewCourseDescription] = useState("")

  // Calculer le nombre maximum de slides en fonction de la largeur
  useEffect(() => {
    const calculateMaxSlides = () => {
      if (!carouselRef.current) return

      const containerWidth = carouselRef.current.clientWidth
      const cardWidth = 300 // Largeur approximative d'une carte + marge
      const visibleCards = Math.floor(containerWidth / cardWidth)
      setMaxSlides(Math.max(0, courses.length - visibleCards))
    }

    calculateMaxSlides()
    window.addEventListener("resize", calculateMaxSlides)

    return () => {
      window.removeEventListener("resize", calculateMaxSlides)
    }
  }, [courses.length])

  const nextSlide = () => {
    if (currentSlide < maxSlides) {
      setCurrentSlide(currentSlide + 1)
    }
  }

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1)
    }
  }

  const handlers = useSwipeable({
    onSwipedLeft: () => nextSlide(),
    onSwipedRight: () => prevSlide(),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  })

  const openCourse = (id: number) => {
    setSelectedCourse(id)
    const course = courses.find((c) => c.id === id)
    if (course && course.userRating) {
      setUserRating(course.userRating)
    } else {
      setUserRating(0)
    }
  }

  const submitRating = () => {
    if (selectedCourse && userRating > 0) {
      setCourses(
        courses.map((course) => {
          if (course.id === selectedCourse) {
            // Calculer la nouvelle note moyenne
            const totalRatings = course.numRatings || 0
            const currentRatingTotal = course.rating * totalRatings
            const newNumRatings = totalRatings + 1
            const newRating = ((currentRatingTotal + userRating) / newNumRatings).toFixed(1)

            return {
              ...course,
              rating: Number.parseFloat(newRating),
              numRatings: newNumRatings,
              userRating: userRating,
            }
          }
          return course
        }),
      )
    }
  }

  const addNewCourse = () => {
    if (newCourseTitle.trim() && newCourseDescription.trim()) {
      const newCourse = {
        id: courses.length + 1,
        title: newCourseTitle,
        instructor: "Vous",
        rating: 0,
        numRatings: 0,
        image: "/placeholder.svg?height=160&width=300&text=Nouveau",
        description: newCourseDescription,
        modules: [
          {
            title: "Introduction",
            duration: "10 min",
            completed: false,
          },
        ],
      }

      setCourses([...courses, newCourse])
      setNewCourseTitle("")
      setNewCourseDescription("")
    }
  }

  const startCourse = (id: number) => {
    setCourses(
      courses.map((course) => {
        if (course.id === id) {
          // Marquer le premier module comme complété
          const updatedModules = course.modules?.map((module, index) => {
            if (index === 0) {
              return { ...module, completed: true }
            }
            return module
          })

          // Calculer la progression
          const totalModules = course.modules?.length || 1
          const completedModules = updatedModules?.filter((m) => m.completed).length || 0
          const progress = Math.round((completedModules / totalModules) * 100)

          return {
            ...course,
            modules: updatedModules,
            progress: progress,
          }
        }
        return course
      }),
    )
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Cours</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-[#1e2b7a] hover:bg-[#162058]">
              <Plus className="mr-2 h-4 w-4" /> Nouvelle Cour
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Créer un nouveau cours</DialogTitle>
              <DialogDescription>
                Complétez les informations pour ajouter un nouveau cours à la plateforme.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Titre
                </Label>
                <Input
                  id="title"
                  value={newCourseTitle}
                  onChange={(e) => setNewCourseTitle(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Textarea
                  id="description"
                  value={newCourseDescription}
                  onChange={(e) => setNewCourseDescription(e.target.value)}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={addNewCourse}>Créer le cours</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="mb-6">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              All <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setFilter("all")}>Tous</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilter("nlp")}>NLP</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilter("tal")}>TAL</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <h3 className="text-lg font-medium mb-4">Quel sera votre prochain sujet d'apprentissage ?</h3>

      <div className="mb-6">
        <h4 className="text-sm text-gray-500 mb-3">Recommandé pour vous</h4>

        <div className="relative">
          <div ref={carouselRef} {...handlers} className="overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 310}px)` }}
            >
              {courses.map((course) => (
                <div key={course.id} className="w-[300px] flex-shrink-0 mr-4">
                  <Dialog>
                    <DialogTrigger asChild>
                      <div
                        className="bg-white border rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => openCourse(course.id)}
                      >
                        <div className="h-40 bg-gray-200 relative">
                          <img
                            src={course.image || "/placeholder.svg?height=160&width=300"}
                            alt={course.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                            <Play className="h-12 w-12 text-white" />
                          </div>
                        </div>
                        <div className="p-4">
                          <h3 className="font-medium">{course.title}</h3>
                          <p className="text-sm text-gray-500 mt-1">{course.instructor}</p>
                          <div className="flex items-center mt-2">
                            <span className="font-medium mr-2">{course.rating}</span>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < Math.floor(course.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-xs text-gray-500 ml-2">({course.numRatings || 0})</span>
                          </div>
                          {course.progress !== undefined && (
                            <div className="mt-2">
                              <Progress value={course.progress} className="h-1" />
                              <div className="text-xs text-gray-500 mt-1">{course.progress}% complété</div>
                            </div>
                          )}
                        </div>
                      </div>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl">
                      <DialogHeader>
                        <DialogTitle>{course.title}</DialogTitle>
                        <DialogDescription>Par {course.instructor}</DialogDescription>
                      </DialogHeader>

                      <Tabs defaultValue="overview" className="mt-4">
                        <TabsList>
                          <TabsTrigger value="overview">Aperçu</TabsTrigger>
                          <TabsTrigger value="content">Contenu</TabsTrigger>
                          <TabsTrigger value="reviews">Évaluations</TabsTrigger>
                        </TabsList>
                        <TabsContent value="overview" className="p-4">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="md:col-span-2">
                              <h3 className="text-lg font-medium mb-2">Description</h3>
                              <p>
                                {course.description ||
                                  "Ce cours vous permettra d'acquérir les compétences nécessaires dans le domaine du traitement automatique de la langue arabe."}
                              </p>

                              <h3 className="text-lg font-medium mt-4 mb-2">Ce que vous apprendrez</h3>
                              <ul className="list-disc pl-5 space-y-1">
                                <li>Comprendre les principes fondamentaux du TAL</li>
                                <li>Maîtriser les techniques d'analyse linguistique</li>
                                <li>Développer des applications pratiques</li>
                                <li>Appliquer ces connaissances à la langue arabe</li>
                              </ul>
                            </div>
                            <div className="border rounded-lg p-4">
                              <div className="mb-4">
                                <img
                                  src={course.image || "/placeholder.svg?height=160&width=300"}
                                  alt={course.title}
                                  className="w-full h-40 object-cover rounded-md"
                                />
                              </div>
                              <div className="space-y-4">
                                <div>
                                  <div className="text-lg font-bold">{course.rating}</div>
                                  <div className="flex">
                                    {[...Array(5)].map((_, i) => (
                                      <Star
                                        key={i}
                                        className={`h-4 w-4 ${
                                          i < Math.floor(course.rating)
                                            ? "text-yellow-400 fill-yellow-400"
                                            : "text-gray-300"
                                        }`}
                                      />
                                    ))}
                                    <span className="text-xs text-gray-500 ml-2">
                                      ({course.numRatings || 0} évaluations)
                                    </span>
                                  </div>
                                </div>
                                <Button className="w-full" onClick={() => startCourse(course.id)}>
                                  Commencer le cours
                                </Button>
                              </div>
                            </div>
                          </div>
                        </TabsContent>
                        <TabsContent value="content" className="p-4">
                          <div className="space-y-4">
                            <h3 className="text-lg font-medium mb-2">Modules du cours</h3>
                            <div className="space-y-2">
                              {course.modules?.map((module, index) => (
                                <div key={index} className="border rounded-lg p-3 flex justify-between items-center">
                                  <div className="flex items-center">
                                    <div
                                      className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                                        module.completed ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-600"
                                      }`}
                                    >
                                      {index + 1}
                                    </div>
                                    <div>
                                      <div className="font-medium">{module.title}</div>
                                      <div className="text-xs text-gray-500">{module.duration}</div>
                                    </div>
                                  </div>
                                  <Button variant="outline" size="sm">
                                    {module.completed ? "Revoir" : "Commencer"}
                                  </Button>
                                </div>
                              ))}
                            </div>
                          </div>
                        </TabsContent>
                        <TabsContent value="reviews" className="p-4">
                          <div className="space-y-6">
                            <div>
                              <h3 className="text-lg font-medium mb-4">Évaluez ce cours</h3>
                              <div className="flex items-center gap-2 mb-4">
                                {[1, 2, 3, 4, 5].map((rating) => (
                                  <Star
                                    key={rating}
                                    className={`h-8 w-8 cursor-pointer ${
                                      (hoverRating || userRating) >= rating
                                        ? "text-yellow-400 fill-yellow-400"
                                        : "text-gray-300"
                                    }`}
                                    onMouseEnter={() => setHoverRating(rating)}
                                    onMouseLeave={() => setHoverRating(0)}
                                    onClick={() => setUserRating(rating)}
                                  />
                                ))}
                                <span className="ml-2 text-sm">
                                  {userRating ? `Vous avez noté ce cours ${userRating}/5` : "Cliquez pour noter"}
                                </span>
                              </div>
                              <Button onClick={submitRating} disabled={userRating === 0}>
                                Soumettre l'évaluation
                              </Button>
                            </div>

                            <div>
                              <h3 className="text-lg font-medium mb-2">Commentaires des étudiants</h3>
                              <div className="space-y-4">
                                <div className="border rounded-lg p-4">
                                  <div className="flex items-center mb-2">
                                    <div className="flex">
                                      {[...Array(5)].map((_, i) => (
                                        <Star
                                          key={i}
                                          className={`h-4 w-4 ${i < 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                                        />
                                      ))}
                                    </div>
                                    <span className="ml-2 font-medium">Utilisateur A</span>
                                  </div>
                                  <p className="text-sm">
                                    Excellent cours ! J'ai beaucoup appris sur le traitement automatique de la langue
                                    arabe.
                                  </p>
                                </div>
                                <div className="border rounded-lg p-4">
                                  <div className="flex items-center mb-2">
                                    <div className="flex">
                                      {[...Array(5)].map((_, i) => (
                                        <Star
                                          key={i}
                                          className={`h-4 w-4 ${i < 5 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                                        />
                                      ))}
                                    </div>
                                    <span className="ml-2 font-medium">Utilisateur B</span>
                                  </div>
                                  <p className="text-sm">
                                    Contenu très complet et bien structuré. Je recommande vivement !
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </DialogContent>
                  </Dialog>
                </div>
              ))}
            </div>
          </div>

          {currentSlide > 0 && (
            <Button
              variant="outline"
              size="icon"
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white"
              onClick={prevSlide}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          )}

          {currentSlide < maxSlides && (
            <Button
              variant="outline"
              size="icon"
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white"
              onClick={nextSlide}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      <div className="mt-8">
        <h4 className="text-sm font-medium mb-3">Cours à l'affiche dans la catégorie Analyse de Sentiments</h4>
        {/* Vous pouvez ajouter un autre carousel ici si nécessaire */}
      </div>
    </div>
  )
}

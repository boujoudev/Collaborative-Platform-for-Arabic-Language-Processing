import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BriefcaseIcon, GraduationCap, Mail, MapPin, Phone, Globe } from "lucide-react"

export function ProfileInformation() {
  const skills = [
    "Traitement automatique de la langue arabe",
    "Apprentissage profond",
    "Analyse morphologique",
    "Python",
    "TensorFlow",
    "PyTorch",
    "NLP",
    "Linguistique computationnelle",
    "Reconnaissance de l'écriture arabe",
  ]

  const experiences = [
    {
      title: "Chercheur principal",
      organization: "Centre de recherche en TAL",
      date: "2018 - Présent",
    },
    {
      title: "Maître de conférences",
      organization: "Université de Alger",
      date: "2015 - Présent",
    },
    {
      title: "Chercheur associé",
      organization: "Institut de linguistique computationnelle",
      date: "2012 - 2015",
    },
  ]

  const education = [
    {
      title: "Doctorat en Informatique",
      organization: "Université de Paris",
      date: "2008 - 2012",
    },
    {
      title: "Master en Linguistique Computationnelle",
      organization: "Université d'Alger",
      date: "2006 - 2008",
    },
    {
      title: "Licence en Informatique",
      organization: "Université d'Alger",
      date: "2003 - 2006",
    },
  ]

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">À propos</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Chercheur spécialisé dans le traitement automatique de la langue arabe avec plus de 5 ans d'expérience. Mes
            domaines d'intérêt incluent l'analyse morphologique, la reconnaissance des dialectes maghrébins et le
            développement d'outils linguistiques pour l'arabe.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Contact</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span>aksouh.raouf@example.com</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <span>+213 555 123 456</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span>Alger, Algérie</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Globe className="h-4 w-4 text-muted-foreground" />
            <span>www.example.com</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Compétences</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-100">
                {skill}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Expérience professionnelle</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {experiences.map((exp, index) => (
            <div key={index} className="flex gap-3">
              <div className="mt-0.5">
                <div className="bg-blue-100 p-2 rounded-full">
                  <BriefcaseIcon className="h-4 w-4 text-blue-700" />
                </div>
              </div>
              <div>
                <h3 className="font-medium">{exp.title}</h3>
                <p className="text-sm text-muted-foreground">{exp.organization}</p>
                <p className="text-xs text-muted-foreground">{exp.date}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle className="text-lg">Formation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {education.map((edu, index) => (
            <div key={index} className="flex gap-3">
              <div className="mt-0.5">
                <div className="bg-blue-100 p-2 rounded-full">
                  <GraduationCap className="h-4 w-4 text-blue-700" />
                </div>
              </div>
              <div>
                <h3 className="font-medium">{edu.title}</h3>
                <p className="text-sm text-muted-foreground">{edu.organization}</p>
                <p className="text-xs text-muted-foreground">{edu.date}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

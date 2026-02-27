import geoMedia from './geoMedia.json'

export interface ProblemCase {
  id: string
  title: string
  description: string
  photo: string
}

const problemCases: ProblemCase[] = geoMedia
  .filter((entry) => entry.showInGallery && entry.photo)
  .map((entry) => ({
    id: entry.id,
    title: entry.title,
    description: entry.description,
    photo: entry.photo.startsWith('/') ? entry.photo.slice(1) : entry.photo,
  }))

export default problemCases

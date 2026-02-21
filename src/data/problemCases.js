import geoMedia from './geoMedia.json'

// Derive problem cases from geoMedia dataset so the gallery and the map
// share the same source of truth.
const problemCases = geoMedia
  .filter((entry) => entry.showInGallery && entry.photo)
  .map((entry) => ({
    id: entry.id,
    title: entry.title,
    description: entry.description,
    photo: entry.photo.startsWith('/') ? entry.photo.slice(1) : entry.photo,
  }))

export default problemCases

#!/usr/bin/env node
import { promises as fs } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import exifr from 'exifr'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const projectRoot = path.resolve(__dirname, '..')
const sourceDir = path.join(projectRoot, 'public', 'evidence-source')
const outputFile = path.join(projectRoot, 'src', 'data', 'geoMedia.json')

async function ensureSourceDir() {
  try {
    await fs.access(sourceDir)
  } catch {
    await fs.mkdir(sourceDir, { recursive: true })
  }
}

function toTitle(slug) {
  return slug
    .replace(/[-_]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

async function loadExistingEntries() {
  try {
    const raw = await fs.readFile(outputFile, 'utf-8')
    return JSON.parse(raw)
  } catch (error) {
    if (error.code === 'ENOENT') return []
    throw error
  }
}

async function main() {
  await ensureSourceDir()

  const existing = await loadExistingEntries()
  const existingMap = new Map(existing.map((entry) => [entry.id, entry]))

  const files = (await fs.readdir(sourceDir)).filter((file) => /\.(jpe?g|png)$/i.test(file))
  const newEntries = []

  for (const file of files) {
    const filePath = path.join(sourceDir, file)
    let meta
    try {
      meta = await exifr.parse(filePath, true)
    } catch (error) {
      console.warn(`⚠️  Failed to read EXIF for ${file}:`, error.message)
      continue
    }

    if (!meta || meta.latitude == null || meta.longitude == null) {
      console.warn(`⚠️  Skipping ${file}: missing latitude/longitude in EXIF.`)
      continue
    }

    const id = path.parse(file).name
    const existingEntry = existingMap.get(id) || {}

    const capturedDate = meta.DateTimeOriginal || meta.CreateDate || new Date()

    const entry = {
      id,
      title: existingEntry.title || toTitle(id),
      description: existingEntry.description || '',
      capturedAt: existingEntry.capturedAt || new Date(capturedDate).toISOString(),
      coords: {
        lat: meta.latitude,
        lng: meta.longitude,
      },
      photo: existingEntry.photo || `/evidence-source/${file}`,
      notes: existingEntry.notes || [],
    }

    newEntries.push(entry)
    existingMap.delete(id)
  }

  const merged = [...newEntries, ...existingMap.values()].sort((a, b) => {
    return new Date(b.capturedAt).getTime() - new Date(a.capturedAt).getTime()
  })

  await fs.writeFile(outputFile, JSON.stringify(merged, null, 2))
  console.log(`✅ Generated ${merged.length} entries into src/data/geoMedia.json`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})

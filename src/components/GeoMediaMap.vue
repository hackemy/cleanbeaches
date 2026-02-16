<template>
  <section class="geo-map">
    <div class="section-heading">
      <p class="eyebrow">Ground truth</p>
      <h2>Photo evidence map</h2>
      <p>Each pin represents an iPhone geo-tagged photo uploaded to the media gallery.</p>
    </div>
    <div ref="mapRef" class="map" aria-label="Geo-referenced pollution evidence map"></div>
  </section>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import L from 'leaflet'
import geoMedia from '@/data/geoMedia.json'
import 'leaflet/dist/leaflet.css'

const mapRef = ref(null)
let mapInstance

onMounted(() => {
  mapInstance = L.map(mapRef.value, {
    center: [37.9, 23.7],
    zoom: 6,
    minZoom: 5,
    maxZoom: 15,
  })

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(mapInstance)

  geoMedia.forEach((entry) => {
    const marker = L.marker([entry.coords.lat, entry.coords.lng]).addTo(mapInstance)
    const notesList = entry.notes?.length
      ? `<ul>${entry.notes.map((note) => `<li>${note}</li>`).join('')}</ul>`
      : ''
    marker.bindPopup(`
      <div class="popup">
        <strong>${entry.title}</strong><br />
        <small>${new Date(entry.capturedAt).toLocaleString()}</small>
        <p>${entry.description ?? ''}</p>
        <img src="${entry.photo}" alt="${entry.title}" />
        ${notesList}
        <p class="coords">${entry.coords.lat.toFixed(4)}, ${entry.coords.lng.toFixed(4)}</p>
      </div>
    `)
  })
})

onBeforeUnmount(() => {
  if (mapInstance) {
    mapInstance.remove()
  }
})
</script>

<style scoped>
.geo-map {
  padding: 3rem 2rem;
}

.map {
  width: 100%;
  min-height: 520px;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 20px 50px rgba(15, 23, 42, 0.12);
}

:global(.leaflet-popup-content) {
  margin: 0;
}

.popup {
  max-width: 240px;
}

.popup img {
  width: 100%;
  border-radius: 12px;
  margin: 0.5rem 0;
}

.coords {
  font-size: 0.8rem;
  color: #475569;
}
</style>

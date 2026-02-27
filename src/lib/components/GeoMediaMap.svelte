<script lang="ts">
  import { onMount, onDestroy } from 'svelte'
  import L from 'leaflet'
  import geoMedia from '$lib/data/geoMedia.json'
  import 'leaflet/dist/leaflet.css'

  let mapEl: HTMLDivElement
  let mapInstance: L.Map | undefined

  // Group entries by proximity (~0.01° ≈ 1 km)
  interface MarkerGroup {
    lat: number
    lng: number
    entries: typeof geoMedia
  }

  function groupByProximity(items: typeof geoMedia, threshold = 0.01): MarkerGroup[] {
    const groups: MarkerGroup[] = []

    for (const entry of items) {
      const existing = groups.find(
        (g) =>
          Math.abs(g.lat - entry.coords.lat) < threshold &&
          Math.abs(g.lng - entry.coords.lng) < threshold,
      )
      if (existing) {
        existing.entries.push(entry)
        // Recenter to average
        existing.lat =
          existing.entries.reduce((s, e) => s + e.coords.lat, 0) / existing.entries.length
        existing.lng =
          existing.entries.reduce((s, e) => s + e.coords.lng, 0) / existing.entries.length
      } else {
        groups.push({
          lat: entry.coords.lat,
          lng: entry.coords.lng,
          entries: [entry],
        })
      }
    }

    return groups
  }

  function createBubbleIcon(count: number): L.DivIcon {
    return L.divIcon({
      className: 'cb-marker',
      html: `<div class="cb-marker-bubble">${count}</div>`,
      iconSize: [40, 46],
      iconAnchor: [20, 46],
      popupAnchor: [0, -48],
    })
  }

  function buildPopupHtml(entries: typeof geoMedia): string {
    if (entries.length === 1) {
      const e = entries[0]
      return `
        <div class="cb-popup">
          <strong>${e.title}</strong>
          <span class="cb-popup-meta">${e.location} · ${new Date(e.capturedAt).toLocaleDateString()}</span>
          <p>${e.description ?? ''}</p>
          <img src="${e.photo}" alt="${e.title}" />
          <span class="cb-popup-coords">${e.coords.lat.toFixed(4)}, ${e.coords.lng.toFixed(4)}</span>
        </div>
      `
    }

    const cards = entries
      .map(
        (e) => `
      <div class="cb-popup-card">
        <img src="${e.photo}" alt="${e.title}" />
        <div>
          <strong>${e.title}</strong>
          <span>${e.location}</span>
        </div>
      </div>
    `,
      )
      .join('')

    return `
      <div class="cb-popup">
        <strong>${entries.length} reports from this area</strong>
        ${cards}
      </div>
    `
  }

  function locateUser() {
    if (!mapInstance) return
    mapInstance.locate({ setView: true, maxZoom: 13 })
  }

  onMount(() => {
    mapInstance = L.map(mapEl, {
      center: [37.9, 23.7],
      zoom: 7,
      minZoom: 5,
      maxZoom: 18,
      zoomControl: true,
    })

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 20,
    }).addTo(mapInstance)

    const groups = groupByProximity(geoMedia)
    const markers: L.Marker[] = []

    for (const group of groups) {
      const marker = L.marker([group.lat, group.lng], {
        icon: createBubbleIcon(group.entries.length),
      }).addTo(mapInstance)

      marker.bindPopup(buildPopupHtml(group.entries), {
        maxWidth: 300,
        className: 'cb-popup-container',
      })

      markers.push(marker)
    }

    if (markers.length > 0) {
      const featureGroup = L.featureGroup(markers)
      mapInstance.fitBounds(featureGroup.getBounds().pad(0.5))
    }

    // Location found handler
    mapInstance.on('locationfound', (e: L.LocationEvent) => {
      L.circleMarker(e.latlng, {
        radius: 8,
        color: '#0891b2',
        weight: 3,
        fillColor: '#06b6d4',
        fillOpacity: 0.4,
      }).addTo(mapInstance!)

      L.circle(e.latlng, {
        radius: e.accuracy / 2,
        color: '#06b6d4',
        weight: 1,
        fillColor: '#06b6d4',
        fillOpacity: 0.08,
      }).addTo(mapInstance!)
    })
  })

  onDestroy(() => {
    mapInstance?.remove()
  })
</script>

<div class="map-wrapper">
  <div bind:this={mapEl} class="map-container" aria-label="Pollution evidence map"></div>

  <!-- Locate button -->
  <button class="locate-btn" onclick={locateUser} aria-label="Find my location" title="Find my location">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
    </svg>
  </button>
</div>

<style>
  .map-wrapper {
    position: relative;
    width: 100%;
    height: calc(100vh - 116px);
  }

  .map-container {
    width: 100%;
    height: 100%;
  }

  .locate-btn {
    position: absolute;
    top: 94px;
    left: 10px;
    z-index: 1000;
    width: 34px;
    height: 34px;
    background: white;
    border: 2px solid rgba(0, 0, 0, 0.2);
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #333;
    padding: 0;
    transition: background 0.15s;
  }
  .locate-btn:hover {
    background: #f0f0f0;
  }

  /* ── Bubble markers ── */
  :global(.cb-marker) {
    background: none !important;
    border: none !important;
  }
  :global(.cb-marker-bubble) {
    background: white;
    color: #0f172a;
    font-weight: 700;
    font-size: 14px;
    min-width: 32px;
    padding: 4px 10px;
    border-radius: 999px;
    text-align: center;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.22), 0 0 0 1px rgba(0, 0, 0, 0.06);
    position: relative;
    white-space: nowrap;
    line-height: 1.3;
    transition: transform 0.15s ease, box-shadow 0.15s ease;
  }
  :global(.cb-marker-bubble::after) {
    content: '';
    position: absolute;
    bottom: -6px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 7px solid white;
    filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.12));
  }
  :global(.cb-marker:hover .cb-marker-bubble) {
    transform: scale(1.1);
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.28), 0 0 0 1px rgba(0, 0, 0, 0.08);
    background: #0f172a;
    color: white;
  }
  :global(.cb-marker:hover .cb-marker-bubble::after) {
    border-top-color: #0f172a;
  }

  /* ── Popup styling ── */
  :global(.cb-popup-container .leaflet-popup-content-wrapper) {
    border-radius: 16px;
    padding: 0;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
    overflow: hidden;
  }
  :global(.cb-popup-container .leaflet-popup-content) {
    margin: 0;
    width: 280px !important;
  }
  :global(.cb-popup-container .leaflet-popup-tip) {
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
  }
  :global(.cb-popup) {
    padding: 16px;
    font-family: inherit;
    line-height: 1.5;
  }
  :global(.cb-popup strong) {
    display: block;
    font-size: 15px;
    color: #0f172a;
    margin-bottom: 2px;
  }
  :global(.cb-popup-meta) {
    display: block;
    font-size: 12px;
    color: #64748b;
    margin-bottom: 8px;
  }
  :global(.cb-popup p) {
    font-size: 13px;
    color: #475569;
    margin: 0 0 10px;
  }
  :global(.cb-popup img) {
    width: 100%;
    border-radius: 10px;
    margin-bottom: 8px;
    display: block;
  }
  :global(.cb-popup-coords) {
    font-size: 11px;
    color: #94a3b8;
    font-family: monospace;
  }
  :global(.cb-popup-card) {
    display: flex;
    gap: 10px;
    padding: 8px 0;
    border-top: 1px solid #f1f5f9;
    align-items: center;
  }
  :global(.cb-popup-card img) {
    width: 56px;
    height: 42px;
    border-radius: 6px;
    object-fit: cover;
    margin: 0;
    flex-shrink: 0;
  }
  :global(.cb-popup-card strong) {
    font-size: 13px;
    margin: 0;
  }
  :global(.cb-popup-card span) {
    font-size: 11px;
    color: #64748b;
  }
</style>

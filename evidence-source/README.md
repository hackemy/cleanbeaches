# Evidence Source Folder

Drop original, EXIF-intact photos in this directory (committed to `main`). When you run `npm run sync:evidence`, the
script will parse each file, extract GPS + timestamp metadata, and rebuild `src/data/geoMedia.json` so the evidence map
updates automatically.

// Usage: put originals in photos-original/<Category>/<file>.jpg, or directly in photos-original/, then run: npm run photos
// Creates 480/960/1600px WebP files in public/photos and rewrites the gallery manifest.
import sharp from 'sharp'
import fs from 'node:fs'
import path from 'node:path'

const SRC = 'photos-original'
const OUT = 'public/photos'
const MANIFEST = 'src/demos/photographer/photos.json'
const SIZES = [480, 960, 1600]
const EXT = /\.(jpe?g|png|webp|tiff?)$/i
const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
const pretty = (s) => s.replace(/[-_]+/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())

fs.rmSync(OUT, { recursive: true, force: true })
fs.mkdirSync(OUT, { recursive: true })
const manifest = []
const entries = fs.readdirSync(SRC, { withFileTypes: true })
const groups = entries.filter((entry) => entry.isDirectory()).map((entry) => ({
  id: slug(entry.name),
  name: entry.name,
  directory: path.join(SRC, entry.name),
  files: fs.readdirSync(path.join(SRC, entry.name)).filter((file) => EXT.test(file)).sort(),
}))
const rootFiles = entries.filter((entry) => entry.isFile() && EXT.test(entry.name)).map((entry) => entry.name).sort()
if (rootFiles.length) groups.unshift({ id: 'root', name: 'Portfolio', directory: SRC, files: rootFiles })

for (const group of groups) {
  for (const file of group.files) {
    const id = `${group.id}-${slug(path.parse(file).name)}`
    const input = sharp(path.join(group.directory, file)).rotate() // apply EXIF orientation; metadata (GPS etc.) is dropped on output
    const { width, height } = await input.clone().toBuffer({ resolveWithObject: true }).then((r) => r.info)
    for (const w of SIZES) {
      await input.clone().resize({ width: w, withoutEnlargement: true }).webp({ quality: 78 }).toFile(path.join(OUT, `${id}-${w}.webp`))
    }
    const tiny = await input.clone().resize({ width: 20 }).webp({ quality: 40 }).toBuffer()
    manifest.push({ id, title: pretty(path.parse(file).name), category: pretty(group.name), w: width, h: height, lqip: `data:image/webp;base64,${tiny.toString('base64')}` })
    console.log('done', id)
  }
}
fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2))
console.log(`\n${manifest.length} photos processed.`)

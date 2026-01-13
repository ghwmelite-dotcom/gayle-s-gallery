import sharp from 'sharp'
import crypto from 'crypto'

interface WatermarkOptions {
  opacity?: number
  fontSize?: number
  text?: string
}

interface ProcessedImages {
  original: Buffer
  watermarked: Buffer
  thumbnail: Buffer
  hash: string
  width: number
  height: number
  fileSize: number
  mimeType: string
}

/**
 * Creates a watermark overlay with tiled text
 */
async function createWatermarkOverlay(
  width: number,
  height: number,
  options: WatermarkOptions = {}
): Promise<Buffer> {
  const {
    opacity = 0.15,
    fontSize = Math.max(16, Math.min(width, height) * 0.03),
    text = "Gayle's Gallery",
  } = options

  // Calculate spacing based on image size
  const spacing = fontSize * 6
  const rows = Math.ceil(height / spacing) + 2
  const cols = Math.ceil(width / spacing) + 2

  // Create SVG watermark pattern
  let svgText = ''
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x = col * spacing + (row % 2 === 0 ? 0 : spacing / 2) - spacing / 2
      const y = row * spacing
      svgText += `<text x="${x}" y="${y}" transform="rotate(-30, ${x}, ${y})">${text}</text>`
    }
  }

  const svgOverlay = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <style>
        text {
          font-family: Georgia, serif;
          font-size: ${fontSize}px;
          fill: rgba(0, 0, 0, ${opacity});
          font-weight: 500;
        }
      </style>
      ${svgText}
    </svg>
  `

  return Buffer.from(svgOverlay)
}

/**
 * Applies watermark to an image buffer
 */
export async function applyWatermark(
  imageBuffer: Buffer,
  options: WatermarkOptions = {}
): Promise<Buffer> {
  const image = sharp(imageBuffer)
  const metadata = await image.metadata()
  const { width = 1000, height = 1000 } = metadata

  // Create watermark overlay
  const watermarkOverlay = await createWatermarkOverlay(width, height, options)

  // Composite watermark onto image
  return image
    .composite([
      {
        input: watermarkOverlay,
        blend: 'over',
      },
    ])
    .jpeg({ quality: 85, mozjpeg: true })
    .toBuffer()
}

/**
 * Processes an uploaded image and creates all required versions
 */
export async function processUploadedImage(
  buffer: Buffer,
  artworkId: string
): Promise<ProcessedImages> {
  // Calculate hash of original
  const hash = crypto.createHash('sha256').update(buffer).digest('hex')

  // Get metadata
  const metadata = await sharp(buffer).metadata()
  const width = metadata.width || 1000
  const height = metadata.height || 1000

  // Process all versions in parallel
  const [original, watermarked, thumbnail] = await Promise.all([
    // Original: optimize but keep full resolution
    sharp(buffer)
      .jpeg({ quality: 95, mozjpeg: true })
      .toBuffer(),

    // Watermarked: resize to max 2000px and add watermark
    sharp(buffer)
      .resize(2000, 2000, { fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: 85, mozjpeg: true })
      .toBuffer()
      .then((buf) => applyWatermark(buf)),

    // Thumbnail: small preview for grid
    sharp(buffer)
      .resize(400, 500, { fit: 'cover' })
      .webp({ quality: 80 })
      .toBuffer(),
  ])

  return {
    original,
    watermarked,
    thumbnail,
    hash,
    width,
    height,
    fileSize: buffer.length,
    mimeType: `image/${metadata.format || 'jpeg'}`,
  }
}

/**
 * Validates an image file
 */
export function validateImageFile(file: { type: string; size: number }): { valid: boolean; error?: string } {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']
  const maxSize = 50 * 1024 * 1024 // 50MB

  if (!allowedTypes.includes(file.type)) {
    return { valid: false, error: 'Invalid file type. Please upload a JPEG, PNG, or WebP image.' }
  }

  if (file.size > maxSize) {
    return { valid: false, error: 'File too large. Maximum size is 50MB.' }
  }

  return { valid: true }
}

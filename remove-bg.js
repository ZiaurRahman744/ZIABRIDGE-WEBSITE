/**
 * White Background Remover for PNG
 * Removes white/near-white background pixels and makes them transparent.
 * Pure Node.js - no external dependencies needed.
 */

const fs = require('fs');
const zlib = require('zlib');
const path = require('path');

const INPUT_PATH  = 'assets/images/logo/logo-website.png';
const OUTPUT_PATH = 'assets/images/logo/logo-website.png'; // overwrite in-place
const BACKUP_PATH = 'assets/images/logo/logo-website-backup.png';

// --- PNG Parser ---
function readUint32BE(buf, offset) {
  return ((buf[offset] << 24) | (buf[offset+1] << 16) | (buf[offset+2] << 8) | buf[offset+3]) >>> 0;
}
function writeUint32BE(buf, offset, val) {
  buf[offset]   = (val >>> 24) & 0xff;
  buf[offset+1] = (val >>> 16) & 0xff;
  buf[offset+2] = (val >>> 8)  & 0xff;
  buf[offset+3] =  val         & 0xff;
}

function crc32(buf) {
  const table = crc32.table || (() => {
    const t = new Uint32Array(256);
    for (let i = 0; i < 256; i++) {
      let c = i;
      for (let j = 0; j < 8; j++) c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
      t[i] = c;
    }
    return (crc32.table = t);
  })();
  let crc = 0xFFFFFFFF;
  for (let i = 0; i < buf.length; i++) crc = table[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
  return (crc ^ 0xFFFFFFFF) >>> 0;
}

function parsePNG(buf) {
  // Signature: 8 bytes
  let offset = 8;
  const chunks = [];
  while (offset < buf.length) {
    const length = readUint32BE(buf, offset);
    const type   = buf.slice(offset+4, offset+8).toString('ascii');
    const data   = buf.slice(offset+8, offset+8+length);
    const crc    = readUint32BE(buf, offset+8+length);
    chunks.push({ type, data, crc });
    offset += 12 + length;
  }
  return chunks;
}

function buildPNG(chunks) {
  const sig = Buffer.from([137,80,78,71,13,10,26,10]);
  const parts = [sig];
  for (const c of chunks) {
    const lenBuf = Buffer.alloc(4);
    const typeBuf = Buffer.from(c.type, 'ascii');
    writeUint32BE(lenBuf, 0, c.data.length);
    const crcInput = Buffer.concat([typeBuf, c.data]);
    const crcVal = crc32(crcInput);
    const crcBuf = Buffer.alloc(4);
    writeUint32BE(crcBuf, 0, crcVal);
    parts.push(lenBuf, typeBuf, c.data, crcBuf);
  }
  return Buffer.concat(parts);
}

function parseIHDR(data) {
  return {
    width:      readUint32BE(data, 0),
    height:     readUint32BE(data, 4),
    bitDepth:   data[8],
    colorType:  data[9],
    // colorType: 2=RGB, 6=RGBA, 3=indexed, 0=grayscale, 4=grayscale+alpha
  };
}

function buildIHDR(ihdr) {
  const buf = Buffer.alloc(13);
  writeUint32BE(buf, 0, ihdr.width);
  writeUint32BE(buf, 4, ihdr.height);
  buf[8] = ihdr.bitDepth;
  buf[9] = ihdr.colorType; // will set to 6 (RGBA)
  buf[10] = 0; buf[11] = 0; buf[12] = 0;
  return buf;
}

// Paeth predictor for PNG filtering
function paethPredictor(a, b, c) {
  const p = a + b - c;
  const pa = Math.abs(p - a);
  const pb = Math.abs(p - b);
  const pc = Math.abs(p - c);
  if (pa <= pb && pa <= pc) return a;
  if (pb <= pc) return b;
  return c;
}

function defilter(scanlines, width, channels, bpp) {
  const result = [];
  let prev = null;
  for (const sl of scanlines) {
    const filter = sl[0];
    const raw    = sl.slice(1);
    const out    = Buffer.alloc(raw.length);
    for (let i = 0; i < raw.length; i++) {
      const x    = raw[i];
      const a    = i >= bpp ? out[i - bpp] : 0;
      const b    = prev    ? prev[i]        : 0;
      const c    = (prev && i >= bpp) ? prev[i - bpp] : 0;
      switch (filter) {
        case 0: out[i] = x; break;
        case 1: out[i] = (x + a) & 0xff; break;
        case 2: out[i] = (x + b) & 0xff; break;
        case 3: out[i] = (x + Math.floor((a + b) / 2)) & 0xff; break;
        case 4: out[i] = (x + paethPredictor(a, b, c)) & 0xff; break;
        default: throw new Error(`Unknown filter type: ${filter}`);
      }
    }
    result.push(out);
    prev = out;
  }
  return result;
}

function refilter(rows) {
  // Use filter 0 (None) for simplicity
  return rows.map(r => Buffer.concat([Buffer.from([0]), r]));
}

function main() {
  // Backup original
  fs.copyFileSync(INPUT_PATH, BACKUP_PATH);
  console.log('✅ Backup created:', BACKUP_PATH);

  const buf = fs.readFileSync(INPUT_PATH);
  const chunks = parsePNG(buf);

  const ihdrChunk = chunks.find(c => c.type === 'IHDR');
  const ihdr = parseIHDR(ihdrChunk.data);
  console.log(`📐 Image: ${ihdr.width}x${ihdr.height}, bitDepth=${ihdr.bitDepth}, colorType=${ihdr.colorType}`);

  if (ihdr.bitDepth !== 8) {
    console.error('❌ Only 8-bit PNG supported. BitDepth:', ihdr.bitDepth);
    process.exit(1);
  }
  if (ihdr.colorType === 3) {
    console.error('❌ Indexed (palette) PNG not supported by this script. Use an image editor.');
    process.exit(1);
  }

  // Collect IDAT chunks and decompress
  const idatData = Buffer.concat(chunks.filter(c => c.type === 'IDAT').map(c => c.data));
  const rawData  = zlib.inflateSync(idatData);

  const srcChannels = [0,4].includes(ihdr.colorType) ? 1 :
                      ihdr.colorType === 2 ? 3 :
                      ihdr.colorType === 6 ? 4 : 3;
  const bpp         = srcChannels; // bytes per pixel (8-bit)
  const rowBytes    = ihdr.width * srcChannels;
  const stride      = rowBytes + 1; // +1 for filter byte

  // Split into scanlines
  const rawScanlines = [];
  for (let y = 0; y < ihdr.height; y++) {
    rawScanlines.push(rawData.slice(y * stride, y * stride + stride));
  }

  // Defilter
  const rows = defilter(rawScanlines, ihdr.width, srcChannels, bpp);

  // WHITE BACKGROUND REMOVAL PARAMETERS
  const THRESHOLD     = 235;  // pixels with R,G,B all >= this are considered "white/near-white"
  const TOLERANCE     = 20;   // edge feathering: partial alpha for near-threshold pixels
  const EDGE_EXPAND   = 1;    // also remove pixels adjacent to transparent ones (erosion)

  // Build RGBA pixel array
  const pixels = [];
  for (let y = 0; y < ihdr.height; y++) {
    const row = rows[y];
    for (let x = 0; x < ihdr.width; x++) {
      if (srcChannels === 4) {
        pixels.push({ r: row[x*4], g: row[x*4+1], b: row[x*4+2], a: row[x*4+3] });
      } else if (srcChannels === 3) {
        pixels.push({ r: row[x*3], g: row[x*3+1], b: row[x*3+2], a: 255 });
      } else {
        const v = row[x];
        pixels.push({ r: v, g: v, b: v, a: 255 });
      }
    }
  }

  // Pass 1: Mark pure white/near-white pixels as transparent
  for (let i = 0; i < pixels.length; i++) {
    const p = pixels[i];
    const minRGB = Math.min(p.r, p.g, p.b);
    if (minRGB >= THRESHOLD) {
      // Fully remove
      p.a = 0;
    } else if (minRGB >= THRESHOLD - TOLERANCE) {
      // Partial alpha (feathering at edges)
      const ratio = (minRGB - (THRESHOLD - TOLERANCE)) / TOLERANCE;
      p.a = Math.round(p.a * (1 - ratio));
    }
  }

  // Pass 2: Edge erosion — remove near-transparent border pixels that look like halos
  const W = ihdr.width;
  const H = ihdr.height;
  const HALO_THRESHOLD = 30; // if alpha < this, neighbours get reduced too
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const idx = y * W + x;
      if (pixels[idx].a < HALO_THRESHOLD) {
        // Reduce adjacent pixels slightly (anti-halo)
        const neighbors = [
          [x-1,y],[x+1,y],[x,y-1],[x,y+1]
        ];
        for (const [nx,ny] of neighbors) {
          if (nx>=0 && nx<W && ny>=0 && ny<H) {
            const ni = ny * W + nx;
            const np = pixels[ni];
            const minRGB = Math.min(np.r, np.g, np.b);
            if (minRGB > 180) {
              np.a = Math.round(np.a * 0.4);
            }
          }
        }
      }
    }
  }

  // Build new RGBA rows
  const newRows = [];
  for (let y = 0; y < H; y++) {
    const row = Buffer.alloc(W * 4);
    for (let x = 0; x < W; x++) {
      const p = pixels[y * W + x];
      row[x*4]   = p.r;
      row[x*4+1] = p.g;
      row[x*4+2] = p.b;
      row[x*4+3] = p.a;
    }
    newRows.push(row);
  }

  // Refilter (apply filter 0 = None)
  const filteredRows = refilter(newRows);
  const rawOut = Buffer.concat(filteredRows);

  // Compress
  const compressed = zlib.deflateSync(rawOut, { level: 9 });

  // Build new IHDR (colorType 6 = RGBA)
  const newIHDR = Object.assign({}, ihdr, { colorType: 6 });
  const newIHDRData = buildIHDR(newIHDR);

  // Build new chunk list
  const newChunks = [
    { type: 'IHDR', data: newIHDRData },
    { type: 'IDAT', data: compressed },
    { type: 'IEND', data: Buffer.alloc(0) },
  ];

  const outBuf = buildPNG(newChunks);
  fs.writeFileSync(OUTPUT_PATH, outBuf);
  console.log(`✅ Done! Saved to: ${OUTPUT_PATH} (${outBuf.length} bytes)`);
  console.log('   White background removed. Logo is now transparent PNG.');
}

main();

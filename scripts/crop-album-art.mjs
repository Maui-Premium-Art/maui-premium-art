import sharp from "sharp";
import { mkdir } from "fs/promises";
import path from "path";

const INPUT_DIR = "public/images/tailgate-art";
const OUTPUT_DIR = "public/images/album-art";
const SIZE = 300;
const QUALITY = 82;

const IMAGES = [
  { src: "mahalo-bird_tailgate.jpg",          out: "mahalo-bird.webp" },
  { src: "aloha_tailgate.webp",               out: "aloha.webp" },
  { src: "eyes-of-the-world_tailgate.jpg",    out: "eyes-of-the-world.webp" },
  { src: "heart_tailgate.jpg",                out: "heart.webp",            position: "center" },
  { src: "humming-bird_tailgate.jpg",         out: "humming-bird.webp" },
  { src: "lovers_tailgate.jpg",               out: "lovers.webp" },
  { src: "music_tailgate.jpg",                out: "music.webp" },
  { src: "pono_tailgate.jpg",                 out: "pono.webp",             position: "center" },
  { src: "sunset_tailgate.jpg",               out: "sunset.webp" },
];

await mkdir(OUTPUT_DIR, { recursive: true });

for (const img of IMAGES) {
  const input = path.join(INPUT_DIR, img.src);
  const output = path.join(OUTPUT_DIR, img.out);
  await sharp(input)
    .resize(SIZE, SIZE, { fit: "cover", position: img.position || "attention" })
    .webp({ quality: QUALITY })
    .toFile(output);
  console.log(`✅ ${img.src} → ${img.out} (${img.position || "attention"})`);
}

console.log("\nDone. Review all 9 crops visually before committing.");

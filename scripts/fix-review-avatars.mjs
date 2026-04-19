/**
 * Пересохраняет аватары отзывов в 256×256 без искажения пропорций:
 * масштабирование с обрезкой (fit: cover), позиция centre.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const files = ["olga.jpg", "aleksey.jpg", "maria.jpg"];

for (const name of files) {
  const inputPath = path.join(root, "public", "reviews", name);
  if (!fs.existsSync(inputPath)) {
    console.error("Не найден файл:", inputPath);
    process.exit(1);
  }

  const tempPath = path.join(root, "public", "reviews", `${name}.tmp.jpg`);

  await sharp(inputPath)
    .resize(256, 256, { fit: "cover", position: "centre" })
    .jpeg({ quality: 92 })
    .toFile(tempPath);

  fs.unlinkSync(inputPath);
  fs.renameSync(tempPath, inputPath);

  const meta = await sharp(inputPath).metadata();
  console.log(`${name}: ${meta.width}x${meta.height} (format: ${meta.format})`);
}

console.log("Готово: все файлы обработаны через fit: cover + centre.");

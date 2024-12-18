import fs from "fs";
import path from "path";
import { exec } from "child_process";
import fetch from "node-fetch";

// Supported image formats
const validExtensions = [".png", ".jpg", ".jpeg", ".gif", ".webp", ".avif"];
const openAIApiKey = process.env.OPENAI_API;

/**
 * Executes a shell command and returns a promise
 * @param {string} command
 * @returns {Promise<string>}
 */
function execShellCommand(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(stderr || error.message);
      } else {
        resolve(stdout.trim());
      }
    });
  });
}

/**
 * Recursively find all valid images in a directory
 * @param {string} dirPath
 * @returns {string[]}
 */
function findImagesRecursively(dirPath) {
  let results = [];
  const files = fs.readdirSync(dirPath);
  for (const file of files) {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      results = results.concat(findImagesRecursively(fullPath));
    } else if (validExtensions.includes(path.extname(file).toLowerCase())) {
      results.push(fullPath);
    }
  }
  return results;
}

/**
 * Normalize paths to ensure consistent formatting
 * @param {string} relativePath
 * @returns {string}
 */
function normalizePath(relativePath) {
  let path = relativePath + "/";
  if (path === "/") return "";

  return path;
}

/**
 * Generates an alt tag for the image using OpenAI
 * @param {string} imagePath
 * @returns {Promise<string>}
 */

async function generateAltTag(imagePath) {
  if (!openAIApiKey) return null;

  console.log(imagePath);

  const imageBase64 = getImageAsBase64(imagePath);
  if (!imageBase64) return null;

  const body = {
    messages: [
      {
        role: "developer",
        content: `Generate a descriptive alt text for the image encoded in Base64: ${imageBase64}. The text should not include "the image, this image, etc.", and should be as concise as possible.`,
      },
    ],
    model: "gpt-4o-mini",
    max_tokens: 250,
  };

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${openAIApiKey}`,
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    console.log(data.choices[0].message.content);
    if (data.choices?.[0]?.message?.content) {
      return data.choices[0].message.content;
    }

    return null;
  } catch (error) {
    console.error("Failed to generate alt tag:", error);
    return null;
  }
}

function getImageAsBase64(imagePath) {
  try {
    const imageBuffer = fs.readFileSync(imagePath);
    return imageBuffer.toString("base64");
  } catch (error) {
    console.error("Failed to read and encode image:", error);
    return null;
  }
}

/**
 * Process an image: resize, convert to WebP, and generate metadata
 * @param {string} imagePath
 * @param {string} inputDir
 * @param {string} outputDir
 * @param {number|null} maxWidth
 * @returns {Promise<object>} Image metadata
 */
async function processImage(imagePath, inputDir, outputDir, maxWidth = null) {
  const ext = path.extname(imagePath);
  let baseName = path.basename(imagePath, ext);
  const relativePath = path.relative(inputDir, path.dirname(imagePath));
  const normalizedRelativePath = normalizePath(relativePath);

  const isRetina = baseName.includes("@2x");
  if (isRetina) {
    baseName = baseName.replace("@2x", "");
  }

  const outputBasePath = path.join(outputDir, normalizedRelativePath, baseName);
  const outputPublicPath = `/images/${normalizedRelativePath}${baseName}`;

  if (!fs.existsSync(path.join(outputDir, relativePath))) {
    fs.mkdirSync(path.join(outputDir, relativePath), { recursive: true });
  }

  // Get original image size
  const identifyCommand = `identify -format "%wx%h" "${imagePath}"`;
  const originalSize = await execShellCommand(identifyCommand);
  let [width, height] = originalSize.split("x").map(Number);

  if (maxWidth && width > maxWidth) {
    const scaleFactor = maxWidth / width;
    width = maxWidth;
    height = Math.ceil(height * scaleFactor);
  }

  const metadata = {
    name: baseName,
    path: `${outputPublicPath}_original${ext}`,
    width,
    height,
    alt: null,
    srcset: [],
  };

  // Resize 2x version
  const scaledPath2x = `${outputBasePath}@2x${ext}`;
  await execShellCommand(
    `convert "${imagePath}" -resize ${width}x${height}! "${scaledPath2x}"`
  );
  metadata.srcset.push({
    scale: "2x",
    format: ext.slice(1),
    path: `/images/${normalizedRelativePath}${baseName}@2x${ext}`,
    width,
    height,
  });

  // Resize 1x version
  const scaledWidth1x = Math.ceil(width / 2);
  const scaledHeight1x = Math.ceil(height / 2);
  const scaledPath1x = `${outputBasePath}${ext}`;
  await execShellCommand(
    `convert "${scaledPath2x}" -resize ${scaledWidth1x}x${scaledHeight1x}! "${scaledPath1x}"`
  );
  metadata.srcset.push({
    scale: "1x",
    format: ext.slice(1),
    path: `/images/${normalizedRelativePath}${baseName}${ext}`,
    width: scaledWidth1x,
    height: scaledHeight1x,
  });

  // Add WebP versions to srcset
  if (ext.toLowerCase() !== ".webp") {
    const webpPath2x = `${outputBasePath}@2x.webp`;
    await execShellCommand(`convert "${scaledPath2x}" "${webpPath2x}"`);
    metadata.srcset.push({
      scale: "2x",
      format: "webp",
      path: `/images/${normalizedRelativePath}${baseName}@2x.webp`,
      width,
      height,
    });

    const webpPath1x = `${outputBasePath}.webp`;
    await execShellCommand(`convert "${scaledPath1x}" "${webpPath1x}"`);
    metadata.srcset.push({
      scale: "1x",
      format: "webp",
      path: `/images/${normalizedRelativePath}${baseName}.webp`,
      width: scaledWidth1x,
      height: scaledHeight1x,
    });

    metadata.alt = await generateAltTag(scaledPath1x);
  }

  return metadata;
}

/**
 * Main function to process all images
 * @param {string} inputDir
 * @param {string} outputDir
 * @param {number|null} maxWidth
 */
async function processImages(inputDir, outputDir, maxWidth = null) {
  const images = findImagesRecursively(inputDir);
  const results = {};

  const metaDir = "../app/content";

  for (const image of images) {
    console.log(`Processing: ${image}`);
    try {
      const metadata = await processImage(image, inputDir, outputDir, maxWidth);
      results[metadata.name] = metadata;
    } catch (error) {
      console.error(`Failed to process ${image}:`, error);
    }
  }

  // Write JSON schema to output directory
  const jsonPath = path.join(metaDir, "images_metadata.json");
  fs.writeFileSync(jsonPath, JSON.stringify(results, null, 2));
  console.log(`Metadata written to ${jsonPath}`);
}

// CLI interface
const args = process.argv.slice(2);
if (args.length < 2) {
  console.error(
    "Usage: node process-images.js <inputDir> <outputDir> [maxWidth]"
  );
  process.exit(1);
}

const [inputDir, outputDir, maxWidthArg] = args;
const maxWidth = maxWidthArg ? parseInt(maxWidthArg, 10) : null;
processImages(inputDir, outputDir, maxWidth).catch((err) => console.error(err));

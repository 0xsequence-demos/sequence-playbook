#!/usr/bin/env node

import { Command } from "commander";
import { codeToHtml } from "shiki";
import fs from "fs";
import path from "path";
const program = new Command();

program
  .version("1.0.0")
  .description("A CLI tool to compile code snippets into React components")
  .option("-i, --input <path>", "Input directory path containing code snippets")

  .parse(process.argv);

const options = program.opts();

if (!options.input) {
  console.error("Please specify input directory with -i <dir>");
  process.exit(1);
}

// Helper function to generate a component file from a code snippet
async function generateComponentFromFile(
  outputDir,
  componentName,
  originalCode,
  ext
) {
  // Highlighted code snippet
  let highlightedCode = await codeToHtml(originalCode, {
    lang: "jsx",
    theme: "laserwave",
  });

  highlightedCode = JSON.stringify(highlightedCode);

  const reactComponent = `
    export function snippet(){
      return <div dangerouslySetInnerHTML={{ __html: ${highlightedCode} }}></div>
    }
  `;
  // Write the component file
  fs.writeFileSync(
    path.join(outputDir, `${componentName}Snippet.tsx`),
    reactComponent
  );

  // Write plaintext version
  fs.writeFileSync(
    path.join(outputDir, `${componentName}String.tsx`),
    `export const codeString = ${JSON.stringify(originalCode)}`
  );

  // Write index
  fs.writeFileSync(
    path.join(outputDir, `index.tsx`),
    `
    import { snippet } from './${componentName}Snippet';
    import { codeString } from './${componentName}String';
    ${
      ext === "tsx"
        ? `import { ${componentName} as example } from './${componentName}';`
        : ""
    }

    export const ${componentName} = Object.assign(${
      ext === "tsx" ? "example" : "{}"
    }, { Snippet:snippet, String:codeString });
  `
  );
}

// Helper function to recursively find matching files
function findFiles(dir, pattern) {
  let results = [];
  const list = fs.readdirSync(dir);

  list.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat && stat.isDirectory()) {
      results = results.concat(findFiles(filePath, pattern));
    } else if (pattern.test(file)) {
      results.push(filePath);
    }
  });

  return results;
}

// Main function to process all matching files
async function compileDirectoryToReactComponents(inputDir, outputDir) {
  // Find all files matching "*-example.tsx" recursively
  const files = [
    ...findFiles(inputDir, /-example\.tsx$/),
    ...findFiles(inputDir, /-example\.txt$/),
  ];

  for (const file of files) {
    const originalCode = fs.readFileSync(file, "utf-8");

    const ext = path.basename(file).split(".").pop();

    const baseName = path.basename(file, `-example.${ext}`); // remove "-example" suffix
    const componentName = baseName.charAt(0).toUpperCase() + baseName.slice(1);

    // Set up output path mirroring input directory structure
    const outputComponentDir = path.join("app", "examples", baseName);
    if (!fs.existsSync(outputComponentDir)) {
      fs.mkdirSync(outputComponentDir, { recursive: true });
    }

    // Copy the original file to the output directory
    if (ext === "tsx") {
      const outputOriginalFilePath = path.join(
        outputComponentDir,
        `${baseName}.tsx`
      );
      fs.copyFileSync(file, outputOriginalFilePath);
    }

    // Generate the React component file
    await generateComponentFromFile(
      outputComponentDir,
      componentName,
      originalCode,
      ext
    );
  }
}

// Run the main function with the provided options
const inputDir = options.input;

compileDirectoryToReactComponents(inputDir).catch((err) => {
  console.error(err);
  process.exit(1);
});

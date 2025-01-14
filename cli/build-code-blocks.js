#!/usr/bin/env node

import { Command } from "commander";
import { createHighlighter } from "shiki";
import {
  codeToKeyedTokens,
  createMagicMoveMachine,
} from "shiki-magic-move/core";
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

function adjustTabIndent(lines) {
  // Split the code block into an array of lines

  // Determine the number of leading spaces in the first line
  const firstLineIndent = lines[0].match(/^ */)[0].length;

  // If the first line already has no spaces, return the original code block
  if (firstLineIndent === 0) {
    return lines;
  }

  // Remove the leading spaces from each line based on first line's indent
  const adjustedLines = lines.map((line) => {
    return line.startsWith(" ".repeat(firstLineIndent))
      ? line.slice(firstLineIndent)
      : line;
  });

  // Join the lines back into a single string

  return adjustedLines.filter((string) => (string.length < 1 ? false : true));
}

// Helper function to generate a component file from a code snippet
async function generateComponentFromFile(
  outputDir,
  componentName,
  originalCode,
  ext,
) {
  // Highlighted code snippet
  let shiki = await createHighlighter({
    langs: ["jsx"],
    themes: ["laserwave"],
  });

  const minimum = generateMinimalCode(originalCode);
  const full = removeDirectiveComments(originalCode);

  const codeSteps = [minimum];

  if (minimum !== full) {
    codeSteps.push(full);
  }

  const machine = createMagicMoveMachine((code) =>
    codeToKeyedTokens(
      shiki,
      code,
      {
        lang: "jsx",
        theme: "laserwave",
      },
      {},
    ),
  );

  const compiledSteps = codeSteps.map((code) => machine.commit(code).current);

  const snippet = `import type {
      KeyedTokensInfo,
    } from "shiki-magic-move/types";

    export const steps = ${JSON.stringify(compiledSteps)} as KeyedTokensInfo[]`;

  // Write the component file
  fs.writeFileSync(
    path.join(outputDir, `${componentName}Snippet.tsx`),
    snippet,
  );

  // Write plaintext version
  fs.writeFileSync(
    path.join(outputDir, `${componentName}String.tsx`),
    `export const codeString = ${JSON.stringify(full)}`,
  );

  // Write index
  fs.writeFileSync(
    path.join(outputDir, `index.tsx`),
    `
    import { steps } from './${componentName}Snippet';
    import { codeString } from './${componentName}String';
    ${
      ext === "tsx"
        ? `import { ${componentName} as example } from './${componentName}';`
        : ""
    }

    export const ${componentName} = Object.assign(${
      ext === "tsx" ? "example" : "{}"
    }, {  steps, String:codeString });
  `,
  );
}

function removeDirectiveComments(originalCode) {
  const lines = originalCode.split("\n");

  const result = lines.filter((line) => {
    const textContent = line || "";

    const isStart = textContent.includes("starthide");
    const isEnd = textContent.includes("endhide");

    if (isStart || isEnd) {
      return false;
    }

    return line;
  });

  return adjustTabIndent(result).join("\n");
}

function generateMinimalCode(originalCode) {
  const lines = originalCode.split("\n");

  let isHidden = false;
  let index = 0;
  const result = lines
    .map((line) => {
      const isStart = line.includes("starthide");
      const isEnd = line.includes("endhide");

      if (isStart) {
        index = 0;
        isHidden = true;
        return false;
      }

      if (isEnd) {
        isHidden = false;
        return false;
        // return `/* ${index} hidden lines */`;
      }

      if (isHidden) {
        index++;
        return false;
      }

      return line;
    })
    .filter(Boolean);
  return adjustTabIndent(result).join("\n");
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
        `${baseName}.tsx`,
      );
      fs.copyFileSync(file, outputOriginalFilePath);
    }

    // Generate the React component file
    await generateComponentFromFile(
      outputComponentDir,
      componentName,
      originalCode,
      ext,
    );
  }
}

// Run the main function with the provided options
const inputDir = options.input;

compileDirectoryToReactComponents(inputDir).catch((err) => {
  console.error(err);
  process.exit(1);
});

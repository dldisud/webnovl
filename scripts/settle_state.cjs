#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Inkos Settler Logic
 *
 * Standalone version: Uses basic JSON validation to avoid node_modules dependency.
 */

function validateSheets(sheets) {
    if (!Array.isArray(sheets)) throw new Error("Character sheets must be an array.");
    sheets.forEach((char, i) => {
        if (!char.name || !char.status) throw new Error(`Character at index ${i} is missing name or status.`);
    });
    return true;
}

async function main() {
  const args = process.argv.slice(2);
  const mode = args[0]; // 'propose' or 'apply'
  const deltaPath = args[1]; // path to a JSON file with changes
  const projectRoot = path.join(__dirname, '..');

  const getFileContent = (relPath) => {
    const fullPath = path.join(projectRoot, relPath);
    if (fs.existsSync(fullPath)) {
      return fs.readFileSync(fullPath, 'utf8');
    }
    return null;
  }

  const currentSheetsContent = getFileContent('character_sheets.json') || getFileContent('assets/templates/character_sheets.json');
  let currentSheets;
  try {
    currentSheets = JSON.parse(currentSheetsContent);
  } catch (e) {
    process.stderr.write(`Failure: Invalid JSON in character sheets.\n`);
    process.exit(1);
  }

  if (mode === 'propose') {
    // Propose context for the LLM to generate a delta
    let output = "--- INKOS-KR SETTLER PROPOSAL ---\n\n";
    output += "Current Character Sheets:\n";
    output += "```json\n" + JSON.stringify(currentSheets, null, 2) + "\n```\n\n";
    output += "Instructions: Based on the chapter draft, identify any changes to character status, items, or relationships. Output only the updated JSON.\n";
    process.stdout.write(output);
  } else if (mode === 'apply' && deltaPath) {
    // Apply a JSON delta to the current sheets and validate
    try {
      const deltaContent = fs.readFileSync(deltaPath, 'utf8');
      const updatedSheets = JSON.parse(deltaContent);
      
      // Basic validation
      validateSheets(updatedSheets);

      fs.writeFileSync(path.join(projectRoot, 'character_sheets.json'), JSON.stringify(updatedSheets, null, 2));
      process.stdout.write("Success: Character sheets updated and validated.\n");
    } catch (e) {
      process.stderr.write(`Failure: ${e.message}\n`);
      process.exit(1);
    }
  } else {
    process.stderr.write("Usage: node settle_state.cjs propose | apply <delta_path>\n");
    process.exit(1);
  }
}

main();

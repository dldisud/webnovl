#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Inkos Engine Core
 *
 * This script prepares the context for the Planner and Writer agents by
 * reading the established Truth Files (character sheets, story bible)
 * and the corresponding prompts.
 */

async function main() {
  const args = process.argv.slice(2);
  const command = args[0]; // 'plan', 'write', or 'audit'
  const subCommand = args[1]; // for 'audit', this is 'proof' or 'opt'
  const projectRoot = path.join(__dirname, '..');

  if (!command || !['plan', 'write', 'audit'].includes(command)) {
    process.stderr.write("Failure: Please specify a command ('plan', 'write', or 'audit').\n");
    process.exit(1);
  }

  try {
    // 1. Locate Truth Files
    const getFileContent = (relPath) => {
        const fullPath = path.join(projectRoot, relPath);
        if (fs.existsSync(fullPath)) {
            return fs.readFileSync(fullPath, 'utf8');
        }
        return null;
    }

    const characterSheets = getFileContent('character_sheets.json') || getFileContent('assets/templates/character_sheets.json');
    const storyBible = getFileContent('story_bible.md') || getFileContent('assets/templates/story_bible.md');

    if (!characterSheets || !storyBible) {
      throw new Error("Missing Truth Files (character_sheets.json or story_bible.md)");
    }

    // 2. Locate the appropriate prompt
    let promptFileName;
    if (command === 'plan') promptFileName = 'planner.md';
    else if (command === 'write') promptFileName = 'writer.md';
    else if (command === 'audit') {
        if (!subCommand || !['proof', 'opt'].includes(subCommand)) {
            throw new Error("Failure: Please specify audit type ('proof' or 'opt').");
        }
        promptFileName = `auditor_${subCommand}.md`;
    }
    
    const promptPath = path.join(projectRoot, 'references', 'prompts', promptFileName);
    if (!fs.existsSync(promptPath)) {
      throw new Error(`Prompt file not found: ${promptPath}`);
    }
    const prompt = fs.readFileSync(promptPath, 'utf8');

    // 3. Construct the context block
    let contextBlock = "--- INKOS-KR CONTEXT BLOCK ---\n\n";
    contextBlock += "### TRUTH FILES (SINGLE SOURCE OF TRUTH)\n\n";
    contextBlock += "#### Character Sheets\n";
    contextBlock += "```json\n" + characterSheets + "\n```\n\n";
    contextBlock += "#### Story Bible\n";
    contextBlock += "```markdown\n" + storyBible + "\n```\n\n";

    if (command === 'plan') {
        contextBlock += "### MISSION: 3-STAGE DEEP PLANNING\n";
        contextBlock += "You must generate the following three reports in sequence based on the story state:\n";
        contextBlock += "1. [Report 1] 세계관 및 무대 배경 (World & Stage)\n";
        contextBlock += "2. [Report 2] 등장인물 심리 및 관계 분석 (Character & Psychology)\n";
        contextBlock += "3. [Report 3] 서사 연출 및 장면 시나리오 (Scenario & Beat)\n\n";
    }

    if (command === 'write') {
        const chapterPlan = getFileContent('chapter_plan.md');
        if (chapterPlan) {
            contextBlock += "#### Chapter Beats (Current Plan)\n";
            contextBlock += "```markdown\n" + chapterPlan + "\n```\n\n";
        }
    }

    contextBlock += "### AGENT PROMPT\n\n";
    contextBlock += prompt + "\n\n";
    contextBlock += "--- END OF CONTEXT BLOCK ---\n";

    process.stdout.write(contextBlock);

  } catch (err) {
    process.stderr.write(`Failure: ${err.message}\n`);
    process.exit(1);
  }
}

main();

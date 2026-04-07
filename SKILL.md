---
name: k-webnovel-studio
description: A multi-agent Korean webnovel studio framework compatible with Gemini, Claude, and Codex (OpenAI) for maintaining story consistency using Truth Files. Features 3-Stage Deep Planning (World, Character, Scenario) for high-quality chapter blueprints and commercial optimization.
---

# K-Webnovel-Studio: Korean Webnovel AI Studio

## Overview

K-Webnovel-Studio is a specialized framework for Korean webnovel writers and studios to maintain high story consistency across various LLMs including Gemini, Claude, and Codex. It relies on "Truth Files" (JSON/Markdown) and a 3-stage planning process to ensure deep world-building and character integrity.

## Core Concepts

### Truth Files
Truth Files are documents that define the current state of the story. 
- **Character Sheets**: JSON files tracking character status and items.
- **Story Bible**: Markdown files containing world rules and plot summaries.

### 3-Stage Deep Planning
Before writing, K-Webnovel-Studio generates three detailed blueprints:
1. **[Report 1] World & Stage**: Geopolitical context and sensory details.
2. **[Report 2] Character & Psychology**: Emotional states and class/generation-based reaction differences.
3. **[Report 3] Scenario & Beat**: Webnovel-optimized pacing and combat analysis (Situation -> Weakness -> Action -> Result).

## Workflow

1.  **Initialization**: Use templates in `assets/templates/` to start a new project.
2.  **3-Stage Plan**: Run `node scripts/inkos_engine.cjs plan` to generate the 3 blueprints.
3.  **Write**: Run `node scripts/inkos_engine.cjs write` to draft prose based on the plan.
4.  **Auditing Loop**:
    *   **Proof**: Run `node scripts/inkos_engine.cjs audit proof` to check consistency.
    *   **Optimize**: Run `node scripts/inkos_engine.cjs audit opt` to enhance commercial appeal.
5.  **Settle**: After review, update Truth Files to reflect new events.

## Resources

### references/
- **schemas.cjs**: Zod schemas for validating character and story data.

### assets/templates/
- **character_sheets.json**: Template for character tracking.
- **story_bible.md**: Template for world-building and plot summary.

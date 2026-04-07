const { z } = require('zod');

/**
 * Inkos KR Schemas
 * 
 * Defined using Zod for robust validation of Truth Files.
 */

const CharacterSchema = z.object({
  name: z.string().min(1, "Name is required"),
  role: z.string().default("Side Character"),
  status: z.string().default("Active"),
  items: z.array(z.string()).default([]),
  notes: z.string().optional()
});

const CharacterSheetsSchema = z.array(CharacterSchema);

const StoryBibleSchema = z.object({
  title: z.string(),
  synopsis: z.string(),
  world_rules: z.array(z.string()).optional(),
  plot_points: z.array(z.object({
    chapter: z.number(),
    summary: z.string()
  })).optional()
});

module.exports = {
  CharacterSchema,
  CharacterSheetsSchema,
  StoryBibleSchema
};

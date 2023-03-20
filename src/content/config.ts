import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		// section: z.enum(['kyle', 'programming', 'blender']).or(z.undefined()).optional(),
		section: z.enum(['kyle', 'programming', 'blender', 'technology']).optional(),
		description: z.string(),
		// Transform string to Date object
		pubDate: z
			.string()
			.or(z.date())
			.transform((val) => new Date(val)),
		updatedDate: z
			.string()
			.optional()
			.transform((str) => (str ? new Date(str) : undefined)),
		heroImage: z.string().optional(),
		draft: z.boolean().default(true),
	}),
});

const lists = defineCollection({
	schema: z.object({
		category: z.array(z.enum(['blender', 'rust', 'go', 'youtube-channel'])),
		title: z.string(),
		description: z.string().optional(),
		url: z.string().url().optional(),
		draft: z.boolean().default(true),
		// draft: z.enum(['true', 'false']),
	}),
});

export const collections = { blog, lists };

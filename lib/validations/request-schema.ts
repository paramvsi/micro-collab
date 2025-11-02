/**
 * Request Form Validation Schema
 * Zod schema for creating and updating requests
 */

import { z } from 'zod';

/**
 * Request form schema
 */
export const requestFormSchema = z.object({
  title: z
    .string()
    .min(10, 'Title must be at least 10 characters')
    .max(100, 'Title must be less than 100 characters')
    .refine(
      (val) => val.trim().length >= 10,
      'Title must contain at least 10 non-whitespace characters'
    ),

  description: z
    .string()
    .min(50, 'Description must be at least 50 characters')
    .max(2000, 'Description must be less than 2000 characters')
    .refine(
      (val) => val.trim().length >= 50,
      'Description must contain at least 50 non-whitespace characters'
    ),

  tags: z
    .array(z.string())
    .min(1, 'Select at least one skill tag')
    .max(5, 'Maximum 5 tags allowed'),

  duration_hours: z
    .number()
    .min(1, 'Duration must be at least 1 hour')
    .max(4, 'Duration cannot exceed 4 hours')
    .int('Duration must be a whole number'),

  urgency: z.enum(['low', 'normal', 'critical'], {
    message: 'Please select urgency level'
  }),

  mode: z.enum(['async', 'live'], {
    message: 'Please select collaboration mode'
  }),

  budget: z.number().min(0, 'Budget must be positive').optional(),

  currency: z.string().optional(),

  budget_type: z.enum(['hourly', 'fixed']).optional(),

  preferred_time: z.string().optional(),

  timezone: z.string().optional()
});

export type RequestFormData = z.infer<typeof requestFormSchema>;

/**
 * Default form values
 */
export const defaultRequestValues: Partial<RequestFormData> = {
  title: '',
  description: '',
  tags: [],
  duration_hours: 2,
  urgency: 'normal',
  mode: 'async',
  currency: 'USD',
  budget_type: 'hourly',
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
};

/**
 * Popular tech skills for autocomplete
 */
export const POPULAR_SKILLS = [
  'React',
  'TypeScript',
  'JavaScript',
  'Node.js',
  'Python',
  'Next.js',
  'Vue.js',
  'Angular',
  'Express',
  'Django',
  'FastAPI',
  'PostgreSQL',
  'MongoDB',
  'Redis',
  'Docker',
  'Kubernetes',
  'AWS',
  'Azure',
  'GCP',
  'CI/CD',
  'Git',
  'GraphQL',
  'REST API',
  'WebSockets',
  'Testing',
  'Jest',
  'Vitest',
  'Playwright',
  'Cypress',
  'TailwindCSS',
  'CSS',
  'Sass',
  'UI/UX',
  'Figma',
  'React Native',
  'Flutter',
  'Go',
  'Rust',
  'Java',
  'Spring Boot',
  'Laravel',
  'PHP',
  'Ruby',
  'Rails'
] as const;

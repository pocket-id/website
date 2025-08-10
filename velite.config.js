// @ts-check
import { defineConfig, defineCollection, s } from 'velite';

const docSchema = s
  .object({
    title: s.string(),
    description: s.string(),
    path: s.path(),
    published: s.boolean().default(true),
    order: s.number().optional(),
    toc: s.toc(),
  })
  .transform((data) => {
    const segments = data.path.split('/');

    return {
      ...data,
      slug: segments.join('/'),
      section: segments[0],
      segments,
    };
  });

const introduction = defineCollection({
  name: 'introduction',
  pattern: 'introduction.md',
  schema: docSchema,
});

const api = defineCollection({
  name: 'api',
  pattern: 'api.md',
  schema: docSchema,
});

const clientExamplesOverview = defineCollection({
  name: 'clientExamplesOverview',
  pattern: 'client-examples.md',
  schema: docSchema,
});

const setup = defineCollection({
  name: 'setup',
  pattern: 'setup/**/*.md',
  schema: docSchema,
});

const advanced = defineCollection({
  name: 'advanced',
  pattern: 'advanced/**/*.md',
  schema: docSchema,
});

const clientExamples = defineCollection({
  name: 'clientExamples',
  pattern: 'client-examples/**/*.md',
  schema: docSchema,
});

const configuration = defineCollection({
  name: 'configuration',
  pattern: 'configuration/**/*.md',
  schema: docSchema,
});

const guides = defineCollection({
  name: 'guides',
  pattern: 'guides/**/*.md',
  schema: docSchema,
});

const helpingOut = defineCollection({
  name: 'helpingOut',
  pattern: 'helping-out/**/*.md',
  schema: docSchema,
});

const troubleshooting = defineCollection({
  name: 'troubleshooting',
  pattern: 'troubleshooting/**/*.md',
  schema: docSchema,
});

export default defineConfig({
  root: './docs',
  collections: {
    introduction,
    api,
    clientExamplesOverview,
    setup,
    advanced,
    clientExamples,
    configuration,
    guides,
    helpingOut,
    troubleshooting,
  },
  output: {
    assets: 'static',
  },
});

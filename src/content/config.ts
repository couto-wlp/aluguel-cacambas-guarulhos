import { z, defineCollection } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.date(),
    image: z.string().optional(),
  }),
});

const servicosCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    seoTitle: z.string().optional(),
    description: z.string(),
    image: z.string().optional(),
    specs: z.object({
      altura: z.string().optional(),
      largura: z.string().optional(),
      comprimento: z.string().optional(),
      volume: z.string().optional(),
      pesoSuportado: z.string().optional(),
      quantidade: z.string().optional(),
    }).optional(),
  }),
});

const bairrosCollection = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    title: z.string().optional(),
    description: z.string().optional(),
  }),
});

export const collections = {
  'blog': blogCollection,
  'servicos': servicosCollection,
  'bairros': bairrosCollection,
};



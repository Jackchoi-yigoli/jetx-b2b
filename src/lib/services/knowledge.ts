import { prisma } from '@/lib/prisma';

export async function getArticles(options?: { category?: string; contentType?: string }) {
  const where: any = {};
  if (options?.category) where.category = options.category;
  if (options?.contentType) where.contentType = options.contentType;

  return prisma.knowledgeArticle.findMany({
    where,
    orderBy: { createdAt: 'desc' },
  });
}

export async function getArticleById(id: string) {
  return prisma.knowledgeArticle.findUnique({ where: { id } });
}

export async function createArticle(data: Parameters<typeof prisma.knowledgeArticle.create>[0]['data']) {
  return prisma.knowledgeArticle.create({ data });
}

export async function updateArticle(id: string, data: Parameters<typeof prisma.knowledgeArticle.update>[0]['data']) {
  return prisma.knowledgeArticle.update({ where: { id }, data });
}

export async function deleteArticle(id: string) {
  return prisma.knowledgeArticle.delete({ where: { id } });
}

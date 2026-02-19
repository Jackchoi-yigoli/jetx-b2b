import { NextRequest, NextResponse } from 'next/server';
import { getArticles, createArticle } from '@/lib/services';
import { CreateArticleSchema } from '@/lib/validations';

export async function GET(request: NextRequest) {
  try {
    const sp = request.nextUrl.searchParams;
    const articles = await getArticles({
      category: sp.get('category') || undefined,
      contentType: sp.get('contentType') || undefined,
    });
    return NextResponse.json(articles);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch articles' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = CreateArticleSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }
    const article = await createArticle(parsed.data);
    return NextResponse.json(article, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create article' }, { status: 500 });
  }
}

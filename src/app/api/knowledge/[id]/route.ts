import { NextRequest, NextResponse } from 'next/server';
import { getArticleById, updateArticle, deleteArticle } from '@/lib/services';
import { UpdateArticleSchema } from '@/lib/validations';

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const article = await getArticleById(id);
    if (!article) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(article);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch article' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const parsed = UpdateArticleSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }
    const article = await updateArticle(id, parsed.data);
    return NextResponse.json(article);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update article' }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await deleteArticle(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete article' }, { status: 500 });
  }
}

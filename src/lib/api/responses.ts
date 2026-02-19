import { NextResponse } from 'next/server';

export function apiSuccess<T>(data: T, status = 200) {
  return NextResponse.json({ success: true, data }, { status });
}

export function apiError(message: string, status: number, details?: unknown) {
  return NextResponse.json({ success: false, error: { message, details } }, { status });
}

export function apiValidationError(zodErrors: unknown) {
  return NextResponse.json({ success: false, error: { message: 'Validation failed', details: zodErrors } }, { status: 400 });
}

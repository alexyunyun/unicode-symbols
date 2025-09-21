import { NextResponse } from 'next/server';
import { symbols } from '@/data/symbols';

export async function GET() {
  try {
    return NextResponse.json(symbols);
  } catch (error) {
    console.error('Error fetching symbols:', error);
    return NextResponse.json(
      { error: 'Failed to fetch symbols' },
      { status: 500 }
    );
  }
}
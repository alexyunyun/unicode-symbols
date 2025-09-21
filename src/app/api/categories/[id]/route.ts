import { NextResponse } from 'next/server';
import { categories, symbols } from '@/data/symbols';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const categoryId = params.id;
    
    // 查找分类
    const category = categories.find(c => c.id === categoryId);
    if (!category) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }
    
    // 获取该分类下的所有符号
    const categorySymbols = symbols.filter(symbol => symbol.category === categoryId);
    
    return NextResponse.json({
      category,
      symbols: categorySymbols,
      count: categorySymbols.length
    });
  } catch (error) {
    console.error('Error fetching category symbols:', error);
    return NextResponse.json(
      { error: 'Failed to fetch category symbols' },
      { status: 500 }
    );
  }
}
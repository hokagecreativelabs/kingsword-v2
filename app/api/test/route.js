// app/api/test/route.js
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: 'API is working!' }, { status: 200 });
}

export async function POST(request) {
  try {
    const body = await request.json();
    console.log('Test API received:', body);
    
    return NextResponse.json({ 
      message: 'Test POST successful', 
      received: body 
    }, { status: 200 });
  } catch (error) {
    console.error('Test API error:', error);
    return NextResponse.json({ 
      message: 'Test API error', 
      error: error.message 
    }, { status: 500 });
  }
}
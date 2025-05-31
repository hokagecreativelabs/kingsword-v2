import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb'; // Adjust path if necessary

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, phone, team } = body;

    if (!name || !email || !phone || !team) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("kingsword"); // Uses DB from your MongoDB URI
    const collection = db.collection('volunteers'); // New or existing collection

    const result = await collection.insertOne({
      name,
      email,
      phone,
      team,
      createdAt: new Date()
    });

    return NextResponse.json(
      { message: 'Volunteer submitted successfully', id: result.insertedId },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error submitting volunteer form:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

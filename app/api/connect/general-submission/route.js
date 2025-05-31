// app/api/connect/general-submission/route.js
import clientPromise from '@/lib/mongodb';

export async function POST(request) {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB_NAME || 'kingsword');
    const collection = db.collection('connect_submissions');

    const { name, email, details } = await request.json();

    // Validate required fields
    if (!name || !email || !details) {
      return Response.json({ 
        message: 'Missing required fields: name, email, and details are required' 
      }, { status: 400 });
    }

    // Create submission document
    const submission = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      details: details.trim(),
      submittedAt: new Date(),
      status: 'pending'
    };

    const result = await collection.insertOne(submission);

    return Response.json({ 
      message: 'Connect form submission successful', 
      id: result.insertedId 
    }, { status: 201 });

  } catch (error) {
    console.error('Connect submission error:', error);
    return Response.json({ 
      message: 'Internal server error', 
      error: process.env.NODE_ENV === 'development' ? error.message : undefined 
    }, { status: 500 });
  }
}
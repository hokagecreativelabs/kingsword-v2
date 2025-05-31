// app/api/connect/group-submission/route.js
import clientPromise from '@/lib/mongodb';

export async function POST(request) {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB_NAME || 'kingsword');
    const collection = db.collection('group_submissions');

    const { name, email, phone, group } = await request.json();

    // Validate required fields
    if (!name || !email || !phone || !group) {
      return Response.json({ 
        message: 'Missing required fields: name, email, phone, and group are required' 
      }, { status: 400 });
    }

    // Create submission document
    const submission = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      group: group.trim(),
      submittedAt: new Date(),
      status: 'pending'
    };

    const result = await collection.insertOne(submission);

    return Response.json({ 
      message: 'Group submission successful', 
      id: result.insertedId 
    }, { status: 201 });

  } catch (error) {
    console.error('Group submission error:', error);
    return Response.json({ 
      message: 'Internal server error', 
      error: process.env.NODE_ENV === 'development' ? error.message : undefined 
    }, { status: 500 });
  }
}

import clientPromise from '@/lib/mongodb';

export async function POST(request) {
  try {
    const body = await request.json();

    const submissionData = {
      id: Date.now(),
      ...body,
      formType: 'worship',
      timestamp: new Date().toISOString(),
    };

    const client = await clientPromise;
    const db = client.db('kingsword');

    // Collection name based on formType
    const collectionName = `${submissionData.formType}_submissions`;
    const collection = db.collection(collectionName);

    const result = await collection.insertOne(submissionData);

    return new Response(JSON.stringify({
      success: true,
      message: 'Worship form submitted!',
      id: submissionData.id,
      mongoId: result.insertedId,
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });

  } catch (error) {
    console.error("API error:", error);
    return new Response(JSON.stringify({
      success: false,
      message: 'Error submitting worship form',
      error: error.message,
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

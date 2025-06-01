import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Admin from '../../../../models/Admin'; // Changed from User to Admin
import connectDB from '../../../../lib/mongodb';

export async function POST(request) {
  try {
    const { email, password } = await request.json();
    
    await connectDB();
    
    const admin = await Admin.findOne({ email }); // No need to check isAdmin since all records in admin collection are admins
    
    if (!admin) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }
    
    const isValidPassword = await bcrypt.compare(password, admin.password);
    
    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }
    
    const token = jwt.sign(
      { adminId: admin._id, isAdmin: admin.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    return NextResponse.json({
      message: 'Login successful',
      token,
      user: {
        id: admin._id,
        email: admin.email,
        isAdmin: admin.isAdmin
      }
    });
    
  } catch (error) {
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}
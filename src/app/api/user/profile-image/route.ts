import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSessionFromRequest } from '@/lib/auth';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

export async function POST(request: NextRequest) {
  try {
    const session = await getSessionFromRequest(request);

    if (!session) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      );
    }

    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'Invalid file type. Only images are allowed.' },
        { status: 400 }
      );
    }

    const accountId = process.env.R2_ACCOUNT_ID;
    const accessKeyId = process.env.R2_ACCESS_KEY_ID;
    const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
    const bucketName = process.env.R2_BUCKET_NAME;
    const publicDomain = process.env.R2_PUBLIC_DOMAIN;

    if (!accountId || !accessKeyId || !secretAccessKey || !bucketName || !publicDomain) {
      console.warn("R2 credentials missing. Ensure R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET_NAME, and R2_PUBLIC_DOMAIN are set.");
      return NextResponse.json(
        { error: 'Server misconfiguration: Missing Cloudflare R2 credentials' },
        { status: 500 }
      );
    }

    // Configure S3 client for Cloudflare R2
    const S3 = new S3Client({
      region: 'auto',
      endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Generate a unique filename: userId-timestamp.ext
    const extension = file.name.split('.').pop() || 'png';
    const fileName = `profile-images/${session.userId}-${Date.now()}.${extension}`;

    // Upload to R2
    await S3.send(new PutObjectCommand({
      Bucket: bucketName,
      Key: fileName,
      Body: buffer,
      ContentType: file.type,
    }));

    // Construct the public URL
    const imageUrl = `${publicDomain}/${fileName}`;

    // Update user profile
    const updatedUser = await prisma.user.update({
      where: { id: session.userId },
      data: { image: imageUrl },
      select: {
        id: true,
        email: true,
        name: true,
        image: true,
        planType: true,
        level: true,
        xp: true,
        coins: true,
        streak: true,
        bestStreak: true,
        totalStudyDays: true,
      },
    });

    return NextResponse.json({ data: updatedUser }, { status: 200 });
  } catch (error) {
    console.error('Error uploading profile image:', error);
    return NextResponse.json(
      { error: 'Failed to upload profile image' },
      { status: 500 }
    );
  }
}

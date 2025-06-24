import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: 'dj4zpvlx1',
  api_key: '468137414812688',
  api_secret: '_kvDqDwOnPHze9JiitPBthDf_-Q',
  secure: true,
});

export async function POST(request: Request) {
    const { public_id } = await request.json();

    if (!public_id) {
        return NextResponse.json({ error: 'No public_id provided.' }, { status: 400 });
    }

    try {
        const result = await cloudinary.uploader.destroy(public_id);
        return NextResponse.json({ result: 'success', data: result });
    } catch (error) {
        console.error('Delete API error:', error);
        return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
    }
}

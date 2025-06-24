import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: 'dj4zpvlx1',
  api_key: '468137414812688',
  api_secret: '_kvDqDwOnPHze9JiitPBthDf_-Q',
  secure: true,
});

export async function POST(request: Request) {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
        return NextResponse.json({ error: 'No file uploaded.' }, { status: 400 });
    }

    try {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = new Uint8Array(arrayBuffer);

        const result: any = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({
                resource_type: 'auto',
            }, (error, result) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            }).end(buffer);
        });

        return NextResponse.json({ secure_url: result.secure_url, public_id: result.public_id });
    } catch (error) {
        console.error('Upload API error:', error);
        return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
    }
}

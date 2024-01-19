// import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
// import uniqid from 'uniqid';


// export async function POST(req) {
//   const data = await req.formData();

//   if (data.get('file')) {
//     // upload the file
//     const file = data.get('file');

//     const s3Client = new S3Client({
//       region: 'us-east-1',
//       credentials: {
//         accessKeyId: process.env.MY_AWS_ACCESS_KEY,
//         secretAccessKey: process.env.MY_AWS_SECRET_KEY,
//       },
//     });

//     const ext = file.name.split('.').slice(-1)[0];
//     const newFileName = uniqid() + '.' + ext;

//     const chunks = [];
//     for await (const chunk of file.stream()) {
//       chunks.push(chunk);
//     }
//     const buffer = Buffer.concat(chunks);

//     const bucket = 'dawid-food-ordering';
//     await s3Client.send(new PutObjectCommand({
//       Bucket: bucket,
//       Key: newFileName,
//       ACL: 'public-read',
//       ContentType: file.type,
//       Body: buffer,
//     }));


//     const link = 'https://'+bucket+'.s3.amazonaws.com/'+newFileName;
//     return Response.json(link);
//   }
//   return Response.json(true);
// }


import { writeFile } from 'fs/promises'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const data = await request.formData()
    const file = data.get('image')
    if (!file) {
      return NextResponse.json({ success: false })
    }
    const bytes = await file.arrayBuffer()
    // console.log(bytes, 'bytes');
    const buffer = Buffer.from(bytes)
    // console.log(buffer, 'buffer');

    // With the file data in the buffer, you can do whatever you want with it.
    // For this, we'll just write it to the filesystem in a new location
    let filename = file.name.replace(/\s+/g, '_')
    const path = `public/uploads/${filename}`
    await writeFile(path, buffer)
    console.log(`open ${path} to see the uploaded file`)
    const link = `${process.env.NEXT_BASE_API}${path}`
    console.log(link, '<<<<<<<<<<<<<');
    return Response.json(link);
  } catch (error) {
    console.log(error);
    return Response.json("something went wrong");
  }

}
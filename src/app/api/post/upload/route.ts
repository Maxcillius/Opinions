import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import s3 from '@/lib/S3';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getAuthSession } from '@/lib/auth';

export async function POST(req: NextRequest) {

    const session = await getAuthSession();

    if (!session) {
        
        return NextResponse.json({
            message: "Not aunthenticated"
        }, {
            status: 401
        })
    }

    const { user } = session;

    try {
        const formData = await req.formData();

        const file = formData.get("image");
        if (!file || !(file instanceof Blob)) {
          return NextResponse.json({
            message: "No valid file received.",
          }, {
            status: 400
          });
        }


        const additionalDataString = formData.get("additionalData");
        if (typeof additionalDataString !== 'string') {
        return NextResponse.json({
            error: "No valid additional data received.",
        }, {
            status: 400
        });
        }

        const additionalData = JSON.parse(additionalDataString);
        const buffer = Buffer.from(await file.arrayBuffer());
        const filename = (file as File).name;

        try {

            const dbResponse = await db.post.create({
                data: {
                    title: additionalData.data.Title,
                    content: additionalData.data.Content,
                    author: user.id,
                    image: "image"
                }
            })

            const uid = dbResponse.id;

            const params = {
                Bucket: process.env.BUCKET_NAME,
                Key: user.id + "_" + uid + "." + file.name.split(".")[1],
                Body: buffer,
                ContentType: file.name.split(".")[1]
            }
    
            const command = new PutObjectCommand(params);

            const response = await s3.send(command);

            const updatePost = await db.post.update({
                where: {
                    id: uid
                },
                data: {
                    image: user.id + "_" + uid + "." + file.name.split(".")[1]
                }
            })


            return NextResponse.redirect("/");

        } catch (error) {
            return NextResponse.json({
                message: "Error while uploading the file to S3",
                Error: error
            })
        }


      } catch (error) {
        return NextResponse.json({
          error: 'An error occurred during the upload process',
          details: error,
        }, {
            status: 500
        });
      }
}
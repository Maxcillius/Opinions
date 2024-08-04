import { db } from "@/lib/db";
import s3 from "@/lib/S3";
import postType from "@/types/post";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { NextRequest, NextResponse } from "next/server";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export async function GET(req: NextRequest) {

    try {
        let data = await db.post.findMany();

        const updatedData = await Promise.all(data.map(async (post: postType) => {
            const params = {
                Bucket: process.env.BUCKET_NAME,
                Key: post.image,
            };

            const command = new GetObjectCommand(params);
            const url = await getSignedUrl(s3, command);
            post.image = url;
            return post;
        }));

        return NextResponse.json(updatedData);
    } catch (error) {
        return NextResponse.json({
            message: "Error while fetching posts"
        })
    }
}
import { S3Client } from "@aws-sdk/client-s3";

const access_key = process.env.ACCESS_KEY;
const secret_access_key = process.env.SECRET_ACCESS_KEY;
const bucket_region = process.env.BUCKET_REGION;

const s3: S3Client = new S3Client({
    region: bucket_region,
    credentials: {
        accessKeyId: access_key!,
        secretAccessKey: secret_access_key!,
    }
})

export default s3;
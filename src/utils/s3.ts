import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

export class S3 {
  private readonly client: S3Client;
  constructor() {
    if (
      !process.env.CLOUDFLARE_R2_ACCESS_KEY_ID ||
      !process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY ||
      !process.env.CLOUDFLARE_R2_BUCKET_NAME
    ) {
      throw new Error('S3 environment variables are not set completely, please check your env');
    }
    this.client = new S3Client({
      endpoint: process.env.CLOUDFLARE_R2_ENDPOINT,
      region: 'auto',
      credentials: {
        accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY || '',
      },
    });
  }

  public getClient() {
    return this.client;
  }
  public async createPreSignedUrl(key: string): Promise<string> {
    const command = new PutObjectCommand({
      ACL: 'public-read',
      Bucket: process.env.CLOUDFLARE_R2_BUCKET_NAME,
      Key: key,
    });
    return getSignedUrl(this.client, command, { expiresIn: 3600 });
  }
}

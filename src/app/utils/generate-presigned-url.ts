'use server';

import { GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { r2 } from "../api/cloudflare";
import { env } from "@/env";

export async function GeneratePresignedUrl(fileName: string, fileType: string) {

  const paramsUpload = {
    Bucket: env.CLOUDFLARE_BUCKET_NAME, // Nome do seu bucket
    Key: fileName, // Nome do arquivo
    ContentType: fileType, // Tipo do arquivo
  };

  const commandUpload = new PutObjectCommand(paramsUpload);

  const urlUpload = await getSignedUrl(r2, commandUpload, { expiresIn: 600 }); // Expira em 3 minutos

  return urlUpload;
}

export async function GeneratePresignedUrlDownload(fileName: string) {

  const paramsDownload = {
    Bucket: env.CLOUDFLARE_BUCKET_NAME, // Nome do seu bucket
    Key: fileName, // Nome do arquivo
  };

  const commandDownload = new GetObjectCommand(paramsDownload);

  const urlDownload = await getSignedUrl(r2, commandDownload, { expiresIn: 600 }); // Expira em 3 minutos

  return urlDownload;
}
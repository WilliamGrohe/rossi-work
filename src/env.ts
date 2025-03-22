import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().url().nullish(),
  CLOUDFLARE_ENDPOINT: z.string().url().nullish(),
  CLOUDFLARE_ACCESS_KEY_ID: z.string().nullish(),
  CLOUDFLARE_SECRET_ACCESS_KEY: z.string().nullish(),
  CLOUDFLARE_BUCKET_NAME: z.string().nullish(),
})

export const env = envSchema.parse(process.env)
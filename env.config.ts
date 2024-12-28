import { z } from "zod";

const envSchema = z.object({
  // General Configuration
  NEXT_PUBLIC_BASE_URL: z.string().url().default('http://localhost:3000'),

  // Clerk Configuration
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().optional(),
  CLERK_SECRET_KEY: z.string().optional(),
  NEXT_PUBLIC_CLERK_SIGN_IN_URL: z.string().default('/sign-in'),
  NEXT_PUBLIC_CLERK_SIGN_UP_URL: z.string().default('/sign-up'),

  // Prisma Configuration
  DATABASE_URL: z.string().optional(),
  DIRECT_URL: z.string().optional(),

  // Supabase Configuration
  NEXT_PUBLIC_SUPABASE_URL: z.string().optional(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().optional(),

  // Stripe Configuration
  STRIPE_KEY: z.string().optional(),
  STRIPE_SECRET_KEY: z.string().optional(),

  // Spotify Configuration
  NEXT_PUBLIC_SPOTIFY_CLIENT_ID: z.string().optional(),
  NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET: z.string().optional(),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error("❌ Invalid environment variables:", parsedEnv.error.format());
  throw new Error("Environment variable validation failed");
}

export const EnvConfig = () => ({
  ...parsedEnv.data,
});

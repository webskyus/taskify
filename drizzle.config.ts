import * as dotenv from 'dotenv';
import type {Config} from 'drizzle-kit';

dotenv.config({
    path: '.env'
})

if (!process.env.DATABASE_URL) console.log("🟥 | DRIZZLE.CONFIG.ERROR | DATABASE_URL DOESN'T FIND");

export default {
    schema: './src/app/supabase/schema.ts',
    out: './src/app/migrations',
    driver: 'pg',
    dbCredentials: {
        connectionString: process.env.DATABASE_URL || ''
    }
} satisfies Config;

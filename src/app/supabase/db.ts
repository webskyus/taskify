import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as dotenv from 'dotenv';
import * as schema from '~/app/migrations/schema';
import { migrate } from 'drizzle-orm/postgres-js/migrator';

dotenv.config({
	path: '.env',
});

if (!process.env.DATABASE_URL)
	console.log("🟥 | SUPABASE.DB.ERROR | DATABASE_URL DOESN'T FIND");

const client = postgres(process.env.DATABASE_URL as string, {
	max: 1,
	prepare: false,
});
const db = drizzle(client, { schema });

const migrateDB = async () => {
	try {
		console.log('🟧 | CLIENT MIGRATION START...');
		await migrate(db, {
			migrationsFolder: './src/app/migrations',
		});
		console.log('🟩 | CLIENT MIGRATION SUCCESS...');
	} catch (error: unknown) {
		console.log('🟥 | CLIENT MIGRATION ERROR...', error);
	}
};

migrateDB();

export default db;

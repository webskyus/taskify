import {
	pgTable,
	pgEnum,
	uuid,
	text,
	timestamp,
	smallint,
	jsonb, integer,
} from 'drizzle-orm/pg-core';

export const keyStatus = pgEnum('key_status', [
	'default',
	'valid',
	'invalid',
	'expired',
]);
export const keyType = pgEnum('key_type', [
	'aead-ietf',
	'aead-det',
	'hmacsha512',
	'hmacsha256',
	'auth',
	'shorthash',
	'generichash',
	'kdf',
	'secretbox',
	'secretstream',
	'stream_xchacha20',
]);
export const aalLevel = pgEnum('aal_level', ['aal1', 'aal2', 'aal3']);
export const codeChallengeMethod = pgEnum('code_challenge_method', [
	's256',
	'plain',
]);
export const factorStatus = pgEnum('factor_status', ['unverified', 'verified']);
export const factorType = pgEnum('factor_type', ['totp', 'webauthn']);
export const oneTimeTokenType = pgEnum('one_time_token_type', [
	'confirmation_token',
	'reauthentication_token',
	'recovery_token',
	'email_change_token_new',
	'email_change_token_current',
	'phone_change_token',
]);
export const action = pgEnum('action', [
	'INSERT',
	'UPDATE',
	'DELETE',
	'TRUNCATE',
	'ERROR',
]);
export const equalityOp = pgEnum('equality_op', [
	'eq',
	'neq',
	'lt',
	'lte',
	'gt',
	'gte',
	'in',
]);

const workspaces = pgTable('workspaces', {
	id: uuid('id').primaryKey().defaultRandom(),
	name: text('name').notNull(),
	description: text('description').notNull(),
	icon: text('icon').notNull(),
	color: smallint('color').notNull(),
	ownerId: uuid('owner_id').notNull(),
	createdAt: timestamp('created_at', {
		withTimezone: true,
		mode: 'string',
	})
		.defaultNow()
		.notNull(),
	updatedAt: timestamp('updated_at', {
		withTimezone: true,
		mode: 'string',
	})
		.defaultNow()
		.notNull(),
});

const projects = pgTable('projects', {
	id: uuid('id').primaryKey().defaultRandom(),
	name: text('name').notNull(),
	description: text('description').notNull(),
	icon: text('icon').notNull(),
	color: smallint('color').notNull(),
	ownerId: uuid('owner_id').notNull(),
	workspaceId: uuid('workspace_id').notNull(),
	createdAt: timestamp('created_at', {
		withTimezone: true,
		mode: 'string',
	})
		.defaultNow()
		.notNull(),
	updatedAt: timestamp('updated_at', {
		withTimezone: true,
		mode: 'string',
	})
		.defaultNow()
		.notNull(),
});

const projectColumns = pgTable('project_columns', {
	id: uuid('id').primaryKey().defaultRandom(),
	name: text('name').notNull(),
	ownerId: uuid('owner_id').notNull(),
	projectId: uuid('project_id').notNull(),
	order: integer('order').notNull(),
	createdAt: timestamp('created_at', {
		withTimezone: true,
		mode: 'string',
	})
		.defaultNow()
		.notNull(),
	updatedAt: timestamp('updated_at', {
		withTimezone: true,
		mode: 'string',
	})
		.defaultNow()
		.notNull(),
});

const profiles = pgTable('profiles', {
	id: uuid('id').primaryKey().notNull(),
	fullName: text('full_name'),
	avatarUrl: text('avatar_url'),
	billingAddress: jsonb('billing_address'),
	updatedAt: timestamp('updated_at', {
		withTimezone: true,
		mode: 'string',
	})
		.defaultNow()
		.notNull(),
	createdAt: timestamp('created_at', {
		withTimezone: true,
		mode: 'string',
	})
		.defaultNow()
		.notNull(),
	paymentMethod: jsonb('payment_method'),
	email: text('email'),
});

export { workspaces, profiles, projects, projectColumns };

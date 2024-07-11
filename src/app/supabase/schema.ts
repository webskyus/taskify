import {
	pgTable,
	uuid,
	text,
	timestamp,
	jsonb,
	smallint,
} from 'drizzle-orm/pg-core';

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
});

const profiles = pgTable('profiles', {
	id: uuid('id').primaryKey().notNull(),
	fullName: text('full_name'),
	avatarUrl: text('avatar_url'),
	billingAddress: jsonb('billing_address'),
	updatedAt: timestamp('updated_at', {
		withTimezone: true,
		mode: 'string',
	}),
	createdAt: timestamp('created_at', {
		withTimezone: true,
		mode: 'string',
	})
		.defaultNow()
		.notNull(),
	paymentMethod: jsonb('payment_method'),
	email: text('email'),
});

export { workspaces, profiles, projects };

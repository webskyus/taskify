import {pgTable, uuid, text, timestamp, jsonb, pgSchema} from 'drizzle-orm/pg-core';

const authSchema = pgSchema("auth");

const workspaces = pgTable('workspaces', {
	id: uuid('id').defaultRandom().primaryKey().notNull(),
	title: text('title').notNull(),
	data: text('data').notNull(),
	logo: text('logo').notNull(),
	banner: text('banner').notNull(),
	inTrash: text('in_trash').notNull(),
	iconId: text('icon_id').notNull(),
	workspaceOwner: uuid('workspace_owner').notNull(),
	createdAt: timestamp('created_at', {
		withTimezone: true,
		mode: 'string',
	}),
});

const users = pgTable('users', {
	id: uuid('id')
		.primaryKey()
		.notNull(),
	fullName: text('full_name'),
	avatarUrl: text('avatar_url'),
	billingAddress: jsonb('billing_address'),
	updatedAt: timestamp('updated_at', {
		withTimezone: true,
		mode: 'string'
	}),
	paymentMethod: jsonb('payment_method'),
	email: text('email'),
});

const profiles = pgTable('profiles', {
	id: uuid('id')
		.primaryKey()
		.notNull(),
	fullName: text('full_name'),
	firstName: text('first_name'),
	lastName: text('last_name'),
})

export {
	workspaces,
	users
}

import {pgTable, uuid, text, timestamp, jsonb} from 'drizzle-orm/pg-core';

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

export {
	workspaces,
	users
}

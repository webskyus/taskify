import {pgTable, uuid, text, timestamp, jsonb, pgSchema} from 'drizzle-orm/pg-core';

const authSchema = pgSchema("auth");

const users = authSchema.table("users", {
	id: uuid('id')
		.primaryKey()
		.notNull()
})

const workspaces = pgTable('workspaces', {
	id: uuid('id')
		.defaultRandom()
		.primaryKey()
		.notNull(),
	title: text('title')
		.notNull(),
	data: text('data')
		.notNull(),
	logo: text('logo')
		.notNull(),
	banner: text('banner')
		.notNull(),
	inTrash: text('in_trash')
		.notNull(),
	iconId: text('icon_id')
		.notNull(),
	workspaceOwner: uuid('workspace_owner')
		.notNull(),
	createdAt: timestamp('created_at', {
		withTimezone: true,
		mode: 'string',
	}),
});

const profiles = pgTable('profiles', {
	id: uuid('id')
		.primaryKey()
		.notNull(),
	userId: uuid('user_id')
		.references(() => users.id)
		.notNull(),
	fullName: text('full_name'),
});

export {
	workspaces,
	profiles,
	users
}

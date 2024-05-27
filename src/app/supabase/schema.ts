import {pgTable, uuid, text, timestamp, jsonb, boolean, integer} from 'drizzle-orm/pg-core';
import {relations, sql} from "drizzle-orm";
import {prices, products, subscriptionStatus} from "~/app/migrations/schema";


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

const folders = pgTable('folders', {
	id: uuid('id').defaultRandom().primaryKey().notNull(),
	title: text('title').notNull(),
	data: text('data').notNull(),
	banner: text('banner').notNull(),
	inTrash: text('in_trash').notNull(),
	iconId: text('icon_id').notNull(),
	workspaceId: uuid('workspace_id').references(() => workspaces.id, {
		onDelete: 'cascade',
	}),
	createdAt: timestamp('created_at', {
		withTimezone: true,
		mode: 'string',
	}),
});

const files = pgTable('files', {
	id: uuid('id').defaultRandom().primaryKey().notNull(),
	title: text('title').notNull(),
	data: text('data').notNull(),
	banner: text('banner').notNull(),
	inTrash: text('in_trash').notNull(),
	iconId: text('icon_id').notNull(),
	workspaceId: uuid('workspace_id').references(() => workspaces.id, {
		onDelete: 'cascade',
	}),
	createdAt: timestamp('created_at', {
		withTimezone: true,
		mode: 'string',
	}),
	folderId: uuid('folder_id').references(() => folders.id, {
		onDelete: 'cascade',
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


const subscriptions = pgTable('subscriptions', {
	id: text('id').primaryKey().notNull(),
	userId: uuid('user_id').notNull(),
	status: subscriptionStatus('status'),
	metadata: jsonb('metadata'),
	priceId: text('price_id').references(() => prices.id),
	quantity: integer('quantity'),
	cancelAtPeriodEnd: boolean('cancel_at_period_end'),
	created: timestamp('created', { withTimezone: true, mode: 'string' })
		.default(sql`now()`)
		.notNull(),
	currentPeriodStart: timestamp('current_period_start', {
		withTimezone: true,
		mode: 'string',
	})
		.default(sql`now()`)
		.notNull(),
	currentPeriodEnd: timestamp('current_period_end', {
		withTimezone: true,
		mode: 'string',
	})
		.default(sql`now()`)
		.notNull(),
	endedAt: timestamp('ended_at', {
		withTimezone: true,
		mode: 'string',
	}).default(sql`now()`),
	cancelAt: timestamp('cancel_at', {
		withTimezone: true,
		mode: 'string',
	}).default(sql`now()`),
	canceledAt: timestamp('canceled_at', {
		withTimezone: true,
		mode: 'string',
	}).default(sql`now()`),
	trialStart: timestamp('trial_start', {
		withTimezone: true,
		mode: 'string',
	}).default(sql`now()`),
	trialEnd: timestamp('trial_end', {
		withTimezone: true,
		mode: 'string',
	}).default(sql`now()`),
});

const collaborators = pgTable('collaborators', {
	id: uuid('id').defaultRandom().primaryKey().notNull(),
	workspaceId: uuid('workspace_id')
		.notNull()
		.references(() => workspaces.id, { onDelete: 'cascade' }),
	createdAt: timestamp('created_at', {
		withTimezone: true,
		mode: 'string',
	})
		.defaultNow()
		.notNull(),
	userId: uuid('user_id')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),
});

const productsRelations = relations(products, ({ many }) => ({
	prices: many(prices),
}));

const pricesRelations = relations(prices, ({ one }) => ({
	product: one(products, {
		fields: [prices.productId],
		references: [products.id],
	}),
}));


export {
	workspaces,
	folders,
	files,
	users,
	subscriptions,
	collaborators,
	productsRelations,
	pricesRelations,
}

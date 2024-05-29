import {
    pgTable,
    uuid,
    timestamp,
    text,
    jsonb,
} from 'drizzle-orm/pg-core';

const workspaces = pgTable('workspaces', {
    id: uuid('id')
        .defaultRandom()
        .primaryKey()
        .notNull(),
    createdAt: timestamp('created_at', {withTimezone: true, mode: 'string'})
        .defaultNow()
        .notNull(),
    workspaceOwner: uuid('workspace_owner')
        .notNull(),
    title: text('title')
        .notNull(),
    iconId: text('icon_id')
        .notNull(),
    data: text('data'),
    inTrash: text('in_trash'),
    logo: text('logo'),
    bannerUrl: text('banner_url'),
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

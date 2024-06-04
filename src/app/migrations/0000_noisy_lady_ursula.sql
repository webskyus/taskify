CREATE TABLE IF NOT EXISTS "profiles" (
	"id" uuid PRIMARY KEY NOT NULL,
	"full_name" text,
	"avatar_url" text,
	"billing_address" jsonb,
	"updated_at" timestamp with time zone,
	"payment_method" jsonb,
	"email" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "workspaces" (
	"id" uuid DEFAULT gen_random_uuid(),
	"title" text NOT NULL,
	"data" text NOT NULL,
	"logo" text NOT NULL,
	"banner" text NOT NULL,
	"icon_id" text NOT NULL,
	"workspace_owner" uuid NOT NULL,
	"created_at" timestamp with time zone
);

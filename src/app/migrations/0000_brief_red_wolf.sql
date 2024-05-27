CREATE TABLE IF NOT EXISTS "workspaces" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"data" text NOT NULL,
	"logo" text NOT NULL,
	"banner" text NOT NULL,
	"in_trash" text NOT NULL,
	"icon_id" text NOT NULL,
	"workspace_owner" uuid NOT NULL,
	"created_at" timestamp with time zone
);

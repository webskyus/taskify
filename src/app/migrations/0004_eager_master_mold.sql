ALTER TABLE "workspaces" ADD COLUMN "icon" text NOT NULL;--> statement-breakpoint
ALTER TABLE "workspaces" DROP COLUMN IF EXISTS "logo";
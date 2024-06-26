ALTER TABLE "workspaces" ADD COLUMN "workspace_owner_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "workspaces" DROP COLUMN IF EXISTS "workspace_owner";
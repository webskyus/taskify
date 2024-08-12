ALTER TABLE "project_tasks" ALTER COLUMN "content" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "project_tasks" ADD COLUMN "project_id" uuid NOT NULL;
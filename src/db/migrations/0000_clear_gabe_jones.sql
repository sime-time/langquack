CREATE TABLE "todo" (
	"id" integer PRIMARY KEY NOT NULL,
	"content" text NOT NULL,
	"done" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);

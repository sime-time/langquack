import type { Handle } from "@sveltejs/kit";
import { auth } from "$lib/auth";
import { svelteKitHandler } from "better-auth/svelte-kit";

export const handle: Handle = async ({ event, resolve }) => {
  return svelteKitHandler({ event, resolve, auth });
}

"use server";

import { db } from "@/db/drizzle"
import { todo } from "@/db/schema/todo-schema"
import { eq, not } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { auth } from "@/utils/auth";
import { headers } from "next/headers";

export const getTodos = async () => {
  const session = await auth.api.getSession({
    headers: await headers()
  });
  const data = await db.select().from(todo).where(eq(todo.userId, session?.user.id ?? "")).orderBy(todo.createdAt);
  return data;
}

export const addTodo = async (id: number, content: string) => {
  const session = await auth.api.getSession({
    headers: await headers()
  });
  await db.insert(todo).values({
    id: id,
    content: content,
    userId: session?.user.id,
  });
  revalidatePath("/");
}

export const deleteTodo = async (id: number) => {
  await db.delete(todo).where(eq(todo.id, id));
  revalidatePath("/");
}

export const editTodo = async (id: number, content: string) => {
  await db.update(todo)
    .set({
      content: content,
    })
    .where(eq(todo.id, id));
  revalidatePath("/");
}

export const toggleTodo = async (id: number) => {
  await db.update(todo)
    .set({
      done: not(todo.done),
    })
    .where(eq(todo.id, id));
  revalidatePath("/");
}

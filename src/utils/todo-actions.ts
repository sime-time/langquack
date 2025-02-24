"use server";

import { db } from "@/db/drizzle"
import { todo } from "@/db/schema/todo-schema"
import { eq, not } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const getTodos = async () => {
  const data = await db.select().from(todo).orderBy(todo.createdAt);
  return data;
}

export const addTodo = async (id: number, content: string) => {
  await db.insert(todo).values({
    id: id,
    content: content,
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

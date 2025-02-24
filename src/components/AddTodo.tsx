"use client";
import { addTodo } from "@/utils/todo-actions";

export default function AddTodo() {
  const handleAddTodo = async () => {
    const id = Math.floor(100 + Math.random() * 900);
    const content = `Todo #${id}`;
    await addTodo(id, content);
  };

  return (
    <button onClick={handleAddTodo} className="btn btn-neutral">Add</button>
  );
}

"use client";
import AddTodo from "./AddTodo";
import { TodoType } from "@/types/todo-type";
import { deleteTodo, editTodo, toggleTodo } from "@/utils/todo-actions";

interface TodosProps {
  todos: TodoType[]
}
export default function Todos({ todos }: TodosProps) {

  const handleEditTodo = async (id: number) => {
    await editTodo(id, "Todo edited");
  };

  const handleToggleTodo = async (id: number) => {
    await toggleTodo(id);
  };

  const handleDeleteTodo = async (id: number) => {
    await deleteTodo(id);
  };

  return (
    <div className="flex flex-col md:w-1/2 justify-self-center my-10 gap-3">
      <ul className="space-y-2">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={`flex justify-between items-center p-3 rounded-lg ${todo.done ? "bg-green-200" : "bg-neutral-300"}`}
          >
            <span className={todo.done ? "line-through" : ""}>{todo.content}</span>
            <div className="flex space-x-2">
              <button className="btn btn-primary" onClick={() => handleEditTodo(todo.id)}>Edit</button>
              <button className="btn btn-success" onClick={() => handleToggleTodo(todo.id)}>{todo.done ? "Undo" : "Done"}</button>
              <button className="btn btn-error" onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
      <AddTodo />
    </div>
  );
}

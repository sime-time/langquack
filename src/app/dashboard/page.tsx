import { getTodos } from "@/utils/todo-actions";
import Todos from "@/components/Todo";

export default async function Dashboard() {
  const todos = await getTodos();
  return (
    <main className="flex justify-center">
      <Todos todos={todos} />
    </main>
  );
}

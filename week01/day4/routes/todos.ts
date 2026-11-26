import type { FastifyInstance } from "fastify";

type Todo = {
  id: number;
  title: string;
  done: boolean;
};

const todos: Todo[] = [];
let nextId = 1;

function parseId(raw: string): number | null {
  const id = Number(raw);
  return Number.isInteger(id) && id >= 1 ? id : null;
}

export async function todosRoutes(app: FastifyInstance) {
  // GET /todos
  app.get("/todos", async (request, reply) => {
    return todos;
  });

  // POST /todos
  app.post<{ Body: { title: string } }>("/todos", async (request, reply) => {
    if (typeof request.body?.title !== "string") {
      reply.code(400);
      return { error: "title is required" };
    }

    const newTodo: Todo = {
      id: nextId++,
      title: request.body.title,
      done: false,
    };

    todos.push(newTodo);
    reply.code(201);
    return newTodo;
  });

  app.get<{ Params: { id: string } }>("/todos/:id", async (request, reply) => {
    const id = parseId(request.params.id);
    if (id === null) {
      reply.code(400);
      return { error: "invalid id" };
    }
    const todo = todos.find((t) => t.id === id);

    if (!todo) {
      reply.code(404);
      return { error: "Todo not found" };
    }

    return todo;
  });

  app.patch<{ Params: { id: string }; Body: { title?: string; done?: boolean } }>(
    "/todos/:id",
    async (request, reply) => {
      const id = parseId(request.params.id);

      if (id === null) {
        reply.code(400);
        return { error: "invalid id" };
      }
      const todo = todos.find((t) => t.id === id);

      if (!todo) {
        reply.code(404);
        return { error: "Todo not found" };
      }

      // 본문이 없으면 빈 객체로 취급
      const body = request.body ?? {};

      // 1) 검사만 먼저. 여기서는 아무것도 바꾸지 않는다.
      if (body.title !== undefined && typeof body.title !== "string") {
        reply.code(400);
        return { error: "title must be a string" };
      }
      if (body.done !== undefined && typeof body.done !== "boolean") {
        reply.code(400);
        return { error: "done must be a boolean" };
      }

      // 2) 전부 통과한 뒤에만 반영
      if (body.title !== undefined) todo.title = body.title;
      if (body.done !== undefined) todo.done = body.done;

      return todo;
    },
  );

  app.delete<{ Params: { id: string } }>("/todos/:id", async (request, reply) => {
    const id = parseId(request.params.id);
    if (id === null) {
      reply.code(400);
      return { error: "invalid id" };
    }
    const index = todos.findIndex((t) => t.id === id);
    if (index === -1) {
      reply.code(404);
      return { error: "Todo not found" };
    }
    todos.splice(index, 1);
    reply.code(204);
    return;
  });
}

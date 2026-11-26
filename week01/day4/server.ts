import Fastify from "fastify";
import { todosRoutes } from "./routes/todos.ts";

const app = Fastify({
  logger: true,
});
app.register(todosRoutes);

await app.listen({ port: 3000 });

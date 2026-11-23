import Fastify from "fastify";

const app = Fastify({
  logger: true,
});

app.get("/hello", async (request, reply) => {
  return { hello: "world" };
});

app.get("/time", async (request, reply) => {
  return { now: new Date().toISOString() };
});

app.post("/echo", async (request, reply) => {
  if (!request.body?.hasOwnProperty("name")) {
    reply.code(400);
    return { error: "name is required" };
  }
  const body = request.body;
  reply.code(201);
  return { echo: body };
});

await app.listen({ port: 3000 });

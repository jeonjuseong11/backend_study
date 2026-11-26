import type { FastifyInstance } from "fastify";

export async function basicRoutes(app: FastifyInstance) {
  app.get("/hello", async (request, reply) => {
    return { hello: "world" };
  });

  app.get("/time", async (request, reply) => {
    return { now: new Date().toISOString() };
  });
}

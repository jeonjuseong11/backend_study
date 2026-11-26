import type { FastifyInstance } from "fastify";

export async function echoRoutes(app: FastifyInstance) {
  app.post<{ Body: { name: string } }>("/echo", async (request, reply) => {
    if (typeof request.body?.name !== "string") {
      reply.code(400);
      return { error: "name is required" };
    }
    const body = request.body;
    reply.code(201);
    return { echo: body.name };
  });
}

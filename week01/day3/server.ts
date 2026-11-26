import Fastify from "fastify";
import { echoRoutes } from "./routes/echo.ts";
import { basicRoutes } from "./routes/basic.ts";

const app = Fastify({
  logger: true,
});
app.register(basicRoutes);
app.register(echoRoutes);

await app.listen({ port: 3000 });

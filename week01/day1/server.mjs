import { createServer } from "node:http";

const sendJson = (res, statusCode, data) => {
  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
};

const server = createServer((req, res) => {
  console.log(req.method, req.url);
  if (req.url === "/hello") {
    if (req.method !== "GET") {
      sendJson(res, 405, { message: "method not allowed" });
      return;
    }
    sendJson(res, 200, { message: "hello" });
  } else if (req.url === "/time") {
    if (req.method !== "GET") {
      sendJson(res, 405, { message: "method not allowed" });
      return;
    }
    sendJson(res, 200, { now: new Date().toISOString() });
  } else if (req.url === "/echo") {
    if (req.method !== "POST") {
      sendJson(res, 405, { message: "method not allowed" });
      return;
    }

    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      try {
        const data = JSON.parse(body);
        sendJson(res, 200, { message: "echo", data });
      } catch (err) {
        sendJson(res, 400, { message: "invalid json" });
        return;
      }
    });
  } else {
    sendJson(res, 404, { message: "not found" });
  }
});

server.listen(3000, () => console.log("http://localhost:3000"));

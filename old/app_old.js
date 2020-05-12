const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  const { url, method } = req;
  console.log("started");
  if (url === "/") {
    res.write(
      `<html>
            <head>
                <title>Enter Message</title>
            <head>
            <body>
                <form action="/message" method="POST">
                <input type="text" name="message">
                <button type="button">Send</button>
                </form>
            </body>
        </html>`
    );
    return res.end();
  }
  if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });
    return req.on("end", () => {
      const parseBody = Buffer.concat(body).toString();
      const message = parseBody.split("=")[1];
      console.log(parseBody);
      fs.writeFile("message.txt", message);
      res.statusCode = 302;
      res.setHeader("Location", "/");
      return res.end();
    });
  }
  res.setHeader("Content-Type", "text/html");
  res.write(`
    <html>
        <head>
            <title>My First Page</title>
        </head>
        <body>
            <h1>Hello from my Node.js Server!</h1>
        </body>
    </html>
  `);
  res.end();
});

server.listen(3000);

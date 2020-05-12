const fs = require("fs");

const requestHandler = (req, res) => {
  const { url, method } = req;
  if (url === "/") {
    res.write(
      `<html>
            <head>
                <title>Enter username</title>
            <head>
            <body>
                <form action="/create-user" method="POST">
                    <input type="text" name="Username">
                    <button type="submit">Submits</button>
                </form>
            </body>
        </html>`
    );
    return res.end();
  }
  if (url === "/users") {
    res.write(
      `<html>
            <head>
                <title>Users</title>
            <head>
            <body>
                <ul>
                    <li>Siggi</li>
                    <li>John</li>
                </ul>
            </body>
        </html>`
    );
    return res.end();
  }
  if (url === "/create-user" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });
    return req.on("end", () => {
      const parseBody = Buffer.concat(body).toString();
      const message = parseBody.split("=")[1];
      console.log(parseBody);
      res.statusCode = 302;
      res.setHeader("Location", "/users");
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
};

module.exports = requestHandler;

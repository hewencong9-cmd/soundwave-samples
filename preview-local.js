const http = require("http");
const fs = require("fs");
const path = require("path");

const dir = __dirname;
const types = {
  ".html": "text/html;charset=utf-8",
  ".css": "text/css",
  ".js": "application/javascript",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
};

const server = http.createServer((req, res) => {
  const urlPath = decodeURIComponent((req.url || "/").split("?")[0]);
  const filePath = path.resolve(dir, urlPath === "/" ? "preview.html" : `.${urlPath}`);

  if (!filePath.startsWith(dir)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  fs.readFile(filePath, (error, data) => {
    if (error) {
      res.writeHead(404);
      res.end("Not found");
      return;
    }

    res.writeHead(200, { "Content-Type": types[path.extname(filePath)] || "application/octet-stream" });
    res.end(data);
  });
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, "127.0.0.1", () => {
  console.log(`SoundWave preview: http://127.0.0.1:${PORT}`);
});

import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import https from "node:https";
import fs from "node:fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = 8080;

// Serve our front-end app assets
app.use(express.static(path.join(__dirname, "htdocs")));

// Expose node_modules as /vendor to the front-end so it can load the framework directly
app.use("/vendor", express.static(path.join(__dirname, "node_modules")));



try {
    const key = fs.readFileSync(path.join(__dirname, "server.key"));
    const cert = fs.readFileSync(path.join(__dirname, "server.cert"));
    const HTTPS_PORT = 8443;
    https.createServer({ key, cert }, app).listen(HTTPS_PORT, "0.0.0.0", () => {
        console.log(
            `Gimnasia Artistica HTTPS Server running at https://127.0.0.1:${HTTPS_PORT}`,
        );
        console.log(`Press Ctrl+C to stop`);
    });
} catch (error) {
    console.log(
        `HTTPS server not started. Generate server.key and server.cert to enable.`,
    );
    console.log(`Press Ctrl+C to stop`);
}

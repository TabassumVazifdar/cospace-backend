# Express Setup

## Health-check response

```
$ curl -w "\nHTTP %{http_code}\n" http://localhost:5000/
{"status":"active","message":"CoSpace API is running"}
HTTP 200
```

## What the AI got wrong initially

The first scaffold set `"verbatimModuleSyntax": true` in `tsconfig.json` alongside standard
`import`/`export` syntax, but the project's `package.json` declares `"type": "commonjs"`.
With `verbatimModuleSyntax` on, TypeScript refused to compile `src/index.ts`, throwing:

```
error TS1295: ECMAScript imports and exports cannot be written in a CommonJS file
under 'verbatimModuleSyntax'.
```

The fix was to remove `verbatimModuleSyntax` from `tsconfig.json` (it's meant for pure-ESM
projects) and also correct a misplaced `"include"` key that had been nested inside
`compilerOptions` instead of at the top level of the config. Separately, the pinned
`typescript@^7.0.2` dependency shipped as ESM-only and broke `ts-node-dev`'s CommonJS-based
`ts.sys` usage; downgrading to `typescript@^5.7` (resolved to `5.9.3`) restored compatibility
with `ts-node-dev` for the watch/reload dev script.

## Why the shutdown handler matters in a container

```ts
process.on("SIGINT", () => {
  console.log("Server is shutting down...");
  process.exit();
});

process.on("SIGTERM", () => {
  console.log("Server is shutting down...");
  process.exit();
});
```

Container orchestrators (Docker, Kubernetes, ECS, etc.) stop containers by sending
`SIGTERM` first, then follow up with a hard `SIGKILL` after a grace period (commonly 10-30
seconds) if the process hasn't exited. Node does not handle `SIGTERM`/`SIGINT` by default in
a way that guarantees a clean exit when there are active listeners (like an open HTTP
server) — without an explicit handler, the process can hang until the grace period expires
and gets forcibly killed, or it may exit without properly closing in-flight connections.

Explicitly listening for these signals lets the app:
- Acknowledge the shutdown request and log it for observability.
- Stop accepting new connections and close existing ones gracefully (in a fuller
  implementation, calling `server.close()` before `process.exit()`).
- Exit promptly and predictably, avoiding orchestrator timeouts, forced `SIGKILL`s, and
  potential data loss or truncated responses during rolling deployments, autoscaling
  events, or pod evictions.

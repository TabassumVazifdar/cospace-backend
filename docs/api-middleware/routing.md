# Routing

## Route planning table

Base path: `/bookings/bookings` (the router is mounted at `/bookings` in
`src/index.ts`, and its own routes are also prefixed `/bookings`, so every
path below is doubled up — see note at the end of this doc).

| Method | Path             | Payload                                   | Success status |
|--------|------------------|--------------------------------------------|-----------------|
| GET    | `/bookings/:id`  | none                                       | 200             |
| GET    | `/bookings`      | none                                       | 200             |
| POST   | `/bookings`      | `{ desk, floor, date, active }`            | 201             |
| PUT    | `/bookings/:id`  | `{ desk, floor, date, active }`            | 200             |
| PATCH  | `/bookings/:id`  | none (toggles `active` internally)         | 200             |
| DELETE | `/bookings/:id`  | none                                       | 204             |

All not-found cases across GET/PUT/PATCH/DELETE return `404 { "error": "Booking not found" }`.

## Successful POST

```
$ curl -s -i -X POST http://localhost:5000/bookings/bookings \
  -H "Content-Type: application/json" \
  -d '{"desk":"E20","floor":5,"date":"2026-09-26","active":true}'

HTTP/1.1 201 Created
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 67
ETag: W/"43-bDe8PiIyUoASDHXJS35PwYSb30g"
Date: Tue, 22 Sep 2026 11:13:55 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"id":"4","desk":"E20","floor":5,"date":"2026-09-26","active":true}
```

## 404 example

```
$ curl -s -i http://localhost:5000/bookings/bookings/999

HTTP/1.1 404 Not Found
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 29
ETag: W/"1d-EV3nGNSSE3cMZKe/e/inDRwM5eg"
Date: Tue, 22 Sep 2026 11:13:55 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"error":"Booking not found"}
```

## `req.body` without `express.json()`

Without `app.use(express.json())`, `req.body` is `undefined`, and destructuring it in the
POST handler (`const { desk, floor, date, active } = req.body`) throws immediately; I found
this by temporarily commenting out `app.use(express.json())` in `src/index.ts` and re-running
the same POST curl, which crashed the server with `TypeError: Cannot destructure property
'desk' of 'req.body' as it is undefined` and returned an HTTP 500 error page.

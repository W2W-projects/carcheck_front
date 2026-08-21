// npm run test:proxy  (node --experimental-strip-types is only needed below Node 24)
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// The source is TS with only type annotations to strip; Node 24 runs it directly.
const { sanitizeBackendError } = await import("./sanitizeBackendError.ts");

// A debug-mode Laravel exception must lose everything but a generic message.
const debugBody = {
  message: "SQLSTATE[42S02]: Base table not found: select * from `users` where `id` = 4",
  exception: "Illuminate\\Database\\QueryException",
  file: "/var/www/app/Models/User.php",
  line: 88,
  trace: [{ file: "/var/www/vendor/laravel/framework/src/Foo.php", line: 12 }],
};
const leaked = sanitizeBackendError(debugBody, 500);
assert.deepEqual(Object.keys(leaked).sort(), ["message", "status", "success"]);
assert.ok(!leaked.message.includes("SQLSTATE"), "5xx must not echo the exception text");
assert.equal(leaked.status, 500);

// Validation errors survive intact - the client renders them per field.
const validation = sanitizeBackendError(
  { message: "The given data was invalid.", errors: { email: ["The email is taken."] } },
  422,
);
assert.equal(validation.message, "The given data was invalid.");
assert.deepEqual(validation.errors, { email: ["The email is taken."] });

// A trace smuggled in under `errors` is not an array of strings, so it is dropped.
assert.equal(
  sanitizeBackendError({ errors: { trace: { file: "/var/www/x.php" } } }, 422).errors,
  undefined,
);

// 429 always yields a number of seconds, from the header or the 60s default.
assert.equal(sanitizeBackendError({}, 429, "17").retry_after, 17);
assert.equal(sanitizeBackendError({}, 429, null).retry_after, 60);

// Multi-line and overlong text is cut to one capped line.
const long = sanitizeBackendError({ message: `first\nsecond\n${"x".repeat(400)}` }, 400);
assert.equal(long.message, "first");
assert.ok(sanitizeBackendError({ message: "y".repeat(400) }, 400).message.length === 300);

// Non-object bodies (HTML error pages, null) still produce a usable message.
assert.ok(sanitizeBackendError("<html>Fatal error in /var/www/x.php</html>", 502).message);
assert.equal(sanitizeBackendError(null, 404).message, "The requested resource was not found.");

// The proxy's allow-list must not have picked up a header that leaks upstream identity.
const proxy = readFileSync(new URL("../api/service/[...].ts", import.meta.url), "utf8");
assert.ok(!/["']cookie["']/i.test(proxy), "cookies must never be forwarded");
assert.ok(/xForwardedFor: config\.trustProxyHeaders/.test(proxy), "client IP stays gated");

console.log("sanitizeBackendError: all checks passed");

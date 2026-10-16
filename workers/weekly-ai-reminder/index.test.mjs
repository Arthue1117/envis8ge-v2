import { test } from "node:test";
import assert from "node:assert/strict";
import worker, { CRON, EMAIL } from "./index.mjs";

const event = { cron: CRON, scheduledTime: Date.parse("2026-10-22T07:00:00Z") };

test("Thursday 07:00 UTC is Thursday 15:00 Singapore time", () => {
  assert.match(new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Singapore", weekday: "long", hour: "2-digit", minute: "2-digit",
  }).format(event.scheduledTime), /Thursday.*15:00/);
});

test("scheduled delivery uses the approved email and a date-specific duplicate guard", async () => {
  const original = globalThis.fetch;
  const calls = [];
  globalThis.fetch = async (url, options) => {
    calls.push({ url, options });
    return Response.json({ id: "mock-email" });
  };
  try {
    await worker.scheduled(event, { RESEND_API_KEY: "test-only" });
    assert.equal(calls.length, 1);
    assert.equal(calls[0].url, "https://api.resend.com/emails");
    assert.deepEqual(JSON.parse(calls[0].options.body), EMAIL);
    assert.equal(EMAIL.to.length, 5);
    assert.equal(EMAIL.from, "Shawn <shawn@envis8ge.com>");
    assert.match(EMAIL.subject, /\(weekly reminder\)/);
    assert.equal(calls[0].options.headers["Idempotency-Key"], "weekly-ai-reminder/2026-10-22/v1");
  } finally { globalThis.fetch = original; }
});

test("wrong schedule and absent credentials fail before any request", async () => {
  await assert.rejects(worker.scheduled({ ...event, cron: "* * * * *" }, {}), /Unexpected schedule/);
  await assert.rejects(worker.scheduled(event, {}), /Missing RESEND_API_KEY/);
});

test("permanent Resend rejection fails without retrying", async () => {
  const original = globalThis.fetch;
  let calls = 0;
  globalThis.fetch = async () => { calls++; return new Response(null, { status: 403 }); };
  try {
    await assert.rejects(worker.scheduled(event, { RESEND_API_KEY: "test-only" }), /HTTP 403/);
    assert.equal(calls, 1);
  } finally { globalThis.fetch = original; }
});

test("HTTP requests cannot send email", async () => {
  assert.equal((await worker.fetch()).status, 404);
});

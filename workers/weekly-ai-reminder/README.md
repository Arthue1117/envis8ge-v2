# Weekly AI reminder

Sends the approved internal reminder through Resend every Thursday at **15:00 Asia/Singapore** (07:00 UTC). From/reply-to: `shawn@envis8ge.com`. The five recipients, subject and body are in `index.mjs`.

This independent Worker has no public HTTP endpoint and does not change the website or newsletter automations. Each multi-recipient send uses a date-specific Resend idempotency key, including transient retries. Check Worker logs for `weekly_reminder_sent` and its Resend email ID. The reset time in the copy is a reminder based on the account snapshot; it does not query live usage limits.

## Validate

```sh
node --test workers/weekly-ai-reminder/index.test.mjs
npx wrangler deploy --dry-run --config workers/weekly-ai-reminder/wrangler.jsonc
```

## Deploy

Authenticate with the existing Cloudflare account, verify `envis8ge.com` is verified for sending in Resend, and provision the existing Resend credential securely (never commit it):

```sh
npx wrangler secret put RESEND_API_KEY --config workers/weekly-ai-reminder/wrangler.jsonc
npx wrangler deploy --config workers/weekly-ai-reminder/wrangler.jsonc
```

The first scheduled send after 16 October 2026 is **22 October 2026 at 15:00 SGT**. Deployment does not send an immediate email. Cron changes can take several minutes to propagate. To pause, remove the cron from this Worker's configuration and deploy it.

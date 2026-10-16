export const CRON = "0 7 * * THU";
export const EMAIL = Object.freeze({
  from: "Shawn <shawn@envis8ge.com>",
  to: ["shawn@envis8ge.com", "issa@envis8ge.com", "linh@envis8ge.com", "eli@envis8ge.com", "arthur@envis8ge.com"],
  reply_to: "shawn@envis8ge.com",
  subject: "Weekly AI credits reset tomorrow (weekly reminder)",
  text: `Hi team,

Our weekly Codex credits reset on Friday around 9 pm. Let's make full use of the remaining allowance!

A few ways to put it to work:

- Find ways to improve or automate our current workflows.
- Analyse competitors and craft new ads.
- Create videos with code.
- Review, debug, and improve website code.
- Create new skills for repetitive work.

P.S. If you need the credits for a client campaign, please sound out to the team so the rest of us can hold off and leave the allowance available.

Thanks,
Shawn`,
});

// HTTP requests never send mail. Only the weekly scheduled event can send.
export default {
  async fetch() {
    return new Response("Not found", { status: 404 });
  },
  async scheduled(event, env) {
    const scheduled = new Date(event.scheduledTime);
    if (event.cron !== CRON || scheduled.getUTCDay() !== 4 ||
        scheduled.getUTCHours() !== 7 || scheduled.getUTCMinutes() !== 0) {
      throw new Error("Unexpected schedule: reminder was not sent");
    }
    if (!env.RESEND_API_KEY) throw new Error("Missing RESEND_API_KEY");
    const date = scheduled.toISOString().slice(0, 10);
    const idempotencyKey = `weekly-ai-reminder/${date}/v1`;
    // Retry transient failures with the same key, preventing duplicate sends.
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        const response = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${env.RESEND_API_KEY}`,
            "Content-Type": "application/json",
            "Idempotency-Key": idempotencyKey,
          },
          body: JSON.stringify(EMAIL),
          signal: AbortSignal.timeout(15000),
        });
        if (response.ok) {
          const result = await response.json();
          if (!result.id) throw new Error("Resend response missing email ID");
          console.log(JSON.stringify({ event: "weekly_reminder_sent", date, emailId: result.id }));
          return;
        }
        await response.body?.cancel();
        if (response.status !== 429 && response.status < 500) {
          throw new PermanentSendError(`Resend rejected reminder: HTTP ${response.status}`);
        }
        throw new Error(`Resend temporarily unavailable: HTTP ${response.status}`);
      } catch (error) {
        if (error instanceof PermanentSendError || attempt === 2) throw error;
        await new Promise(resolve => setTimeout(resolve, (attempt + 1) * 2000));
      }
    }
  },
};

class PermanentSendError extends Error {}

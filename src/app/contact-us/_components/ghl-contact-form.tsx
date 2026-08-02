import Script from "next/script";

/**
 * Official GoHighLevel embedded form (Form 1, id uQ0OWba4stdlZQ6PMwKp),
 * replacing the earlier custom-built form + simulated submit — this is
 * now the real, wired-up submission path instead of a mockup. Markup and
 * data-* attributes are the exact embed snippet provided; the wrapper's
 * `min-height` matches `data-height` so the section doesn't collapse to
 * 0 before form_embed.js loads and takes over sizing the iframe.
 */
export function GhlContactForm() {
  return (
    <div style={{ minHeight: 894 }}>
      <iframe
        src="https://api.leadconnectorhq.com/widget/form/uQ0OWba4stdlZQ6PMwKp"
        style={{
          width: "100%",
          height: "100%",
          border: "none",
          borderRadius: "8px",
        }}
        id="inline-uQ0OWba4stdlZQ6PMwKp"
        data-layout="{'id':'INLINE'}"
        data-trigger-type="alwaysShow"
        data-trigger-value=""
        data-activation-type="alwaysActivated"
        data-activation-value=""
        data-deactivation-type="neverDeactivate"
        data-deactivation-value=""
        data-form-name="Form 1"
        data-height="894"
        data-layout-iframe-id="inline-uQ0OWba4stdlZQ6PMwKp"
        data-form-id="uQ0OWba4stdlZQ6PMwKp"
        title="Form 1"
      />
      <Script
        src="https://link.msgsndr.com/js/form_embed.js"
        strategy="afterInteractive"
      />
    </div>
  );
}

export const prerender = false;
import nodemailer from "nodemailer";

export async function POST({ request }: { request: Request }) {
  try {
    const data = await request.json();

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: import.meta.env.EMAIL_USER, // your Gmail
        pass: import.meta.env.EMAIL_PASS, // App Password
      },
    });

const emailHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>New Project Inquiry — Panze</title>

<style>
@import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400&display=swap');

body{
  margin:0;
  padding:0;
  background:#f6f6f6;
  -webkit-font-smoothing:antialiased;
}

.label{
  font-family:'DM Mono',Consolas,Monaco,'Courier New',monospace;
  font-size:14px;
  font-weight:400;
  line-height:150%;
  letter-spacing:-0.04em;
  text-transform:uppercase;
  color:#8A8A8A;
  margin-bottom:6px;
}

.value{
  font-family:'DM Mono',Consolas,Monaco,'Courier New',monospace;
  font-size:14px;
  font-weight:400;
  line-height:150%;
  letter-spacing:-0.04em;
  color:#301C1B;
}

.mono{
  font-family:'DM Mono',Consolas,Monaco,'Courier New',monospace;
  font-size:14px;
  font-weight:400;
  line-height:150%;
  letter-spacing:-0.04em;
}

.heading{
  margin:0;
  font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;
  font-size:42px;
  line-height:110%;
  font-weight:600;
  letter-spacing:-0.04em;
  color:#301C1B;
}

.description{
  margin-top:16px;
  color:#6B6B6B;
  font-size:16px;
  line-height:170%;
  font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;
}

.button{
  display:inline-block;
  padding:16px 32px;
  background:#301C1B;
  color:#ffffff !important;
  text-decoration:none;
  font-family:'DM Mono',Consolas,Monaco,'Courier New',monospace;
  font-size:14px;
  font-weight:400;
  line-height:150%;
  letter-spacing:-0.04em;
}
</style>
</head>

<body>

<table
  width="100%"
  cellpadding="0"
  cellspacing="0"
  border="0"
  style="background:#f6f6f6;padding:40px 16px;"
>
<tr>
<td align="center">

<table
  width="100%"
  cellpadding="0"
  cellspacing="0"
  border="0"
  style="
    max-width:720px;
    background:#ffffff;
  "
>

  <!-- LOGO -->
  <tr>
    <td style="padding:48px 32px 0;">

      <img
        src="https://i.ibb.co.com/5WDmD0SH/Frame-2147259434-2.png"
        alt="Panze"
        width="140"
        style="
          display:block;
          border:0;
          outline:none;
        "
      />

    </td>
  </tr>

  <!-- HEADING -->
  <tr>
    <td style="padding:40px 32px 0;">

      <div
        class="mono"
        style="
          text-transform:uppercase;
          color:#9A9A9A;
          margin-bottom:16px;
        "
      >
        New Lead Submission
      </div>

      <h1 class="heading">
        New Project Inquiry Received
      </h1>

      <div class="description">
        A potential client has submitted a project inquiry through the Panze website.
        Review the details below and follow up if the opportunity aligns with your
        current priorities.
      </div>

    </td>
  </tr>

  <!-- INFO GRID -->
  <tr>
    <td style="padding:56px 32px 0;">

      <table
        width="100%"
        cellpadding="0"
        cellspacing="0"
        border="0"
      >

        <!-- ROW 1 -->

        <tr>

          <td
            width="50%"
            valign="top"
            style="padding:0 24px 32px 0;"
          >
            <div class="label">Full Name</div>
            <div class="value">
              ${data.fullName}
            </div>
          </td>

          <td
            width="50%"
            valign="top"
            style="padding:0 0 32px 24px;"
          >
            <div class="label">Email Address</div>
            <div class="value">
              ${data.email}
            </div>
          </td>

        </tr>

        <!-- ROW 2 -->

        <tr>

          <td
            width="50%"
            valign="top"
            style="padding:0 24px 32px 0;"
          >
            <div class="label">Service Required</div>
            <div class="value">
              ${data.service}
            </div>
          </td>

          <td
            width="50%"
            valign="top"
            style="padding:0 0 32px 24px;"
          >
            <div class="label">Budget Range</div>
            <div class="value">
              ${data.budget}
            </div>
          </td>

        </tr>

        <!-- ROW 3 -->

        <tr>

          <td
            width="50%"
            valign="top"
            style="padding-right:24px;"
          >
            <div class="label">How They Found Us</div>
            <div class="value">
              ${data.source}
            </div>
          </td>

          <td
            width="50%"
            valign="top"
            style="padding-left:24px;"
          >
            <div class="label">Submitted</div>
            <div class="value">
              ${new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </td>

        </tr>

      </table>

    </td>
  </tr>

  <!-- PROJECT DETAILS -->

  <tr>
    <td style="padding:72px 32px 0;">

      <div
        class="label"
        style="margin-bottom:16px;"
      >
        Project Details
      </div>

      <div
        class="value"
        style="
          color:#4B4B4B;
          line-height:180%;
        "
      >
        ${data.details.replace(/\n/g, "<br>")}
      </div>

    </td>
  </tr>

  <!-- CTA -->

  <tr>
    <td style="padding:48px 32px 0;">

      <a
        href="mailto:${data.email}"
        class="button"
      >
        Reply To Client
      </a>

    </td>
  </tr>

  <!-- FOOTER -->

  <tr>
    <td
      class="mono"
      style="
        padding:72px 32px 40px;
        color:#A0A0A0;
      "
    >
      © 2026, Panze LLC, All Rights Reserved.
    </td>
  </tr>

</table>

</td>
</tr>
</table>

</body>
</html>
`;

    await transporter.sendMail({
      from: data.email,
      to: import.meta.env.EMAIL_USER, // Send to yourself
      subject: `New Project Inquiry: ${data.service}`,
      html: emailHTML,
    });

    return new Response(
      JSON.stringify({ success: true, message: "Email sent!" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    console.error("Nodemailer Error:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Failed to send email" }),
      {
        status: 500,
      },
    );
  }
}

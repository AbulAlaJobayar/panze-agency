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
  <title>New Project Inquiry - Panze</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: 'Inter', Arial, sans-serif;
      background-color: #0a0a0a;
      color: #e2e8f0;
      line-height: 1.6;
    }
    .container {
      max-width: 600px;
      margin: 40px auto;
      background: linear-gradient(145deg, #1a1a1a, #111111);
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
      border: 1px solid #27272a;
    }
    .header {
      background: linear-gradient(90deg, #f97316, #ea580c);
      padding: 40px 40px 30px;
      text-align: center;
      color: white;
    }
    .logo {
      font-size: 28px;
      font-weight: 800;
      letter-spacing: -1px;
      margin-bottom: 8px;
    }
    .tagline {
      font-size: 15px;
      opacity: 0.9;
      font-weight: 500;
    }
    .content {
      padding: 40px;
    }
    h2 {
      color: #f3f4f6;
      font-size: 26px;
      margin: 0 0 24px 0;
      font-weight: 700;
    }
    .info-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      margin: 28px 0;
    }
    .info-item {
      background: #18181b;
      padding: 18px 22px;
      border-radius: 12px;
      border-left: 4px solid #f97316;
    }
    .label {
      font-size: 13px;
      color: #a1a1aa;
      margin-bottom: 6px;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .value {
      color: #f1f5f9;
      font-size: 17px;
      font-weight: 600;
    }
    .details {
      background: #18181b;
      padding: 28px;
      border-radius: 16px;
      margin: 32px 0;
      border: 1px solid #27272a;
    }
    .details h3 {
      margin-top: 0;
      color: #f97316;
      font-size: 18px;
    }
    hr {
      border: none;
      height: 1px;
      background: #27272a;
      margin: 32px 0;
    }
    .footer {
      text-align: center;
      padding: 32px;
      background: #0a0a0a;
      font-size: 13px;
      color: #71717a;
      border-top: 1px solid #27272a;
    }
    .highlight {
      color: #f97316;
      font-weight: 700;
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <div class="logo">PANZE</div>
      <div class="tagline">Strategic Digital Solutions</div>
    </div>

    <!-- Content -->
    <div class="content">
      <h2>New Project Inquiry Received</h2>
      <p style="color:#a1a1aa; font-size:17px;">You have received a new client inquiry. Here are the details:</p>

      <div class="info-grid">
        <div class="info-item">
          <div class="label">Full Name</div>
          <div class="value">${data.fullName}</div>
        </div>
        <div class="info-item">
          <div class="label">Email Address</div>
          <div class="value">${data.email}</div>
        </div>
        <div class="info-item">
          <div class="label">Service Required</div>
          <div class="value">${data.service}</div>
        </div>
        <div class="info-item">
          <div class="label">Budget Range</div>
          <div class="value highlight">${data.budget}</div>
        </div>
      </div>

      <div class="info-item" style="grid-column: 1 / -1;">
        <div class="label">How They Found Us</div>
        <div class="value">${data.source}</div>
      </div>

      <hr>

      <div class="details">
        <h3>Project Details</h3>
        <p style="color:#d1d5db; font-size:16px; line-height:1.7;">
          ${data.details.replace(/\n/g, "<br>")}
        </p>
      </div>

      <p style="text-align:center; margin-top:40px;">
        <a href="mailto:${data.email}" 
           style="background:#f97316; color:white; padding:14px 36px; border-radius:9999px; text-decoration:none; font-weight:600; display:inline-block;">
          Reply to Client
        </a>
      </p>
    </div>

    <!-- Footer -->
    <div class="footer">
      <p>© ${new Date().getFullYear()} Panze • All Rights Reserved</p>
      <p style="margin-top:8px;">Strategic SaaS & MVP Development Studio</p>
    </div>
  </div>
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

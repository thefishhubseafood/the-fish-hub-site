import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    const body = await request.json();

    const requiredFields = [
      body.businessName,
      body.contactPerson,
      body.email,
      body.phone,
      body.seafoodItem,
      body.quantity,
      body.deliveryLocation,
    ];

    if (requiredFields.some((value) => !value || !String(value).trim())) {
      return NextResponse.json(
        { error: "Please fill in all required fields." },
        { status: 400 }
      );
    }

    const host = process.env.SMTP_HOST;
    const port = Number(process.env.SMTP_PORT || 465);
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const orderTo = process.env.ORDER_TO_EMAIL || process.env.SMTP_USER;

    if (!host || !user || !pass || !orderTo) {
      return NextResponse.json(
        { error: "Email settings are not configured yet. Add SMTP environment variables first." },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });

    const subject = `New quote request - ${body.seafoodItem} - ${body.businessName}`;

    const text = `
New quote request from The Fish Hub website

Business Name: ${body.businessName}
Contact Person: ${body.contactPerson}
Email: ${body.email}
Phone: ${body.phone}
Seafood Item: ${body.seafoodItem}
Quantity: ${body.quantity}
Required Date: ${body.requiredDate || "Not specified"}
Delivery Location: ${body.deliveryLocation}
Order Notes: ${body.notes || "None"}
    `.trim();

    const html = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #0f172a;">
        <h2 style="margin-bottom: 12px;">New quote request from The Fish Hub website</h2>
        <table cellpadding="8" cellspacing="0" border="0" style="border-collapse: collapse;">
          <tr><td><strong>Business Name</strong></td><td>${escapeHtml(body.businessName || "")}</td></tr>
          <tr><td><strong>Contact Person</strong></td><td>${escapeHtml(body.contactPerson || "")}</td></tr>
          <tr><td><strong>Email</strong></td><td>${escapeHtml(body.email || "")}</td></tr>
          <tr><td><strong>Phone</strong></td><td>${escapeHtml(body.phone || "")}</td></tr>
          <tr><td><strong>Seafood Item</strong></td><td>${escapeHtml(body.seafoodItem || "")}</td></tr>
          <tr><td><strong>Quantity</strong></td><td>${escapeHtml(body.quantity || "")}</td></tr>
          <tr><td><strong>Required Date</strong></td><td>${escapeHtml(body.requiredDate || "Not specified")}</td></tr>
          <tr><td><strong>Delivery Location</strong></td><td>${escapeHtml(body.deliveryLocation || "")}</td></tr>
          <tr><td><strong>Order Notes</strong></td><td>${escapeHtml(body.notes || "None")}</td></tr>
        </table>
      </div>
    `;

    await transporter.sendMail({
      from: `"The Fish Hub Website" <${user}>`,
      to: orderTo,
      replyTo: body.email,
      subject,
      text,
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Quote route error:", error);
    return NextResponse.json(
      { error: "Could not send the quote request." },
      { status: 500 }
    );
  }
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
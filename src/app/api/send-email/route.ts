import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, phone, category, source } = body;

    const resendApiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.NOTIFICATION_EMAIL || 'onceozelegitim@gmail.com';
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';

    if (!resendApiKey) {
      console.warn('RESEND_API_KEY is not defined. Email notification skipped.');
      return NextResponse.json(
        { success: false, error: 'RESEND_API_KEY env variable is missing.' },
        { status: 500 }
      );
    }

    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: fromEmail,
        to: toEmail,
        subject: `Yeni Başvuru: ${fullName}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
            <h2 style="color: #1e3a8a; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">Yeni Randevu / İletişim Formu Başvurusu</h2>
            <p style="font-size: 16px; margin: 15px 0;">Siteden yeni bir başvuru formu dolduruldu. Detaylar aşağıdadır:</p>
            <table style="width: 100%; border-collapse: collapse;">
              <tr style="background-color: #f3f4f6;">
                <td style="padding: 10px; font-weight: bold; width: 150px;">Adı Soyadı:</td>
                <td style="padding: 10px;">${fullName}</td>
              </tr>
              <tr>
                <td style="padding: 10px; font-weight: bold;">Telefon:</td>
                <td style="padding: 10px;"><a href="tel:${phone}">${phone}</a></td>
              </tr>
              <tr style="background-color: #f3f4f6;">
                <td style="padding: 10px; font-weight: bold;">İlgi Alanı / Konu:</td>
                <td style="padding: 10px;">${category}</td>
              </tr>
              <tr>
                <td style="padding: 10px; font-weight: bold;">Form Kaynağı:</td>
                <td style="padding: 10px;">${source || 'İletişim Sayfası'}</td>
              </tr>
            </table>
            <p style="font-size: 14px; color: #666; margin-top: 30px; border-top: 1px solid #eee; padding-top: 10px;">
              Bu e-posta <strong>onceozelegitim.com</strong> web sitesi üzerinden otomatik olarak gönderilmiştir.
            </p>
          </div>
        `,
      }),
    });

    const data = await emailResponse.json();

    if (!emailResponse.ok) {
      console.error('Resend API error:', data);
      return NextResponse.json({ success: false, error: data }, { status: emailResponse.status });
    }

    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    console.error('Send email route error:', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

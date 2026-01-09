import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { firstName, lastName, phone, email, message, wantCall } = body;

        // Validation
        if (!firstName || !email || !message) {
            return NextResponse.json(
                { error: 'Gerekli alanlar eksik' },
                { status: 400 }
            );
        }

        const fullName = `${firstName} ${lastName}`.trim();

        // Save to Supabase (Database) via REST API
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

        if (supabaseUrl && supabaseKey) {
            try {
                const dbResponse = await fetch(`${supabaseUrl}/rest/v1/contact_messages`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'apikey': supabaseKey,
                        'Authorization': `Bearer ${supabaseKey}`,
                        'Prefer': 'return=minimal'
                    },
                    body: JSON.stringify({
                        first_name: firstName,
                        last_name: lastName,
                        phone: phone,
                        email: email,
                        message: message,
                        want_call: wantCall
                    })
                });

                if (!dbResponse.ok) {
                    const errorText = await dbResponse.text();
                    console.error('Supabase Save Error:', errorText);
                    // We continue to send email even if DB save fails, or we can throw. 
                    // For now logging is safer to ensure at least email goes out.
                }
            } catch (dbError) {
                console.error('Supabase Connection Error:', dbError);
            }
        }

        // Send email to user (confirmation)
        await resend.emails.send({
            from: 'Yosuun <onboarding@resend.dev>', // Domain doğrulandıktan sonra: info@yosuun.com
            to: email,
            subject: 'Mesajınız Alındı! 👋',
            html: `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: Arial, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f8fafc;">
        <tr>
            <td align="center" style="padding: 40px 20px;">
                
                <!-- Logo -->
                <table width="600" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                        <td align="center" style="padding-bottom: 30px;">
                            <img src="https://www.hizliresim.com.tr/uploads/images/1767973155_65b22dbea7f8a571.png" alt="Yosuun" width="300" style="display: block;" />
                        </td>
                    </tr>
                </table>
                
                <!-- White Card -->
                <!-- White Card -->
                <table width="80%" cellpadding="0" cellspacing="0" border="0" style="border-collapse: separate; background: linear-gradient(to right, #ccfac5, #ffffff, #ffffff); border-radius: 32px; box-shadow: 0 16px 40px rgba(0,0,0,0.08); -webkit-box-shadow: 0 16px 40px rgba(0,0,0,0.08);">
                    <tr>
                        <td style="padding: 40px;">
                            
                            <!-- Greeting -->
                            <h1 style="margin: 0 0 20px 0; font-size: 24px; color: #000000; font-weight: 600; text-align: center;">
                                Merhaba <span style="color: #78f666; font-style: italic; font-family: Georgia, 'Times New Roman', serif;">${firstName}</span> ${lastName}
                            </h1>
                            
                            <p style="margin: 0; font-size: 16px; color: #475569; line-height: 1.6; text-align: center;">
                                Mesajın bize ulaştı, teşekkür ederiz. Yosuun’a gösterdiğin ilgi için mutluyuz.<br/>
                                En kısa sürede sana geri dönüş yaparak tüm sorularını<br/>
                                birlikte değerlendireceğiz.
                            </p>
                            
                            <!-- Social Icons -->
                            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top: 30px;">
                                <tr>
                                    <td align="center">
                                        <table cellpadding="0" cellspacing="0" border="0">
                                            <tr>
                                                <td style="padding: 0 10px;">
                                                    <img src="https://www.hizliresim.com.tr/uploads/images/1767977694_c1d2f1e496845416.png" alt="Icon 1" width="40" height="40" style="display: block;" />
                                                </td>
                                                <td style="padding: 0 10px;">
                                                    <img src="https://www.hizliresim.com.tr/uploads/images/1767977736_5d66759510a9118c.png" alt="Icon 2" width="40" height="40" style="display: block;" />
                                                </td>
                                                <td style="padding: 0 10px;">
                                                    <img src="https://www.hizliresim.com.tr/uploads/images/1767977745_344ea291f0c542ea.png" alt="Icon 3" width="40" height="40" style="display: block;" />
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                            
                        </td>
                    </tr>
                </table>
                
                <!-- Footer -->
                <table width="600" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                        <td align="center" style="padding: 30px 0;">
                            <p style="margin: 0; font-size: 14px; color: #94a3b8;">
                                <strong>Yosuun</strong>
                            </p>
                            <p style="margin: 8px 0 0 0; font-size: 12px; color: #94a3b8;">
                                Bu otomatik bir mesaj, ama arkasında gerçek insanlar var!
                            </p>
                        </td>
                    </tr>
                </table>
                
            </td>
        </tr>
    </table>
</body>
</html>
            `,
        });



        // Send email to admin (info@yosuun.com)
        await resend.emails.send({
            from: 'Yosuun Web Form <onboarding@resend.dev>',
            to: 'info@yosuun.com',
            subject: `Yeni İletişim Formu: ${firstName} ${lastName}`,
            html: `
                <h2>Yeni Mesaj Var! 🎉</h2>
                <p><strong>Gönderen:</strong> ${firstName} ${lastName}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Telefon:</strong> ${phone}</p>
                <p><strong>Beni Arayabilirsiniz:</strong> ${wantCall ? '✅ EVET' : '❌ HAYIR'}</p>
                <p><strong>Mesaj:</strong></p>
                <blockquote style="background: #f1f5f9; padding: 15px; border-left: 4px solid #000;">
                    ${message}
                </blockquote>
            `
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Resend Error:', error);
        return NextResponse.json(
            { error: 'E-posta gönderilemedi' },
            { status: 500 }
        );
    }
}

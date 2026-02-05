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
            from: 'Yosuun <info@yosuun.com>',
            to: email,
            subject: 'Mesajınız Alındı! 👋',
            html: `
<!DOCTYPE html>
<html lang="tr" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="color-scheme" content="light only">
    <meta name="supported-color-schemes" content="light only">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <!--[if mso]>
    <xml>
        <o:OfficeDocumentSettings>
            <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
    </xml>
    <![endif]-->
    <style type="text/css">
        :root {
            color-scheme: light only;
            supported-color-schemes: light only;
        }
        
        /* Dark Mode Override Prevention */
        [data-ogsc], [data-ogsb] {
            background-color: #f8fafc !important;
            color: #1e293b !important;
        }
        
        @media (prefers-color-scheme: dark) {
            .email-body, .email-container, .email-content {
                background-color: #f8fafc !important;
            }
            .card-bg {
                background-color: #ffffff !important;
                background: linear-gradient(to right, #ccfac5, #ffffff, #ffffff) !important;
            }
            .text-dark {
                color: #1e293b !important;
            }
            .text-green {
                color: #22c55e !important;
            }
            .text-gray {
                color: #475569 !important;
            }
            .text-light-gray {
                color: #64748b !important;
            }
        }
        
        /* Mobile Responsive */
        @media only screen and (max-width: 600px) {
            .email-container {
                width: 100% !important;
                max-width: 100% !important;
            }
            .card-table {
                width: 94% !important;
            }
            .card-padding {
                padding: 24px 20px !important;
            }
            .greeting-text {
                font-size: 20px !important;
                line-height: 1.4 !important;
            }
            .body-text {
                font-size: 14px !important;
            }
            .logo-img {
                width: 220px !important;
            }
        }
    </style>
</head>
<body class="email-body" style="margin: 0; padding: 0; background-color: #f8fafc !important; font-family: Arial, Helvetica, sans-serif; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;" bgcolor="#f8fafc">
    
    <!-- Preheader Text (Hidden) -->
    <div style="display: none; max-height: 0; overflow: hidden; font-size: 1px; line-height: 1px; color: #f8fafc;">
        Mesajınız bize ulaştı! En kısa sürede size geri dönüş yapacağız.
    </div>
    
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" class="email-container" style="background-color: #f8fafc !important;" bgcolor="#f8fafc">
        <tr>
            <td align="center" style="padding: 40px 16px;" bgcolor="#f8fafc">
                
                <!-- Logo -->
                <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" class="email-container" style="max-width: 600px;">
                    <tr>
                        <td align="center" style="padding-bottom: 30px;">
                            <img src="https://hscaphuhndggoryhceoz.supabase.co/storage/v1/object/public/foto/y-logo.png" alt="Yosuun" width="280" class="logo-img" style="display: block; max-width: 280px; height: auto;" />
                        </td>
                    </tr>
                </table>
                
                <!-- White Card with Gradient -->
                <table role="presentation" width="90%" cellpadding="0" cellspacing="0" border="0" class="card-table" style="border-collapse: separate; max-width: 520px; background-color: #ffffff; background: linear-gradient(to right, #ccfac5 0%, #ffffff 40%, #ffffff 100%); border-radius: 32px; box-shadow: 0 16px 40px rgba(0,0,0,0.08); -webkit-box-shadow: 0 16px 40px rgba(0,0,0,0.08);" bgcolor="#ffffff">
                    <tr>
                        <td class="card-padding email-content card-bg" style="padding: 40px 32px; background-color: transparent;">
                            
                            <!-- Greeting -->
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                                <tr>
                                    <td align="center" style="padding-bottom: 20px;">
                                        <h1 class="greeting-text text-dark" style="margin: 0; font-size: 24px; color: #1e293b !important; font-weight: 600; line-height: 1.3;">
                                            Merhaba <span class="text-green" style="color: #22c55e !important; font-style: italic; font-family: Georgia, 'Times New Roman', Times, serif;">${firstName}</span>
                                        </h1>
                                        <h1 class="greeting-text text-dark" style="margin: 4px 0 0 0; font-size: 24px; color: #1e293b !important; font-weight: 600; line-height: 1.3;">
                                            ${lastName}
                                        </h1>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Message Body -->
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                                <tr>
                                    <td align="center">
                                        <p class="body-text text-gray" style="margin: 0; font-size: 16px; color: #475569 !important; line-height: 1.7; text-align: center;">
                                            Mesajın bize ulaştı, teşekkür ederiz. Yosuun'a gösterdiğin ilgi için mutluyuz.
                                        </p>
                                        <p class="body-text text-gray" style="margin: 12px 0 0 0; font-size: 16px; color: #475569 !important; line-height: 1.7; text-align: center;">
                                            En kısa sürede sana geri dönüş yaparak tüm sorularını birlikte değerlendireceğiz.
                                        </p>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Social Icons -->
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top: 32px;">
                                <tr>
                                    <td align="center">
                                        <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                                            <tr>
                                                <td style="padding: 0 12px;">
                                                    <a href="https://yosuun.com" target="_blank" style="text-decoration: none; display: inline-block;">
                                                        <img src="https://hscaphuhndggoryhceoz.supabase.co/storage/v1/object/public/foto/website-icon.png" alt="Website" width="40" height="40" style="display: block; border: 0;" />
                                                    </a>
                                                </td>
                                                <td style="padding: 0 12px;">
                                                    <a href="https://www.linkedin.com/company/yosuun/" target="_blank" style="text-decoration: none; display: inline-block;">
                                                        <img src="https://hscaphuhndggoryhceoz.supabase.co/storage/v1/object/public/foto/linkedin-icon.png" alt="LinkedIn" width="40" height="40" style="display: block; border: 0;" />
                                                    </a>
                                                </td>
                                                <td style="padding: 0 12px;">
                                                    <a href="https://www.instagram.com/yosuunturkey/" target="_blank" style="text-decoration: none; display: inline-block;">
                                                        <img src="https://hscaphuhndggoryhceoz.supabase.co/storage/v1/object/public/foto/instagram-icon.png" alt="Instagram" width="40" height="40" style="display: block; border: 0;" />
                                                    </a>
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
                <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" class="email-container" style="max-width: 600px;">
                    <tr>
                        <td align="center" style="padding: 32px 16px;">
                            <p class="text-light-gray" style="margin: 0; font-size: 14px; color: #64748b !important;">
                                <strong style="color: #64748b !important;">Yosuun</strong>
                            </p>
                            <p class="text-light-gray" style="margin: 8px 0 0 0; font-size: 12px; color: #64748b !important;">
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
            from: 'Yosuun Web Form <info@yosuun.com>',
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

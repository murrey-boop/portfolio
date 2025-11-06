import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json();

    // Basic validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: `Portfolio Contact <${process.env.SENDER_EMAIL || 'noreply@yourdomain.com'}>`,
      to: [process.env.RECIPIENT_EMAIL || 'your.email@example.com'],
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #6366f1, #3b82f6); padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px; font-weight: 600;">
              New Portfolio Contact Message
            </h1>
          </div>
          
          <div style="background: #f8fafc; padding: 30px; border-radius: 0 0 12px 12px; border: 1px solid #e2e8f0; border-top: none;">
            <div style="background: white; padding: 25px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
              <h2 style="color: #1e293b; margin: 0 0 20px 0; font-size: 18px; font-weight: 600;">
                Contact Details
              </h2>
              
              <div style="margin-bottom: 15px;">
                <strong style="color: #475569; display: inline-block; width: 80px;">Name:</strong>
                <span style="color: #1e293b;">${name}</span>
              </div>
              
              <div style="margin-bottom: 15px;">
                <strong style="color: #475569; display: inline-block; width: 80px;">Email:</strong>
                <a href="mailto:${email}" style="color: #3b82f6; text-decoration: none;">${email}</a>
              </div>
              
              <div style="margin-bottom: 20px;">
                <strong style="color: #475569; display: inline-block; width: 80px;">Subject:</strong>
                <span style="color: #1e293b;">${subject}</span>
              </div>
              
              <div>
                <strong style="color: #475569; display: block; margin-bottom: 10px;">Message:</strong>
                <div style="background: #f1f5f9; padding: 15px; border-radius: 6px; border-left: 4px solid #3b82f6; white-space: pre-wrap; color: #1e293b; line-height: 1.6;">
${message}
                </div>
              </div>
            </div>
            
            <div style="margin-top: 20px; padding: 15px; background: #dbeafe; border-radius: 6px; text-align: center;">
              <p style="margin: 0; color: #1e40af; font-size: 14px;">
                💡 <strong>Quick Reply:</strong> You can reply directly to this email to respond to ${name}
              </p>
            </div>
          </div>
          
          <div style="margin-top: 20px; text-align: center; color: #64748b; font-size: 12px;">
            <p style="margin: 0;">This message was sent from your portfolio contact form</p>
            <p style="margin: 5px 0 0 0;">Sent on ${new Date().toLocaleString()}</p>
          </div>
        </div>
      `,
      replyTo: email, // This allows you to reply directly to the sender
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email. Please try again.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { 
        message: 'Email sent successfully!',
        id: data?.id 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Email API error:', error);
    return NextResponse.json(
      { error: 'Internal server error. Please try again.' },
      { status: 500 }
    );
  }
}
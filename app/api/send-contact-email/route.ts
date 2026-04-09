import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, message } = body;

    if (!phone) {
      return NextResponse.json(
        { error: 'Số điện thoại là bắt buộc' },
        { status: 400 }
      );
    }

    const emailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #d97706; border-bottom: 2px solid #d97706; padding-bottom: 10px;">
          Thông tin liên hệ mới từ Website
        </h2>
        
        <div style="margin: 20px 0;">
          <p style="margin: 10px 0;">
            <strong>Họ và tên:</strong> ${name || 'Không cung cấp'}
          </p>
          <p style="margin: 10px 0;">
            <strong>Số điện thoại:</strong> 
            <a href="tel:${phone}" style="color: #2563eb;">${phone}</a>
          </p>
          <p style="margin: 10px 0;">
            <strong>Email:</strong> 
            ${email ? `<a href="mailto:${email}" style="color: #2563eb;">${email}</a>` : 'Không cung cấp'}
          </p>
          <p style="margin: 10px 0;">
            <strong>Nội dung:</strong>
          </p>
          <div style="background-color: #f3f4f6; padding: 15px; border-radius: 8px; margin-top: 5px;">
            ${message || 'Không có nội dung'}
          </div>
        </div>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 12px;">
          <p>Email này được gửi từ form liên hệ trên website Sàn Gỗ Miền Bắc</p>
          <p>Thời gian: ${new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })}</p>
        </div>
      </div>
    `;

    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
      to: [process.env.CONTACT_EMAIL || 'trunghieupython10102001@gmail.com'],
      subject: `[Liên hệ mới] ${name || 'Khách hàng'} - ${phone}`,
      html: emailContent,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Không thể gửi email. Vui lòng thử lại sau.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Email đã được gửi thành công',
      data 
    });
  } catch (error) {
    console.error('Error sending contact email:', error);
    return NextResponse.json(
      { error: 'Có lỗi xảy ra. Vui lòng thử lại sau.' },
      { status: 500 }
    );
  }
}

import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, area, message } = body;

    if (!phone) {
      return NextResponse.json(
        { error: 'Số điện thoại là bắt buộc' },
        { status: 400 }
      );
    }

    if (!name) {
      return NextResponse.json(
        { error: 'Họ và tên là bắt buộc' },
        { status: 400 }
      );
    }

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #d97706; border-bottom: 2px solid #d97706; padding-bottom: 10px;">
          Thông tin liên hệ mới từ Website
        </h2>
        <div style="margin: 20px 0;">
          <p style="margin: 10px 0;">
            <strong>Họ và tên:</strong> ${name}
          </p>
          <p style="margin: 10px 0;">
            <strong>Số điện thoại:</strong> ${phone}
          </p>
          <p style="margin: 10px 0;">
            <strong>Khu vực cần thi công:</strong> ${area || 'Không có'}
          </p>
          <p style="margin: 10px 0;">
            <strong>Nội dung thêm:</strong><br/>
            ${message || 'Không có'}
          </p>
        </div>
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
        <p style="color: #6b7280; font-size: 12px;">
          Email này được gửi từ form liên hệ trên website.<br/>
          Thời gian: ${new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })}
        </p>
      </div>
    `;

    // Dynamic import Resend to avoid build issues
    const { Resend } = await import('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);

    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
      to: [process.env.CONTACT_EMAIL || 'trunghieupython10102001@gmail.com'],
      subject: `[Liên hệ mới] ${name} - ${phone}${area ? ` - ${area}` : ''}`,
      html: emailHtml,
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

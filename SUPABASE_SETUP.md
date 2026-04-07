# Hướng dẫn Setup Supabase Database

## Bước 1: Tạo Supabase Project (2 phút)

1. Truy cập [https://supabase.com](https://supabase.com)
2. Click **Start your project** (hoặc **Sign In** nếu đã có account)
3. Đăng nhập bằng GitHub (khuyên dùng) hoặc email
4. Click **New Project**
5. Điền thông tin:
   - **Name**: Wood Shop Contact Forms
   - **Database Password**: Tạo password mạnh (lưu lại)
   - **Region**: Southeast Asia (Singapore) - gần Việt Nam nhất
   - **Pricing Plan**: Free
6. Click **Create new project**
7. Đợi ~2 phút để project được khởi tạo

## Bước 2: Tạo Table (1 phút)

1. Trong Supabase Dashboard, click **Table Editor** (icon bảng bên trái)
2. Click **Create a new table**
3. Điền thông tin:
   - **Name**: `contact_forms`
   - **Description**: Customer contact form submissions
   - **Enable Row Level Security (RLS)**: ✅ Bật (để bảo mật)

4. Thêm các columns (bỏ qua id, created_at có sẵn):

| Name | Type | Default Value | Primary | Nullable |
|------|------|---------------|---------|----------|
| name | text | - | - | ❌ |
| phone | text | - | - | ❌ |
| address | text | - | - | ❌ |
| area | numeric | - | - | ❌ |
| note | text | - | - | ✅ |

5. Click **Save**

## Bước 3: Cấu hình RLS Policy (1 phút)

Vì bật RLS, cần tạo policy để API có thể insert data:

1. Trong Table Editor, click vào table `contact_forms`
2. Click tab **RLS Policies**
3. Click **New Policy**
4. Chọn **Create a policy from scratch**
5. Điền:
   - **Policy name**: `Enable insert for service role`
   - **Allowed operation**: `INSERT`
   - **Target roles**: `service_role`
   - **USING expression**: `true`
   - **WITH CHECK expression**: `true`
6. Click **Review** → **Save policy**

## Bước 4: Lấy API Keys (30 giây)

1. Click **Project Settings** (icon bánh răng dưới cùng bên trái)
2. Click **API** trong menu
3. Tìm section **Project API keys**
4. Copy 2 keys sau:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public**: `eyJhbGc...` (key dài)

## Bước 5: Cấu hình Environment Variables

1. Tạo file `.env.local` trong thư mục root (nếu chưa có):

```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
```

2. Thay thế bằng URL và key thực của bạn từ bước 4

## Bước 6: Restart Dev Server

```bash
npm run dev
```

## ✅ Hoàn thành!

Giờ khi khách hàng submit form:
- Data sẽ được lưu vào Supabase database
- Bạn có thể xem data trong **Table Editor**
- Có thể export CSV/Excel bất cứ lúc nào
- Có thể query, filter, sort data dễ dàng

## 📊 Xem Data

1. Vào Supabase Dashboard
2. Click **Table Editor**
3. Click table `contact_forms`
4. Xem tất cả submissions với đầy đủ thông tin

## 🔍 Query Data (Nâng cao)

Trong **SQL Editor**, bạn có thể chạy queries:

```sql
-- Xem tất cả submissions
SELECT * FROM contact_forms ORDER BY created_at DESC;

-- Đếm số lượng theo ngày
SELECT DATE(created_at) as date, COUNT(*) as count 
FROM contact_forms 
GROUP BY DATE(created_at);

-- Tìm theo số điện thoại
SELECT * FROM contact_forms WHERE phone = '0363974768';
```

## 📥 Export Data

1. Trong Table Editor, chọn table `contact_forms`
2. Click **...** (3 chấm) góc phải
3. Chọn **Download as CSV**

## 🔒 Bảo mật

- RLS đã được bật - chỉ API của bạn mới insert được
- Anon key an toàn để public (chỉ cho phép insert vào table này)
- Data được mã hóa at rest và in transit

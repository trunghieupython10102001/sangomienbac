# Hướng dẫn cài đặt và chạy website

## Yêu cầu hệ thống

- Node.js >= 20.9.0
- npm hoặc yarn

## Cài đặt

1. Clone hoặc tải project về máy

2. Cài đặt dependencies:
```bash
npm install
```

3. Chạy development server:
```bash
npm run dev
```

4. Mở trình duyệt và truy cập: http://localhost:3000

## Build production

```bash
npm run build
npm start
```

## Cấu trúc thư mục

- `app/` - Các trang của website
- `components/` - React components
- `lib/` - Utilities và data
- `public/products/` - Hình ảnh sản phẩm

## Tùy chỉnh

### Thay đổi số điện thoại

Tìm và thay thế `0363.777.986` trong các file:
- `components/Header.tsx`
- `components/Footer.tsx`
- `app/page.tsx`
- `app/san-pham/[slug]/page.tsx`
- `app/lien-he/page.tsx`
- `app/bao-gia/page.tsx`

### Thêm/sửa danh mục sản phẩm

Chỉnh sửa file `lib/products.ts`

### Thêm hình ảnh sản phẩm

1. Tạo thư mục mới trong `public/products/[tên danh mục]/`
2. Copy ảnh vào thư mục
3. Cập nhật mapping trong `lib/products.ts`

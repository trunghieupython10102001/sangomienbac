# Website Sàn Gỗ

Website chuyên cung cấp và thi công sàn gỗ cao cấp, được xây dựng dựa trên thiết kế của [khosanmienbac.com](https://khosanmienbac.com/).

## Tính năng

- ✅ Trang chủ với hero section và danh mục sản phẩm
- ✅ Trang sản phẩm với 9 danh mục sàn gỗ
- ✅ Trang chi tiết từng danh mục với gallery ảnh
- ✅ Trang giới thiệu
- ✅ Trang báo giá
- ✅ Trang liên hệ
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Modern UI với TailwindCSS

## Công nghệ sử dụng

- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **TailwindCSS** - Styling
- **Lucide React** - Icons

## Danh mục sản phẩm

1. Sàn Gỗ Cao Cấp Malaysia
2. Sàn Gỗ Châu Âu
3. Sàn Gỗ Công Nghệ Đức
4. Sàn Gỗ Cốt Xanh
5. Sàn Gỗ Cốt Đen Cao Cấp
6. Sàn Gỗ Xương Cá
7. Sàn Gỗ Cốt Nâu
8. Sàn Nhựa SPC Cao Cấp
9. Sàn Gỗ Việt Nam

## Cài đặt

**Lưu ý:** Dự án yêu cầu Node.js >= 20.9.0

```bash
# Cài đặt dependencies
npm install

# Chạy development server
npm run dev

# Build production
npm run build

# Chạy production server
npm start
```

Mở [http://localhost:3000](http://localhost:3000) để xem website.

## Cấu trúc thư mục

```
wood-shop-web/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Trang chủ
│   ├── san-pham/          # Trang sản phẩm
│   ├── gioi-thieu/        # Trang giới thiệu
│   ├── bao-gia/           # Trang báo giá
│   └── lien-he/           # Trang liên hệ
├── components/            # React components
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── ProductCard.tsx
├── lib/                   # Utilities
│   └── products.ts        # Product data
└── public/
    └── products/          # Hình ảnh sản phẩm
```

## Tùy chỉnh

### Thay đổi thông tin liên hệ

Cập nhật số điện thoại và thông tin trong:
- `components/Header.tsx`
- `components/Footer.tsx`
- Các trang có call-to-action

### Thêm/sửa danh mục sản phẩm

Chỉnh sửa file `lib/products.ts`

### Thêm hình ảnh

Thêm hình ảnh vào thư mục `public/products/[tên danh mục]/`

## Deploy

Website có thể deploy lên:
- **Vercel** (khuyến nghị)
- **Netlify**
- **AWS Amplify**
- Bất kỳ hosting nào hỗ trợ Next.js

```bash
# Deploy lên Vercel
vercel
```

# Hướng dẫn Deploy Website

## Deploy lên Vercel (Khuyến nghị)

Vercel là nền tảng tốt nhất để deploy Next.js apps.

### Bước 1: Chuẩn bị

1. Tạo tài khoản tại [vercel.com](https://vercel.com)
2. Cài đặt Vercel CLI (tùy chọn):
```bash
npm i -g vercel
```

### Bước 2: Deploy

**Cách 1: Deploy qua Vercel Dashboard**

1. Đăng nhập vào Vercel
2. Click "Add New Project"
3. Import repository từ GitHub/GitLab/Bitbucket
4. Vercel sẽ tự động detect Next.js và config
5. Click "Deploy"

**Cách 2: Deploy qua CLI**

```bash
# Trong thư mục project
vercel

# Hoặc deploy production
vercel --prod
```

### Bước 3: Cấu hình (nếu cần)

Vercel tự động config cho Next.js, không cần thêm gì.

---

## Deploy lên Netlify

### Bước 1: Chuẩn bị

1. Tạo tài khoản tại [netlify.com](https://netlify.com)
2. Cài đặt Netlify CLI:
```bash
npm install -g netlify-cli
```

### Bước 2: Build settings

Tạo file `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

### Bước 3: Deploy

```bash
netlify deploy --prod
```

---

## Deploy lên VPS (Ubuntu/Debian)

### Bước 1: Cài đặt môi trường

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Cài đặt Node.js 20+
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Cài đặt PM2
sudo npm install -g pm2
```

### Bước 2: Upload code

```bash
# Clone hoặc upload code lên server
git clone <your-repo-url>
cd wood-shop-web

# Cài đặt dependencies
npm install

# Build
npm run build
```

### Bước 3: Chạy với PM2

```bash
# Start app
pm2 start npm --name "wood-shop" -- start

# Save PM2 config
pm2 save

# Auto start on reboot
pm2 startup
```

### Bước 4: Cấu hình Nginx

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/wood-shop /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### Bước 5: SSL với Let's Encrypt

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com
```

---

## Biến môi trường (nếu cần)

Tạo file `.env.local`:

```env
# Thêm các biến môi trường nếu cần
# NEXT_PUBLIC_API_URL=https://api.example.com
```

**Lưu ý:** Không commit file `.env.local` lên Git!

---

## Checklist trước khi deploy

- [ ] Test website local: `npm run build && npm start`
- [ ] Kiểm tra tất cả hình ảnh hiển thị đúng
- [ ] Cập nhật thông tin liên hệ (số điện thoại, email, địa chỉ)
- [ ] Kiểm tra responsive trên mobile/tablet
- [ ] Test tất cả các link
- [ ] Cấu hình domain (nếu có)
- [ ] Cấu hình SSL certificate

---

## Cập nhật website

### Vercel/Netlify
Chỉ cần push code lên Git, tự động deploy.

### VPS
```bash
cd wood-shop-web
git pull
npm install
npm run build
pm2 restart wood-shop
```

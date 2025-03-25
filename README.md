# ShoesStore - Cửa hàng giày trực tuyến

ShoesStore là một website thương mại điện tử chuyên về bán giày, được xây dựng bằng Vue 3 với TypeScript. Dự án sử dụng kiến trúc phân lớp rõ ràng, quản lý trạng thái bằng Pinia và kết nối với backend Node.js/Express.

## Tính năng

- **Hiển thị sản phẩm**: Danh sách, chi tiết, lọc theo danh mục
- **Giỏ hàng**: Thêm, sửa, xóa sản phẩm, thanh toán
- **Tài khoản người dùng**: Đăng ký, đăng nhập, quản lý thông tin cá nhân
- **Quản lý đơn hàng**: Xem lịch sử đơn hàng, chi tiết đơn hàng, theo dõi trạng thái
- **Responsive**: Trải nghiệm tốt trên các thiết bị di động

## Công nghệ sử dụng

- **Frontend**: Vue 3, TypeScript, Pinia, Vue Router
- **Backend**: Node.js, Express.js
- **Database**: MongoDB với Mongoose
- **Build Tools**: Vite

## Cài đặt và chạy dự án

### Yêu cầu hệ thống

- Node.js (>= 14.x)
- npm hoặc yarn

### Các bước cài đặt

1. **Clone repository**

```bash
git clone <your-repo-url>
cd shoes-store
```

2. **Cài đặt dependencies**

```bash
npm install
```

3. **Chạy ứng dụng ở môi trường development**

```bash
npm run dev
```

4. **Build ứng dụng cho production**

```bash
npm run build
```

## Cấu trúc dự án

```
.
├── server/              # Mã nguồn backend
│   ├── config/          # Cấu hình (database, env, etc.)
│   ├── controllers/     # Xử lý logic
│   ├── models/          # Mô hình dữ liệu
│   └── routes/          # Định nghĩa API routes
├── src/                 # Mã nguồn frontend
│   ├── assets/          # Images, fonts, etc.
│   ├── components/      # Vue components
│   ├── composables/     # Composable functions
│   ├── router/          # Vue router
│   ├── stores/          # Pinia stores
│   ├── types/           # TypeScript types
│   ├── views/           # Vue views
│   ├── App.vue          # Root component
│   └── main.ts          # Entry point
├── index.html           # HTML template
├── package.json         # Dependencies và scripts
├── server.js            # Backend entry point
├── tsconfig.json        # TypeScript configuration
└── vite.config.js       # Vite configuration
```

## Tác giả

© 2025 ShoesStore. All rights reserved.
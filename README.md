# LandingPage — Portfolio mẫu

Portfolio mẫu của Trung Kiên, Frontend Developer, xây dựng bằng React, TypeScript và Vite. Nội dung hồ sơ, học vấn, kinh nghiệm và dự án hiện tại là hư cấu để phục vụ bản dựng giao diện; cần thay bằng thông tin đã xác minh trước khi xuất bản.

## Chức năng

- Trang chủ gồm hero, giới thiệu, capability/proof panel, timeline kinh nghiệm, case study dự án, liên hệ và footer.
- Trang `/projects` có lọc theo danh mục, tìm kiếm và empty state.
- Trang chủ có intro có thể bỏ qua, custom cursor cho thiết bị trỏ chính xác, chapter rail, thanh tiến trình cuộn, hiệu ứng reveal theo dòng, experience timeline, project showcase và liên hệ.
- Điều hướng responsive và trang 404.
- Dữ liệu hồ sơ và dự án được tách riêng trong `src/data/`.
- Email hiển thị là địa chỉ placeholder `trung-kien@example.com`; các dự án là concept hư cấu, không có liên kết demo.
- Hero hiện dùng monogram trang trí; scene 3D tương tác thuộc giai đoạn triển khai tiếp theo.
- CV cá nhân không được đưa vào repository hoặc build production; ảnh bên thứ ba không được đưa vào repository.

## Yêu cầu

- Node.js 18 trở lên (khuyến nghị Node.js 20 LTS).
- npm 9 trở lên.

## Cài đặt và chạy

```bash
npm install
npm run dev
```

Mở URL Vite hiển thị trong terminal (thường là `http://localhost:5173`).

## Build production

```bash
npm run build
npm run preview
```

File deploy được tạo trong `dist/`.

## Tùy chỉnh nội dung

- Hồ sơ, học vấn, kinh nghiệm và capability mẫu: `src/data/profile.ts`.
- Dự án: `src/data/projects.ts`.
- Thêm CV đã được rà soát thông tin cá nhân riêng nếu muốn xuất bản; CV hiện tại không được đưa vào repository.
- Thông tin tiêu đề trang: `index.html`.
- Font Google được tải từ Google Fonts; nếu cần chạy hoàn toàn offline, bỏ dòng `@import` đầu `src/styles.css` và dùng font hệ thống.

## Xử lý lỗi thường gặp

- Nếu lệnh `npm` không nhận diện, cài Node.js LTS rồi mở terminal mới.
- Nếu cổng 5173 đang được sử dụng, Vite sẽ đề xuất một cổng khác.
- Khi triển khai SPA lên hosting tĩnh, cấu hình rewrite URL về `index.html` để route `/projects` hoạt động khi tải trực tiếp.

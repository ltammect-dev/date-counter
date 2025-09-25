# Countdown Timer Management App

Ứng dụng quản lý đếm ngược với khả năng thêm, xóa và theo dõi nhiều sự kiện cùng lúc. Data được lưu trữ trong MongoDB.

## Tính năng

- ✅ Thêm counter tùy chỉnh với tên và ngày đích
- ✅ Hiển thị countdown realtime cho multiple counters
- ✅ Lưu data vào MongoDB
- ✅ Theme pastel blue mới
- ✅ Giao diện responsive
- ✅ Quản lý counter (thêm/xóa)

## Cài đặt và chạy

### 1. Cài đặt MongoDB

Đảm bảo MongoDB đang chạy trên `mongodb://localhost:27017`

### 2. Backend (Server)

```bash
# Di chuyển đến thư mục server
cd server

# Cài đặt dependencies
npm install

# Chạy server (development mode)
npm run dev

# Hoặc chạy production
npm start
```

Server sẽ chạy trên `http://localhost:3001`

### 3. Frontend

```bash
# Ở thư mục root của project
npm install

# Chạy development server
npm run dev
```

Frontend sẽ chạy trên `http://localhost:5173`

## API Endpoints

- `GET /api/counters` - Lấy tất cả counters
- `POST /api/counters` - Tạo counter mới
- `PUT /api/counters/:id` - Cập nhật counter
- `DELETE /api/counters/:id` - Xóa counter

## Cấu trúc project

```
├── server/                 # Backend API
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── index.js           # Server entry point
│   └── package.json       
├── src/
│   ├── components/        # React components
│   │   ├── CounterForm.tsx    # Form thêm counter
│   │   ├── CounterList.tsx    # Hiển thị danh sách counters
│   │   └── Flipper.tsx        # Component số đếm ngược
│   ├── services/          # API services
│   ├── stores/            # State management
│   └── App.tsx            # Main component
└── README.md
```

## Technologies

- **Frontend**: SolidJS + TypeScript + Tailwind CSS
- **Backend**: Node.js + Express.js
- **Database**: MongoDB + Mongoose
- **Build Tool**: Vite

## Sử dụng

1. Mở ứng dụng trong browser
2. Nhấn "Thêm Counter Mới" để tạo sự kiện mới
3. Nhập tên sự kiện và chọn ngày/giờ đích
4. Counter sẽ tự động đếm ngược realtime
5. Có thể xóa counter bằng nút X ở góc phải mỗi counter

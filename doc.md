1. THEO DÕI KÊNH YOUTUBE
   - Kênh: @gossipnewsjapan25
   - Check interval: Mỗi 2 giây
   - Phương thức: Query trực tiếp (không dùng RSS)

2. PHÁT HIỆN VIDEO MỚI
   - So sánh với history đã xử lý
   - Lấy 5 video mới nhất
   - Kiểm tra video ID chưa upload

3. DOWNLOAD VIDEO
   - Format: Best MP4 ≤1080p
   - Progress: Hiển thị %, tốc độ MB/s
   - Lưu tạm: VideosDirPath/temp_{video_id}.mp4

4. KIỂM TRA DURATION
   - < 45s: ❌ BỎ QUA (quá ngắn)
   - 45-180s: ✅ XỬ LÝ (scale về 60s)
   - > 180s: ❌ BỎ QUA (quá dài)

5. XỬ LÝ VIDEO (45s-180s)
   - Tính speed factor = duration / 60
   - Apply slow motion (MoviePy)
   - Encode: H264, AAC, 30fps
   - Output: VideosDirPath/scaled_{video_id}.mp4

6. UPLOAD LÊN TIKTOK
   - User: japanese.207
   - Title: Lấy từ YouTube
   - Server: alisg (Singapore)
   - Method: TikTok API (không dùng Selenium)

7. LƯU HISTORY & DỌN DẸP
   - Lưu video_id vào youtube_history.json
   - Xóa file temp/scaled
   - Log thống kê (download, process, upload time)

8. LẶP LẠI
   - Sleep 2s
   - Quay lại bước 1
   - Chạy 24/7 không dừng

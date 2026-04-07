# Hướng dẫn Setup Google Sheets để nhận data từ form

## Bước 1: Tạo Google Spreadsheet

1. Truy cập [Google Sheets](https://sheets.google.com)
2. Tạo một spreadsheet mới
3. Đặt tên sheet là "Contact Forms"
4. Tạo header row với các cột:
   - A1: Timestamp
   - B1: Tên
   - C1: Số điện thoại
   - D1: Địa chỉ thi công
   - E1: Diện tích (m²)
   - F1: Ghi chú

## Bước 2: Tạo Google Apps Script

1. Trong Google Sheets, vào **Extensions** > **Apps Script**
2. Xóa code mặc định và paste code sau:

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Contact Forms');
    const data = JSON.parse(e.postData.contents);
    
    sheet.appendRow([
      data.timestamp,
      data.name,
      data.phone,
      data.address,
      data.area,
      data.note
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({
      status: 'success'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
```

3. Click **Save** (icon đĩa mềm)
4. Đặt tên project: "Contact Form Handler"

## Bước 3: Deploy Web App

1. Click **Deploy** > **New deployment**
2. Click icon ⚙️ bên cạnh "Select type"
3. Chọn **Web app**
4. Cấu hình:
   - **Description**: Contact Form API
   - **Execute as**: Me
   - **Who has access**: Anyone
5. Click **Deploy**
6. Click **Authorize access**
7. Chọn tài khoản Google của bạn
8. Click **Advanced** > **Go to [Project name] (unsafe)**
9. Click **Allow**
10. **Copy URL** được tạo ra (dạng: `https://script.google.com/macros/s/...../exec`)

## Bước 4: Cấu hình Environment Variable

1. Tạo file `.env.local` trong thư mục root của project:

```bash
GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

2. Thay `YOUR_SCRIPT_ID` bằng URL bạn vừa copy ở bước 3

## Bước 5: Restart Dev Server

```bash
npm run dev
```

## Test

1. Click vào nút form (icon clipboard) trên website
2. Điền thông tin và submit
3. Kiểm tra Google Sheets - data sẽ xuất hiện trong sheet

## Lưu ý

- File `.env.local` đã được thêm vào `.gitignore` nên không bị commit lên Git
- Nếu cần update script, vào Apps Script > Deploy > Manage deployments > Edit > New version

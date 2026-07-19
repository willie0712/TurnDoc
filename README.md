# TurnDoc 文件轉換工具

> Turn. Convert. Done.
---

## 📖 簡介

**TurnDoc** 是一個快速、簡單的文件轉換工具，支援 **Word、PPT、Excel、PDF、圖片** 之間的互相轉換。

所有操作都在您的電腦上完成，**檔案不外流**，保護您的隱私。

---

## ✨ 功能列表

### 📄 文件轉換

| 功能 | 輸入 | 輸出 |
| :--- | :--- | :--- |
| Word 轉 PDF | `.docx` | `.pdf` |
| PDF 轉 Word | `.pdf` | `.docx` |
| PPT 轉 PDF | `.pptx` | `.pdf` |
| Excel 轉 PDF | `.xlsx` | `.pdf` |
| PDF 轉 PPT | `.pdf` | `.pptx` |
| PDF 轉 Excel | `.pdf` | `.xlsx` |

### 📑 PDF 編輯

| 功能 | 說明 |
| :--- | :--- |
| 合併 PDF | 將多個 PDF 合併為一個 |
| 壓縮 PDF | 減小檔案大小 |

### 🖼️ 圖片處理

| 功能 | 說明 |
| :--- | :--- |
| PDF 轉圖片 | 將 PDF 每一頁轉為圖片 |
| 圖片轉 PDF | 將多張圖片合併為 PDF |
| 圖片格式轉換 | PNG / JPG / WEBP / BMP / GIF 互轉 |
| 圖片壓縮 | 減小圖片檔案大小 |

---

## 📸 截圖

| 主畫面 | 轉換中 |
| :---: | :---: |
| ![主畫面](https://github.com/user-attachments/assets/f67db095-d519-4f5f-a975-42b3029acb87) | ![轉換中](https://github.com/user-attachments/assets/f562836a-d6ba-4b1a-98dc-f13af6ee9ae7) |

---

## 🚀 下載與安裝

### 下載安裝檔

👉 **[下載最新版本](https://github.com/Willie0712/TurnDoc/releases/latest)**

### 安裝步驟

1. 下載 `TurnDoc-Setup-1.0.1.exe`
2. 雙擊執行安裝程式
3. 按照安裝精靈指示完成安裝
4. 安裝完成後，桌面會出現 TurnDoc 捷徑

### 免安裝版 (Portable)

如果你不想安裝，可以從資料夾裡面的 `win-unpacked`：
2. 雙擊 `TurnDoc.exe` 即可使用

---

## 🛠️ 系統需求

| 項目 | 需求 |
| :--- | :--- |
| 作業系統 | Windows 7 / 8 / 10 / 11 (64-bit) |
| 記憶體 | 建議 4GB 以上 |
| 硬碟空間 | 安裝需要約 396.5MB |

### 轉換引擎支援

| 引擎 | 說明 |
| :--- | :--- |
| Microsoft Office | 如果有安裝，排版最準確 |
| LibreOffice | 免費替代方案，自動偵測 |

> 💡 如果沒有安裝 Office，TurnDoc 會自動使用 LibreOffice（需自行安裝）

---

## ❓ 常見問答 (FAQ)

### 1. Q: 我要下載哪個檔案呢？

**A:** 請下載 `TurnDoc-Setup-1.0.1.exe` 這個安裝檔。

> 💡 你可以在 [Releases 頁面](https://github.com/Willie0712/TurnDoc/releases) 找到最新版本的安裝檔。

---

### 2. Q: 檔案是攜便版 (Portable) 還是安裝版？

**A:** 是**安裝版**喔！

| 版本 | 說明 |
| :--- | :--- |
| **安裝版** | 下載 `TurnDoc-Setup-1.0.1.exe`，雙擊安裝 |
| **免安裝版** | 下載 `win-unpacked`，並打開`TurnDoc-Setup-1.0.1.exe`即可使用 |

---

### 3. Q: 請問 EXE 檔案放在哪裡？

**A:** 執行 `npm run build` 打包後，EXE 檔案會放在 `build` 資料夾裡面。


---

### 4. Q: 照片轉換可以用什麼格式？

**A:** TurnDoc 支援以下圖片格式：

| 格式 | 說明 |
| :--- | :--- |
| JPG / JPEG | 通用格式，檔案較小 |
| PNG | 支援透明背景 |
| WEBP | Google 推出，檔案更小 |
| BMP | 無壓縮格式 |
| GIF | 支援動畫 |
| TIFF | 高品質格式 |
| **HEIC** | ✅ iPhone 照片格式（自動偵測支援） |

> 📱 **跨平台支援**
> - **Android** 手機：JPG、PNG
> - **iPhone (iOS)**：JPG、PNG、**HEIC**

---

### 5. Q: 為什麼轉換後檔名有特殊字元？

**A:** 這個問題已經在 v1.0.1 版本修復了！請更新到最新版本。

---

### 6. Q: 需要安裝 Python 才能用嗎？

**A:** ❌ **完全不需要！**

TurnDoc 已經將轉換核心打包成獨立的 `.exe` 檔案，使用者**不需要安裝 Python** 就能直接使用。

---

### 7. Q: 需要安裝 Microsoft Office 嗎？

**A:** ⚠️ 不一定需要。

| 情況 | 說明 |
| :--- | :--- |
| 有安裝 Office | ✅ 排版最準確，優先使用 |
| 沒有安裝 Office | ✅ 自動改用 LibreOffice（免費） |
| 兩個都沒有 | ❌ 無法轉換，請安裝 LibreOffice |

> 💡 LibreOffice 是免費的，下載網址：https://www.libreoffice.org/

---

### 8. Q: 檔案會上傳到雲端嗎？

**A:** ❌ **不會！**

所有操作都在您的電腦上完成，**檔案不會離開您的電腦**，確保隱私安全。

---

### 9. Q: 支援批次處理嗎？

**A:** ✅ 支援！

大部分功能都支援一次選擇多個檔案進行批次轉換。

---

### 10. Q: 如何回報問題或提出建議？

**A:** 歡迎透過以下方式聯絡我：

- Email: willie.develop467@email.com
- GitHub: [@WillieZhang](https://github.com/Willie0712)

---

### 11. Q: 未來會支援 Mac 或 Linux 嗎？

**A:** 目前只支援 Windows喔～

---

### 12. Q: 軟體是免費的嗎？

**A:** ✅ **完全免費！**

TurnDoc 是開源軟體，可以放心使用～

---

## 🔧 開發者資訊

### 技術架構

| 層級 | 技術 |
| :--- | :--- |
| 前端 | Electron + HTML + CSS + JavaScript |
| 轉換核心 | Python + PyInstaller |

👤 開發者
Willie Zhang

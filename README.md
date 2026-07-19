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
| GIF 拆分 | 將 GIF 拆成多張靜態圖片 |

---

## 🚀 下載與安裝

### 下載安裝檔

👉 **[下載最新版本](https://github.com/Willie0712/TurnDoc/releases/latest)**

### 安裝步驟

1. 下載 `TurnDoc-Setup-1.0.1.exe`
2. 雙擊執行安裝程式
3. 按照安裝精靈指示完成安裝
4. 安裝完成後，桌面會出現 TurnDoc 捷徑

### 免安裝版

如果你不想安裝，可以從資料夾 `win-unpacked`：
1. 解壓縮
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

## 📸 截圖

> *（這裡放 TurnDoc 的截圖）*

| 主畫面 | 轉換中 |
| :---: | :---: |
| ![主畫面](<img width="1525" height="1036" alt="{399FDFC3-EE99-4DBD-8930-D2200F565179}" src="https://github.com/user-attachments/assets/f67db095-d519-4f5f-a975-42b3029acb87" />
) | ![轉換中](| ![主畫面]({{6017A114-DA2F-4603-8A1E-61060C99B8A2}.png)|

---

## 🔧 開發者資訊

### 技術架構

| 層級 | 技術 |
| :--- | :--- |
| 前端 | Electron + HTML + CSS + JavaScript |
| 轉換核心 | Python + PyInstaller |
| 安裝程式 | NSIS |

### 從原始碼建置

```bash
# 1. 複製專案
git clone https://github.com/WillieZhang/TurnDoc.git
cd TurnDoc

# 2. 安裝依賴
npm install

# 3. 打包 converter.exe
python -m PyInstaller --onefile --console --name converter converter.py

# 4. 打包應用程式
npm run build

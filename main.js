const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');
const { spawn } = require('child_process');

let mainWindow;
let splashWindow;

// ============================================================
// 創建啟動畫面
// ============================================================
function createSplashScreen() {
    splashWindow = new BrowserWindow({
        width: 400,
        height: 300,
        frame: false,
        resizable: false,
        center: true,
        alwaysOnTop: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    splashWindow.loadFile(path.join(__dirname, 'splash.html'));

    splashWindow.on('closed', () => {
        splashWindow = null;
    });
}

// ============================================================
// 創建主視窗
// ============================================================
function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1100,
        height: 750,
        icon: path.join(__dirname, 'icon.ico'),
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js')
        },
        title: 'TurnDoc - 文件轉換工具',
        frame: true,
        resizable: true,
        show: false
    });

    mainWindow.loadFile(path.join(__dirname, 'index.html'));

    mainWindow.once('ready-to-show', () => {
        if (splashWindow) {
            splashWindow.close();
            splashWindow = null;
        }
        mainWindow.show();
    });

    mainWindow.webContents.on('did-fail-load', () => {
        if (splashWindow) {
            splashWindow.close();
            splashWindow = null;
        }
        mainWindow.show();
    });

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

// ============================================================
// 應用程式啟動
// ============================================================
app.whenReady().then(() => {
    createSplashScreen();

    setTimeout(() => {
        createWindow();
    }, 500);

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

// ============================================================
// IPC：轉換檔案
// ============================================================

ipcMain.handle('convert-files', async (event, { files, tool, outputFormat }) => {
    try {
        const tempDir = path.join(app.getPath('temp'), 'turndoc');
        if (!fs.existsSync(tempDir)) {
            fs.mkdirSync(tempDir, { recursive: true });
        }

        // 儲存上傳的檔案
        const savedPaths = [];
        for (const file of files) {
            const savePath = path.join(tempDir, `${Date.now()}_${file.name}`);
            fs.writeFileSync(savePath, Buffer.from(file.data));
            savedPaths.push(savePath);
        }

        // ===== 找出 converter.py 的正確路徑 =====
        const isDev = !app.isPackaged;
        let converterPath;

        if (isDev) {
            converterPath = path.join(__dirname, 'converter.py');
        } else {
            const resourcesPath = process.resourcesPath;
            converterPath = path.join(resourcesPath, 'converter.py');

            if (!fs.existsSync(converterPath)) {
                converterPath = path.join(resourcesPath, 'app.asar', 'converter.py');
            }
        }

        console.log('📂 converter.py 路徑:', converterPath);

        if (!fs.existsSync(converterPath)) {
            throw new Error(`找不到 converter.py: ${converterPath}`);
        }

        const outputDir = path.join(tempDir, 'outputs');
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        // ===== 如果沒有傳入 outputFormat，預設為 PNG =====
        const format = outputFormat || 'PNG';

        const result = await runPythonConverter(converterPath, savedPaths, tool, outputDir, format);

        let resultFiles;
        try {
            resultFiles = JSON.parse(result);
        } catch {
            resultFiles = [result.trim()];
        }

        if (resultFiles.error) {
            throw new Error(resultFiles.error);
        }

        return { success: true, output: resultFiles };
    } catch (err) {
        return { success: false, error: err.message };
    }
});

function runPythonConverter(scriptPath, inputPaths, tool, outputDir, outputFormat) {
    return new Promise((resolve, reject) => {
        const pythonCmd = 'python';

        const args = [
            scriptPath,
            '--tool', tool,
            '--input', ...inputPaths,
            '--output', outputDir,
            '--format', outputFormat || 'PNG'
        ];

        console.log('🔧 執行:', pythonCmd, args.join(' '));

        const python = spawn(pythonCmd, args);

        let output = '';
        let error = '';

        python.stdout.on('data', (data) => {
            output += data.toString();
        });

        python.stderr.on('data', (data) => {
            error += data.toString();
        });

        python.on('close', (code) => {
            if (code === 0) {
                resolve(output.trim());
            } else {
                reject(new Error(error || '轉換失敗'));
            }
        });

        python.on('error', (err) => {
            reject(new Error(`無法執行 Python: ${err.message}`));
        });
    });
}

// ============================================================
// IPC：儲存檔案
// ============================================================

ipcMain.handle('save-file', async (event, { sourcePath, fileName }) => {
    const result = await dialog.showSaveDialog({
        title: '儲存轉換後的檔案',
        defaultPath: fileName,
        filters: [
            { name: 'PDF 檔案', extensions: ['pdf'] },
            { name: 'Word 檔案', extensions: ['docx'] },
            { name: '圖片檔案', extensions: ['jpg', 'png', 'webp', 'bmp', 'gif', 'tiff'] },
            { name: '所有檔案', extensions: ['*'] }
        ]
    });

    if (!result.canceled && result.filePath) {
        try {
            fs.copyFileSync(sourcePath, result.filePath);
            return { success: true, path: result.filePath };
        } catch (err) {
            return { success: false, error: err.message };
        }
    }
    return { success: false };
});
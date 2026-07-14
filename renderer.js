// ===== TurnDoc 桌面版 - 前端邏輯 =====

const uploadZone = document.getElementById('uploadZone');
const fileInput = document.getElementById('fileInput');
const fileList = document.getElementById('fileList');
const convertBtn = document.getElementById('convertBtn');
const progressArea = document.getElementById('progressArea');
const progressFill = document.getElementById('progressFill');
const progressText = document.getElementById('progressText');
const downloadArea = document.getElementById('downloadArea');
const downloadBtn = document.getElementById('downloadBtn');
const statusBar = document.getElementById('statusBar');
const selectedToolLabel = document.getElementById('selectedTool');
const toolGrid = document.getElementById('toolGrid');
const formatSelector = document.getElementById('formatSelector');
const outputFormatSelect = document.getElementById('outputFormat');

let selectedTool = null;
let selectedFiles = [];
let resultFiles = [];

// ===== 工具選擇 =====
toolGrid.querySelectorAll('.tool-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        toolGrid.querySelectorAll('.tool-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        selectedTool = btn.dataset.tool;
        const name = btn.textContent.trim();
        selectedToolLabel.textContent = `✅ ${name}`;
        statusBar.innerHTML = `<span class="icon">🔧</span> 已選：${name}，請上傳檔案`;

        // ===== 顯示/隱藏格式選擇 =====
        const imageTools = ['image-convert', 'image-compress', 'pdf-to-image', 'gif-split'];
        if (imageTools.includes(selectedTool)) {
            formatSelector.style.display = 'flex';
        } else {
            formatSelector.style.display = 'none';
        }

        checkReady();
    });
});

// ===== 上傳 =====
uploadZone.addEventListener('click', () => fileInput.click());

uploadZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadZone.classList.add('dragover');
});
uploadZone.addEventListener('dragleave', () => {
    uploadZone.classList.remove('dragover');
});
uploadZone.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadZone.classList.remove('dragover');
    handleFiles(e.dataTransfer.files);
});

fileInput.addEventListener('change', (e) => {
    handleFiles(e.target.files);
});

function handleFiles(files) {
    for (let file of files) {
        selectedFiles.push(file);
    }
    renderFileList();
    checkReady();
}

function renderFileList() {
    if (selectedFiles.length === 0) {
        fileList.innerHTML = '';
        return;
    }
    let html = '';
    selectedFiles.forEach((f, i) => {
        const size = (f.size / 1024 / 1024).toFixed(2);
        html += `
            <li>
                <span>📄 ${f.name} (${size} MB)</span>
                <span class="remove" onclick="removeFile(${i})">✕</span>
            </li>
        `;
    });
    fileList.innerHTML = html;
}

function removeFile(index) {
    selectedFiles.splice(index, 1);
    renderFileList();
    checkReady();
}
window.removeFile = removeFile;

function checkReady() {
    if (selectedTool && selectedFiles.length > 0) {
        convertBtn.disabled = false;
        statusBar.innerHTML = `<span class="icon">✅</span> 就緒：${selectedFiles.length} 個檔案待轉換`;
    } else {
        convertBtn.disabled = true;
    }
}

// ===== 轉換 =====
convertBtn.addEventListener('click', async () => {
    if (!selectedTool || selectedFiles.length === 0) return;

    convertBtn.disabled = true;
    progressArea.style.display = 'block';
    downloadArea.style.display = 'none';
    progressFill.style.width = '0%';
    progressText.textContent = '準備中...';
    statusBar.innerHTML = `<span class="icon">⏳</span> 轉換中，請稍候...`;

    try {
        const fileData = await Promise.all(selectedFiles.map(f => f.arrayBuffer()));
        const files = selectedFiles.map((f, i) => ({
            name: f.name,
            data: fileData[i]
        }));

        // ===== 讀取輸出格式 =====
        let outputFormat = 'PNG';
        if (formatSelector.style.display !== 'none' && outputFormatSelect) {
            outputFormat = outputFormatSelect.value;
        }

        progressText.textContent = '處理中...';
        let progress = 0;
        const interval = setInterval(() => {
            progress += 5;
            if (progress >= 90) clearInterval(interval);
            progressFill.style.width = progress + '%';
        }, 200);

        const result = await window.electronAPI.convertFiles(files, selectedTool, outputFormat);

        clearInterval(interval);
        progressFill.style.width = '100%';

        if (result.success) {
            progressText.textContent = '✅ 轉換完成！';
            resultFiles = result.output;
            downloadArea.style.display = 'block';
            statusBar.innerHTML = `<span class="icon">✅</span> 轉換完成！點擊「儲存檔案」下載`;
        } else {
            throw new Error(result.error);
        }
    } catch (err) {
        progressText.textContent = '❌ ' + err.message;
        statusBar.innerHTML = `<span class="icon">❌</span> 錯誤：${err.message}`;
    } finally {
        convertBtn.disabled = false;
    }
});

// ===== 下載 =====
downloadBtn.addEventListener('click', async () => {
    if (!resultFiles || resultFiles.length === 0) return;

    for (const filePath of resultFiles) {
        const fileName = filePath.split('\\').pop() || filePath.split('/').pop();
        await window.electronAPI.saveFile(filePath, fileName);
    }

    statusBar.innerHTML = `<span class="icon">✅</span> 檔案已儲存！`;
    downloadArea.style.display = 'none';
});
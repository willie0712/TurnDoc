const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    convertFiles: (files, tool, outputFormat) => ipcRenderer.invoke('convert-files', { files, tool, outputFormat }),
    saveFile: (sourcePath, fileName) => ipcRenderer.invoke('save-file', { sourcePath, fileName })
});
const { app, BrowserWindow } = require('electron')
const IS_MAC_OS = process.platform === 'darwin'
const IS_DEV = !app.isPackaged

const createWindow = () => {
  const win = new BrowserWindow({
    width: 600,
    height: 900
  })
  
  console.log('IS_DEV', IS_DEV)
  if (IS_DEV) {
    // Can use URL directly
    // win.loadURL('http://localhost:3002/')

    // For demo purposes, use the local file, which embeds the plugin as iframe
    win.loadFile('index.html')
  } else {
    win.loadFile('./dist/index.html')
  }
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
    if (!IS_MAC_OS) {
        app.quit()
    }
})
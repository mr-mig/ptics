const { app, BrowserWindow } = require('electron')
const IS_MAC_OS = process.platform === 'darwin'

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1200,
    height: 900
  })

  win.loadFile('index.html')
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
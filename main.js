const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        icon: "./assets/SCOER.png",
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            // webSecurity: false
        }
    })

    ipcMain.on('get-stats', () => {
        console.log("a")
        win.webContents.send('update-stats', getUserStats())
    })

    win.loadFile('index.html')
}

app.whenReady().then(() => {
    createWindow()
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

function getUserStats(){
    return {
        score: 246_309_531_781,
        clears: 69_723,
        ss: 22_363
    }
}
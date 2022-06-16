const { contextBridge, ipcRenderer } = require("electron")
const fs = require("fs")


window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
        const element = document.getElementById(selector)
        if (element) element.innerText = text
    }

    for (const dependency of['chrome', 'node', 'electron']) {
        replaceText(`${dependency}-version`, process.versions[dependency])
    }
})

contextBridge.exposeInMainWorld('statsAPI', {
    getUserStats: () => ipcRenderer.send('get-stats'),
    handleStatsUpdate: (callback) => ipcRenderer.on('update-stats', callback)
})

function checkConfigExists() {
    fs.readFile('config.json', (err, data) => {
        if (err.errno = -4058) { // config.json doesn't exist

            blankConfigData = {
                apikey: ""
            }

            fs.writeFile('config.json', JSON.stringify(blankConfigData), (err) => {
                if (err) throw err;
            });
        }
    });
}

checkConfigExists();
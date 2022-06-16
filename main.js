const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const osu = require('node-osu');
const fs = require('fs');

let osuApi;
let win;

const createWindow = () => {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        icon: "./assets/SCOER.png",
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            // webSecurity: false
        }
    })
    win.loadFile('index.html')
}


app.whenReady().then(() => {
    createWindow();
    loadOsuApi();
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

ipcMain.on('get-stats', () => {
    osuApi.getUser({ u: 9991650 }).then(user => {
        win.webContents.send('update-stats', getUserStats(user));
    });
})

function getUserStats(user){
    userStats = {}
    userStats.score = user.scores.ranked;
    userStats.ss = user.counts.SS + user.counts.SSH;
    userStats.clears = userStats.ss + user.counts.A + user.counts.S + user.counts.SH;
    return userStats;
}

function loadOsuApi() {
    let apikey;

    fs.readFile('config.json', (err, data) => {
        if (err) throw err;
        apikey = JSON.parse(data).apikey;
        osuApi = new osu.Api(apikey, {
            notFoundAsError: true, // Throw an error on not found instead of returning nothing. (default: true)
            completeScores: true, // When fetching scores also fetch the beatmap they are for (Allows getting accuracy) (default: false)
            parseNumeric: true // Parse numeric values into numbers/floats, excluding ids
        })
    });
}
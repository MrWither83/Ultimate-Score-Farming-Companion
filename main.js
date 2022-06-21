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
    let userStats = {}
    userStats.score = getStat('Ranked Score', user.scores.ranked, getScoreFromLevel, getLevelFromScore);
    userStats.ss = getStat('SS', user.counts.SS + user.counts.SSH, getSSFromLevel, getLevelFromSS);
    userStats.clears = getStat('Clears', user.counts.SSH + user.counts.SS + user.counts.A + user.counts.S + user.counts.SH, getClearsFromLevel, getLevelFromClears);
    return userStats;
}

function getStat(statName, statValue, getStatFromLevel, getLevelFromStat){
    let currentLevel = Math.floor(getLevelFromStat(statValue));
    let nextLevel = currentLevel + 1;
    let currentLevelProgress = (statValue - getStatFromLevel(currentLevel)) / (getStatFromLevel(nextLevel) - getStatFromLevel(currentLevel));

    let stat = {
        name: statName,
        value: statValue,
        level: currentLevel,
        progress: currentLevelProgress,
        nextLevelRequirement: Math.round(getStatFromLevel(nextLevel))
    }

    return stat;
}

// Ranked Score <-> Level

function getScoreFromLevel(level){
    return 1_000_000 * (2300/231 * level * level + 39000/77 * level - 50000/231);
}

function getLevelFromScore(score){
    return (Math.sqrt(5313*score + 35372500000000) - 5850000)/230000
}

// SS count <-> Level

function getSSFromLevel(level){
    return (230/231 * level * level + 3900/77 * level - 5000/231);
}

function getLevelFromSS(ssCount){
    return  (Math.sqrt(10) * Math.sqrt(5313*ssCount + 3537250) - 5850)/230
}

// Clears <-> Level

function getClearsFromLevel(level){
    return (8710/4851 * level * level + 114280/1617 * level - 109000/4851);
}

function getLevelFromClears(clears){
    return (Math.sqrt(10) * Math.sqrt(4225221*clears + 3033420640) - 171420)/8710
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
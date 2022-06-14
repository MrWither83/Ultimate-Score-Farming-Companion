window.statsAPI.handleStatsUpdate((_event, arg) => {
    console.log(arg);
    document.getElementById("statDisplayText").innerHTML = arg.score.toLocaleString('en-US');
})
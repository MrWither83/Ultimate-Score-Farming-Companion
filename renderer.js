window.statsAPI.handleStatsUpdate((_event, arg) => {
    console.log(arg);
    document.getElementById("statDisplayText").innerHTML = arg.score.value.toLocaleString('en-US');
    Object.values(arg).forEach(stat => {
        updateLevelCircle(stat);
    });
})
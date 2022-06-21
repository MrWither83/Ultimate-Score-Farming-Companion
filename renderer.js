
const carouselCanvas = document.getElementById("levelCircleCarousel");
carouselCanvas.width = window.innerWidth;
carouselCanvas.height = window.innerHeight;
carousel = new LevelCircleCarousel(carouselCanvas);

function windowResize() {
    carouselCanvas.width = window.innerWidth;
    carouselCanvas.height = window.innerHeight;
    
    carousel.updateCirclePositions();
    
    carousel.draw();
};

document.addEventListener('keydown', carousel.carouselScroll)
window.addEventListener('resize', windowResize);

window.statsAPI.handleStatsUpdate((_event, arg) => {
    console.log(arg);
    document.getElementById("statDisplayText").innerHTML = arg.score.value.toLocaleString('en-US');
    Object.values(arg).forEach(stat => {
        carousel.updateLevelCircle(stat);
    });
})
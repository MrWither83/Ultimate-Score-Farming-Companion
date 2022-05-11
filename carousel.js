let levelCircles = [];
let currentCircle = 1;

function carouselScroll(event) {
    console.log(event.deltaY);
}

const carouselCanvas = document.getElementById("levelCircleCarousel")
carouselCanvas.addEventListener('wheel', carouselScroll)

const CIRCLE_COUNT = 1;

function windowResize() {
    carouselCanvas.width = window.innerWidth;
    carouselCanvas.height = window.innerHeight;

    for (let index = 0; index < levelCircles.length; index++) {
        const circle = levelCircles[index];
        circle.setDesiredX(getCircleX(index));
        circle.setDesiredY(getCircleY(index));
        circle.setDesiredRadius(getCircleRadius(index));
    }

    draw();
};

window.addEventListener('resize', windowResize);


function getCircleX(circleIndex) {
    return (currentCircle - circleIndex) * carouselCanvas.width / 4 + carouselCanvas.width / 2;
}

function getCircleY(circleIndex) {
    return carouselCanvas.height / 2 + Math.abs(currentCircle - circleIndex) * carouselCanvas.height / 6;
}

function getCircleRadius(circleIndex) {
    return carouselCanvas.height / 3 - Math.abs(currentCircle - circleIndex) * carouselCanvas.height / 4
}

function draw() {
    if (carouselCanvas.getContext) {
        var ctx = carouselCanvas.getContext('2d');

        const progressGradient = ctx.createLinearGradient(0, 0, 0, carouselCanvas.height);
        progressGradient.addColorStop(0, 'cyan');
        progressGradient.addColorStop(1, 'yellow');
        ctx.strokeStyle = progressGradient;

        ctx.fillStyle = '#333333'

        ctx.clearRect(0, 0, carouselCanvas.width, carouselCanvas.height);
        levelCircles.forEach(circle => {
            circle.draw(ctx);
        })
    }
    requestAnimationFrame(draw);
}

function init() {
    carouselCanvas.width = window.innerWidth;
    carouselCanvas.height = window.innerHeight;

    for (let i = 0; i < CIRCLE_COUNT; i++) {
        var X = getCircleX(i);
        var Y = getCircleY(i);
        var R = getCircleRadius(i);
        const levelCircle = new LevelCircle(X, Y, R);
        requestAnimationFrame(levelCircle.update.bind(levelCircle));
        levelCircles.push(levelCircle);
    }
    requestAnimationFrame(draw);
}

init();
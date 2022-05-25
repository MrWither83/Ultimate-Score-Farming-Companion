let levelCircles = [];
let currentCircle = 1;

const circleTitles = [
    "Clears",
    "Score",
    "SS"
]

function carouselScroll(event) {
    if (event.key == 'ArrowRight') {
        currentCircle++;
        currentCircle = Math.min(currentCircle, CIRCLE_COUNT - 1);
        updateCirclePositions();
    }
    if (event.key == 'ArrowLeft') {
        currentCircle--;
        currentCircle = Math.max(currentCircle, 0);
        updateCirclePositions();
    }
    // console.log(event);
}

const carouselCanvas = document.getElementById("levelCircleCarousel")
document.addEventListener('keydown', carouselScroll)

const CIRCLE_COUNT = 3;

function windowResize() {
    carouselCanvas.width = window.innerWidth;
    carouselCanvas.height = window.innerHeight;

    updateCirclePositions();

    draw();
};

function updateCirclePositions() {
    for (let index = 0; index < levelCircles.length; index++) {
        const circle = levelCircles[index];
        circle.setDesiredX(getCircleX(index));
        circle.setDesiredY(getCircleY(index));
        circle.setDesiredRadius(getCircleRadius(index));
    }
}

window.addEventListener('resize', windowResize);


function getCircleX(circleIndex) {
    return -(currentCircle - circleIndex) * carouselCanvas.width / 3 + carouselCanvas.width / 2;
}

function getCircleY(circleIndex) {
    return carouselCanvas.height / 2 + Math.abs(currentCircle - circleIndex) * carouselCanvas.height / 6;
}

function getCircleRadius(circleIndex) {
    let minDimension = Math.min(carouselCanvas.height, carouselCanvas.width);
    return minDimension / 4 - Math.abs(currentCircle - circleIndex) * minDimension / 10
}

function draw() {
    if (carouselCanvas.getContext) {
        var ctx = carouselCanvas.getContext('2d');

        ctx.fillStyle = '#333333'

        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'

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

        stat = {};
        stat.name = circleTitles[i];
        stat.level = -Math.pow((i - 1) * 2, 4) - i * 5 + 40;

        const levelCircle = new LevelCircle(X, Y, R, (i + 1) * 0.3, stat);
        requestAnimationFrame(levelCircle.update.bind(levelCircle));
        levelCircles.push(levelCircle);
    }
    requestAnimationFrame(draw);
}

init();
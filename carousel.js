let levelCircles = [];

function carouselScroll(event) {
    console.log(event.deltaY);
}

const carouselCanvas = document.getElementById("levelCircleCarousel")
carouselCanvas.addEventListener('wheel', carouselScroll)

const CIRCLE_COUNT = 1;

function windowResize() {
    carouselCanvas.width = window.innerWidth;
    carouselCanvas.height = window.innerHeight;
    levelCircles.forEach(circle => {
        circle.setDesiredX(carouselCanvas.width / 2);
        circle.setDesiredY(carouselCanvas.height / 2);
        circle.setDesiredRadius(carouselCanvas.height / 3);
    })
    draw();
};

window.addEventListener('resize', windowResize);


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
        var X = carouselCanvas.width / 2;
        var Y = carouselCanvas.height / 2;
        var R = carouselCanvas.height / 3;
        const levelCircle = new LevelCircle(X, Y, R);
        requestAnimationFrame(levelCircle.update.bind(levelCircle));
        levelCircles.push(levelCircle);
    }
    requestAnimationFrame(draw);
}

init();
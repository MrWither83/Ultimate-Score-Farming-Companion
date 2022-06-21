const circleTitles = [
    "Clears",
    "Ranked Score",
    "SS"
]

const CIRCLE_COUNT = 3;

class LevelCircleCarousel {

    constructor(carouselCanvas) {
        this.levelCircles = [];
        this.currentCircle = 1;

        this.carouselCanvas = carouselCanvas;
        
        for (let i = 0; i < CIRCLE_COUNT; i++) {
            var X = this.getCircleX(i);
            var Y = this.getCircleY(i);
            var R = this.getCircleRadius(i);

            let stat = {};
            stat.name = circleTitles[i];
            stat.level = -Math.pow((i - 1) * 2, 4) - i * 5 + 40;
            stat.nextLevelRequirement = 0;

            const levelCircle = new LevelCircle(X, Y, R, (i + 1) * 0.3, stat);
            this.levelCircles.push(levelCircle);
            
            requestAnimationFrame(levelCircle.update.bind(levelCircle));
        }
        
        this.draw = this.draw.bind(this);
        this.carouselScroll = this.carouselScroll.bind(this);
        requestAnimationFrame(this.draw);
    }

    carouselScroll(event) {
        if (event.key == 'ArrowRight') {
            this.currentCircle++;
            this.currentCircle = Math.min(this.currentCircle, CIRCLE_COUNT - 1);
            this.updateCirclePositions();
        }
        if (event.key == 'ArrowLeft') {
            this.currentCircle--;
            this.currentCircle = Math.max(this.currentCircle, 0);
            this.updateCirclePositions();
        }
        // console.log(event);
    }

    updateCirclePositions() {
        for (let index = 0; index < this.levelCircles.length; index++) {
            const circle = this.levelCircles[index];
            circle.setDesiredX(this.getCircleX(index));
            circle.setDesiredY(this.getCircleY(index));
            circle.setDesiredRadius(this.getCircleRadius(index));
        }
    }

    getCircleX(circleIndex) {
        return -(this.currentCircle - circleIndex) * this.carouselCanvas.width / 3 + this.carouselCanvas.width / 2;
    }

    getCircleY(circleIndex) {
        return this.carouselCanvas.height / 2 + Math.abs(this.currentCircle - circleIndex) * this.carouselCanvas.height / 6;
    }

    getCircleRadius(circleIndex) {
        let minDimension = Math.min(this.carouselCanvas.height, this.carouselCanvas.width);
        return minDimension / 4 - Math.abs(this.currentCircle - circleIndex) * minDimension / 10
    }

    draw() {
        if (this.carouselCanvas.getContext) {
            var ctx = this.carouselCanvas.getContext('2d');

            ctx.fillStyle = '#333333'

            ctx.textAlign = 'center'
            ctx.textBaseline = 'middle'

            ctx.clearRect(0, 0, this.carouselCanvas.width, this.carouselCanvas.height);
            this.levelCircles.forEach(circle => {
                circle.draw(ctx);
            })
        }
        requestAnimationFrame(this.draw);
    }

    updateLevelCircle(stat) {
        this.levelCircles.forEach(levelCircle => {
            if (levelCircle.stat.name === stat.name) {
                levelCircle.setStat(stat);
            }
        });
    }

}
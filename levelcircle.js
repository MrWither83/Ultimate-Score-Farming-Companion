class LevelCircle {

    constructor(x, y, radius, progress = 0.3, stat) {
        this.x = x;
        this.y = y;
        this.desiredX = x;
        this.desiredY = y;

        this.radius = radius;
        this.desiredRadius = radius;

        this.progress = progress;
        this.desiredProgress = progress;

        this.stat = stat;

        this.previousUpdateTime = performance.now();
    }

    draw(canvasContext) {
        canvasContext.save();

        canvasContext.beginPath();
        canvasContext.translate(this.x, this.y);
        canvasContext.ellipse(0, 0, this.radius * 1.2, this.radius * 1.2, 0, 0, 2 * Math.PI);
        canvasContext.fill();

        canvasContext.lineWidth = this.radius / 10.1;

        canvasContext.strokeStyle = '#222222';
        canvasContext.beginPath();
        canvasContext.arc(0, 0, this.radius, 0, 2 * Math.PI, false);
        canvasContext.stroke();


        const progressGradient = canvasContext.createLinearGradient(0, -this.radius, 0, this.radius);
        progressGradient.addColorStop(0, 'cyan');
        progressGradient.addColorStop(1, 'yellow');
        canvasContext.strokeStyle = progressGradient;

        canvasContext.lineWidth = this.radius / 10;
        canvasContext.beginPath();
        canvasContext.arc(0, 0, this.radius, -0.5 * Math.PI, this.progress * 2 * Math.PI - 0.5 * Math.PI, false);
        canvasContext.stroke();


        canvasContext.fillStyle = '#ffffff'

        canvasContext.font = this.radius * 0.25 + 'px Comfortaa';
        canvasContext.fillText(this.stat.name, 0, -this.radius / 5);

        canvasContext.font = this.radius * 0.2 + 'px Comfortaa';
        canvasContext.fillText("Level " + this.stat.level, 0, this.radius / 5);

        canvasContext.font = this.radius * 0.1 + 'px Comfortaa';
        canvasContext.fillText("Next at : " + this.stat.nextLevelRequirement.toLocaleString('en-US'), 0, 2 * this.radius / 5);

        canvasContext.restore();

    }

    setDesiredRadius(radius) {
        if (radius >= 0) {
            this.desiredRadius = radius;
        } else {
            this.desiredRadius = 0;
        }
    }

    setDesiredX(x) {
        this.desiredX = x;
    }

    setDesiredY(y) {
        this.desiredY = y;
    }

    setStat(stat) {
        this.stat = stat;
        this.updateDesiredProgress();
    }

    updateDesiredProgress() {
        this.desiredProgress = this.stat.progress;
    }

    update(timeStamp) {
        // console.log(this.desiredRadius);
        // console.log(this.radius);
        let delta = timeStamp - this.previousUpdateTime;
        this.previousUpdateTime = timeStamp;
        this.x += delta / 100 * (this.desiredX - this.x);
        this.y += delta / 100 * (this.desiredY - this.y);
        this.radius += delta / 100 * (this.desiredRadius - this.radius);
        this.progress += delta / 100 * (this.desiredProgress - this.progress);
        requestAnimationFrame(this.update.bind(this));
    }
}
class LevelCircle {

    constructor(x, y, radius, progress = 0.3) {
        this.x = x;
        this.y = y;
        this.desiredX = x;
        this.desiredY = y;

        this.radius = radius;
        this.desiredRadius = radius;

        this.progress = progress;

        this.previousUpdateTime = performance.now();
    }

    draw(canvasContext) {
        canvasContext.save();
        canvasContext.beginPath();
        // canvasContext.translate(this.x, this.y);
        canvasContext.ellipse(this.x, this.y, this.radius * 1.2, this.radius * 1.2, 0, 0, 2 * Math.PI);
        canvasContext.fill();
        canvasContext.beginPath();
        canvasContext.arc(this.x, this.y, this.radius, -0.5 * Math.PI, this.progress * 2 * Math.PI - 0.5 * Math.PI, false);
        canvasContext.lineWidth = this.radius / 20;
        canvasContext.stroke();
        canvasContext.restore();
    }

    setDesiredRadius(radius) {
        this.desiredRadius = radius;
    }

    setDesiredX(x) {
        this.desiredX = x;
    }

    setDesiredY(y) {
        this.desiredY = y;
    }

    update(timeStamp) {
        console.log(this.desiredRadius);
        console.log(this.radius);
        let delta = timeStamp - this.previousUpdateTime;
        this.previousUpdateTime = timeStamp;
        this.x += delta / 100 * (this.desiredX - this.x);
        this.y += delta / 100 * (this.desiredY - this.y);
        this.radius += delta / 100 * (this.desiredRadius - this.radius);
        requestAnimationFrame(this.update.bind(this));
    }
}
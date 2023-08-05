class Vec2 {
    constructor(x = 0.0, y = 0.0) {
        this.x = x;
        this.y = y;
    }

    mag() {
        return Math.sqrt(this.x ** 2 + this.y ** 2);
    }

    norm() {
        const mag = this.mag();
        if (mag > 0) {
            return new Vec2(this.x / mag, this.y / mag);
        }
        return this;
    }

    add(other) {
        return new Vec2(this.x + other.x, this.y + other.y);
    }

    sub(other) {
        return new Vec2(this.x - other.x, this.y - other.y);
    }

    mul(other) {
        return new Vec2(this.x * other, this.y * other);
    }

    div(other) {
        return new Vec2(this.x / other, this.y / other);
    }

    dot(vec2) {
        return this.x * vec2.x + this.y * vec2.y;
    }

    cross(vec2) {
        return this.x * vec2.y - this.y * vec2.x;
    }

    clone() {
        return new Vec2(this.x, this.y);
    }

    clamp(low, high) {
        return new Vec2(
            Math.min(Math.max(this.x, low), high),
            Math.min(Math.max(this.y, low), high)
        );
    }

    static random() {
        return new Vec2(Math.random(), Math.random());
    }
}

export default Vec2;
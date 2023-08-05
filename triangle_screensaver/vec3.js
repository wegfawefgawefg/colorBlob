export class Vec3 {
    constructor(x = 0.0, y = 0.0, z = 0.0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    mag() {
        return Math.sqrt(this.x ** 2 + this.y ** 2 + this.z ** 2);
    }

    norm() {
        let mag = this.mag();
        if (mag > 0) {
            return new Vec3(this.x / mag, this.y / mag, this.z / mag);
        }
        return this;
    }

    add(vec) {
        return new Vec3(this.x + vec.x, this.y + vec.y, this.z + vec.z);
    }

    sub(vec) {
        return new Vec3(this.x - vec.x, this.y - vec.y, this.z - vec.z);
    }

    mul(num) {
        return new Vec3(this.x * num, this.y * num, this.z * num);
    }

    div(num) {
        return new Vec3(this.x / num, this.y / num, this.z / num);
    }

    dot(vec) {
        return this.x * vec.x + this.y * vec.y + this.z * vec.z;
    }

    cross(vec) {
        return new Vec3(
            this.y * vec.z - this.z * vec.y,
            this.z * vec.x - this.x * vec.z,
            this.x * vec.y - this.y * vec.x
        );
    }

    clone() {
        return new Vec3(this.x, this.y, this.z);
    }

    clamp(low, high) {
        return new Vec3(
            Math.min(Math.max(this.x, low), high),
            Math.min(Math.max(this.y, low), high),
            Math.min(Math.max(this.z, low), high),
        );
    }

    static unit() {
        return new Vec3(1, 1, 1);
    }

    static random() {
        return new Vec3(Math.random(), Math.random(), Math.random());
    }
}

export default Vec3;
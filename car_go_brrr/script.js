import Vec2 from './vec2.js';

// utils
const new_enum = function (...keys) {
    return Object.freeze(keys.reduce((acc, key, index) => {
        acc[key] = index;
        return acc;
    }, {}));
}

const dirs = new_enum("right", "down_right", "down", "down_left", "left", "up_left", "up", "up_right");


// init
const canvas = document.querySelector("#primary_canvas");
let width = (canvas.width = window.innerWidth);
let height = (canvas.height = window.innerHeight);

// init audio 
let buffer = null;
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
async function load_audio() {
    // return fetch(ball_wall_bounce_sound_path)
    //     .then(response => response.arrayBuffer())
    //     .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
    //     .then(decodedData => {
    //         buffer = decodedData;
    //     })
    //     .catch(error => {
    //         console.error('Error loading audio:', error);
    //     });
    // for debug just return a promise that resolves immediately
    return new Promise((resolve) => {
        resolve();
    });
}


// init images
const taxi_sprites = {};
function get_sprite_from_dir(dir) {
    return taxi_sprites[Object.keys(dirs)[dir]];
}

function load_images() {
    return new Promise((resolve) => {
        const tax_start_path = 'assets/taxi_';
        const tax_end_path = '.png';

        for (const dir in dirs) {
            console.log(dir)
            taxi_sprites[dir] = new Image();
            taxi_sprites[dir].src = tax_start_path + dir + tax_end_path;
        }

        let imagesLoaded = 0;
        for (const key in taxi_sprites) {
            console.log(key);
            taxi_sprites[key].addEventListener('load', function () {
                imagesLoaded++;
                if (imagesLoaded === Object.keys(taxi_sprites).length) {
                    resolve();
                }
            });
        }
    });
}

// reset canvas
canvas.style.backgroundColor = "black";
const ctx = canvas.getContext("2d");

ctx.fillStyle = color_to_string([0, 0, 0]);
ctx.fillRect(0, 0, width, height);
ctx.lineWidth = 1;


window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    width = (canvas.width = window.innerWidth);
    height = (canvas.height = window.innerHeight);
    cam.pos = new Vec2(width / 2, height / 2);
});


function random(min, max) {
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num;
}

function color_to_string(color) {
    return `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
}
function color_with_alpha_to_string(color) {
    return `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${color[3]})`;
}

function get_direction(vel) {
    // Calculate the angle of the velocity vector with respect to the positive x-axis
    const angle = Math.atan2(vel.y, vel.x);

    // Normalize the angle to a value between 0 and 2π
    const normalizedAngle = (angle + 2 * Math.PI) % (2 * Math.PI);

    // Divide the angle into 8 parts and assign the corresponding direction
    const index = Math.floor(normalizedAngle / (Math.PI / 4));
    const directions = [
        dirs.right,
        dirs.down_right,
        dirs.down,
        dirs.down_left,
        dirs.left,
        dirs.up_left,
        dirs.up,
        dirs.up_right,
    ];

    return directions[index];
}


class Car {
    constructor(pos, vel, size) {
        this.pos = pos;
        this.vel = vel;
        this.size = size;
        this.dir = dirs.right;
    }

    update() {
        this.pos = this.pos.add(this.vel);
        this.dir = get_direction(this.vel);
    }
}

// camera that regresses to neutral position
class Camera {
    constructor() {
        this.pos = new Vec2(0, 0);
        this.vel = new Vec2(0, 0);
        this.acc = new Vec2(0, 0);
    }
    update() {
        // add a force aiming back to 0,0
        // screen center
        let t = new Vec2(width / 2, height / 2);
        let force = t.sub(this.pos).mul(0.01);
        this.acc = this.acc.add(force);

        // vel fric
        this.vel = this.vel.mul(0.8);

        this.vel = this.vel.add(this.acc);
        this.pos = this.pos.add(this.vel);
        this.acc = this.acc.mul(0);
    }
}


const cam = new Camera();
cam.pos = new Vec2(width / 2, height / 2);
let pause_frames = 0;

const cars = [];
const num_cars = 10;
const size = 100;
const speed_range = [0.5, 1.5];

// gen some cars
while (cars.length < num_cars) {
    const vel = new Vec2(
        random(...speed_range),
        random(...speed_range),
    );
    let car = new Car(
        new Vec2(random(0 + size, width - size), random(0 + size, height - size)),
        vel,
        size
    );
    cars.push(car);
}

function wall_bounce(o) {
    let bounced = false;
    let bounce_dir = new Vec2(0, 0);
    if (o.pos.x + o.size >= width) {
        o.vel.x = -o.vel.x;
        o.pos.x = width - o.size;
        bounced = true;
    }
    if (o.pos.x <= 0) {
        o.vel.x = -o.vel.x;
        o.pos.x = 0;
        bounced = true;
    }
    if (o.pos.y + o.size >= height) {
        o.vel.y = -o.vel.y;
        o.pos.y = height - o.size;
        bounced = true;
    }
    if (o.pos.y <= 0) {
        o.vel.y = -o.vel.y;
        o.pos.y = 0;
        bounced = true;
    }
    if (bounced) {
    }
}

function draw() {
    ctx.fillStyle = color_with_alpha_to_string([0, 0, 0, 1.0]);
    ctx.fillRect(0, 0, width, height);

    let center = new Vec2(width / 2, height / 2);

    cars.forEach((car) => {
        let sp = car.pos.sub(cam.pos).add(center);
        let sprite = get_sprite_from_dir(car.dir);

        // size scales with y
        ctx.drawImage(
            sprite,
            sp.x,
            sp.y,
            car.size,
            car.size
        );
    });
}


// create loop that animates the scene
function loop() {
    if (pause_frames > 0) {
        pause_frames -= 1;
    }
    else {

        cars.forEach((car) => {
            car.update();
            wall_bounce(car);
        });
        cam.update();
    }

    draw();
    requestAnimationFrame(loop);
}



async function init() {
    await load_images();
    await load_audio();
    loop();
}

init();
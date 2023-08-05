import Vec2 from './vec2.js';

// init
const canvas = document.querySelector("#primary_canvas");
let width = (canvas.width = window.innerWidth);
let height = (canvas.height = window.innerHeight);

// init audio 
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const ball_wall_bounce_sound_path = 'sounds/ball_wall_bounce.wav';
let buffer = null;

// reset canvas
canvas.style.backgroundColor = "black";
const ctx = canvas.getContext("2d");

ctx.fillStyle = color_to_string([0, 0, 0]);
ctx.fillRect(0, 0, width, height);
ctx.lineWidth = 1;

function loadAudio() {
    return fetch(ball_wall_bounce_sound_path)
        .then(response => response.arrayBuffer())
        .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
        .then(decodedData => {
            buffer = decodedData;
        })
        .catch(error => {
            console.error('Error loading audio:', error);
        });
}

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

function play_ball_hit_wall_sound() {
    if (buffer) {
        const source = audioContext.createBufferSource();
        source.buffer = buffer;
        source.connect(audioContext.destination);
        source.start(0);
    }
}

class Ball {
    constructor(pos, vel, color, size) {
        this.pos = pos;
        this.vel = vel;
        this.color = color; // ball color
        this.size = size; // ball radius
    }



    update() {
        this.pos = this.pos.add(this.vel);
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


const balls = [];
const num_balls = 3;
const size_range = [5, 20];
// create loop to generate balls
while (balls.length < num_balls) {
    const size = random(...size_range);
    let ball = new Ball(
        // ball position always drawn at least one ball width
        // away from the edge of the canvas, to avoid drawing errors
        // }
        new Vec2(random(0 + size, width - size), random(0 + size, height - size)),
        new Vec2(
            random(-7, 7),
            random(-7, 7)
        ),
        [
            random(0, 255),
            random(0, 255),
            random(0, 255),
        ],
        size
    );
    balls.push(ball);
}

function wall_bounce(ball) {
    let bounced = false;
    let bounce_dir = new Vec2(0, 0);
    if (ball.pos.x + ball.size >= width) {
        ball.vel.x = -ball.vel.x;
        ball.pos.x = width - ball.size;
        bounced = true;
        bounce_dir.x = -1;
    }
    if (ball.pos.x - ball.size <= 0) {
        ball.vel.x = -ball.vel.x;
        ball.pos.x = ball.size;
        bounced = true;
        bounce_dir.x = 1;
    }
    if (ball.pos.y + ball.size >= height) {
        ball.vel.y = -ball.vel.y;
        ball.pos.y = height - ball.size;
        bounced = true;
        bounce_dir.y = -1;
    }
    if (ball.pos.y - ball.size <= 0) {
        ball.vel.y = -ball.vel.y;
        ball.pos.y = ball.size;
        bounced = true;
        bounce_dir.y = 1;
    }
    if (bounced) {
        play_ball_hit_wall_sound();
        // add force to camera
        let bounce_force_k = -10.0;
        cam.acc = cam.acc.add(bounce_dir.mul(bounce_force_k));
        pause_frames += 1;
    }
}

function draw() {
    let center = new Vec2(width / 2, height / 2);

    balls.forEach((ball) => {
        // calculate ball screen position using cam
        let screen_pos = ball.pos.sub(cam.pos).add(center);

        ctx.beginPath();
        ctx.fillStyle = color_to_string(ball.color);
        ctx.arc(screen_pos.x, screen_pos.y, ball.size, 0, 2 * Math.PI);
        // ctx.rect(screen_pos.x - ball.size, screen_pos.y - ball.size, ball.size * 2, ball.size * 2);
        ctx.fill();
    });
}

// create loop that animates the scene
function loop() {
    if (pause_frames > 0) {
        pause_frames -= 1;
    }
    else {
        ctx.fillStyle = color_with_alpha_to_string([0, 0, 0, 0.01]);
        ctx.fillRect(0, 0, width, height);
        balls.forEach((ball) => {
            //ball.draw();
            ball.update();
            wall_bounce(ball);
        });
        cam.update();
    }

    draw();
    requestAnimationFrame(loop);
}


loadAudio().then(() => {
    loop();
});

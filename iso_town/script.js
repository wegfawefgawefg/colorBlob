import Vec2 from './vec2.js';


// init
const canvas = document.querySelector("#primary_canvas");
const debugTextElement = document.getElementById('debugText');
const debug_state = {
};
let width = (canvas.width = window.innerWidth);
let height = (canvas.height = window.innerHeight);
let center = new Vec2(width / 2, height / 2)
const ctx = canvas.getContext("2d");

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    width = (canvas.width = window.innerWidth);
    height = (canvas.height = window.innerHeight);
    cam.pos = new Vec2(width / 2, height / 2);
});

// state
let pause_frames = 0;
let mouse_pos = new Vec2(center.x, center.y);
let tile_data = {};
let tiles = {};
let map_size = 8;
let map = [];

class Camera {
    constructor() {
        this.pos = new Vec2(0, 0);
        this.vel = new Vec2(0, 0);
        this.acc = new Vec2(0, 0);
    }
    step() {
        // add a force aiming back to 0,0
        // screen center
        // let t = new Vec2(width / 2, height / 2);
        // let force = t.sub(this.pos).mul(0.01);
        // this.acc = this.acc.add(force);

        // vel fric
        this.vel = this.vel.mul(0.8);

        this.vel = this.vel.add(this.acc);
        this.pos = this.pos.add(this.vel);
        this.acc = this.acc.mul(0);
    }
}
let cam = new Camera();

document.addEventListener('mousemove', function (event) {
    mouse_pos = new Vec2(event.screenX, event.screenY);
});

document.addEventListener('keydown', (event) => {
    let cam_speed = 10.0;
    switch (event.key) {
        case 'w':
            cam.acc.y -= cam_speed;
            break;
        case 'a':
            cam.acc.x -= cam_speed;
            break;
        case 's':
            cam.acc.y += cam_speed;
            break;
        case 'd':
            cam.acc.x += cam_speed;
            break;
        default:
            return;
    }
});

function color_to_string(color) {
    return `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
}
function color_with_alpha_to_string(color) {
    return `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${color[3]})`;
}

function random_int_in_range(low, high) {
    // non inclusive
    assert(low < high, `random_int_in_range: input args impossible, high must be greater than low, but ${low} !< ${high}`)
    return Math.floor(low + Math.random() * (high - low))
}

function updateDebugText() {
    const debugTextElement = document.getElementById('debugText');
    let debugText = '';

    // Sort the keys alphabetically
    const sortedKeys = Object.keys(debug_state).sort();

    // Create a newline-separated list of tags for each key-value pair
    for (const key of sortedKeys) {
        const value = debug_state[key];
        const valueString = typeof value === 'object' ? JSON.stringify(value) : value;
        debugText += `${key}: ${valueString}\n`;
    }

    // Update the debug text content
    debugTextElement.textContent = debugText;
}

async function parse_tile_atlas_into_dict() {
    console.log("parsing tile atlas into dict");
    const response = await fetch('assets/landscapeTiles_sheet.xml');
    const xmlString = await response.text();
    const parser = new DOMParser();
    const xml = parser.parseFromString(xmlString, 'application/xml');
    const subTextures = xml.querySelectorAll('SubTexture');
    tiles = {};

    // populate tiles dict
    subTextures.forEach((subTexture) => {
        const name = subTexture.getAttribute('name');
        const x = parseInt(subTexture.getAttribute('x'));
        const y = parseInt(subTexture.getAttribute('y'));
        const width = parseInt(subTexture.getAttribute('width'));
        const height = parseInt(subTexture.getAttribute('height'));
        tiles[name] = { x, y, width, height };
    });
}


const tile_atlas = new Image();
function load_image_assets() {
    console.log("loading image assets");
    return new Promise((resolve, reject) => {
        tile_atlas.addEventListener('load', function () {
            resolve();
        });

        tile_atlas.addEventListener('error', function (error) {
            reject(error);
        });
        tile_atlas.src = "assets/landscapeTiles_sheet.png";
    });
}



// Function to draw a specific tile from the texture atlas
function drawTile(name, p) {
    const tile = tiles[name];
    ctx.drawImage(tile_atlas, tile.x, tile.y, tile.width, tile.height, p.x, p.y, tile.width, tile.height);
}

// Function to render the world
function renderWorld() {
    const num = 8
    let cursor_start = new Vec2(0, 0).sub(cam.pos).add(center);
    let cursor = new Vec2(cursor_start.x, cursor_start.y);

    for (let yi = 0; yi < num; yi++) {
        cursor.x = cursor_start.x - ((132 / 2) * yi);
        for (let xi = 0; xi < num; xi++) {
            const tile_name = map[yi][xi];
            const tile = tiles[tile_name];

            // const x = i * tileSize / 2 - j * tileSize / 2 + offsetX;
            // const y = i * tileHeight / 4 + j * tileHeight / 4 + offsetY;
            // const x = i * tile.dim.x - j * tile.dim.x + offsetX;
            // const y = i * tile.dim.y / 2 + j * tile.dim.y / 2 + offsetY;

            drawTile(tile_name, cursor);
            // draw a square
            // ctx.fillStyle = color_to_string([255 / num * xi, 255 / num * yi, 255]);
            // ctx.fillRect(cursor.x, cursor.y, tile.width, tile.height);

            cursor.x += 134 / 2;
            cursor.y += tile.height / 2;
        }
        cursor.y = cursor_start.y + ((132 / 4) * yi + 1);

    }
}

function draw() {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = color_to_string([0, 0, 0]);
    ctx.fillRect(0, 0, width, height);
    renderWorld();
};

function step() {
    if (!(mouse_pos === null)) {
        let cam_move_speed = 0.0001;
        let mouse_center_delta = center.sub(mouse_pos);
        let cam_d = mouse_center_delta.mul(cam_move_speed);
        debug_state.mouse_center_delta = mouse_center_delta;
        // cam.acc = cam.acc.add(cam_d);

        debug_state.mouse_pos = mouse_pos;
        debug_state.center = center;

        debug_state.campos = cam.pos;

    }

    cam.step();

}

function loop() {
    if (pause_frames > 0) {
        pause_frames -= 1;
    }
    else {
        step();
    }
    draw();
    requestAnimationFrame(loop);
}

function gen_map() {
    for (let i = 0; i < map_size; i++) {
        map.push([]);
        for (let j = 0; j < map_size; j++) {
            var keys = Object.keys(tiles);
            var randomKey = keys[Math.floor(Math.random() * keys.length)];
            map[i].push(randomKey);
        }
    }
}


async function init() {
    await parse_tile_atlas_into_dict().then(() => { console.log("parsed tile atlas into dict"); })
    await load_image_assets().then(() => { console.log("loaded image assets"); }).catch((error) => { console.log(error); });
    gen_map();
    loop();
}

setInterval(updateDebugText, 100);

init();
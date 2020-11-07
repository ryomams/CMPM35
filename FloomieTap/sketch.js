/* 
@name "FloomieTap"
@author Ryoma Marta-Sugawara, Nishant Suria
@description A program that allows the user to click on sectors of a rectangular grid, with various audio and video effects. Visuals by Nishant, audio by Ryoma.
*/

// create class 'Vector2' 
//Ok so Nishant likes GODOT and wanted to use VECTOR2's FROM GODOT and basically they're just two-element tuples as an object. Did we need to make an entire object for that? Prolly not but all hail GDScript
class Vector2 {
  constructor(in_x, in_y) { //i hate that constructors in JS are literally just declared like this, this is what happens when homophobes make programming languages
    this.x = in_x;
    this.y = in_y;
  }
}

// create class 'Particle'
//These represent the little fireworks you see on clicks and events.
class Particle {
  constructor(in_x, in_y, in_color, in_dir = 0, in_v = 0, in_lt = 100) {
    this.x = in_x;
    this.y = in_y;
    this.color = in_color;
    this.dir = in_dir; // direction 
    this.v = in_v; // velocity
    this.lt = in_lt; // lifetime
    this.l = 0 // life
  }
  isDead() { //determine the lifetime of the particle
    if (this.l > this.lt) {
      return true;
    } else {
      return false;
    }
  }
  render() {  //what to draw
    fill(this.color);
    square(this.x, this.y, canvas_size.x/40);
  }
  update() {  //where to draw it
    this.l += 1;
    this.x += this.v * cos(this.dir*PI);
    this.y += this.v * sin(this.dir*PI);
    this.v *= particleDecceleration;
  }
}

// var declarations
    //this one's for the canvas
const canvas_size = new Vector2(window.innerWidth, window.innerHeight);
let opacity = 255.0 / 4;
let sector = new Vector2();
let click = false;
let keyedInput = false;
let click_step = 0;
const CLICK_LENGTH = 8;

    //some parameters we can change
let bg_r; let bg_b; let bg_g;
let time_r = 0; let time_b = 0; let time_g = 0;
let seed_r; let seed_b; let seed_g;
const color_change_speed = 0.05; // speed at which the background color changes

    //particle declarations, we basically store them in a stack.
let particleStack = [];
const particleCount = 20;
const particleDecceleration = 0.97;
const particleLifetime = 50;
const particleLifetimeVariance = 30;
const particleVelocity = 12 * 100;
const particleVelocityVariance = 0.5 * 100; 

    //var declaration for sound files
let musicFile;
let musicLoop;
let showedIntro = false;
let canvasInited = false;
let newMusic = new Audio('ass/pee pee.m4a'); // i am so sorry for our file names
let sfx;

//load in assets before loading the canvas so the program doesn't lag tf out
function preload() {
  soundFormats('wav', 'mp3', 'ogg');
  //here's all the sfx we can use! you can even see the secret 17th sound... >:3c
  sfx = [loadSound('ass/puff.mp3'), loadSound('ass/BUP.mp3'), loadSound('ass/HEY.mp3'), loadSound('ass/vsas.mp3'), loadSound('ass/mikal.mp3'), loadSound('ass/jon.mp3'), loadSound('ass/hank.mp3'), loadSound('ass/tau.mp3'), loadSound('ass/euler.mp3'), loadSound('ass/bum.mp3'), loadSound('ass/work.mp3'), loadSound('ass/bl.mp3'), loadSound('ass/net.mp3'), loadSound('ass/memes.mp3'), loadSound('ass/game.mp3'), loadSound('ass/theory.mp3'), loadSound('ass/sega.mp3')];
}

function setup() {
  createCanvas(windowWidth, windowHeight); //fill the screen baybee
  
  // background color initialization
  seed_r = random(1,100) / 50; seed_g = random(1,100) / 50; seed_b = random(1,100) / 50;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  //I was going to implement dynamic resizing, but I got lazy, so now only the canvas resizes but not the keys
}

function canvasInit() { //don't play music until the user starts clickin!!
  if (canvasInited == false) {
    userStartAudio();    //i read on a stack overflow forum page that this function is good practice
    newMusic.loop = true; //gotta loop our song
    newMusic.play();
    showedIntro = true; //we were also gonna implement an intro screen but uhhhh too tired
    canvasInited = true;
  }
}


function draw() {
  // testing to see if the world still exists
  if (false) {
    print("The world has ended. Not a big surprise considering our world leadership.");
  }
  
  // drawing settings
  noStroke();
  
  // background
  // set background to current color
  bg_r = bg_color(time_r, seed_r); bg_b = bg_color(time_b, seed_b); bg_g = bg_color(time_g, seed_g);
  // update time
  if (bool_rand(color_change_speed)) {
    time_r += 0.02;
  }
  if (bool_rand(color_change_speed)) {
    time_b += 0.02;
  }
  if (bool_rand(color_change_speed)) {
    time_g += 0.02;
  }
  // draw background
  background(bg_r, bg_b, bg_g);
  
  // midground
  // on click or key input, add new particles to particle stack
  if (click_step == 1) {
    if (!keyedInput) {
      for (let i = 0; i < particleCount; i++) {
        let newParticle = new Particle(mouseX, mouseY, color_rand(), random(0,100) /50, random(particleVelocity - particleVelocityVariance, particleVelocity + particleVelocityVariance) / 100, random(particleLifetime - particleLifetimeVariance,particleLifetime + particleLifetimeVariance));
        particleStack.push(newParticle);
      }
    } else {
      for (let i = 0; i < particleCount; i++) {
        let newParticle = new Particle(sector.x * canvas_size.x / 4 + canvas_size.x / 8, sector.y * canvas_size.y / 4 + canvas_size.y / 8, color_rand(), random(0,100) /50, random(particleVelocity - particleVelocityVariance, particleVelocity + particleVelocityVariance) / 100, random(particleLifetime - particleLifetimeVariance,particleLifetime + particleLifetimeVariance));
        particleStack.push(newParticle);
      }
    }
  }
  
  // remove dead particles from stack
  let particleStackNew = [];
  let n = particleStack.length;
  for (let i = 0; i < n; i++) {
    if (!particleStack[i].isDead()) {
      particleStackNew.push(particleStack[i]);
    }
  }
  particleStack = particleStackNew;
  
  // render particles
  n = particleStack.length;
  for (let i = 0; i < n; i++) {
    particleStack[i].update();
    particleStack[i].render();
  }
  
  // foreground
  // checking what sector the mouse is in, and setting that to 'sector', if click is false
  if (!click) {
    sector = find_sector(mouseX,mouseY);
  }
  
  // rendering a rectangle as you select
  fill(255,255,255,opacity);
  rect(sector.x * canvas_size.x/4, sector.y * canvas_size.y/4, canvas_size.x/4, canvas_size.y/4);
  
  // after a CLICK_LENGTH deltas, reset click back to false
  if (click) {
    if (click_step < CLICK_LENGTH) {
      click_step += 1;
    } else {
      click_step = 0;
      click = false;
    }
  }
  
  // during click, the square gets more opaque 
  if (click_step > 0) {
    opacity = 255.0 / 2;
  } else {
    opacity = 255.0 / 4;
  }

}

// fn to decide which quadrant a given coord would lie in, returns V2.
function find_sector(in_x,in_y) {
  let output = new Vector2();
  if (in_x < canvas_size.x && in_x != 0 && in_y < canvas_size.y && in_y != 0) {
    output.x = floor(4 * in_x/canvas_size.x);
    output.y = floor(4 * in_y/canvas_size.y);
  } else {
    output.x = -1;
    output.y = -1;
  }
  return output;
}

// mouse-click fn
function mouseClicked() {
  sector = find_sector(mouseX, mouseY);
  soundEvent(' ', sector); //play a sound to the corresponding key
  canvasInit();
  //sfx[15].play();
  if (click == false) {
    click = true;
    keyedInput = false;
  }
}

function keyTyped() {
  click = true;
  keyedInput = true;
  // switch case statement to code all the input keys to corresponding sectors
  switch (key) {
    case '1':
      sector.x = 0; sector.y = 0;
      soundEvent(key, sector); //also play a sound to the corresponding key
      break;
    case '2': 
      sector.x = 1; sector.y = 0;
      soundEvent(key, sector);
      break;
    case '3': 
      sector.x = 2; sector.y = 0;
      soundEvent(key, sector);
      break;
    case '4': 
      sector.x = 3; sector.y = 0;
      soundEvent(key, sector);
      break;
    case 'q':
    case 'Q':
      sector.x = 0; sector.y = 1;
      soundEvent(key, sector);
      break;
    case 'w':
    case 'W':
      sector.x = 1; sector.y = 1;
      soundEvent(key, sector);
      break;
    case 'e':
    case 'E': 
      sector.x = 2; sector.y = 1;
      soundEvent(key, sector);
      break;
    case 'r':
    case 'R': 
      sector.x = 3; sector.y = 1;
      soundEvent(key, sector);
      break;
    case 'a':
    case 'A': 
      sector.x = 0; sector.y = 2;
      soundEvent(key, sector);
      break;
    case 's':
    case 'S': 
      sector.x = 1; sector.y = 2;
      soundEvent(key, sector);
      break;
    case 'd':
    case 'D': 
      sector.x = 2; sector.y = 2;
      soundEvent(key, sector);
      break;
    case 'f':
    case 'F': 
      sector.x = 3; sector.y = 2;
      soundEvent(key, sector);
      break;
    case 'z':
    case 'Z':
      sector.x = 0; sector.y = 3;
      soundEvent(key, sector);
      break;
    case 'x':
    case 'X': 
      sector.x = 1; sector.y = 3;
      soundEvent(key, sector);
      break;
    case 'c':
    case 'C': 
      sector.x = 2; sector.y = 3;
      soundEvent(key, sector);
      break;
    case 'v':
    case 'V': 
      sector.x = 3; sector.y = 3;
      soundEvent(key, sector);
      break;
    default:
      // if an uncoded key is clicked, nothing happens
      click = false;
      keyedInput = false;
  }
}

//this function will determine what key the keypress or mousepress corresponds to and will play a sound accordingly. if something unclickable is clicked, the secret 17th sound will play.
function soundEvent(event, s) { //now that i've reviewed our code, passing in the type of event is completely unnecessary wth was i thinking
  //debugging
  print("you're in sector " + s.x + ", " + s.y + "!")
  if (event == ' ') {
    print("mouse event recieved!");
    
  } else {
    print(event + " key event recieved!");
  }
  
  if (s.x == 0){
    if (s.y == 0) {
      sfx[0].play();
    } else if (s.y == 1) {
      sfx[1].play();
    } else if (s.y == 2) {
      sfx[2].play();
    } else if (s.y == 3) {
      sfx[3].play();
    }
  } else if (s.x == 1) {
    if (s.y == 0) {
      sfx[4].play();
    } else if (s.y == 1) {
      sfx[5].play();
    } else if (s.y == 2) {
      sfx[6].play();
    } else if (s.y == 3) {
      sfx[7].play();
    }
  } else if (s.x == 2) {
    if (s.y == 0) {
      sfx[8].play();
    } else if (s.y == 1) {
      sfx[9].play();
    } else if (s.y == 2) {
      sfx[10].play();
    } else if (s.y == 3) {
      sfx[11].play();
    }
  } else if (s.x == 3) {
    if (s.y == 0) {
      sfx[12].play();
    } else if (s.y == 1) {
      sfx[13].play();
    } else if (s.y == 2) {
      sfx[14].play();
    } else if (s.y == 3) {
      sfx[15].play();
    }
  } else {
    sfx[16].play();
  }
  
  
}

// fn that returns true or false, at a given chance decimal
    //i feel like there is a better way to do this but oh well
function bool_rand(u) {
  let threshold = random(0,99);
  if (threshold > 100 * u) {
    return false;
  } else {
    return true;
  }
}

// fn that returns a random pastelly color
function color_rand() {
  return color(random(127,255),random(127,255),random(127,255));
}

// fn that returns values for calibarted RGB color based on time and seed
function bg_color(in_time, in_seed) {
  return ((64 * cos(PI*(in_time + in_seed))) + 64 + 127);
}

//and that's our program! pretty shnazzy ain't it???
//thanks for coming to our ted talk

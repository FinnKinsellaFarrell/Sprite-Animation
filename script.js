let playerState = 'fall';
const dropdown = document.getElementById('animations');
dropdown.addEventListener('change', function(e) {
    playerState = e.target.value;
})


const canvas = document.getElementById('canvas1'); 
const ctx = canvas.getContext('2d'); 
const CANVAS_WIDTH = canvas.width = 600; 
const CANVAS_HEIGHT = canvas.height = 600; 
const playerImage = new Image(); 
playerImage.src = 'shadow_dog.png' 
const spriteWidth = 575; 
const spriteHeight = 523; 
let gameFrame = 0;
const staggeredFrames = 5;
const spriteAnimations = [];
const animationStates = [{
        name: 'idle',
        frames: 7
    },
    {
        name: 'jump',
        frames: 7,
    },
    {
        name: 'fall',
        frames: 7,
    },
    {
        name: 'run',
        frames: 9,
    },
    {
        name: 'dizzy',
        frames: 11,
    },
    {
        name: 'sit',
        frames: 5,
    },
    {
        name: 'roll',
        frames: 7,
    },
    {
        name: 'bite',
        frames: 7,
    },
    {
        name: 'ko',
        frames: 12,
    },
    {
        name: 'getHit',
        frames: 4,
    }

];

animationStates.forEach((state, index) => {
    let frames = {
        loc: [],
    }
    for (let j = 0; j < state.frames; j++) {
        let positionX = j * spriteWidth;
        let positionY = index * spriteHeight;
        frames.loc.push({ x: positionX, y: positionY });
    }
    spriteAnimations[state.name] = frames;
});
console.log(spriteAnimations);

function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT); // deletes old drawings on the entire canvas
    let position = Math.floor(gameFrame / staggeredFrames) % spriteAnimations[playerState].loc.length; // This line slow the animation down the raminder operator only alows to exctue every 5 times
    let frameX = spriteAnimations[playerState].loc[position].x; // this line will increase the xframe 
    let frameY = spriteAnimations[playerState].loc[position].y;
    ctx.drawImage(playerImage, frameX, frameY,
        spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight); // the drawmethod draw the Image(playerImage) on the canvas, 
    //the part frameX/Y are determine which part of the image will be cut out and show on the canvas 
    gameFrame++; // increases the gamframe plus 1 by every iteration
    requestAnimationFrame(animate); // this funtion call the the function as ofthen as the animationframe of the computer allows it, in Loop
};
animate(); // calling the loop animation

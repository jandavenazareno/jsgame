
let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");


let x = canvas.width/2;
let y = canvas.height-30;
let dx = 2;
let dy = -2;

let ballRadius = 10;

let xc, yc,zc;

let paddleHeight = 10;
let paddleWidth = 100;
let paddleX = (canvas.width-paddleWidth) / 2;

let rightPressed = false;
let leftPressed = false;

let brickRowCount = 3;
let brickColumnCount = 5;
let brickWidth = 75;
let brickHeight = 20;
let brickPadding = 10;
let brickOffsetTop = 30;
let brickOffsetLeft = 30;
let score = 0;
let lives = 3;


let bricks = [];
for (let c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (let r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}



//ball
function drawBall() {
    // drawing code
	ctx.beginPath();
	ctx.arc(x, y, ballRadius, 0, Math.PI*2);
	// ctx.fillStyle = "#0095DD";
	ctx.fillStyle = "rgb(" + xc + "," + yc + "," + zc + ")";;
    ctx.fill();
	ctx.closePath();
  
}

//paddle
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle ="rgb(" + xc + "," + yc + "," + zc + ")";
    ctx.fill();
    ctx.closePath();
}

function drawBricks() {
    for(let c=0; c<brickColumnCount; c++) {
        for(let r=0; r<brickRowCount; r++) {
            if(bricks[c][r].status == 1) {
                let brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
                let brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}


function draw(){
	ctx.clearRect(0,0, canvas.width, canvas.height);
	drawBricks();
	drawBall();
	drawPaddle();
    drawScore();
    collisionDetection();

	x += dx;
    y += dy;

    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
    	dx = -dx;
    	random_bg_color();
	}
	
	if(y + dy < ballRadius) {
    	dy = -dy;
	
	} 
	else if(y + dy > canvas.height-ballRadius) {
	   
	   if(x > paddleX && x < paddleX + paddleWidth) {
        	dy = -dy;
    	}
    	else {
	         lives--;
                 if(!lives) {
                    alert("GAME OVER");
                    document.location.reload();
                 }
                 else {
                    x = canvas.width/2;
                    y = canvas.height-30;
                    dx = 3;
                    dy = -3;
                    paddleX = (canvas.width-paddleWidth)/2;
                  }
    	}
	}

	if(rightPressed && paddleX < canvas.width - paddleWidth) {
  	 	paddleX += 7;
	}
	else if(leftPressed && paddleX > 0) {
   		paddleX -= 7;
	}

}

function random_bg_color() {
     xc = Math.floor(Math.random() * 256);
     yc = Math.floor(Math.random() * 256);
     zc = Math.floor(Math.random() * 256);
  //   let bgColor = "rgb(" + x + "," + y + "," + z + ")";
 	// console.log(bgColor);
  

}



document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

function mouseMoveHandler(e) {
    let relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth/2;
    }
}

function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}

function collisionDetection() {
    for(let c=0; c<brickColumnCount; c++) {
        for(let r=0; r<brickRowCount; r++) {
            let b = bricks[c][r];
            if(b.status == 1) {
                if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                    if(score == brickRowCount*brickColumnCount) {
                        alert("YOU WIN, CONGRATULATIONS!");
                        document.location.reload();
                        clearInterval(interval); // Needed for Chrome to end game
                    }
                }
            }
        }
    }
}

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: "+score, 8, 20);
}

function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Lives: "+lives, canvas.width-65, 20);
}

let interval=setInterval(draw, 10);



//game constants and variables
const GameSound = new Audio('content/SnakeMusic.mp3');
const GameEnd = new Audio('content/choti-bacchi-ho-kya.mp3');
const Turn = new Audio('content/gta.mp3');
const Food = new Audio('content/food.mp3');
let inputDir = {x:0,y:0}
let speed = 4;
let score = 0;
let lastPainttime = 0;
let snakeArr = [
    {x:13,y:15}
]
food = {x:6,y:7};

/////////////////////////////////game functions////////////////////////////////////////
function main(ctime){
    window.requestAnimationFrame(main);
    //console.log(ctime);
    //for controling the speed
    if((ctime - lastPainttime)/1000 < 1/speed){
        return;
    }
    lastPainttime = ctime;
    gameEngine();
}

function isCollide(snakeArr){
    //if snake eat itself
    for (let index = 1; index < snakeArr.length; index++) {
        if (snakeArr[index].x === snakeArr[0].x && snakeArr[index].y === snakeArr[0].y) {
            return true;
        }
    }

    //if snake accident with wall
    if((snakeArr[0].x>18 || snakeArr[0].x<0) || (snakeArr[0].y>18 || snakeArr[0].y<0)){
        return true;
    }

    return false;
}

function gameEngine(){
    //Part1. updating the snake array & food
    //condition for ending the game
    if(isCollide(snakeArr)){
        GameEnd.play();
        GameSound.pause();
        inputDir = {x:0,y:0};
        alert('Game Over! Press any key to play again.')
        snakeArr = [{x:13,y:15}];
        score = 0;
    }

    //if snake have eaten food, increment the snake and regenerate food
    if(snakeArr[0].x === food.x && snakeArr[0].y === food.y){
        Food.play();
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x , y: snakeArr[0].y + inputDir.y});
        score++;
        if(score > hiscoreval){
            hiscoreval = score;
            localStorage.setItem('hiscore',JSON.stringify(hiscoreval));
            hiscore.innerHTML = "High Score: " + hiscoreval;
        }
        document.getElementById('score').innerHTML ="Score: " + score;
        //food create --> for making game easy , create food far from boundry
        let a = 1;
        let b = 17;
        food = {x: Math.round(a + (b - a)*Math.random()), y: Math.round(a + (b-a)*Math.random())};
    }

    ////Moving the snake -- Important--__--
    for(let i = snakeArr.length - 2; i>=0; i--){
        //for avoiding referencing problem, I create different object
        snakeArr[i+1] = {...snakeArr[i]};
    }
    //for giving direction to head part of snake
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    //part2. Display the snake array & food
    //display the snake before starting the game
    document.getElementById("board").innerHTML = "";
    snakeArr.forEach((e,index) =>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index === 0){
            snakeElement.classList.add('head');
        }else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    })

    //display the food before game
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}

/////////////////////////    main logic    ////////////////////////////////////////
//for showing high score
let highscore = localStorage.getItem('hiscore');
if(highscore === null){
    hiscoreval = 0;
    localStorage.setItem('hiscore',JSON.stringify(hiscoreval));
}else{
    hiscoreval = JSON.parse(highscore); 
    hiscore.innerHTML = "High Score: " + highscore;
}
//for contiues the game
window.requestAnimationFrame(main);
window.addEventListener('keydown',e => {
    inputDir = {x:0,y:1};//starting of game
    GameSound.play();
    Turn.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp"); 
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft"); 
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
    }
})
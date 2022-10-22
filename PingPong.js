let gameBoard=document.querySelector("#gameBoard");
let ctx=gameBoard.getContext("2d");
let scoreText=document.querySelector("#scoretext");
let resetBtn=document.querySelector("#resetBtn");
let gameWidth=gameBoard.width;
let gameHeight=gameBoard.height;
let boardBackgound="black";
let paddle1Color="lightblue";
let paddle2Color="red";
let paddleBorder="black";
let ballColor="yellow";
let ballBorderColor="black";
let ballRadius=12.5;
let paddleSpeed=50;
let intervalID;
let ballSpeed=3;
let ballX=gameWidth/2;
let ballY=gameHeight/2;
let ballXDirection=0;
let ballYDirection=0;
let Player1Score=0;
let Player2Score=0;
let HighestScore=0;
let Playername="";

let paddle1={
width:100,
height:25,
x:gameWidth/2,
y:0,


}
let paddle2={
    width:100,
    height:25,
    x:gameWidth/2,
    y:gameHeight-25,
    
    
    }

    window.addEventListener("keydown",changeDirection);
    resetBtn.addEventListener("click",function(){
      resetGame();
      gameStart();
    });


    window.addEventListener("load",function(e){
      if(HighestScore==0){
        alert("This is your first time")
      }else{
        alert("The highest scorer is"+Playername+":"+HighestScore)
      }
      alert("The game start");
      
      gameStart();
      
    })
   
    

    function gameStart(){
         createBall();
         clearBoard();
        drawPaddles();
        drawBall(ballX,ballY);
        window.addEventListener("keydown",function(e){
         
          if(e.keyCode==13){
            nextTick();
          }
        })
      }
    
    function nextTick(){
        intervalID=setTimeout(()=>{
        clearBoard();
        drawPaddles();
        moveBall();
        drawBall(ballX,ballY);
        checkCollision();
        nextTick();
        },10)

    }

    function clearBoard(){
        ctx.fillStyle=boardBackgound;
        ctx.fillRect(0,0,gameWidth,gameHeight);
  

    }

    function drawPaddles(){
   ctx.strokeStyle=paddleBorder;
   ctx.fillStyle=paddle1Color;
   ctx.fillRect(paddle1.x,paddle1.y,paddle1.width,paddle1.height);
   ctx.strokeRect(paddle1.x,paddle1.y,paddle1.width,paddle1.height);

   ctx.strokeStyle=paddleBorder;
   ctx.fillStyle=paddle2Color;
   ctx.fillRect(paddle2.x,paddle2.y,paddle2.width,paddle2.height);
   ctx.strokeRect(paddle2.x,paddle2.y,paddle2.width,paddle2.height);
    }

    function createBall(){
      ballSpeed=2;
      if(Math.round(Math.random())==1){
        ballYDirection=1;
      }else{
        ballYDirection=-1;
      }
      if(Math.round(Math.random())==1){
        ballXDirection=1;
      }else{
        ballXDirection=-1;
      }
        
       ballX=(gameWidth+paddle2.width)/2;
       ballY=gameHeight-paddle2.height-ballRadius;
       drawBall(ballX,ballY);
    }
    
    function moveBall(){
       ballX+=(ballSpeed*ballXDirection);
       ballY+=(ballSpeed*ballYDirection);



    }

    function drawBall(ballX,ballY){
    ctx.fillStyle=ballColor;
    ctx.strokeStyle=ballBorderColor;
    ctx.lineWidth=2;
    ctx.beginPath();
    ctx.arc(ballX,ballY,ballRadius,0,2*Math.PI);
    ctx.stroke();
    ctx.fill();



    }
    function checkCollision(){
      if(ballX <= 0 + ballRadius){
        ballXDirection *= -1;
    }
    if(ballX >= gameWidth - ballRadius){
        ballXDirection *= -1;
    }
    if(ballY <= 0){
        alert("Player 2 win");
       
        if(Player2Score>HighestScore){

          alert("You are Highest Scorer")
         Playername= prompt("Enter you name");

         HighestScore=Player2Score
         
         
        }
       Player1Score=0;
       Player2Score=0; 
        updateScore();
        createBall();
        resetGame();
        
        return;
    }
    if(ballY >= gameWidth){
      alert("Player 1 win");
      
      if(Player1Score>HighestScore){
        alert("You are Highest Scorer")
        Playername= prompt("Enter you name");
        HighestScore=Player1Score
        
       }
      Player1Score=0;
       Player2Score=0; 
        updateScore();
        createBall();
        resetGame();
        return;
    }
    if(ballY <= (paddle1.y + paddle1.height + ballRadius)){
        if(ballX > paddle1.x && ballX < paddle1.x + paddle1.width){
            ballY = (paddle1.y + paddle1.height) + ballRadius; // if ball gets stuck
            ballYDirection *= -1;
            ballSpeed = 3;
            Player1Score++;
            updateScore();
        }
    }
    if(ballY >= (paddle2.y - ballRadius)){
        if(ballX > paddle2.x && ballX < paddle2.x + paddle2.width){
            ballY = paddle2.y - ballRadius; // if ball gets stuck
            ballYDirection *= -1;
            ballSpeed = 3;
            Player2Score++;
            updateScore();
        }
    }
        

  }

 function changeDirection(e){
      let keyPressed=e.keyCode;
     console.log(keyPressed);
      let paddleleft=65;
      let paddleright=68;
     

      switch(keyPressed){
        case(paddleleft):
        if(paddle1.x>0){
        paddle1.x-=paddleSpeed;
        }
        if(paddle2.x>0){
          paddle2.x-=paddleSpeed;
          }
        break;
      
      case(paddleright):
      if(paddle1.x<gameWidth-paddle1.width){
      paddle1.x=paddleSpeed+paddle1.x;
      }
      if(paddle2.x<gameWidth-paddle2.width){
        paddle2.x=paddleSpeed+paddle2.x;
        }
      break;
     

      }
    }
    function updateScore(){
       scoreText.textContent=(Player1Score+":"+Player2Score);
    }
    function resetGame(){
      
      
       
          clearInterval(intervalID);
           
           ballX=(gameWidth+paddle2.width)/2;
           ballY=gameHeight-paddle2.height-ballRadius;
           ballXDirection=0;
           ballYDirection=0;
           Player1Score=0;
           Player2Score=0
           paddle1={
          width:100,
          height:25,
          x:gameWidth/2,
          y:0,
          
          
          }
           paddle2={
              width:100,
              height:25,
              x:gameWidth/2,
              y:gameHeight-25,
              
              
              }
              
              gameStart();
    }

       







let gameSeq=[];
let userSeq=[];
let btns=["yellow","red","purple","green"];

let started=false;
let level=0;
let h2=document.querySelector("h2");
let hd2=document.getElementById("hd2");

let highscore=localStorage.getItem("highscore")||0;

document.addEventListener("keypress",function(){
  if(started==false){
    console.log("Game Started");
    started=true;
    levelup();
  }
});

function gameflash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },250);
}
function userflash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    },250);
}

function levelup(){
    userSeq=[];
    level++;
    h2.innerText=`Level ${level}`;
    //random btn number
    let randIndex=Math.floor(Math.random()*4);
    let randcolor=btns[randIndex];
    let randbtn=document.querySelector(`.${randcolor}`);
    gameSeq.push(randcolor);

    gameflash(randbtn);
}
let gameOverSound = new Audio("gameover.mp3");
function checkAns(idx){
   if(userSeq[idx]==gameSeq[idx]){
      if(userSeq.length === gameSeq.length){
       setTimeout(levelup,1000);
      }
   }
   else{
    gameOverSound.play();
    if(level>highscore){
        highscore=level;
        localStorage.setItem("highScore",highscore);
    }
    h2.innerHTML=`Game Over! Your score was <b>${level}</b> <br>Press any key to start`;
    document.querySelector("body").style.backgroundColor="red";
    setTimeout(function(){
        document.querySelector("body").style.backgroundColor="white";
    },150);
    hd2.innerText=`Highest Score ${highscore}`;
    reset();
   }
}

function btnPress(){
    let btn=this;
    userflash(btn);

    userColor=btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}

let allbtns=document.querySelectorAll(".btn");
for(btn of allbtns){
    btn.addEventListener("click",btnPress)
}
function reset(){
   started=false ;
   gameSeq=[];
   userSeq=[];
   level=0;
}
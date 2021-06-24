let container = document.querySelector('.container');
let chooseSymbolDiv = document.querySelector('.chooseSymbol');
let chooseSymbol = document.querySelectorAll('.symbol');
let userFirst = document.querySelector('.userFirst');
let compFirst = document.querySelector('.compFirst');
let chooseMoveDiv = document.querySelector('.chooseMove');
let reloadBtn = document.querySelector('button');

let symbolUser;
let symbolComp;
let randUser;
let boxes;
let rands = [];
let rand = Math.floor(Math.random()*9);
let end;


chooseSymbols();

function chooseSymbols() {
    for (let i = 0; i < chooseSymbol.length; i++) {
        chooseSymbol[i].addEventListener('click', setSymbol);
    }
}
function setSymbol() {
    symbolUser = this.innerHTML;
    createTable();
    chooseSymbolDiv.style.display = 'none';
    chooseMoveDiv.style.display = 'flex';
    compFirst.addEventListener('click',compPlay);
    userFirst.addEventListener('click',userPlay);
}

function createBoxes() {
    boxes = document.querySelectorAll('.box');
    boxes.forEach(box => box.addEventListener('click',addSymbol));
}

let lines = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
function addSymbol(){
    this.removeEventListener('click',addSymbol);
    this.innerHTML = symbolUser;
    checkLines();
    (symbolComp === "X") ? symbolComp = "O" : symbolComp = "X";

    randUser = this.getAttribute('data-id');
    rands.push(parseInt(randUser));

    if(!end) {
        compPlay();
    }
}

function compPlay() {
    (symbolUser === "X") ? symbolComp = "O" : symbolComp = "X";
    chooseSymbolDiv.style.display = 'none';
    chooseMoveDiv.style.display = 'none';
    container.style.display = 'flex';

    checkRand(); 
        if(rands.indexOf(rand) === -1) {
            boxes[rand].innerHTML = symbolComp;
            boxes[rand].removeEventListener('click',addSymbol);
            (symbolComp === "X") ? symbolComp = "O" : symbolComp = "X";
            checkLines();
            rands.push(rand);
        } else {
            compPlay()
        }
        if(rands.length > 8) {
            checkLines();
            stopGame();
        }
}
function checkRand() {
    rand = Math.floor(Math.random()*9);
}

function userPlay() {
    (symbolUser === "X") ? symbolComp = "O" : symbolComp = "X";
    chooseSymbolDiv.style.display = 'none';
    chooseMoveDiv.style.display = 'none';
    container.style.display = 'flex';
}

function checkLines(){
  lines.forEach(line => {
      let box1 = boxes[line[0]];
      let box2 = boxes[line[1]];
      let box3 = boxes[line[2]];
      if(box1.innerHTML === box2.innerHTML && box1.innerHTML === box3.innerHTML && box1.innerHTML !== ""){
        box1.style.background = "tomato";
        box2.style.background = "tomato";
        box3.style.background = "tomato";
        end = true;
        stopGame();
      }
  })
}
function stopGame(){
    boxes.forEach(box => box.removeEventListener('click',addSymbol));
    reloadBtn.style.display = 'block';
    reloadBtn.addEventListener('click', reload);
}
function reload() {
    location.reload();
}
function createTable(){
    let text = "";
    for (let i = 0; i < 9; i++) {
        text += `<div class="box" data-id="${i}"></div>`;
    }
    container.innerHTML = text;
    createBoxes();
}


let canvas = document.querySelector("#c1");
let ctx = canvas.getContext("2d");
const spanCount = document.getElementById("count");
let arr = [];
let count = 0;
let timer;

canvas.onclick = function(e){
    let x = e.offsetX;
    let y = e.offsetY;
    x = Math.floor(x/10);
    y = Math.floor(y/10);
    arr[y][x] = 1;
    drawRect();
};

function createLife() {
    let m = 60;
    let n = 60;
    for (let i = 0; i < m; i++) {
        arr[i] = [];
        for(let j = 0; j < n; j++) {
            arr[i][j] = 0;
        }
    }
}

createLife();

function goLife(){
    let arrNew = [];
    for (let i = 0; i < 60; i++) {
        arrNew[i] = [];
        for(let j = 0; j < 60; j++) {
            let neighbors = 0;
            if (arr[fpy(i)-1][j] == 1) neighbors++; //top
            if (arr[fpx(i)+1][j] == 1) neighbors++; //bot
            if (arr[i][fpy(j)-1] == 1) neighbors++; //left
            if (arr[i][fpx(j)+1] == 1) neighbors++; //right
            if (arr[fpy(i)-1][fpx(j)+1] == 1) neighbors++; //top right
            if (arr[fpx(i)+1][fpx(j)+1] == 1) neighbors++; //bot right
            if (arr[fpx(i)+1][fpy(j)-1] == 1) neighbors++; //bot left
            if (arr[fpy(i)-1][fpy(j)-1] == 1) neighbors++; //top left
            console.log(neighbors);
            if( arr[i][j] == 1){
                (neighbors == 2 || neighbors == 3) ? arrNew[i][j] = 1 : arrNew[i][j] = 0;
            } else{
                (neighbors == 3) ? arrNew[i][j] = 1 : arrNew[i][j] = 0;
            }
        }
    }
    arr = arrNew;
    drawRect();
    count++;
    spanCount.innerHTML = count;
    timer = setTimeout(goLife, 300);
}

function drawRect(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < 60; i++) {
        for(let j = 0; j < 60; j++) {
            if(arr[i][j] == 1){
                ctx.fillRect(j*10,i*10,10,10);
            }
        }
    }
}

function fpy(i){
    if (i == 0) return 60;
    else return i;
}

function fpx(i){
    if (i == 59) return -1;
    else return i;
}



document.getElementById("start").onclick = goLife;
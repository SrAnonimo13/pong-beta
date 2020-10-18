let Jogador1
let Jogador2
let Score1
let Score2
let bola
let velo = [5,1,1,-1]
let pontos = [0,0]
function startGame() {
    myGameArea.start();
    Jogador1 = new component(20, 100, "#191919", 10, 83);
    Jogador2 = new component(20, 100, "#191919", 670, 83);
    Score1 = new component("30px", "Consolas", "black", 10, 40, "text");
    Score2 = new component("30px", "Consolas", "black", 550, 40, "text");
    bola = new component(30, 30, "#191919", 330, 100)
    myGameArea.start();
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 700;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    fim : function(){
        if(bola.x+bola.width>=this.canvas.width){
            bola.x = 330
            pontos[0] += 1;
            velo[1] = 1
            velo[3] = -1
        }else if(bola.x<=0){
            bola.x = 330
            pontos[1] += 1;
            velo[1] = 1
            velo[3] =-1
        }
    },
    crashWith : function() {
        if((bola.y+bola.height)>this.canvas.height||bola.y<0){
            if(velo[2]<=10){
                velo[2] *= -1
            }
        }
    }
}
function moveBola(){
    if(Jogador1.crashWith(bola)||Jogador2.crashWith(bola)){
        if(velo[1]<=10){
            velo[1] *= velo[3]
            velo[3] -= .1
        }
    }
        bola.x += velo[1]
        bola.y += velo[2]
        console.log("Velocidade x bola:"+bola.x+" Velocidade y da bola:"+bola.y+" Velocidade x:" +velo[1]+" Velocidade y:"+velo[2]+" Velocidado Global:"+velo[3])
}
function updateGameArea() {
    myGameArea.crashWith()
    moveBola()
    myGameArea.fim();
    myGameArea.clear();
    bola.update()
    Jogador1.update();
    Jogador2.update();
    Score1.text="SCORE: " + pontos[0];
    Score1.update();
    Score2.text="SCORE: " + pontos[1];
    Score2.update();
}

function component(width, height, color, x, y, type) {
    this.type = type;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;    
    this.update = function() {
        let ctx = myGameArea.context;
        if (this.type == "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    } 
    this.crashWith = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }
}
function move(event) {
    let key = event.key
    switch (key) {
        case "w":
            Jogador1.y -= velo[0]
            break;
        case "s":
            Jogador1.y += velo[0]
            break;
        case "ArrowUp":
            Jogador2.y -= velo[0]
            break;
        case "ArrowDown":
            Jogador2.y += velo[0]
            break;
        case "p":
            alert("f")
            break;
    }
}
  
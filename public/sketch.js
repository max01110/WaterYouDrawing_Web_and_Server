const paths = [];
let currentPath = [];
var socket;
var strokeweight = 10
var runOnceDrawing = false;
var runOnceGuesser = false;
var runOnceWaiting = false;
var w;
var l;
var connectedPlayers=1;
var countDownTimerStarting;
var mousePoint;
var gameInProgressVar = false;
var topic = "";
var runOnceScreen = false;
var roundWinner;
var points = "Points: R: 0 B: 0"
var clear = false;

var barFont = 25;
var subTitleFont = 40;
var roundFont = 50;
var winner = "N"
var connectedUsernames = []
var space = 0.47
var valid = true;
var count = 0;
var runOnceLogin = false;
//Player variables:


function setup() {
    
    w = windowWidth/1.2;
    l = windowHeight/1.2;
    createCanvas(w,l);
    setGradient(0, 0, w, l, color(157, 125, 163), color(0, 158, 253), 2);


    //DOM--------------------
    input = createInput().attribute('placeholder', 'Username');
    button = createButton('LOGIN');

    drawingInput = createInput().attribute('placeholder', 'Guess');
    drawingButton = createButton('GUESS');

    clearButton = createButton('CLEAR');

    endButton = createButton("Back to lobby.")

    input.hide()
    button.hide()

    drawingInput.hide()
    drawingButton.hide()

    clearButton.hide()

    endButton.hide()

    //-----------------------

    //Web-------------------
    socket = io.connect("https://wateryoudrawing.herokuapp.com/")
    // socket = io.connect("http://localhost:3000/")

    
    socket.on('roundWinner', (r)=> {
        roundWinner = r;
    })

    socket.on('winner', (w)=> {
        winner = w;
        
    })

    socket.on('points', (p)=> {
        points = p;
    })

    socket.on('gameAlreadyInProgress', ()=> {
        gameInProgressVar = true;
    })

    socket.on('team', (t)=>{
        user.team = t
    })

    socket.on('mouse', (data)=> {
        if (user.state==3){
            otherDrawing(data)
        }
    })

    socket.on('counterVal', (c)=> {
        countDownTimerStarting=c
        
    })
    socket.on('numberConnected', (number) => {
        connectedPlayers = number;
    })

    socket.on('gameState', (state) => {
       
        // console.log("Receive change state: " + state)
        if (state === 1) {
            user.state = 1  ;
        } else if (state === 2) {
            user.state = 2;
        } else if (state === 3) {
            clear = false;
            user.state = 3
        } else if (state === 4) {
            clear = false;
            user.state = 4
        } else if (state === 5) {
            clear = false;
            user.state = 5
        } else if (state === 6) {
            user.state = 6
        } else if (state === -1) {
            user.state = -1
        }
    })

    socket.on('gameCounter', (gameCounterValue)=> {
        user.counter = gameCounterValue;
    })
   
    socket.on('answerCounter', (answerCounter) => {
        user.answerCounter = answerCounter;
    })
    
    socket.on('clear', ()=> {
        background(255)
    })

    socket.on('answerWord', (t) => {
        topic = t;
    })

    socket.on('connectedPlayers', (names) => {
        connectedUsernames = names;
    })

    socket.on('validity', (a)=>{
        valid = a;
    })

    user = new User("", false, 0);

    guesser = new Guesser(drawingInput, drawingButton) 
    drawer = new Drawer()
    answerScreenObj = new Answer();

    barFont = w*0.0176;
    subTitleFont = w*0.02812;
    roundFont = w*0.03515
}

function draw() {
    socket.emit('gameState', 0)
    socket.emit('numberConnected', 0)
    //console.log("User.state = " + user.state)
    if (gameInProgressVar==false) {
        if (user.loggedIn==false) {
            login();
        } else {
            if (user.state==1 || user.state==2) {
                waiting()
                runOnceLogin = false;
                runOnceDrawing = false
                runOnceGuesser = false
            } else if (user.state == 3) { //GUESSER
                if (clear == false) {
                    background(255)
                    clear = true
                }
                runOnceScreen==false
                socket.emit('gameState', 0)
                guesser.gameScreen(user.team);
                guesser.drawGuessScreen(user.counter);
                runOnceWaiting=false
            } else if (user.state == 4) { //DRAWER
                if (clear == false) {
                    background(255)
                    clear = true
                }
                runOnceScreen==false
                socket.emit('gameState', 0)
                drawer.gameScreen(user.team);
                drawer.drawerScreen(user.counter);
            } else if (user.state == 5) { 
                if (clear == false) {
                    setGradient(0, 0, w, l, color(167,149,199), color(0, 102, 153), 2);
                    //background(255)
                    clear = true
                }
                runOnceScreen = false;
                answerScreenObj.gameScreen(user.team);
                answerScreenObj.answerScreen(user.answerCounter, topic)
            } else if (user.state == 6) { 
                endGame();
            }

    
        }
    } else { 
        gameInProgress()
    }
    
 
}

function mouseReleased() {
    socket.emit("release")
}

function setGradient(x, y, w, h, c1, c2, axis) {
    noFill();
  
    if (axis === 1) {
      // Top to bottom gradient
      for (let i = y; i <= y + h; i++) {
        let inter = map(i, y, y + h, 0, 1);
        let c = lerpColor(c1, c2, inter);
        stroke(c);
        line(x, i, x + w, i);
      }
    } else if (axis === 2) {
      // Left to right gradient
      for (let i = x; i <= x + w; i++) {
        let inter = map(i, x, x + w, 0, 1);
        let c = lerpColor(c1, c2, inter);
        stroke(c);
        line(i, y, i, y + h);
      }
    }
  }

function keyPressed() {
    if (user.loggedIn==false)
        if (keyCode === ENTER) {
            if (valid==true) {
                if (input.value() != "") { //WILL NEED TO CHECK IF USERNAME HAS ALREADY BEEN USED ON SERVER
                    user.loggedIn = true;
                    user.name = input.value()
                    user.state = 1
                    socket.emit("join", user) 
                    button.hide()
                    input.hide()
                } else {
                    console.log("Must put in username")
                }
            } else {
                console.log("Invalid username")
            }     
    
        }

    if (user.state == 3) {
        if (keyCode === ENTER) {
            if (drawingInput.value() != "") { 
                user.answer = drawingInput.value()
                drawingInput.value('');
                socket.emit("guess", user.answer)
            } else {
                console.log("Must put in a response")
            }
          }
    }
}


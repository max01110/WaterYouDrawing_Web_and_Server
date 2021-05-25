const express = require('express'); //requires express module
const socket = require('socket.io'); //requires socket.io module
var Timer = require('time-counter')
const fs = require('fs');
const { isContext } = require('vm');
const app = express();
var PORT = process.env.PORT || 3000;
const server = app.listen(PORT); //tells to host server on localhost:3000

//Playing variables:
app.use(express.static('public')); //show static files in 'public' directory
console.log('Server is running');
const io = socket(server);

//Game Variables:
var gameActive = false;
var runOnce = false;
var runOnce2 = false;
var runOnce3 = false;
var answerRunOnce = false;

let users = [];
let waitingUsers = [];
let startingCounter;
let gameCounterValue;
let answerTimerValue;

var countDownTimerStarting = new Timer({
    direction: "down",
    startValue: 20,
});

countDownTimerStarting.on('change', (y) => {
    startingCounter = y;
});


var gameTimer = new Timer({
    direction: "down",
    startValue: 60,
});

gameTimer.on('change', (y) => {
    gameCounterValue = y;
});

var answerTimer = new Timer({
    direction: "down",
    startValue: 30,
});

answerTimer.on('change', (y) => {
    answerTimerValue = y;
});

var topics = ["well", "rain", "underground", "transpiration"]
var topic = ""
var roundOn = false
var c = 0;
var blue1;
var blue2;
var red1;
var red2;
var pointString;
var points = {
    blue: 0,
    red: 0
}
var runState = true;

var mouseAndroid = 0;
var runOnceEnd = false;
var someoneGuessed = false;
var connectedUsersNames = []
var valid = true;
var s = false;

//P5 Socket.io Connection------------------
io.on('connection', (socket) => {

    socket.on('mainGame', () => {

    })

    //checks that there are at least 4 users connected before starting the game 
    socket.on('gameState', () => {

        if (users.length >= 4) {
            if (runOnce == false) {
                runOnce = true;
                users[0].team = "B"
                users[1].team = "B"
                users[2].team = "R"
                users[3].team = "R"

                console.log(users)
                countDownTimerStarting.start();
            }

            if (startingCounter === "0:00") {
                if (runOnce2 === false) {
                    runOnce2 = true;
                    runOnce3 = false;
                }

                //------------------------------------------------------------------------
                //REFERENCE-------------
                //0=not logged in
                //1=logged in, waiting to start game
                //2=logged in, game starting soon (countdown timer)
                //3=logged in, guesser
                //4=logged in, drawer
                //5=answer screen
                //6=final end screen
                //-1 = test

                if (c >= 4) {
                    //RUN ONCE
                    if (runOnceEnd === false) {
                        runOnceEnd = true;
                        if (points.red > points.blue) {
                            io.emit('winner', "R")
                        } else if (points.red < points.blue) {
                            io.emit('winner', "B")
                        } else if (points.red === points.blue) {
                            io.emit('winner', "N")
                        }
                        io.emit('gameState', 6)
                    }


                } else {

                    if (roundOn == false) {
                        //Have algorithm take new topics and make sure not to take topics already used
                        topic = topics[c]

                        //Socket ids:
                        blue1 = users[0].id
                        blue2 = users[1].id
                        red1 = users[2].id
                        red2 = users[3].id

                        io.to(blue1).emit('team', "B")
                        io.to(blue2).emit('team', "B")

                        io.to(red1).emit('team', "R")
                        io.to(red2).emit('team', "R")

                        runOnceGame = false;
                        roundOn = true;
                        runState = true;
                        someoneGuessed = false;
                        c++;
                    } else {

                        if (runOnceGame == false) {
                            runOnceGame = true;
                            // change
                            io.emit('answerWord', topic)
                            if (c % 2 == 0) {
                                io.to(blue1).emit('gameState', 4);
                                io.to(blue2).emit('gameState', 3);

                                io.to(red1).emit('gameState', 4);
                                io.to(red2).emit('gameState', 3);
                                io.emit('answerWord', topic)

                            } else if (c % 2 == 1) {
                                io.to(blue1).emit('gameState', 3);
                                io.to(blue2).emit('gameState', 4);

                                io.to(red1).emit('gameState', 3);
                                io.to(red2).emit('gameState', 4);
                                io.emit('answerWord', topic)
                            }

                            gameTimer.start();
                            answerRunOnce = false;
                        }

                        io.emit('gameCounter', gameCounterValue)

                        if (gameCounterValue === "0:00") {
                            if (answerRunOnce == false) {
                                if (someoneGuessed == false) {
                                    points.red = points.red + 1;
                                    points.blue = points.blue + 1;
                                    io.emit('roundWinner', "Nobody guessed! Both gets the point")
                                }
                                answerRunOnce = true;
                                roundOn = true;
                                // runOnceGame = false;
                                answerTimer.start()
                                    // io.emit('answerWord', topic)
                                pointString = "Points: R: " + points.red + " B: " + points.blue + "  "
                                io.emit('answerWord', topic)
                                    // change
                                io.emit('points', pointString)
                                io.emit('gameState', 5)

                            }

                            if (answerTimerValue == "0:00") {
                                answerTimer.stop();
                                answerTimeValue = ""
                                roundOn = false;

                            }


                            io.emit('answerCounter', answerTimerValue)
                        }
                    }


                }

            } else {
                io.emit('gameState', 2) //Game starting soon (start countdown timer)

            }

        } else {
            if (runState === true) {
                io.emit('gameState', 1)
                startingCounter = null
                runOnce = false
                runOnce2 = false
                runState = false;
                roundOn = false;
                c = 0;
                runOnceEnd = false;
                points = {
                    blue: 0,
                    red: 0
                }

            }


            // if (runOnce3 === false) {
            //     console.log("Stop timer")
            //     countDownTimerStarting.stop();
            //     startingCounter=null
            //      //Waiting screen
            //     runOnce = false
            //     runOnce2 = false
            //     runOnce3 = true;
            // }
        }
    })


    socket.on('guess', (guess) => {
            guess = guess.trim().toLowerCase();
            if (guess === topic) {
                gameTimer.stop()
                gameCounterValue = "0:00"
                someoneGuessed = true
                if (socket.id == blue1 || socket.id == blue2) {
                    points.blue = points.blue + 1;
                    io.emit('roundWinner', "Blue gets the point")
                } else if (socket.id == red1 || socket.id == red2) {
                    points.red = points.red + 1;
                    io.emit('roundWinner', "Red gets the point")
                }

            } else {
                //maybe send back a toast to say not correct answer?
            }
        })
        //Sends back value of starting countdown timer
    socket.on('timerVal', (a) => {
        io.emit('counterVal', startingCounter)
    })

    socket.on('nameInput', (n) => {
        s = false
        if (connectedUsersNames.length>0) {
            for (const i in connectedUsersNames) {
                if (connectedUsersNames[i] === n) {
                    s=true
                } else {
                    }
                }
            if (s==true) {
                socket.emit('validity', false)
            } else {
                socket.emit('validity', true)
            }
        } else {
            socket.emit('validity', true)
        }

    })

    //Clients emits this and a user loggs in --> sends back number of connected users
    socket.on('join', (username) => {

        if (typeof username === 'string') {
            username = objectConvert(username)
        }

        const user = {
            username: username.name,
            id: socket.id,
            points: 0,
            state: username.state,
            team: ""
        }

        if (users.length < 4) {
            users.push(user);
            io.emit('numberConnected', users.length)
            connectedUsersNames = []
            for (const obj in users) {
                connectedUsersNames.push(users[obj].username)
            }
            io.emit('connectedPlayers', connectedUsersNames)
            io.emit('connectedPlayersA', connectedUsersNames.toString())
        } else {
            waitingUsers.push(user)
            socket.emit('gameAlreadyInProgress', 0)
        }

    })

    //Sends back number of connected users to all connected clients
    socket.on('numberConnected', () => {
        io.emit('numberConnected', users.length)
    })


    //Drawing --> receives and send backs x,y coordinates for drawing
    // socket.on('mouse', (data) => {
    //     if (socket.id == blue1) {
    //         sendMouse(data, red2)
    //     } else if (socket.id == blue2) {
    //         sendMouse(data, red1)
    //     } else if (socket.id == red1) {
    //         sendMouse(data, blue2)
    //     } else if (socket.id == red2) {
    //         sendMouse(data, blue1)
    //     }

    socket.on('mouse', (data) => {
        if (socket.id == blue1) {
            sendMouse(data, blue2)
        } else if (socket.id == blue2) {
            sendMouse(data, blue1)
        } else if (socket.id == red1) {
            sendMouse(data, red2)
        } else if (socket.id == red2) {
            sendMouse(data, red1)
        }

        // if (typeof data === 'string') {
        //     data = objectConvert(data)
        // }
        // socket.broadcast.emit('mouse', data)

        // if (mouseAndroid === 0) {
        //     socket.broadcast.emit('mouseAndroidStart', JSON.stringify(data))
        //     mouseAndroid = 1;
        // } else if (mouseAndroid === 1) {
        //     socket.broadcast.emit('mouseAndroidMiddle', JSON.stringify(data))
        // } 
    })


    socket.on('release', () => {
        mouseAndroid = 0
    })

    // socket.on('clear', () => {
    //     if (socket.id == blue1) {
    //         io.to(red2).emit('clear')
    //     } else if (socket.id == blue2) {
    //         io.to(red1).emit('clear')
    //     } else if (socket.id == red1) {
    //         io.to(blue2).emit('clear')
    //     } else if (socket.id == red2) {
    //         io.to(blue1).emit('clear')
    //     }
    // })


    socket.on('clear', () => {
        if (socket.id == blue1) {
            io.to(blue2).emit('clear')
        } else if (socket.id == blue2) {
            io.to(blue1).emit('clear')
        } else if (socket.id == red1) {
            io.to(red2).emit('clear')
        } else if (socket.id == red2) {
            io.to(red1).emit('clear')
        }
    })


    //Removes the specific socket from the "users" array and sends back the new number of connected players
    socket.on("disconnect", () => {
        i = 0;
        console.log("DISCONNECTED: " + socket.id);
        users = users.filter(u => u.id !== socket.id)
        connectedUsersNames = []
        for (const obj in users) {
            connectedUsersNames.push(users[obj].username)
        }
        io.emit('connectedPlayers', connectedUsersNames)
        io.emit('numberConnected', users.length)
    });
})


function objectConvert(str) {
    str = str.substring(str.indexOf("("))
    str = str.replace("(", "");
    str = str.replace(")", "");
    var arr = str.split(", ")
    var keyval;
    var obj = {}
    for (var i = 0; i < arr.length; i++) {
        keyval = arr[i].split("=")
        if (isNaN(keyval[1]) === false) {
            keyval[1] = parseInt(keyval[1])
        }
        obj[keyval[0]] = keyval[1]
    }
    return obj
}


function sendMouse(data, who) {
    if (typeof data === 'string') {
        data = objectConvert(data)
    }
    io.to(who).emit('mouse', data)

    if (mouseAndroid === 0) {
        io.to(who).emit('mouseAndroidStart', JSON.stringify(data))
        mouseAndroid = 1;
    } else if (mouseAndroid === 1) {
        io.to(who).emit('mouseAndroidMiddle', JSON.stringify(data))
    }
}

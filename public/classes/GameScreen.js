class GameScreen {
    constructor () {

    }

    gameScreen(team) {
        rectMode(CORNER)
        if (runOnceScreen==false) {
            background(255)
            runOnceScreen = true
        }
        socket.emit('gameState', 0)
        var currentColor = color(0, 255, 0);
        var teamName = "None"

        if (runOnceDrawing === false) {
            background(255)
            runOnceDrawing = true;
            console.log("clearing")
        }

        if (team == "B") {
            currentColor = color(0, 100, 200);
            teamName = "Blue"
        } else if (team == "R") {
            currentColor = color(200, 20, 20)
            teamName = "Red"
        }
    
        rectMode(LEFT)
        noStroke()
        fill(currentColor)
        rect(0,0,w,30)
        noStroke()
        textSize(barFont)
        textAlign(CENTER)
        fill(0)
    
        textAlign(RIGHT)
        text(points, w-(w/40), l*0.035);

        //Logged in tab:
        fill(200, 200, 200)
        rectMode(CENTER)
        rect(0, l*0.1, 200+ (user.name.length)*12, 30, 10)
        textAlign(LEFT)
        textSize(barFont*0.7)
        fill(0)
        text("Logged in: " + user.name, 5, l*0.11);
        rectMode(CORNER)
    }
}
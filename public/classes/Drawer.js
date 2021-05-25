class Drawer extends GameScreen {
    constructor() {
        super()

        clearButton.style('width', '15.4%')
        clearButton.style('height', '5%')
        clearButton.position(w/2, l)
        clearButton.style('color', '#fff !important')
        clearButton.style('background-color', '#999999')
        clearButton.style('text-transform', 'uppercase')
        clearButton.style('transition', 'all 0.4s ease 0s;')
        clearButton.style('border-radius', '50px')
        clearButton.style('border', 'none')
    }
 
    drawerScreen(counter) {
        rectMode(LEFT)
        clearButton.show()
        noStroke()
        textSize(barFont)
        textAlign(CENTER)
        fill(0)
        text(("You are drawing: " + topic), w/2, l*0.035);
        textAlign(LEFT)
        text("Countdown: " + counter, w/30, l*0.035);

        runOnceGuesser=true

        clearButton.mousePressed(()=> {
            background(255)
            socket.emit('clear')
           });
        

        if (mouseIsPressed) {

            console.log("Mouse")
            stroke(0);
            strokeWeight(strokeweight)
            line(mouseX, mouseY, pmouseX, pmouseY);
            mousePoint = {
                x: mouseX,
                y: mouseY,
                px: pmouseX,
                py: pmouseY,
                windowX: w,
                windowY: l
            }
            socket.emit('mouse', mousePoint)
        }
    }
}
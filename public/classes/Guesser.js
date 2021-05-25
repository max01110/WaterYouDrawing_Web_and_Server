class Guesser extends GameScreen {
    constructor(drawingInput, drawingButton) {
        super()

        //Styling--------------------------
        drawingInput.style('width', '40%')
        drawingInput.style('height', '10%')
        drawingInput.position(w/3, l)
        drawingInput.style('line-height', '4')
        drawingInput.style('fontSize', '18px')
        drawingInput.style('placeholder', 'Username')

        drawingButton.style('width', '15.4%')
        drawingButton.style('height', '5%')
        drawingButton.position(w - w/6, l+20)
        drawingButton.style('color', '#fff !important')
        drawingButton.style('background-color', '#60a3bc')
        drawingButton.style('text-transform', 'uppercase')
        drawingButton.style('transition', 'all 0.4s ease 0s;')
        drawingButton.style('border-radius', '50px')
        drawingButton.style('border', 'none')
    }

    drawGuessScreen(counter) {
        rectMode(LEFT)
        if (runOnceGuesser === false) {
            
        }

        drawingButton.show();
        drawingInput.show();

        drawingButton.mousePressed(()=> { 
            if (drawingInput.value() != "") { 
                user.answer = drawingInput.value()
                socket.emit("guess", user.answer)
                drawingInput.value('');
              } else {
                console.log("Must put in a response")
              }
      
        });
        noStroke()
        textSize(barFont)
        textAlign(CENTER)
        fill(0)
        text("You are guessing", w/2, l*0.035);
        textAlign(LEFT)
        text("Countdown: " + counter, w/30, l*0.035);

        runOnceGuesser=true

    }
}
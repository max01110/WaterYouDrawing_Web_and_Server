class Answer extends GameScreen {
    constructor() {
        super()
    }

    answerScreen(counter, topic) {
        drawingInput.hide()
        drawingButton.hide()
        clearButton.hide()
        if (runOnceGuesser === false) {
            
        }

        noStroke()
        textSize(roundFont)
        textAlign(CENTER)
        fill(0)
        text(("✅ " + roundWinner + " ✅"), w/2, l*0.2);

        textSize(barFont)
        text(("Next Round in: " + counter), w/9, l*0.035);

       
        // if (topic=="well") {
        //     text("The answer was well", w/2, l*0.5);
        // } else if (topic=="rain") {
        //     text("The answer was rain", w/2, l*0.5);
        // }

        if (topic==="well") {
            well()
        } else if (topic==="rain") {
            rain()
        } else if (topic==="underground") {
            underground()
        } else if (topic === "transpiration") {
            plant()
        }

        //         console.log("test rain")
        //     case 'underground':
        //         underground()
        //         console.log("test underground")
        //     case 'transpiration':
        //         plant()
        //         console.log("test plant")
        //     default:
        //       console.log("Something went wrong.");
        //   }
        
        

        runOnceGuesser=true

    }
}
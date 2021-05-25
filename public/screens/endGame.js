function endGame () {
    //Button Styling
    endButton.style('width', '16%')
    endButton.style('height', '7%')
    endButton.position(w/2, l/2+(l*0.3))
    endButton.style('color', 'white')
    endButton.style('text', '#FFFFFF!important') 
    endButton.style('background-color', '#696969')
    endButton.style('text-transform', 'uppercase')

    endButton.style('text-transform', 'uppercase')
    endButton.style('transition', 'all 0.4s ease 0s;')
    endButton.style('border-radius', '50px')
    endButton.style('border', 'none')

    

    runOnceDrawing = false
    if (winner === "B") {
        setGradient(0, 0, w, l, color(150, 200, 220), color(0, 102, 153), 2);
        textSize(subTitleFont)
        textSize(40)
        noStroke();
        fill(0)
        textAlign(CENTER)
        textAlign(CENTER)
        text("Team Blue Wins!", w/2, l/2)
        textSize(15)
        text("For more info, head to: https://www.worldvision.ca/", w/2, l/2+(l*0.4))
    } else if (winner === "R") {
        setGradient(0, 0, w, l, color(220, 100, 100), color(255, 30, 70), 2);
        textSize(subTitleFont)
        textSize(40)
        noStroke();
        fill(0)
        textAlign(CENTER)
        text("Team Red Wins!", w/2, l/2)
        textSize(15)
        text("For more info, head to: https://www.worldvision.ca/", w/2, l/2+(l*0.4))
    } else {
        setGradient(0, 0, w, l, color(167,149,199), color(0, 102, 153), 2);
        textSize(subTitleFont)
        textSize(40)
        noStroke();
        fill(0)
        textAlign(CENTER)
        text("Tie!", w/2, l/2)
        textSize(15)
        text("For more info, head to: https://www.worldvision.ca/", w/2, l/2+(l*0.4))
    }
    
    
    
    
    text("Game Over!", w/2, l*0.2);

    
    text(points, w/2, l*0.7)
    
   // endButton.show()

    endButton.mousePressed(()=> {
        endButton.hide()
        user.state = 1;
    });

}
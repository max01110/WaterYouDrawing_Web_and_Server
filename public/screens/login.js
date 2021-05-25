function login() {
    input.style('width', '15%')
    input.style('height', '5%')
    input.position(w/2, l/2)
    input.style('line-height', '4')
    input.style('fontSize', '18px')
    input.style('placeholder', 'Username')

    button.style('width', '15.4%')
    button.style('height', '5%')
    button.position(w/2, l/2+(l*0.1))
    button.style('color', '#fff !important')
    button.style('background-color', '#60a3bc')
    button.style('text-transform', 'uppercase')
    button.style('transition', 'all 0.4s ease 0s;')
    button.style('border-radius', '50px')
    button.style('border', 'none')

    input.show()
    button.show()
    setGradient(0, 0, w, l, color(157, 125, 163), color(0, 158, 253), 2);
    //background(255, 255, 255);

    textSize(40)
    textAlign(CENTER)
    fill(0)
    noStroke()
    text("Welcome!", w/2, l*0.2);
    runOnceLogin = true;
    
    
    if (valid == true) {
      textSize(15)
      fill(0, 255, 0)
      textAlign(LEFT)
      text("✔ Valid Username", (w/2 + w/10), (l/2 + (l/30)))
    } else if (valid == false) {
      textSize(15)
      fill(255, 0, 0)
      textAlign(LEFT)
      text("❌ Username already taken.", (w/2 + w/10), (l/2 + (l/30)))
    }

    socket.emit('nameInput', input.value())

    textAlign(CENTER)
    
    button.mousePressed(()=> { //When username is submitted, hide form and button
      socket.emit('nameInput', input.value())
      if (input.value() != "") { //WILL NEED TO CHECK IF USERNAME HAS ALREADY BEEN USED ON SERVER
        socket.emit('nameInput', input.value())
        if (valid == true) {
            user.loggedIn = true;
            user.name = input.value()
            user.state = 1
            socket.emit("join", user)
            button.hide()
            input.hide()
        } else {
          console.log("Name already taken")
        }
        } else {
          console.log("Must put in username")
        }
     });

 
    
}
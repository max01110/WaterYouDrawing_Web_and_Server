class User {
    constructor (name, loggedIn, state) {
        this.name = name;
        this.loggedIn = loggedIn;
        this.points = 0;
        this.team;
        this.counter;
        this.answer;
        this.answerCounter;
        this.state = state; //0=not logged in
                            //1=logged in, waiting to start game
                            //2=logged in, game starting soon (countdown timer)
                            //3=logged in, guesser
                            //4=logged in, drawer
                            //-1 = test
    }
}
function plant () {
    textSize(25)
    fill(0)
    text("Transpiration", w/2, l*0.035);

    //Subtitles
    textSize(subTitleFont)
    fill(100, 100, 100)
    text("What is Plant Transpiration:", w/2, l*0.35);
    text("How to Collect Water Using Plant Transpiration:", w/2, l*0.7);

    //Info 1:
    textSize(barFont)
    fill(0)
    textAlign(LEFT);
    text("• Plant transpiration is the process in which water is carried from the plant’s roots to the leaves.", w/12, l*0.42);
    text("• From there, it vaporizes into the atmosphere; however, plant transpiration is catching that water before it evaporates.", w/12, l*0.50);
    
    //Info 2:
    textSize(barFont)
    fill(0)
    textAlign(LEFT);
    text("• First thing in the morning, tie a bag around a leafy green branch, place a rock inside to weigh it down.", w/12, l*0.77);
    text("• Throughout the day, the plant transpires and produces viable water that collects at the bottom of your bag.", w/12, l*0.85);
}
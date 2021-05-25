function underground () {
    textSize(25)
    fill(0)
    text("Water still", w/2, l*0.035);

    //Subtitles
    textSize(subTitleFont)
    fill(100, 100, 100)
    text("What is an Underground Water Still:", w/2, l*0.35);
    text("How To Collect Water Using an Underground Still:", w/2, l*0.7);

    //Info 1:
    textSize(barFont)
    fill(0)
    textAlign(LEFT);
    text("• An underground water still collects any residual moisture from the ground.", w/12, l*0.42);
    text("• This process is time consuming and should be started prior to needing water.", w/12, l*0.50);
    
    //Info 2:
    textSize(barFont)
    fill(0)
    textAlign(LEFT);
    text("• Dig up an area where water would collect in the ground if it rained and has constant exposure to the sun", w/12, l*0.77);
    text("for most of the day.", w/12, l*0.84);
    text("• Cover the hole with a plastic sheet/tarp and seal it tight. ", w/12, l*0.92);
    text("• Place a rock over your container, this will cause the condensed moisture to drip into your container.", w/12, l*1);
}
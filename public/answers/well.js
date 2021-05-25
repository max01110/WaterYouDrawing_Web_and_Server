function well () {
    textSize(25)
    fill(0)
    text("Well", w/2, l*0.035);

    //Subtitles
    textSize(subTitleFont)
    fill(100, 100, 100)
    text("Wells:", w/2, l*0.35);
    text("How to Make and Sustain Wells:", w/2, l*0.7);

    //Info 1:
    textSize(barFont)
    fill(0)
    textAlign(LEFT);
    text("• Wells are the most known water sources. ", w/12, l*0.42);
    text("• In short, it is a hole dug into the ground to access groundwater in underground aquifers.", w/12, l*0.50);
    
    //Info 2:
    textSize(barFont)
    fill(0)
    textAlign(LEFT);
    text("• Start by digging a hole on the ground where dampness or green vegetation is visible.", w/12, l*0.77);
    text("• To maintain your well, keep hazardous chemicals away from your well.", w/12, l*0.85);
    text("• You should also periodically check for any leaks that may have possibly arose within your well.", w/12, l*0.93);
}
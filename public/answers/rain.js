function rain () {
    textSize(25)
    fill(0)
    text("Rainwater", w/2, l*0.035);

    //Subtitles
    textSize(subTitleFont)
    fill(100, 100, 100)
    text("Why is Rainwater Good:", w/2, l*0.35);
    text("How to Collect Rainwater:", w/2, l*0.7);

    //Info 1:
    textSize(barFont)
    fill(0)
    textAlign(LEFT);
    text("• Collecting and drinking rainwater is one of the safest ways to feed your hydration without the risk of", w/12, l*0.42);
    text("bacterial infection.", w/12, l*0.49);

    
    
    //Info 2:
    textSize(barFont)
    fill(0)
    textAlign(LEFT);
    text("• The most efficient way is to tie the corners of a tarp around a tree, placing a rock to create a dip, and allowing ", w/12, l*0.77);
    text("the water to flow and collect within a container.", w/12, l*0.84);
}
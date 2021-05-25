var scaledX=1.0;
var scaledY=1.0;

var scaledPX=1.0;
var scaledPY=1.0;

function otherDrawing (data) {
    
    strokeWeight(strokeweight)
    stroke(0,100,255)
    //console.log("receiving drawing")
  
    //Scaling:
    scaledX = (data.x)*(w)/data.windowX*1.0;
    scaledY = (data.y)*(l)/data.windowY*1.0;

    scaledPX = (data.px)*(w)/data.windowX*1.0;
    scaledPY = (data.py)*(l)/data.windowY*1.0;

    line(scaledX, scaledY, scaledPX, scaledPY);

}
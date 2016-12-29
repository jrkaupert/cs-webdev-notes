// Simple way to attach js code to the canvas is by using a function
function sketchProc(processing) {
    // var bodyX = 207;
    // var bodyY = 214;
    // var bodyW = 169;
    // var bodyH = bodyW / 2;

    processing.setup = function() {
        processing.size(800, 600);
    };
    // Override draw function, by default it will be called 60 times per second
    processing.draw = function() {
        processing.background(255, 204, 0);
        processing.fill(240, 209, 36);
        processing.ellipse(bodyX, bodyY, bodyW, 106);
        processing.ellipse(bodyX, bodyY - 70, bodyH, 47);
    };
};
var myCanvas = document.getElementById("canvas1");

// attaching the sketchProc function to the canvas
var p = new Processing(myCanvas, sketchProc);
// p.exit(); //to detach it

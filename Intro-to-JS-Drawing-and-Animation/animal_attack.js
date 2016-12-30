// Simple way to attach js code to the canvas is by using a function
function animalAttack(processing) {
    var bodyX = 200;
    var bodyY = 260;
    var bodyW = 170;
    var bodyH = bodyW / 2;
    var faceX = bodyX;
    var faceY = bodyY - 70;
    var counter = 0;

    processing.setup = function() {
        processing.size(400, 400);
    };
    // Override draw function, by default it will be called 60 times per second
    processing.draw = function() {
        processing.background(207, 155, 255);
        processing.fill(240, 209, 36);
        processing.strokeWeight(2);
        //body
        processing.ellipse(bodyX, bodyY, bodyW, 106);

        //mane
        processing.fill(240, 100, 36);
        processing.ellipse(faceX, faceY, bodyW - 40, bodyH + 20);

        // face
        processing.fill(240, 209, 36);
        processing.ellipse(faceX, faceY, bodyH, 47);

        //ears
        processing.triangle(faceX - 20, faceY - 22, faceX - 60, faceY - 32, faceX - 35, faceY - 50);
        processing.triangle(faceX + 20, faceY - 22, faceX + 60, faceY - 32, faceX + 35, faceY - 50);

        //eyes
        processing.fill(0, 0, 0);
        processing.ellipse(faceX - 10, faceY - 10, 5, 5);
        processing.ellipse(faceX + 10, faceY - 10, 5, 5);

        //nose
        processing.triangle(faceX - 10, faceY, faceX + 10, faceY, faceX, faceY + 10);

        //mouth

        processing.noFill();
        processing.arc(faceX, faceY + 10, 40, 20, 0, processing.PI);

        // tail
        processing.noFill();
        processing.stroke(0);
        processing.beginShape();
        var startX = bodyX + bodyW / 2;
        var startY = bodyY;
        processing.curveVertex(startX, startY);
        processing.curveVertex(startX, startY);
        processing.curveVertex(startX + 40, startY - 20);
        processing.curveVertex(startX + 15, startY - 40);
        processing.curveVertex(startX + 58, startY - 60);
        var endX = bodyX + bodyW / 2 + 40;
        var endY = bodyY - 80;
        processing.curveVertex(endX, endY);
        processing.curveVertex(endX, endY);
        processing.endShape();

        bodyW += 1;
        bodyH = bodyW / 2;
        if (counter == 250) {
            counter = 0;
            bodyW = 170;
            bodyH = bodyW / 2;
        } else {
            counter += 1;
        }
    };
};
var myCanvas3 = document.getElementById("canvas3");

// attaching the animalAttack function to the canvas
var p3 = new Processing(myCanvas3, animalAttack);
// p.exit(); //to detach it

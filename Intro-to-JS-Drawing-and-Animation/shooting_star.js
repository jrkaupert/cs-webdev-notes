// Simple way to attach js code to the canvas is by using a function
function shootingStar(pr) {
    var xPos = 0;
    var yPos = 350;

    var xPos2 = 400;
    var yPos2 = 250;

    var counter = 0;

    pr.setup = function() {
        pr.size(400, 400);
    };

    pr.draw = function() {
        // sky
        pr.background(29, 40, 115);

        // static stars
        pr.fill(245, 242, 196);
        pr.ellipse(25, 15, 8, 8);
        pr.ellipse(188, 97, 12, 12);
        pr.ellipse(97, 182, 14, 14);
        pr.ellipse(307, 317, 25, 25);
        pr.ellipse(342, 216, 8, 8);
        pr.ellipse(158, 296, 12, 12);
        pr.ellipse(240, 253, 14, 14);
        pr.ellipse(368, 65, 25, 25);

        // shooting star 1
        pr.fill(255, 242, 0);
        pr.ellipse(xPos, yPos, 10, 10);

        // shooting star 2
        pr.fill(247, 139, 8);
        pr.rect(xPos2, yPos2, 25, 25);

        xPos += 3;
        yPos -= 2;

        xPos2 -= 5;
        yPos2 -= 4;

        if (counter == 150) {
            counter = 0;
            xPos = 0;
            yPos = 350;

            xPos2 = 400;
            yPos2 = 250;
        } else {
            counter += 1;
        }
    };

};

var myCanvas2 = document.getElementById("canvas2");

// attaching the animalAttack function to the canvas
var p2 = new Processing(myCanvas2, shootingStar);
// p.exit(); //to detach it

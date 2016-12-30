// Simple way to attach js code to the canvas is by using a function
function whatsForDinner(pr) {
    pr.setup = function() {
        pr.size(400, 400);
    };

    pr.draw = function() {
        pr.background(186, 145, 20); // wooden table
        pr.ellipse(200, 200, 350, 350); // plate
        pr.ellipse(200, 200, 300, 300);

        // Cheese!
        pr.fill(255, 204, 0);
        pr.triangle(200, 150, 250, 200, 125, 300);

        pr.fill(46, 38, 28);
        // Holes!
        pr.stroke(107, 80, 27);
        pr.ellipse(188, 190, 15, 15);
        pr.ellipse(220, 210, 15, 15);
        pr.ellipse(155, 260, 15, 15);
        pr.ellipse(175, 230, 15, 15);
        pr.ellipse(210, 173, 15, 15);

        // brownie!
        pr.fill(133, 73, 16);
        pr.rect(150, 70, 120, 70);
        pr.fill(71, 50, 18);
        pr.rect(155, 70, 115, 65);

        // eggs
        pr.fill(255, 255, 255);
        pr.ellipse(300, 250, 120, 140);
        pr.stroke(0, 0, 0);
        pr.fill(255, 242, 0);
        pr.ellipse(300, 250, 60, 60);
    };

};
var myCanvas2 = document.getElementById("canvas2");

// attaching the animalAttack function to the canvas
var p2 = new Processing(myCanvas2, whatsForDinner);
// p.exit(); //to detach it

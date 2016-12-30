// Simple way to attach js code to the canvas is by using a function
function adDesign(pr) {



    var center = 200;
    var limit = 400;
    var rhX = 80;
    var lhX = limit - 80;
    var rhY = 100;
    var lhY = 100;
    var counter = 0;
    var nose_endX = center - 12;
    var nose_endY = 140;

    pr.setup = function() {
        pr.size(400, 400);
    };

    pr.draw = function() {
        pr.background(209, 230, 255);
        pr.fill(15, 155, 230);
        pr.textSize(30);
        pr.text("Winter Wonderland Park", 40, 30);
        pr.textSize(14);
        pr.text("Only the best in wonderland skiing!", 95, 52);


        pr.stroke(194, 194, 194);
        pr.fill(255, 255, 255);

        //ground
        pr.rect(0, 350, 400, 100);

        //snowman body and head
        pr.ellipse(center, center + 120, 200, 200);
        pr.ellipse(center, center + 20, 140, 140);
        pr.ellipse(center, center - 80, 100, 100);

        //arms


        pr.strokeWeight(5);
        pr.stroke(122, 66, 13);
        pr.noFill();
        pr.line(center - 60, center, rhX, rhY);
        pr.line(center + 60, center, lhX, lhY);





        //eyes
        pr.fill(0, 0, 0);
        pr.stroke(0, 0, 0);
        pr.ellipse(center - 15, 100, 5, 5);
        pr.ellipse(center + 15, 100, 5, 5);

        //mouth
        pr.noFill();
        pr.arc(center, 141, 47, 35, pr.PI*(30/180), pr.PI*(150/180));


        //scarf
        pr.stroke(255, 0, 0);
        pr.strokeWeight(8);
        pr.noFill();
        pr.arc(center, 155, 72, 35, 0, pr.PI);

        //buttons
        pr.fill(0, 0, 0);
        pr.stroke(0, 0, 0);
        pr.ellipse(center, 195, 8, 8);
        pr.ellipse(center, 230, 8, 8);
        pr.ellipse(center, 265, 8, 8);

        // carrot nose
        pr.stroke(250, 163, 0);
        pr.fill(250, 163, 0);
        pr.triangle(nose_endX, nose_endY, center - 5, 120, center + 5, 120);

        if (counter === 150) {
            counter = 0;
            nose_endX = center - 12;
            nose_endY = 140;

        } else {
            counter += 1;
        }

        nose_endX--;
        nose_endY++;

    };


};

var myCanvas4 = document.getElementById("canvas4");

// attaching the animalAttack function to the canvas
var p4 = new Processing(myCanvas4, adDesign);
// p.exit(); //to detach it

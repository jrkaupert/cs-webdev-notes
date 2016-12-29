# Notes from Intro to JS: Drawing & Animation #

[Intro to JS: Drawing & Animation](https://www.khanacademy.org/computing/computer-programming/programming)

# Basic Drawing Command Reference #
API located at [http://processingjs.org/reference/](http://processingjs.org/reference/)

```js
ellipse(xPos, yPos, width, height);
rect(xPos, yPos, width, height);
line(xStart, yStart, xEnd, yEnd);
arc(x, y, width, height, start, stop);

fill(red, green, blue);
background(red, green, blue);

strokeWeight(thickness);
stroke(red, green, blue); // colors a stroke
noStroke(); // turn off line for a shape
```

# Basic Animation Reference #

```js
var x = 10;
draw = function() {
  // code to draw shapes

  x = x + 1; // increase interval to increase speed; increment in pixels/frame
};
```

`draw` function can also accept `mouseX` and `mouseY` parameters to accept
user input.  Can create interactive stuff like games using this!

[Table of Contents](_toc.md)

[Previous Chapter](appendixB.md)

# Lexical-this #
ES6 adds a new syntax of function declaration called the *arrow function*:

```js
var foo = a => {
  console.log( a );
};

foo( 2 ); // 2
```

While it would seem that the "fat arrow" is a silly shorthand for the
`function` keyword, it also comes into play with "lexical this"

The code below has a problem (the loss of `this` binding on the `cool()`
function)

```js
var obj = {
  id: "awesome",
  cool: function coolFn() {
    console.log( this.id );
  }
};

var id = "not awesome";

obj.cool(); // awesome

setTimeout( obj.cool, 100); // not awesome
```

This issue can be resolved using `var self = this;` as below:

```js
var obj = {
  count: 0,
  cool: function coolFn() {
    var self = this;

    if (self.count < 1) {
      setTimeout( function timer(){
        self.count++;
        console.log( "awesome?" );
      }, 100 );
    }
  }
};

obj.cool(); // awesome?
```

Unfortunately, the above solution doesn't properly use `this` binding, instead
just using `self` as an identifier that can be resolved via lexical scope and
closure without caring what happens to `this`.

The ES6 solution using the arrow function introduces a behavior called
"lexical this":

```js
var obj = {
  count: 0,
  cool: function coolFn() {
    if (this.count < 1) {
      setTimeout( () => {
        this.count++;
        console.log( "awesome?" );
      }, 100 );
    }
  }
};

obj.cool(); // awesome?
```

When it comes to their `this` binding, arrow functions do not behave like
normal functions.  They take the `this` value of their immediate lexical
enclosing scope.

An even better approach:

```js
var obj = {
  count: 0,
  cool: function coolFn() {
    if (this.count < 1) {
      setTimeout( function timer() {
        this.count++;
        console.log( "more awesome" );
      }.bind( this ), 100); // look, `bind()`!
    }
  }
};

obj.cool(); // more awesome
```

Learning how to use `this` and `bind()` together allows us to write this code
with named functions rather than anonymous (as the arrow functions are 
always anonymous)

[Table of Contents](_toc.md)

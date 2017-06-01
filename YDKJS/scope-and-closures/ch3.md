[Table of Contents](_toc.md)

[Previous Chapter](ch2.md)

# Chapter 3: Function vs. Block Scope #

## Scope from Functions ##
- Each function has its own scope, but other structures don't (usually)

Example:
```js
function foo(a) {
  // a is only accessible inside of foo
  var b = 4; // b is only accessible inside of foo as well!

  function bar() {
    // bar is only accessible inside of foo
  }

  var c = 7; // c is only accessible inside of foo
}
```

- In the above example, the `foo(..)` scope includes `a`, `b`, `c` and `bar`,
regardless of where in the scope each identifier is defined
- `bar()` has its own scope
- There's also a global scope that includes `foo(..)`, but cannot access
the identifiers in the `foo(..)` or `bar()` scopes

## Hiding in Plain Scope ##
- Normally we think of declaring functions and then adding code inside them
to make them do things
- An alternate, very useful, way of looking at things is instead to take
existing code and wrapping it in a function declaration, which essentially
*hides* the code in its own scope bubble
- Hiding variables and functions is useful because of the "Principle of Least
Privilege" in software design.  You should only expose what is minimally
necessary to the outside world and *hide* the rest
- Design should keep private details private to avoid unintended side-effects from outside influence

### Collision Avoidance ###
- Hiding variables and functions inside a scope can also be used to avoid
*collisions* between identifiers with the same name but different intended
purposes

#### Global "Namespaces" ####
- One of the most common reasons for variable collisions occurs in the global
scope when multiple libraries can collide with one another if internal details
are not properly hidden
- The example below shows a way to encapsulate functionality of a library
in an object, with access occurring via properties:

```js
var MyReallyCoolLibrary = {
  awesome: "stuff",
  doSomething: function() {
    // ...
  }
  doAnotherThing: function() {
    // ...
  }
};
```

#### Module Management ####
- An additional approach to collision avoidance is the *module* approach, which
uses dependency managers to prevent identifiers from being explicitly imported
into a new scope
- These tools use lexical scoping rules to ensure no identifiers are injected
into shared scope
- Chapter 5 of this book includes more info on the module pattern

## Functions as Scopes ##
- While we can wrap any piece of code in a function, it is not desirable to
pollute the enclosing namespace with function names, and having names requires
the function be called explicitly by name
- Instead, JavaScript allows us to create functions that don't require names
and to automatically execute functions

Example:
```js
var a = 2;

(function foo() {
  var a = 3;
  console.log( a ); // 3
})();

console.log( a ); // 2
```

- By wrapping the function statement in parentheses, the function is no
longer considered a standard declaration but instead a function expression
- Whenever `function` is the very first thing in a statement, it is a
declaration, otherwise it is a function expression
- In a function declaration, the function name is bound in the enclosing scope
and can be called from that scope by name
- In a function expression, the function name is not bout in the enclosing
scope and is instead bound only inside of its own function, preventing the name
from polluting the enclosing scope

### Anonymous vs. Named ###
- Function expressions can be anonymous, where `function(..)` is called with
no name identifier
- Function declarations must have a name
- Anonymous functions are commonly used, but have several drawbacks:
  - No useful name for stack trace debugging
  - With no name, recusion requires the use of a now-deprecated `arguments.callee` reference
  - No useful name makes code less readable/understandable.  Descriptive names
  help self-document
- *Inline function expressions* are very useful. Adding a name to them fixes
all of the drawbacks of anonymous functions while keeping all the benefits:

```js
setTimeout( function timeoutHandler(){
  console.log(..);
}, 1000 );
```

### Invoking Function Expressions Immediately ###
- Adding a `()` to the end of a function expression as in
`function foo(){..}()` causes the function to be executed immediately
(Immediately Invoked Function Expressions / IIFEs)
- IIFEs can be anonymous (and most often are), but as mentioned before, naming
functions has benefits
- It is also possible to rewrite IIFEs in an alternate form:
`(function(){..}())` where the `()` that execute the function are also wrapped
in the overall parentheses that create the function expression.  This form is
equivalent to the other
- IIFEs may also have parameters passed in like other function calls
(including the global object as shown below)

Example:
```js
var a = 2;
(function IIFE( global ){
  var a = 3;
  console.log( a ); // 3
  console.log ( global.a ); // 2
})( window );
console.log( a ); // 2
```

In the above example, the `window` object reference is passed into the
IIFE, and `global` is used as the named parameter for the function to clearly
identify that the function is for this purpose (but solely stylistic)

Another form of IIFEs puts the function to execute second, after the call
and parameters to pass in (used in Universal Module Definition project)

```js
var a = 2;

(function IIFE( def ){
  def( window );
})(function def( global ){
  var a = 3;
  console.log( a ); // 3
  console.log( global.a ); // 2
});
```

In the above example, `def` is defined in the second-half, and passed into
the `IIFE` function defined before it, where `def` is then invoked with
`window` passed in as the `global` parameter of `def`

## Blocks as Scopes ##
- Functions are the most common unit of scope, but there are other ways to
scope in JavaScript
- In block scoping, variables are declared as close to their usage as possible
- JavaScript doesn't directly block scope like in other languages, however
such as when used in `for` or `if` blocks

### `with` ###
- `with` is a form of block scoping, but don't use it!

### `try/catch` ###
- in ES3 specification and beyond , variable declaration in `catch` clauses
of a `try/catch` statement are block-scoped to `catch` block

### `let` ###
- in ES6 and beyond, the new `let` keyword attaches a variable definition to
the scope of the block it occurs in

Example:
```js
var foo = true;

if (foo) {
  let bar = foo * 2;
  bar = something( bar );
  console.log( bar );
}
console.log ( bar ); //ReferenceError
```

- In order to explicitly show block-scoping with `let`, can also use the following form with an arbitrary block of `{..}` braces
- Code below is equivalent to the above

```js
var foo = true;

if (foo) {
  { // <-- explicit block
    let bar = foo * 2;
    bar = something( bar );
    console.log( bar );
  }
}
console.log( bar ); // ReferenceError
```

- Declarations using `let` do not hoist to the entire scope of the block
they appear in:

```js
{
  console.log( bar ); // ReferenceError!
  let bar = 2;
}

```

### Garbage Collection ###
Block scoping is also helpful in garbage collection for reclaiming memory:

```js
function process(data){
  // do something interesting  
}

var someReallyBigData = { .. };

process( someReallyBigData );

var btn = document.getElementById("my_button");

btn.addEventListener("click", function click(evt){
  console.log("button clicked");
}, /*capturingPhase=*/false);
```

In the above example, the `click` function handler callback does not use or
need the `someReallyBigData` variable, but most likely the JS engine will
not garbage collect it because `click` has a closer over the whole scope

```js
function process(data) {
  // do something interesting
}

// anything declared inside the block can go away after
{
  let someReallyBigData = {..};
  process( someReallyBigData );
}

var btn = document.getElementById("my_button");

btn.addEventListener("click", function click(evt){
  console.log("button clicked");
}, /*capturingPhase=*/false);
```

In the code above, everything in the new block is obviously no longer needed
by the `click` scope

### `let` loops ###
`let` is useful in handling loop variables:

```js
for (let i=0; i<10; i++) {
  console.log(i);
}
console.log(i); //ReferenceError
```

### `const` ###
ES6 also introduced `const`, which creates block-scoped constants, where
changes to that value at a later time produces an error

```js
var foo = true;

if (foo) {
  var a = 2;
  const b = 3; // block-scoped to containing `if`

  a = 3; // just fine!
  b = 4; // error!
}

console.log( a ); // 3
console.log( b ); // ReferenceError!
```

[Table of Contents](_toc.md)

[Next Chapter](ch4.md)

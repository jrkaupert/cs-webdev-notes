# Notes from You Don't Know Javascript - Scope & Closures #
My notes from:
[You Don't Know JavaScript - Scope & Closures]
(https://github.com/getify/You-Dont-Know-JS/blob/master/scope%20&%20closures/README.md#you-dont-know-js-scope--closures)

Some of my notes are my own summary, others are taken directly / verbatim.
All rights belong to the original author and contributors at the link above

# Chapter 1: What is Scope? #
- Storing values and being able to access them from variables gives programs
*state*
- where variables are stored and how they are accessed is defined by a set of
rules called *scope*

## Compiler Theory ##
Traditional Compile Process:
1. *Tokenizing* or *Lexing* = splitting strings of characters into sets of
things that are meaningful to the language (*tokens*).  When tokens are defined
in a *stateful* way, tokenizing is actually called *lexing*
2. *Parsing* = turning a series of tokens into a "tree of nested elements"
called an *Abstract Syntax Tree (AST)*
3. *Code Generation* = turning an AST into code that can be executed

- JavaScript typically compiles code right before execution

## Understanding Scope ##
Components to understanding scope:
1. *Engine* - the piece that handles the compile process as a whole and JS
execution
2. *Compiler* - the piece that handles the details of compiling (parsing and
  code-generation)
3. *Scope* - responsible for maintaining a look-up table of all declared
variables, and for enforcing how and when the variables may be accessed during
code execution

Example:
```javascript
var a = 2;
```
1. The compiler starts by performing lexing to break the statement into tokens
and parses tokens into a tree
2. During execution, the compiler sees `var a` and looks at the scope to see if
`a` already exists in that set of scopes, ignoring it if so, and declaring
a new variable called `a` in that scope if not
3. The compiler then creates code for later execution by the engine to handle
`a = 2`.  The engine will check the scope to see if `a` already exists in the
current scope collection, and if so, uses `a`.  Otherwise, the engine tries to
find `a` elsewhere.  If the engine eventually finds `a` it assigns the value `2`
to it, otherwise it raises an error.

- Basically, the compiler first declares the variable if not already declared
in current scope, then during execution, the engine looks for the variable in
the scope and if it finds it, assigns to it

## Compiler Speak ##
- Two types of *look-up* done by the engine:
  - *LHS* look-up = when variable appears on left-hand side of an assignment
  operation (finding the variable container itself so assignment can be done).
  Can occur with `=` sign or by passing arguments into a function (implicit
  assignment)
  - *RHS* look-up = when variable appears on right-hand side of an assignment
  operation (same as the look-up of a value of a variable, or "go get the value
  of ____")
- Example:

```javascript
function foo(a) {
  console.log(a); // 2
}

foo(2);
```

- The code `foo(2);` actually invokes both a LHS and a RHS look-up, where the
RHS lookup is done to find the reference to `foo`, and the LHS look-up is done
to implicitly assign the argument `2` to the input parameter of `foo`.
- Inside the function, there's a RHS look-up for `a`, as well as on the `console`
object, and property-resolution to find the `log` method.
- Lastly, there's a LHS/RHS pair as `2` is passed (found from RHS look-up) into
`log`, where a LHS look-up is used as `2` is assigned to the assumed `arg1`
parameter of the `log` method
- **Note**: function declaration is done a little differently (it's not a LHS
look-up).  Since the Compiler handles declaration and value definition during
code-generation, the engine doesn't have to do anything during execution to
assign the function value to `foo`

## Nested Scope ##
- When there's more than one scope, the engine will look in the next outer
containing scope, repeating the process until the variable is found or until
the *global* scope has been reached and the variable is not found

## Errors ##
- When RHS look-up occurs and cannot find a variable in any of the nested scopes
a `ReferenceError` will be thrown by the engine.  The error is of type
`ReferenceError`
- When LHS look-up occurs and cannot find a variable in any of the nested
scopes, if not in *strict mode*, the global scope will create a new variable
with that name in the global scope for the engine.  In *strict mode*, the engine
with throw a `ReferenceError`
- If a RHS look-up results in a variable but an action is performed that is
impossible with that value (ie: referencing a property on a `null` or
`undefined` value), a `TypeError` is thrown
- `ReferenceError` is related to a scope-resolution failure, `TypeError`
indicates that scope resolution went okay but an invalid action was tried using
the result

# Chapter 2: Lexical Scope #
Two primary models for scoping:
- *Lexical Scope*, used by most programming languages
- *Dynamic Scope*, used by Bash scripting and some other languages

## Lex-time ##
Lexical scoping deals with where variables and blocks of scope are defined
by the developer when code is written.  This scoping usually doesn't change
once the lexer sees the code

Example:
```javascript
function foo(a) {
  var b = a * 2;

  function bar(c) {
    console.log( a, b, c );
  }

  bar(b * 3);
}
foo( 2 ); // 2 4 12
```
- The above example has 3 nested scopes:
  1. global scope with the single identifier `foo`
  2. `foo` scope with 3 identifiers `a`, `bar`, and `b`
  3. `bar` scope with 1 identifier `c`
- Scopes are strictly nested (a function can only be defined inside a single
parent scope)

### Look-ups ###
- Based on the structure and nesting of each scope, the engine is able to find
anything it needs to
- Scope look-up ends as soon as it finds the first identifier it is looking for
  - *shadowing* occurs when the same identifier is used in multiple nested
  scopes, where the inner identifier *shadows* the outer
  - Even if shadowing exists, scope starts at the innermost scope under
  execution and ends as soon as the first match is found
- Global variables are also capable of being referenced as a property reference
of the global object, ie: `window.a`, as global variables are automatically
made properties of the global object.  This allows global variables to be
accessed if they would otherwise be inaccessible due to shadowing
- Regardless of where a function is called from or how it is called, lexical
scope is defined solely by where the function is declared
- lexical scope lookup only occurs for *first-class* identifiers, finding only
the first variable, with object property-access finding any further properties,
ie: `foo.bar.baz` only finds `foo` via lexical scoping, and `bar` and `baz` via
object property-access

## Cheating Lexical ##
There are two mechanisms that can "cheat" lexical scope at run-time:
1. `eval`
2. `with`

Both mechanisms for cheating lexical scope are bad practice and *lead to poorer
performance*

### eval ###
- `eval(..)` takes a string input and treats the string as if it was written into the code at that point in the program.
- After executing `eval`, the engine does not know or care if the
code was dynamically interpreted and modified the lexical scope
- By default, strings evaluated by `eval` that contain
declarations modify the existing scope in which the `eval`
statement occurs.  Note that when used in "strict-mode", `eval`
operates in its own lexical scope so that declarations inside
of `eval` do not modify the enclosing scope
- Similar to `eval`, `setTimeout(..)`, `setInterval(..)`, and
`new Function(..)` can all cause problems due to dynamic code
generation

### with ###
- `with`  (now deprecated) can also be used to cheat lexical scope
- often `with` is used as a "short-hand" for making multiple
property references for a single object without repeating that
object every time
- depending how it's used, it can have side-effects of creating
new global variables
- `with` is not allowed at all in strict-mode.  Just don't use it.

### Performance ###
- `eval(..)` and `with` both cheat lexical scope by modifying
or creating new lexical scope during program execution
- JavaScript performance optimizations in the engine cannot be
used in conjunction with `eval` or `with` because the engine has
to pessimistically assume that scope may be changed at runtime,
resulting in performance degradation compared to not using `eval`
or `with`
- Code will run slower when `eval` or `with` are used!

# Chapter 3: Function vs. Block Scope #

## Scope from Functions ##
- Each function has its own scope, but other structures don't (usually)

Example:
```js
function foo(a) {
  var b = 2;

  function bar() {
    // ...
  }

  var c = 3;
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
necessary to the outside world and *hide* everything else
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

# Chapter 4: Hoisting #

## Some Notes on Ordering of Declaration & Assignment ##

## More About the Compiler ##

## Functions First ##




# Chapter 5: Scope Closures #

# Dynamic Scope #

# Polyfilling Block Scope #

# Lexical-this #

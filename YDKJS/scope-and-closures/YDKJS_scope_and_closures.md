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
While it's mostly true that code in JS is interpreted line-by-line from top
to bottom as the program executes, hoisting can confuse many because it
defies that understanding of how the program is executing:

```js
a = 2;

var a;

console.log( a );
```
In the above code, the output of the `console.log( a )` statement will be `2`
because the variable `a` is *hoisted*

In the code below, however, the behavior seems a little different (it's not):

```js
console.log( a );

var a = 2;
```

In this case, the `console.log( a )` statement will produce `undefined`.

## More About the Compiler ##
During compiling, **all** variable and function declarations are processed,
before **any** code is executed

For statements such as `var a = 2;`, JavaScript actually treats it as two
distinct statements: `var a;` and `a = 2;`.  The declaration statement is
handled by the compiler before program execution.  The assignment is left
untouched until the program is executed.

The first snippet of code from the previous section is actually handled as
follows:
```js
// Handled by compiler before program execution
var a;
```

```js
// Handled by engine during program execution
a = 2;
console.log( a );
```

The second snippet of code from the previous section is handled as follows:
```js
var a;
```

```js
console.log( a );
a = 2;
```

Essentially, via *hoisting*, variables and functions are pulled to the top of
the code from where they actually appear.  Only declarations are hoisted.
Any assignments or other executable logic that occurs at the point of
declaration are left in place.  It would create a lot of problems otherwise...

Hoisting occurs **per-scope**, so variables in inside scopes are hoisted to
the top of their scope.

While function declarations are hoisted, function expressions are not!

```js
foo(); // Throws TypeError, not ReferenceError

var foo = function bar() {
  // ...
};
```

In the above code, `foo` is hoisted to the top of the global scope (as a
variable), so `foo()` does not throw a `ReferenceError` when called during
execution, however `foo` has no value at that point (assignment hasn't
happened yet), so `foo()` tries to invoke the `undefined` value which produces
a `TypeError`

Also, named function expressions do not produce a name identifier that is
available to the enclosing scope:

```js
foo() // TypeError
bar() // ReferenceError

var foo = function bar() {
  // ...
};
```

The code above is better interpreted through the lens of hoisting as:

```js
var foo;

foo(); // TypeError
bar(); // ReferenceError

foo = function() {
  var bar = ...self...
  // ...
}
```

## Functions First ##
While both function declarations and variable declarations are hoisted by
the compiler, it is important to note that functions are hoisted *first*,
followed by variables

```js
foo(); // 1

var foo;

function foo() {
  console.log( 1 );
}

foo = function() {
  console.log( 2 );
}
```

In the above code, `1` is printed instead of `2`.  The code is actually
interpreted as:

```js
function foo() {
  console.log( 1 );
}
foo(); // 1

foo = function() {
  console.log( 2 );
};
```

While `function` declarations do override `var` declarations, duplicate
`function` declarations will override previous ones.  Duplicate definitions
in the same scope are a **bad** idea...

Function declarations when contained inside of normal blocks will hoist to
the enclosing scope rather than being conditional, but the behavior is not
reliable and should be avoided:

```js
foo(); // "b"

var a = true;
if (a) {
  function foo() {console.log( "a" ); }
}
else {
  function foo() {console.log( "b" ); }
}
```

# Chapter 5: Scope Closures #

## Enlightenment ##
Closure is all around in JavaScript, you just have to recognize and embrace it.
It results from writing code that uses lexical scope.  You just need the
proper mental context to recognize where to use them.

The moment of enlightenment should occur when you realize that **closures are
already all over the place in my code, I can now just *see* them**

## Nitty Gritty of Closures ##
**Closure** is when a function retains knowledge and access to its lexical
scope even after when function is executing outside its lexical scope

Example:
```js
function foo() {
  var a = 2;

  function bar() {
    console.log( a );
  }

  return bar;
}

var baz = foo();

baz(); // 2 - via closure!
```

In the above example, `bar()` has lexical scope access to the scope of `foo()`.
Then, `bar()` is passed as a value through the `return` statement.

Once `foo()` is executed, the value gets assigned to `baz`.  Once `baz()` is
executed, `bar()` is invoked again, but outside of its declared lexical scope.

After `foo()` is executed, the expectation would be that the entire inner scope
of `foo()` would go away via garbage collection to free up memory.  Instead,
closure does not let this happen because the inner scope is still in use
by `bar()`.  

`bar()` has a lexical scope closure over that inner scope of `foo()`.  That
scope is kept alive for reference at any later time. That reference is called
**closure**

Another example:
```js
function foo() {
  var a = 2;

  function baz() {
    console.log( a ); // 2
  }

  bar( baz );
}

function bar(fn) {
  fn(); // Another closure
}
```

In this case, the inner function `baz` is passed to `bar`, where its inner
function `fn` is called which accesses `a`.

## Now I can See ##
A real-world example:

```js
function wait(message) {
  setTimeout( function timer(){
    console.log( message );
  }, 1000);
}

wait( "Hello, closure!" );
```

In the above example, an inner function `timer` is passed to
 `setTimeout(..)`.  Because `timer` has a scope closure over the `wait(..)`
scope, the reference to the variable `message` is maintained.

After 1000 ms have passed from executing `wait(..)`, `timer` still has closure
over that scope, long after that inner scope should have been gone.

The built-in `setTimeout(..)` has reference to some parameter, and when the
engine invokes the function, the inner `timer` is invoked and its lexical
scope reference still remains via closure.

A jQuery example:
```js
function setupBot(name, selector) {
  $( selector ).click( function activator(){
    console.log( "Activating: " + name );
  });
}

setupBot("Closure Bot 1", "#bot_1");
setupBot("Closure Bot 2", "#bot_2");
```

Whenever and wherever you pass functions as first-class values, you are likely
to be using closure.  This occurs when timers, event handlers, Ajax requests,
cross-window messaging, web workers, and any other async or sync tasks that
require callback functions are used.

IIFEs don't really use closure because they are invoked in the same scope they
are declared.  Closure occurs, but it's not observable.

## Loops + Closure ##
An example of closure using the `for` loop:

```js
for (var i=1; i<=5; i++) {
  setTimeout( function timer(){
    console.log( i );
  }, i*1000);
}
```

The expectation is that this code would print the numbers 1 through 5, one
per second, but *it doesn't*.  The `i` variable is shared over the same global
scope of the functions with closure.

Next example:

```js
for (var i=1; i<=5; i++) {
  (function() {
    setTimeout( function timer(){
      console.log( i );
    }, i*1000 );
  })();
}
```

Unfortunately, this second example is no better.  Even though another lexical
scope is created, it doesn't do anything.  It needs its own copy of the `i`
value.

Final example:
```js
for (var i=1; i<=5; i++) {
  (function(){
    var j = i;
    setTimeout( function timer(){
      console.log( j );
    }, j*1000 );
  })();
}
```

This version works with `j=i` making a copy of the loop variable each time
through

An alternate version of the working final example:
```js
for (var i=1; i<=5; i++) {
  (function(j){
    setTimeout( function timer(){
      console.log( j );
    }, j*1000);
  })( i );
}
```

Using an IIFE created a new scope for each iteration which allowed the timeout
function callbacks to closer over a new scope for each iteration.

### Block Scoping Revisited ###
In the previous example, an IIFE was used to create a new scope on each
iteration, because we needed a per-iteration *block scope*.

The `let` keyword allows us to also declare a variable in a block directly,
turning a block into a scope we can close over:

```js
for (var i=1; i<=5; i++) {
  let j = i;
  setTimeout( function timer(){
    console.log( j );
  }, j*1000 );
}
```

Another, even cleaner way:

```js
for (let i=1; i<=5; i++) {
  setTimeout( function timer() {
    console.log( i );
  }, i*1000);
}
```

## Modules ##
Another pattern using closure that does not appear to rely on callbacks:

```js
function CoolModule() {
  var something = "cool";
  var another = [1, 2, 3];

  function doSomething(){
    console.log( something );
  }

  function doAnother(){
    console.log( another.join( " ! ") );
  }

  return {
    doSomething: doSomething,
    doAnother: doAnother
  };
}

var foo = CoolModule();

foo.doSomething(); // cool
foo.doAnother(); // 1 ! 2 ! 3
```

This is called the *module* pattern, and this version is the *Revealing Module*
implementation

Some things to note:
- `CoolModule()` is a function, but it has to be invoked to create an instance
of the module and therefore the inner scopes and closures
- The function returns an object ({key: value pairs}) with references to
the inner functions but not the inner data variables (which remain hidden
  and private)
- The return value is essentially a **public API** for the module
- The return value is assigned to the outer variable `foo` which can then
be used to access property methods on the API like `foo.doSomething()`

Two requirements for module pattern:
1. Must be an outer enclosing function that is invoked at least once, where
each invocation creates a new module instance
2. The enclosing function must return back at least a single inner function
so that the inner function has closure over the private scope and can access
or change that private state

A "singleton" variation (only want a single instance), using an IIFE:

```js
var foo = (function CoolModule(){
  var something = "cool";
  var another = [1, 2, 3];

  function doSomething() {
    console.log( something );
  }

  function doAnother() {
    console.log( another.join( " ! ") );
  }

  return {
    doSomething: doSomething,
    doAnother: doAnother
  };
})();

foo.doSomething(); // cool
foo.doAnother(); // 1 ! 2 ! 3
```

Modules can also receive parameters just like all other functions:

```js
function CoolModule(id) {
  function identify() {
    console.log(id);
  }

  return {
    identify: identify
  };
}

var foo1 = CoolModule( "foo 1" );
var foo2 = CoolModule( "foo 2" );
```

Alternate variation is to name object you are returning as your public API:

```js
var foo = (function CoolModule(id) {
  function change() {
    // modifying the public API
    publicAPI.identify = identify2;
  }

  function identify1() {
    console.log( id );
  }

  function identify2() {
    console.log( id.toUpperCase() );
  }

  var publicAPI = {
    change: change,
    identify: identify2
  };

  return publicAPI;
})( "foo module" );

foo.identify(); // foo module
foo.change();
foo.identify(); // FOO MODULE
```

By retaining an inner reference to the public API object inside the module
instance, that module instance can be changed from the inside via adding /
removing methods & properties and changing their values

## Modern Modules ##
The same module pattern is used by dependency loaders/managers via wrapping
the module definition in an easy-to-use API (this is a *very* simplified
representation of such managers):

```js
var MyModules = (function Manager() {
  var modules = {};

  function define(name, deps, impl) {
    for (var i=0; i<deps.length; i++) {
      deps[i] = modules[deps[i]];
    }
    modules[name] = impl.apply( impl, deps );
  }

  function get(name) {
    return modules[name];
  }

  return {
    define: define,
    get: get
  };
})();
```

In the above snippet, the `modules[name]...` invokes the definition wrapper
function for a module, also passing in any dependencies, and stores the
return value (the module's API), into an internal list of modules by name

The above "manager" might be used to define modules as follows:

```js
MyModules.define( "bar", [], function(){
  function hello(who) {
    return "Let me introduce: " + who;
  }

  return {
    hello: hello
  };
});

MyModules.define( "foo", ["bar"], function(bar) {
  var hungry = "hippo";

  function awesome() {
    console.log( bar.hello( hungry ).toUpperCase() );
  }

  return {
    awesome: awesome
  };
});

var bar = MyModules.get( "bar" );
var foo = MyModules.get( "foo" );

console.log(
  bar.hello( "hippo" )
); // Let me introduce: hippo

foo.awesome(); //LET ME INTRODUCE: HIPPO
```
Both the `foo` and `bar` modules are defined with a function returning a
public API.  `foo` also uses `bar` as a dependency

## Future Modules ##
- ES6 adds new syntax support for modules.  When ES6 loads modules, it treats
each file as a separate module which can import other modules or specific API
pieces, and export its own API pieces
- ES6 module APIs are static (can't be changed at run-time), unlike
function-based modules (which can be changed at run-time).  Because of this,
the compiler can check ES6 Modules to see if an API reference does not
exist and throw an early error at compile-time rather than execution
- ES6 modules must be defined one file per module.

Example:
**bar.js**

```js
function hello(who) {
  return "Let me introduce: " + who;
}

export hello;
```

**foo.js**

```js
import hello from "bar";

var hungry = "hippo";

function awesome() {
  console.log(
    hello( hungry ).toUpperCase()
  );
}

export awesome;
```

```js
module foo from "foo";
module bar from "bar";

console.log(
  bar.hello( "rhino" )
); // Let me introduce: rhino

foo.awesome(); // LET ME INTRODUCE: HIPPO
```

- `import` imports one or more members from an API into the current scope,
each bound to a variable.
- `module` imports entire module API to bound variable
- `export` exports a function or variable to the public API for the current
module
- module file contents are treated as if in an enclosed scope

# Dynamic Scope #
In contrast to lexical scope (used by JS and most languages), dynamic scope
is determined at runtime (rather than at author-time).

Example:
```js
function foo() {
  console.log( a ); // 2
}

function bar() {
  var a = 3;
  foo();
}

var a = 2;

bar();
```

- Via lexical scope, the reference to `a` in `foo()` will be resolved to the
global variable `a` which has a value of two.
- Via dynamic scope, the scope chain is based on the call-stack, not the
 nesting of scopes

 If JS had dynamic scope, when `foo()` is executed, in theory the code above
 would output `3` instead

 Why?
 - Instead of resolving a reference to `a` from the lexical scope chain, `foo`
 would search the call-stack to find where `foo` was called from.  
 - Since `foo` is called from `bar`, the variables in the scope of `bar` are
 searched and `a` is found with a value of `3` there

 **JavaScript does not actually have dynamic scoping**. The `this` mechanism
 is similar, however, in concept.

 Lexical scope is write-time, dynamic-scope (and `this`) are runtime.  Lexical
 scope cares *where a function was declared*, dynamic scope cares *where a
 function was called from*

 `this` cares *how a function was called*

# Polyfilling Block Scope #
What if we want to use block scope (`let`) in pre-ES6?

ES6 version:

```js
{
  let a = 2;
  console.log( a ); // 2
}

console.log( a ); // ReferenceError
```

Pre-ES6 version:

```js
try{throw 2}catch(a) {
  console.log( a ); // 2
}
```

A `try/catch` is used to force a `2` value be thrown and immediately be
caught.  Because the `catch` clause has block-scoping since ES3, it can
be used to polyfill for block scope pre-ES6

A transpiler should be used to handle this (rather than writing your own
polyfill)

The *Traceur* project handles transpiling ES6 features into pre-ES6.

## Implicit vs. Explicit Blocks ##
An alternate form of `let` called the "let block" or "let statement":

```js
let (a = 2) {
  console.log( a ); // 2
}

console.log( a ); // ReferenceError
```

However, the above code doesn't work in ES6, nor does Traceur accept
such input.  Option:

```js
/*let*/ { let a = 2;
  console.log( a );
}
 console.log( a ); //ReferenceError
```

## Performance ##
Why use `try/catch` instead of IIFE to create block scope?  `try/catch` is
slower, but Chrome has been tasked to improve performance.  IIFE changes
the actual meaning of the code contained, and therefore is not a suitable
general solution to the issue


# Lexical-this #

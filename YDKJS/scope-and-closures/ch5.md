[Table of Contents](_toc.md)

[Previous Chapter](ch4.md)

# Chapter 5: Scope Closures #

## Enlightenment ##
Closure is everywhere in JavaScript, you just have to be on the lookout for it and be ready to use it.
Writing code that uses lexical scope will naturally utilize closure.  You just need the proper mental context to recognize where to use them.

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
} // 6 gets printed 5 times
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
} // 6 gets printed 5 times
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
} // 1, 2, 3, 4, 5
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
} // 1, 2, 3, 4, 5
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

Another, even cleaner way, which is exactly what we would intuitively expect without using any variable copies:

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

[Table of Contents](_toc.md)

[Next Chapter](appendixA.md)

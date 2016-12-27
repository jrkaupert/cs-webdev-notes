# Notes from You Don't Know Javascript - `this` & Object Prototypes #
My notes from:
[You Don't Know JavaScript - This & Object Prototypes]
(https://github.com/getify/You-Dont-Know-JS/blob/master/this%20&%20object%20prototypes/README.md#you-dont-know-js-this--object-prototypes)

Some of my notes are my own summary, others are taken directly / verbatim.
All rights belong to the original author and contributors at the link above

# Chapter 1: `this` or That? #
The `this` keyword is automatically defined in the scope of
every function, often the source of much confusion for developers.

## Why `this`? ##

```js
function identify() {
  return this.name.toUpperCase();
}

function speak() {
  var greeting = "Hello, I'm " + identify.call( this );
  console.log( greeting );
}

var me = {
  name: "Kyle"
};

var you = {
  name: "Reader"
};

identify.call(me); //KYLE
identify.call(you); //READER

speak.call(me); // Hello, I'm KYLE
speak.call(you); // Hello, I'm READER
```
In this snippet, the `identify()` and `speak()` functions are capable of being
used with multiple context objects (`me` and `you`) by the use of `this`
instead of requiring new functions for each object

Alternatively, `this` could be replaced by passing a context object to
`identify()` and `speak()`:

```js
function identify(context) {
  return context.name.toUpperCase();
}

function speak(context) {
  var greeting = "Hello, I'm " identify( context );
  console.log( greeting );
}

identify( you ); // READER
speak( me ); // Hello, I'm KYLE
```

By using `this`, the API design is cleaner and reuse is easier than passing
an object reference into a function.

## Confusions ##
Two meanings are often assumed by developers for `this`, both of which are
incorrect:

### Itself ###
`this` does not refer to the function itself! There are better ways of storing
state between function calls.  The example below shows how `this` does not let
a function get a reference to itself:

```js
function foo(num) {
  console.log( "foo: " + num);

  // keep track of how many times `foo` is called
  this.count++
}

foo.count = 0;

var i;

for (i=0; i<10; i++) {
  if (i > 5) {
    foo( i );
  }
}
// foo: 6
// foo: 7
// foo: 8
// foo: 9

// how many times was `foo` called?
console.log( foo.count ); // 0
```

Despite `console.log` being executed 4 times in the above snippet, `foo.count`
is still `0`.  Even though `foo.count = 0` does add a property `count` to
`foo`, the `this` reference does not point to `foo`.

## Its Scope ##
The other incorrect belief about `this` is that it refers to the function's
scope.  `this` does not refer to a function's **lexical scope**:

```js
function foo() {
  var a = 2;
  this.bar();
}

function bar() {
  console.log( this.a );
}

foo(); //undefined
```

Above, the code attempts to use `this` to implicitly refer to a function's
lexical scope.  An attempt is made to reference `bar()` via `this.bar()`.
`this` is trying to bridge the scopes of `foo()` and `bar()`, but no such
bridge is possible.

## What's `this`? ##
`this` is not an author-time binding, but a runtime one instead.  Its context
depends on how a function is invoked.  `this` binding has nothing to do with
where a function is declared, only with how a function is called.

When a function is called, a new execution context is created.  This context
contains info on where (in the call-stack) the function was called from,
how it was called, what parameters were passed in, and more.  One of the
properties of this context is the `this` reference that will be used for
the duration of the function's execution.  A function's **call-site**
determines the binding of `this`.

# Chapter 2: `this` All Makes Sense Now! #

## Call-site ##

## Nothing But Rules ##

### Default Binding ###

### Implicit Binding ###

#### Implicitly Lost ####

### Explicit Binding ###

#### Hard Binding ####

#### API Call "Contexts" ####

### `new` Binding ###

## Everything in Order ##

### Determining `this` ###

## Binding Exceptions ##

### Ignored `this` ###

#### Safer `this` ####

### Indirection ###

### Softening Binding ###

## Lexical `this` ##

# Chapter 3: Objects #

## Syntax ##

## Type ##

### Built-in Objects ###

## Contents ##

### Computed Property Names ###

### Property vs. Method ###

### Arrays ###

### Duplicating Objects ###

### Property Descriptors ###

#### Writable ####

#### Configurable ####

#### Enumerable ####

### Immutability ###

#### Object Constant ####

#### Prevent Extensions ####

#### Seal ####

#### Freeze ####

### [[Get]] ###

### [[Put]] ###

### Getters & Setters ###

### Existence ###

#### Enumeration ####

## Iteration ##

# Chapter 4: Mixing (Up) "Class" Objects #

## Class Theory ##

### "Class" Design Pattern ###

### JavaScript "Classes" ###

## Class Mechanics ##

### Building ###

### Constructor ###

## Class Inheritance ##

### Polymorphism ###

### Multiple Inheritance ###

## Mixins ##

### Explicit Mixins ###

#### "Polymorphism" Revisited ####

#### Mixing Copies ####

#### Parasitic Inheritance ####

### Implicit Mixins ###

# Chapter 5: Prototypes #

## [[Prototype]] ##

### `Object.prototype` ###

### Setting & Shadowing Properties ###

## "Class" ##

### "Class" Functions ###

### "Constructors" ###

#### Constructor Or Call? ####

### Mechanics ###

#### "Constructor" Redux ####

## "(Prototypal) Inheritance" ##

### Inspecting "Class" Relationships ###

## Object Links ##

### `Create()`ing Links ###

#### `Object.create()` Polyfilled ####

### Links as Fallbacks? ###

# Chapter 6: Behavior Delegation #

## Towards Delegation-Oriented Design ##

### Class Theory ###

### Delegation Theory ###

#### Mutual Delegation (Disallowed) ####

#### Debugged ####

### Mental Models Compared ###

## Classes vs. Objects ##

### Widget "Classes" ###

#### ES6 `class` sugar ####

### Delegating Widget Objects ###

## Simpler Design ##

### De-class-ified ###

## Nicer Syntax ##

### Unlexical ###

## Introspection ##

# Appendix A: ES6 `class` #

## `class` ##

## `class` Gotchas ##

## Static > Dynamic? ##

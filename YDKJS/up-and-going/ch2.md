[Table of Contents](_toc.md)

[Previous Chapter](ch1.md)

# Chapter 2: Into JavaScript #
- ES6 = 6th edition of ECMAScript specification

## Values & Types ##
Built-in types:
- `string`
- `number`
- `boolean`
- `null` and `undefined`
- `object`
- `symbol` (new in ES6 spec)

The `typeof` operator can identify a value's type

## Objects ##
`object` type is a compound value that allows properties of the object to each
have their own values of any JavaScript type
- Properties can be accessed using dot notation or bracket notation. Example:
```javascript
var obj = {
  a: "this is a string";
  b: 101;
  c: true
};
obj.a; // "this is a string"
obj.b // 101
obj.c // true

obj["a"]; // "this is a string"
obj["b"]; // 101
obj["c"]; // true
```
- Dot notation is preferred, but bracket notation lets you handle properties
with special characters and spaces.  Bracket notation requires a variable or
string literal wrapped in quotes

## Arrays ##
- Arrays are objects that hold any type of value that are indexed numerically
- Example:
```javascript
var arr = [
  "hi",
  101,
  true
];

arr[0]; // "hi"
arr[1]; // 101
arr[2]; // true

typeof arr; // "object"
```
- arrays have properties including `length` which is automatically updated as
the array changes
- use arrays for numerically indexed values and objects for named properties

## Functions ##
- functions are objects and have their own properties, but usually won't use
their properties often
- Example:
```javascript
function foo() {
  return 101;
}
foo.bar = 'hi';

typeof foo;     // "function"
typeof foo();   // "number"
typeof foo.bar; // "string"
```

## Built-In Type Methods ##
- Each of the JS built-in types and subtypes have their own useful properties
and methods
- examples:
```javascript
var a = "hi";
var b = 125.24111

a.length;        // 2
a.toUpperCase(); // "HI"
b.toFixed(4);    // "125.2411"
```
- For each of these methods, there's an object wrapper form called a "native"
(like String, capital S) that is paired with the associated primitive type
(like string, lower case s).  The object wrapper defines the associated method
such as `toUpperCase()` on its prototype.
- JavaScript handles ("boxes") things behind the scenes to allow primitives to
reference these properties or methods
- Can almost always use the primitive rather than the object wrapper

## Comparing Values ##
- two main types of comparison:
  1. Equality
  2. Inequality
- any comparison results in a `boolean` value (`true` or `false`) regardless
of what items are being compared

### Coercion ###
- two forms
  1. *explicit* - forced by the code in an obvious way
  2. *implicit* - occurs when the conversion is more of a non-obvious side
  effect of another operation
- coercion can produce strange results but can also be useful

### Truthy and Falsy ###
- list of *falsy* values
  - "" (the empty string)
  - 0, -0, `NaN` (invalid number)
  - `null`, `undefined`
  - `false`
- Any value that is not *falsy* is *truthy*
- Non-boolean values only use these properties when actually coerced to a
`boolean`.

### Equality ###
- Difference between `==` and `===` is that `==` checks for value equality
with coercion allowed, and `===` checks for value equality without coercion
allowed ('strict equality')
- Example:
```javascript
var a = '101';
var b = 101;

a == b;      // true, JS coerces until types match for comparison
a === b;     // false, because coercion is not allowed
```
- in the above `==` case, a is coerced to an integer for the comparison because
of the ordering
- see [ECMA5 Section 11.9.3](http://www.ecma-international.org/ecma-262/5.1/)
for more details on corner cases on coercion in comparisons

Some simple rules for using `==` vs. `===`:
1. if either side could be the `true` or `false` value, avoid `==`
2. if either value could be `0`, "", or [] (empty array), avoid `==`
3. Otherwise you can use `==`, which will often improve readability
If you can't be sure of the values, use `===`

For these comparisons, non-primitive values such as `object`, `function`, and
`array` will be compared by reference and not by their underlying values

### Inequality ###
- Relational comparison can be performed using <, >, <=, and >=
- usually used for comparing `number` types, but can also be used for `string`
comparison
- need to be careful as with `==` comparisons as coercion can occur.  Be careful
when comparing different values of different types, especially when one value
cannot be coerced into a valid number (resulting in `NaN`)

## Variables ##
- variable and function names must be valid *identifiers*.
- *identifiers* must start with a-z, A-Z, $, or \_ and may then include
the same characters plus 0-9
- reserved words cannot be used as variables but are OK as property names,
otherwise property names follow same rules as variables

### Function Scopes ###
- the `var` keyword is used to declare a variable in the current function scope
or global scope if outside of all functions

#### Hoisting ####
- Regardless of where `var` is used in a scope, the declaration applies
throughout that scope (even if the value itself is declared before `var` is
used)
- Example:
```javascript
var a = 2;

foo();      // works because foo() declaration is hoisted

function foo() {
  a = 3;

  console.log(a);   // 3
  var a;            // declaration is hoisted to top of foo()
}
console.log(a);     // 2
```
- Should not rely on hoisting variables to use earlier in scope than `var`
appears
- Hoisted function declarations are commonly used, however

#### Nested Scopes ####
- Declared variables are available anywhere in the scope they are declared in,
as well as any lower/inner scopes
- You will get a `ReferenceError` thrown if trying to access a variable that
is out of scope
- If you try to set an undeclared variable, you will created a top-level
global variable (if not in strict mode), or get an error (in strict mode)
- ES6 allows variables to be declared for specific blocks using the `let`
keyword.
  - allows very detailed control of scoping.
  - block scoping keeps variable within block, and not outer scopes

## Conditionals ##
- `if` statements:
```javascript
if (stuff) {
  // do stuff
}
else if (morestuff) {
  // do more stuff
}
else {
  // do the fallback option
}
```
- `switch` statements:
```javascript
switch(stuff) {
  case 1:
  case 2:
    // do something for either 1 or 2 (fall through)
    break;
  case 3:
    // do something else
    break;
  case 20:
    // do something else
    break;
  default:
    // do the fallback option
}
```
- *Ternary* operator / *conditional* operator
```javascript
var a = 100;
var b = (a > 50) ? "foo" : "bar:";
```

## Strict Mode ##
- Added in ES5 to keep code within certain guidelines
- can make code more readily optimized by JS engine
- Should always use *strict mode*
- Can be applied for entire file or for individual functions with
`"use strict";`
- does not allow auto-global variable declaration when `var` omitted

## Functions as Values ##
- While functions serve to provide scoping in JavaScript, a function is
also a variable (value) in the scope it is defined in
- A function is a value just like a number, array, or other type
  - Can be a value assigned to a variable
  - Can be passed to other functions
  - Can be returned from other functions
- An anonymous function expression (has no name defined):
```javascript
var foo = function() {
  // do stuff
};
```
- A *named* function expression:
```javascript
var x = function bar() {
  // do more stuff
};
```
- Named function expressions are generally preferred, but there's a lot
of reasons to use anonymous functions too

## Immediately Invoked Function Expressions (IIFEs) ##
- The examples in the previous section defined functions but did not
actually execute them, however it is possible to execute a function
expression where it is defined (*immediately invoked function expression*):
```javascript
(function example(){
    console.log("Hello World!");
})();
// "Hello World!"
```
- The parentheses that wrap the function definition prevent it from being
treated as a normal function declaration
- The `()` at the end actually execute the function expression immediately
preceding
- IIFEs are just functions, and can be used to declare variables that do not
affect scope outside of the function
- IIFEs can also return values

## Closure ##
- *Closure* is a critical concept in JS, a way to remember and provide
continued access to a function's scope and variables after the function has finished execution
- Example:
```javascript
function makeAdder(x) {
  // the passed in parameter 'x' is an inner variable

  // the inner function 'add()' uses 'x' so it has a 'closure' over it
  function add(y) {
    return y + x;
  };

  return add;
}

// `plusOne` gets a reference to the inner `add(..)` function with closure
// over the `x` parameter of the outer `makeAdder(..)`
var plusOne = makeAdder( 1 );

// `plusTen` gets a reference to the inner `add(..)` function with closure
// over the `x` parameter of the outer `makeAdder(..)`
var plusTen = makeAdder( 10 );

plusOne( 3 );  // 4
plusOne( 41 ); // 42
plusTen( 13 ); // 23
```

### Modules ###
- Closures most often used in the *module pattern* in JavaScript
- *Modules* provide a way to hide details of the implementation while
maintaining a public API that can be accessed from outside users
- Example:
```javascript
// User is the module we are defining
function User(){
  // username, password, doLogin details are hidden inside of module
  var username, password;

  // the details of `doLogin` are internal to the `User()` module.  `doLogin`
  // has closure over `username` and `password`
  function doLogin(user, pw){
    username = user;
    password = pw;

    //implement rest of login details
  }

  var publicAPI = {
    login: doLogin
  };

  // `publicAPI` is what provides a single `login` capability to the
  // outside world as `User()` returns only the `publicAPI`
  return publicAPI;
}

// create a `User` module instance
var james = User();
james.login( "james", "Password!");
```
- `doLogin()` has closure over `username` and `password` and can access them
after the `User()` function has executed
- `publicAPI` is an object and has a single method `login`, which provides
a reference to the `doLogin()` inner function of `User()`.  When `publicAPI`
is returned from `User()` it is assigned to the variable `james`
- even after `var james = User();` has been executed, `username` and `password`
are retained because a closure in the function is storing them

## `this` identifier ##
- While `this` is often used in OOP, in JavaScript it serves a different
purpose
- When functions use `this` it usually points to an `object`, but the specific
`object` varies depending on how the function is called
- `this` does *not* refer to the function itself
- Example:
```javascript
function foo(){
  console.log( this.bar );
}

var bar = "global";

var obj1 = {
  bar: "obj1",
  foo: foo
};

var obj2 = {
  bar: "obj2"
};

foo();              // "global"  (rule 1 below)
obj1.foo();         // "obj1"    (rule 2 below)
foo.call( obj2 );   // "obj2"    (rule 3 below)
new foo();          // undefined (rule 4 below)
```
Rules for `this` illustrated from above code:
1. `foo()` sets `this` to the global object in non-strict mode. In strict mode
`this` would be undefined and the `bar` property would error when accessed
2. `obj1.foo()` sets `this` to the `obj1` object
3. `foo.call(obj2)` sets `this` to the `obj2` object
4. `new foo()` sets `this` to a new empty object (thus returning `undefined`)
- `this` will always be called in one of these ways, and which way determines
what `this` points to

## Prototypes ##
- When you reference an object's property that doesn't exist, JavaScript
looks to the object's internal *prototype* reference to try to find the
property on another object (like a fallback if the property is missing)
- The prototype reference link from an object to its fallback occurs when
the object is created
- Example:
```javascript
var foo = {
  a: 42
};

// create `bar` and link it to `foo`
var bar = Object.create(foo);

bar.b = "hello world";

bar.b;   // "hello world"
bar.a;   // 42 <- delegated to `foo`
```
- in the above example, `a` property doesn't exist on `bar` object but JS
falls back to looking for `a` on the `foo` object prototype that `bar` is linked
to
- The natural way of applying prototypes is "behavior delegation" where linked
objects are able to *delegate* needed behavior to one another
- Prototypes should not be used to emulate or fake "classes" or "inheritance"

## Old & New ##
- Two techniques to use newer JavaScript stuff before older browsers are
able to handle:
  1. Polyfilling - taking definition of a newer feature and creating code that
  is equivalent but able to run in older browsers.  Not all features are
  able to be polyfilled.  Use ES5-Shim and ES6-Shim rather than creating own
  polyfill implementations
  2. Transpiling - *transforming + compiling* to convert newer code (due to
    syntax) into older equivalents.  Code gets written in new syntax, but
    deployed to browser in old syntax.  Transpiling usually occurs during
    build process. Reasons to use:
      - New syntax is more readable and maintainable
      - Can transpile for only old browsers and use new syntax for new browsers
      to gain browser optimizations with new syntax
      - New syntax can be tested earlier in real world and issues can be fixed
      by JavaScript committee much earlier
      - Babel can transpile ES6+ into ES5
      - Traceur can transpile ES6, ES7 and beyond into ES5

[Table of Contents](_toc.md)

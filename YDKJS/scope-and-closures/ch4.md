[Table of Contents](_toc.md)

[Previous Chapter](ch3.md)

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

[Table of Contents](_toc.md)

[Next Chapter](ch5.md)

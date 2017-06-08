[Table of Contents](_toc.md)

# Chapter 1: Types #
While many would claim JS doesn't have types, it does.  The engine and the developer treat `42` and `"42"` differently, therefore they have different
types.  They may not be as strong as in other languages, but they exist, and the ECMAScript specification defines specific types.

## A Type By Any Other Name... ##
Types are important to understand because converting between types (and coercion) happens all the time and it's crucial to understand types fully.

### Built-in Types ###
Seven built-in types:
- `null`
- `undefined`
- `boolean`
- `number`
- `string`
- `object`
- `symbol` (new in ES6)

All types except `object` are primitives

`typeof` operator can be used to inspect a given value, returning a string representing the type
- `null` is a special case, based on a bug that's been present for a long time, and must be checked differently:

```js
typeof null === "object"; // true

var a = null;

(!a && typeof a === "object"); // true
```

`null` is the only primitive that is "falsy" that also returns `object` from `typeof`

`typeof` can also be used on functions:

```js
typeof function a() { /* ... */ } === "function"; // true
```

Functions are a subtype of `object`, known as "callable objects".  They can have properties because they are objects.

Functions also have a `length` property corresponding to the number of formal parameters they are declared with.

Arrays, however, are just objects, though similar to functions may be considered a "subtype" of `object`

### Values as Types ###
Variables do not have types (can hold any value at any time).  Values have types.

JavaScript does not have type enforcement (engine doesn't care if the type changes during runtime)

Values can be created from other values of different types through **coercion**

#### `undefined` vs "undeclared" ####
Variables with no value have the `undefined` value.  `typeof` will return `undefined` for them.

Variables that have not yet been declared are not the same as variables that have been declared but have no value yet.  Attempting to access
undeclared variables results in a `ReferenceError`, while attempting to access declared variables with no value returns `undefined`.
- despite this, calling `typeof` on an undeclared variable will also return `undefined` (but this proves useful at times)

#### `typeof` Undeclared ####
Since multiple script files can all load variables into the global namespace, having `typeof` return `undefined` for undeclared variables can be 
a safeguard.  Calls to global variables will not throw `ReferenceError`s if `typeof` is used to check for their existence, but would if the check
is made against the variable itself:

```js
// throws an error
if (DEBUG) {
  console.log( "Debugging is starting" );
}

// this is a safe existence check
if (typeof DEBUG !== "undefined") {
  console.log( "Debugging is starting" );
}
```

An alternative to using `typeof` to check global variables is to check against `window.DEBUG`, since all global variables are a property of `window` 
in a browser.  This will not work in other environments including server-side node.js, however.

[Table of Contents](_toc.md)

[Next Chapter](ch2.md)
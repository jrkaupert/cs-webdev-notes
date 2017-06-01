[Table of Contents](_toc.md)

[Previous Chapter](appendixA.md)

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

The *Traceur* project (Google) handles transpiling ES6 features into pre-ES6. Traceur actually produces something similar to the try/catch approach for `let`

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
general solution to the issue.

[Table of Contents](_toc.md)

[Next Chapter](appendixC.md)

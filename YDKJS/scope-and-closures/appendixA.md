[Table of Contents](_toc.md)

[Previous Chapter](ch5.md)

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

 [Table of Contents](_toc.md)

 [Next Chapter](appendixB.md)

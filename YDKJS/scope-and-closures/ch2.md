[Table of Contents](_toc.md)

[Previous Chapter](ch1.md)

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

[Table of Contents](_toc.md)

[Next Chapter](ch3.md)

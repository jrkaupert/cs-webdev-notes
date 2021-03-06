[Table of Contents](_toc.md)

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

[Table of Contents](_toc.md)

[Next Chapter](ch2.md)

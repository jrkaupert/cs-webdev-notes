[Table of Contents](_toc.md)

[Previous Chapter](ch1.md)

# Chapter 2: `this` All Makes Sense Now! #
`this` is a binding made for each function invocation that is based entirely
on its **call-site** (how a function is called)

## Call-site ##
To understand how `this` is bound, the location (call-site) where a function
is called (not where it is declared) needs to be understood.  Looking at
the call-site answers the question of "What `this` is referenced here?".

While it is typically a matter of going to where the function is called to
understand the call-site, sometimes coding patterns can obscure the true
call-site.  The **call-stack** is important because we care about the call-site
before the currently executing function.

```js
function baz() {
  // call-stack is: `baz`
  // so, call-site is in the global scope
  console.log( "baz" );
  bar(); // call-site for 'bar'
}

function bar() {
  // call-stack is: `baz` -> `bar`
  // so, call-site is in `baz`

  console.log( "bar" );
  foo(); // call-site for 'foo'
}

function foo() {
  // call-stack is: `baz` -> `bar` -> `foo`
  // so, call-site is in 'bar'

  console.log( "foo" );
}

baz(); // call-site for 'baz'
```

A call-stack can be viewed by looking at the chain of function calls in
order as in the above snippet. Another way is to use browser debugger tools.
A breakpoint can be set in the tools for the first line of `foo()`, or the
`debugger;` statement can be added instead.  The debugger will pause at this
location when the page is run.  

To diagnose `this` binding using a debugger, use the developer tools to get
the call-stack, then find the second item from the top, and that will show the
*real* call-site.

## Nothing But Rules ##
There are 4 different rules that determine where `this` will
point during function execution.  There is also an order of
precedence that must be understood if multiple rules could
apply to the call-site:

1. Called with `new`? Use the newly constructed object.
2. Called with `call` or `apply` or `bind`? Use the specified
object.
3. Called with a context object owning the call? Use that
context object
4. Default: `undefined` in `strict mode`, global object
otherwise

### Default Binding ###
The first rule that will be examined (ignore the order from
the previous section for now) looks at the most common case
of a standalone function invocation.  This is the catch-all rule
when none of the other rules apply.

```js
function foo() {
  console.log( this.a );
}

var a = 2;

foo(); // 2
```

When `foo()` is called, `this.a` resolves to the global variable
`a` because in this case, the default binding for `this` applies
to the function call which points `this` at the global object
that contains `a` as a property (global object properties are
one and the same with global variables).

Because `foo()` is called without any other pieces, none of the
other binding rules apply and the default is used.

When `strict mode` is used, the global object is ineligible for
the default binding behavior so `this` is set to `undefined`:

```js
function foo() {
  "use strict"

  console.log( this.a );
}

var a = 2;

foo(); // TypeError: `this` is `undefined`
```

Note that while `this` binding rules are entirely based on
call-site, the global object is only eligible for default
binding if the **contents** of a function are not running
in strict mode.  The strict mode state of the call-site is
irrelevant.

Usually programs should be entirely strict mode or not, but
this can become a relevant issue if third-party libraries are
used with different settings than the code they are called from.

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

[Table of Contents](_toc.md)

[Next Chapter](ch3.md)

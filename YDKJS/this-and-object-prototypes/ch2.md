[Table of Contents](_toc.md)

[Previous Chapter](ch1.md)

# Chapter 2: `this` All Makes Sense Now! #
`this` is a binding made for each function invocation that is based entirely
on its **call-site** (how a function is called)

## Call-site ##
**call-site** = location where a function is called (not where it is declared)

Call-site determines how `this` is bound. Looking at the call-site answers the 
question of "What `this` is referenced here?".

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

- Additional note: ES6 arrow functions use lexical scoping for `this`
binding, meaning they adopt the `this` binding from the enclosing 
function call.  Basically a syntactic substitute for `self = this`.

### Default Binding ###
The first rule (ignore the order from the previous section for now) looks at 
the most common case of a standalone function invocation.  This is the 
catch-all rule when none of the other rules apply.

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
Another rule: does the call-site have a context object (aka: an owning
or containing object)?

```js
function foo() {
  console.log( this.a );
}

var obj = {
  a: 2,
  foo: foo
};

obj.foo(); //2
```

Here, `foo()` is declared, then added as a reference property onto `obj`. 
Whether `foo()` is declared on `obj` initially or as in this example, the
function is not really 'owned' or 'contained' by the `obj` object.

Despite this, the call-site uses the `obj` context to reference the function, 
so in this sense, the `obj` object 'owns' or 'contains' the 
**function reference** when the function is called.

When `foo()` is called, it is preceded by an object reference to `obj`, so
by the **implict binding** rule, *that* object is what `this` binds to.

In this case, `this.a` = `obj.a`.

#### Implicitly Lost ####
It often confuses people that the `this` binding created by an *implicitly 
bound* function can lose its binding and revert to the *default binding*, 
either on the global object or to `undefined` if `strict mode` is being used:

```js
function foo() {
  console.log( this.a );
}

var obj = {
  a: 2,
  foo: foo
};

var bar = obj.foo; // function reference / alias!

var a = "oops, global"; // `a` is also a property on global object

bar(); // "oops, global"
```

Above, while `bar` appears to be a reference to `obj.foo`, it is actually
a reference to just `foo`.  Since the call-site is what matters, and `bar` is 
the call-site here, the *default binding* rule applies.

This can also happen with callback functions:

```js
function foo() {
  console.log( this.a );
}

function doFoo(fn) {
  // `fn` is just another reference to `foo`
  fn(); // <-- Call site!
}

var obj = {
  a: 2,
  foo: foo
};

var a = "oops, global"; // `a` also a property on the global object
doFoo( obj.foo ); // "oops, global"
```

Passing parameters is the same as an implicit reference assignment, so we get 
the same result as the previous example.

Often, function callbacks lose their `this` binding as in these examples, 
however sometimes functions we've passed callbacks to intentionally change the
`this`.  This often happens in popular JS libraries, where `this` points to the
DOM element triggering an event.

Sometimes, these problems can be solved by fixing the `this` that is used.

### Explicit Binding ###
It is also possible to force function calls to use a particular object for 
their `this` binding without putting a property function reference on an
object.

Functions have access to `call(..)` and `apply(..)` methods via their 
prototypes that take as their first parameter an object that should be used
as `this`, then invoking the function using that `this` value. 

This is **explicit binding**.

Example:
```js
function foo() {
  console.log( this.a );
}

var obj = {
  a: 2
};

foo.call( obj ); //2
```

In the above example, `foo` is invoked with explicit binding using 
`foo.call(..)` so that `this` is bound to `obj`

When simple primitives (`string`, `boolean`, or `number`) are passed as the
`this` binding, the primitive gets wrapped in its object form (`new String(..)`
, `new Boolean(..)`, or `new Number(..)`), which is known as **boxing**

As far as `this` binding is concerned, `call(..)` and `apply(..)` are 
functionally the same.

#### Hard Binding ####
While **explicit binding** alone doesn't solve the problem of a function losing
its intended `this` binding, **hard binding** provides a solution:

```js
function foo() {
  console.log( this.a );
}

var obj = {
  a: 2
};

var bar = function() {
  foo.call( obj );
};

bar(); // 2
setTimeout(bar, 100); //2

// `bar` hard binds `foo`'s `this` to `obj`
// so that it cannot be overriden
bar.call( window ); //2
```

In this case, `bar()` invokes `foo` with `this` bound to `obj` by calling 
`foo.call(obj)`.  Regardless of how `bar` is later invoked, it will always
invoke `foo` with `obj`, thus it is called **hard binding**

Since ES5, it is possible to use `bind` to return a new function that is
hard-coded to call the original function with a specified `this` context. In
ES6, this also produces a `.name` property derived from the original target
function.

#### API Call "Contexts" ####
In many libraries as well as new built-ins for JS, an optional parameter 
called 'context' is often provided so that `bind(..)` does not have to be
used and to ensure that callback functions use a specified `this`:

```js
function foo(el) {
  console.log( el, this.id );
}

var obj = {
  id: 'awesome'
};

// use `obj` as `this` for `foo(..)` calls
[1, 2, 3].forEach(foo,obj); // 1 awesome 2 awesome 3 awesome
```

In the background, some sort of explicit binding using `call(..)` or `apply(..)` is likely happening

### `new` Binding ###
In JS, the `new` operator looks similar to that of class-oriented languages,
but this is not actually the same.  In JS, **constructors** are functions that
happen to be called with `new` in front of them.  They do not instantiate 
classes, nor are they special types of functions.

Almost any function can be called with `new` preceding it, making it a 
**constructor call**, which does the following:
1. Creates a new object
2. Links the object via prototype
3. Sets the new constructed object as the `this` binding for that function 
call
4. Automatically returns the `new`-invoked function unless the function
returns a different object already

Calling a function with `new` in front of it sets that object as the `this`

```js
function foo(a) {
  this.a = a;
}

var bar = new foo( 2 );
console.log( bar.a ); // 2
```

## Everything in Order ##
The 4 rules for binding have an order of precedence.

**Default Binding** is the lowest precedence.

What about **Implicit Binding** versus **Explicit Binding**?

```js
function foo() {
  console.log( this.a );
}

var obj1 = {
  a: 2,
  foo: foo
};

var obj2 = {
  a: 3,
  foo: foo
};

obj1.foo(); // 2
obj2.foo(); // 3

obj1.foo.call( obj2 ); // 3 (Explicit took precedence)
obj2.foo.call( obj1 ); // 2 (Explicit took precedence)
```

**Explicit** takes precedence over **Implicit**

**`new` binding** takes precedence over **Explicit Binding**, even when
hard binding is used.

### Determining `this` ###
Rules, in order:
1. `new` binding - Are we calling the function with `new`? If so, `this` refers to the newly
constructed object:
`var bar = new foo()`
2. **Explicit Binding** - Are we calling the function with `call`, `apply`, or `bind`? If so, `this`
is the explicitly specified object:
`var bar = foo.call(obj2)`
3. **Implicit Binding** - Are we calling the function with a specified context (owning or containing
object)? If so, `this` is the context object:
`var bar = obj1.foo()`
4. **Default Binding** - Otherwise, `this` is `undefined` in `strict mode` or the `global` object
otherwise
`var bar = foo()`

## Binding Exceptions ##
But of course there are some exceptions...

### Ignored `this` ###
The **default binding** rule gets applied if `null` or `undefined` are passed
to `call`, `apply`, or `bind` as a parameter.

```js
function foo() {
  console.log( this.a );
}

var a = 2;
foo.call( null ); // 2
```

Some reasons to intentionally pass `null` for a `this` binding are spreading
out array values as function call parameters and for currying:

```js
function foo(a, b) {
  console.log( "a:" + a + ", b:" + b);
}

// spreading out array as parameters
foo.apply( null, [2, 3] ); // a:2, b:3

// currying with `bind(..)`
var bar = foo.bind( null, 2 );
bar( 3 ); // a:2, b:3
```

While `null` can be used when a function doesn't care about the `this` binding
as in the above examples, there's a 'hidden danger' that a 3rd-party library
being used might a `this` reference and use the **default binding** instead,
making it difficult to track down bugs

#### Safer `this` ####

### Indirection ###

### Softening Binding ###

## Lexical `this` ##

[Table of Contents](_toc.md)

[Next Chapter](ch3.md)

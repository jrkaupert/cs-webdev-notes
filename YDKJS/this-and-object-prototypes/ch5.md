[Table of Contents](_toc.md)

[Previous Chapter](ch4.md)

# Chapter 5: Prototypes #
All attempts from the previous chapter (mixins) to try to emulate class-copy
behavior will completely circumvent the `[[Prototype]] chain described in
this chapter.

## [[Prototype]] ##
Objects in JS have an internal property referred to as `[[Prototype]]` in the
specification.  This property is a reference to another object.  Most objects
have a non-`null` value for this property when they are created

```js
var myObject = {
  a: 2
};

myObject.a; //2
```

In the above example, a `[[Get]]` operation is invoked when the `a` property
is referenced for `myObject`.  The first step is to check if `myObject` has the
`a` property on it.  If not, `[[Get]]` checks the `[[Prototype]]` link for the
object.

```js
var anotherObject = {
  a: 2
};

// create an object linked to `anotherObject`
var myObject = Object.create( anotherObject );

myObject.a // 2
```

Here, `myObject` is `[[Prototype]]` linked to `anotherObject`, so even though
`myObject` doesn't directly have an `a` property, accessing the property 
succeeds because it is found on `anotherObject`.

If the property were not found, the `[[Prototype]]` chain would continue to
be examined until found or the chain ends, at which point `undefined` would be
returned if the property is not found.

If a `for..in` loop is used to iterate over an object, any property present
in the chain that is `enumerable` will be enumerated.  If `in` is used to check
for the existence of a property on an object, the entire chain will be checked
regardless of whether or not the properties are `enumerable`.

```js
var anotherObject = {
  a: 2
};

var myObject = Object.create( anotherObject );

for (var k in myObject) {
  console.log("found: " + k);
}
// found: a

("a" in myObject); // true
```

### `Object.prototype` ###
The top of every *normal* prototype chain is the built-in `Object.prototype`.
This object has many utilities that are commonly used in JS such as 
`.toString()` and `.valueOf()`, `.hasOwnProperty(..)`, and 
`.isPrototypeOf(..)`.

### Setting & Shadowing Properties ###
While adding properties to an object might seem straightforward, there are
some nuances if an object higher up the prototype chain already has such
a property:
1. If a normal data accessor property exists higher up the chain but is not
marked as *read-only* (`writable: false`), then the new property is added 
to the object and it is a **shadowed property**
2. If the property is found higher up the chain and is marked *read-only*
(`writable: false`), then no shadowing occurs and the property cannot be set.
In `strict mode` an error is thrown, otherwise the failure occurs silently.
3. If the property is found higher up the chain and it's a setter, the 
setter will be called, and no shadowing occurs, nor will the property be
redefined.

For shadowing to occur for cases #2 and #3 above, `Object.defineProperty(..)`
must be used instead of assignment using `=`.

**Shadowing should be avoided wherever possible!**

Shadowing can also occur in more subtle ways:

```js
var anotherObject = {
  a: 2
};

var myObject = Object.create( anotherObject );

anotherObject.a; // 2
myObject.a //2

anotherObject.hasOwnProperty( "a" ); //true
myObject.hasOwnProperty( "a" ); //false

myObject.a++ // oops! Implicit Shadowing!!!!

anotherObject.a; // 2
myObject.a; // 3

myObject.hasOwnProperty( "a" ); // true
```

Rather than looking up and incrementing the `anotherObject.a` property in 
place, the `++` operation ends up creating a shadowed property on `myObject`
instead.  Care should be exercised.

## "Class" ##
JavaScript only has objects.  There are no true classes that instantiate 
objects.

### "Class" Functions ###
Because of the public, non-enumerable property `prototype` that exists on
each function, there has been a lot of confusion over the years on what
this prototype object (linked to the function) does, and a lot of effort has
gone into to trying to use it for OOP purposes.

```js
function Foo() {
  //
}

var a = new Foo();

Object.getPrototypeOf( a ) === Foo.prototype; // true
```

A link to `Foo.prototype` is created when `a = new Foo()` is called.  No 
copying occurs, however, only a linkage.  No class instantiation has occurred,
nor any copying of behavior from a "class" into an object's instance.  This is
often referred to as **prototypal inheritance**, but really that's an effort
to shove it into the OOP framework.

In JavaScript, rather than copying anything, links are created between objects,
and one object can delegate properties or functions to another object.  This
delegation is a more accurate description of what's happening than inheritance.

### "Constructors" ###
While JavaScript does use the `new` keyword which is reminiscent of OOP 
languages, it's really not the same as constructing the instance of a class.

#### Constructor Or Call? ####
Despite being called in similar manner to OOP languages, the "constructors"
that precede `.new` are not actually constructors.  Functions are not 
constructors, though putting `new` in front of them makes it act a little 
differently in addition to its normal functionality.  A new object is 
constructed, but as more of a side-effect.  Any function with the `new` keyword
in front of it is essentially a constructor call.

### Mechanics ###
In addition to constructors, devs have found other ways to make JavaScript
act similarly to OOP languages:

```js
function Foo(name) {
  this.name = name;
}

Foo.prototype.myName = function() {
  return this.name;
};

var a = new Foo( "a" );
var b = new Foo( "b" );

a.myName(); // "a"
b.myName(); // "b"
```

The use of `this.name = name` adds a property onto each object, which is
similar to OOP class instance fields.  `Foo.prototype.myName = ...` adds
a function to the `Foo.prototype` object, which allows `a.myName()` to work.

No copying of properties is occurring, however.  Instead, because of the 
prototype link, `a` and `b` are linked to `Foo.prototype` and when `myName` is
not located on `a` or `b`, it can be found via delegation on `Foo.prototype` 
instead.

#### "Constructor" Redux ####
Despite there being a `.constructor` property, an object's `.constructor` 
property does not point to its constructor.  This reference is delegated up 
to the object's prototype instead, which also happens to have a `.constructor`
property pointing to it.  Even then, that object's constructor property may 
point all the way up to `Object(..)`.  Thus, it does not do a lot of good to
worry about this property in a traditional OOP sense.

`.constructor` artibrarily points to a function, and does not mean "constructed
by".  The `constructor` value is not immutable, and can be overwritten either
on purpose on on accident.  It is extremely unreliable, and not safe to use
as a reference in code.

## "(Prototypal) Inheritance" ##
Typical "prototype" style code in JavaScript for creating "parent-child" links:

```js
function Foo(name) {
  this.name = name;
}

Foo.prototype.myName = function() {
  return this.name;
}

function Bar(name, label) {
  Foo.call(this, name);
  this.label = label;
}

Bar.prototype = Object.create( Foo.prototype );

Bar.prototype.myLabel = function() {
  return this.label;
};

var a = new Bar( "a", "obj a" );

a.myName(); // "a"
a.myLabel(); // "obj a"
```

Here, `Object.create(..)` makes a 'new' object, and links its prototype to the
specified object `Foo.prototype`.

Another way to link `Bar.prototype` to `Foo.prototype`:

```js
// pre-ES6
// throws away default existing `Bar.prototype`
Bar.prototype = Object.create( Foo.prototype );

// ES6+
// modifies existing `Bar.prototype`
Object.setPrototypeOf( Bar.prototype, Foo.prototype );
```

### Inspecting "Class" Relationships ###
How to figure out what object(s) are delegated to?

```js
Foo.prototype.isPrototypeOf( a ); // true
```

Here we need an object (`Foo.prototype`) to test against another object. It 
checks the entire `[[Prototype]]` chain of `a`, looking to see if `Foo.prototype`
ever exists.

Another example:

```js
b.isPrototypeOf( c );
```

All this requires is two object references.  No gymnastics to make things like
OOP.

To get an object's prototype:

```js
// ES5
Object.getPrototypeOf( a );

// ES6+
a.__proto__; // exists on Object.prototype, not on `a`
```

## Object Links ##
`[[Prototype]]` is an internal link on one object that references another.  The
link is used most often when a property or method is referenced against the 
first object but no such property or method is available.  At this point, the 
engine looks up to the next linked object, continuing to each new `[[Prototype]]`
until the property/method is found or the prototype chain ends.

### `Create()`ing Links ###

#### `Object.create()` Polyfilled ####

### Links as Fallbacks? ###

[Table of Contents](_toc.md)

[Next Chapter](ch6.md)

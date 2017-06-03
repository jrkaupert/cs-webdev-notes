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

### "Class" Functions ###

### "Constructors" ###

#### Constructor Or Call? ####

### Mechanics ###

#### "Constructor" Redux ####

## "(Prototypal) Inheritance" ##

### Inspecting "Class" Relationships ###

## Object Links ##

### `Create()`ing Links ###

#### `Object.create()` Polyfilled ####

### Links as Fallbacks? ###

[Table of Contents](_toc.md)

[Next Chapter](ch6.md)

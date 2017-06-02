[Table of Contents](_toc.md)

[Previous Chapter](ch2.md)

# Chapter 3: Objects #

## Syntax ##
Two forms for objects:
1. declarative (literal)
2. constructed

Literal syntax:
```js
var myObj = {
  key: value
};
```

Constructed form:
```js
var myObj = newObject();
myObj.key = value;
```

Both forms result in the same sort of object.  Literal declarations can
have more than one key/value pair added at a time, however.

## Type ##
Objects are one of six primary types in JS:
- `string`
- `number`
- `boolean`
- `null`
- `undefined`
- `object`

Simple primitives (everything except the `object`) are **not** objects.
While `typeof null` returns the string `"object"`, this is a bug and `null`
is its own primitive type

**NOT EVERYTHING IN JavaScript IS AN OBJECT**

Special object sub-types:
- functions
- arrays

### Built-in Objects ###
Several other object sub-types exist, known as **built-in objects**:
- `String`
- `Number`
- `Boolean`
- `Object`
- `Function`
- `Array`
- `Date`
- `RegExp`
- `Error`

In JS, these are built-in functions, and can be used as a constructor, able
to produce a new *constructed* object of the desired sub-type

```js
var strPrimitive = "I am a string";
typeof strPrimitive; // "string"
strPrimitive instanceof String; // false

var strObject = new String( "I am a string" );
typeof strObject; // "object"
strObject instanceof String; // true

// inspect the object subtype
Object.prototype.toString.call( strObject ); // [object String]
```

Calling `toString()` lets us see that `strObject` is an object that was created
by the `String` constructor

Primitive string values are not objects, instead are literals, and are 
immutable.  A `String` object is required to check length, access single 
characters, etc...The same logic applies for other primitives such as numbers
and booleans

JS coerces `"string"` primitives to `String` objects as required

`null` and `undefined` only exist as primitives (no object wrapper form)

`Date` values must be created with constructed object form, as there are no
corresponding literals

`Object`, `Array`, `Function`, and `RegExp` are all objects whether the literal
or constructed form is used, but usually the simpler literal form is used
unless additional options are required

`Error` objects are typically not created explicitly, instead happening 
automatically when exceptions are thrown

## Contents ##
Object contents are values of any type, stored at named *locations* called
**properties**

Property names act as **references** to where values are stored

Properties can be accessed using either the `.` operator ("property access")
or `[ ]` operator ("key access").

Object property names are **ALWAYS** strings, and JS will convert non-string
primitives to strings (including numbers, which are numbers for arrays, but
get converted to strings for object keys)

### Computed Property Names ###
In ES6, computed property names can be specified with an expression
surrounded by a `[ ]` pair in an object-literal declaration:

```js
var prefix = "foo";

var myObject = {
  [prefix + "bar"]: "hello",
  [prefix + "baz"]: "world"
};

myObject["foobar"]; //hello
myObject["foobaz"]; //world
```

Computed property names will most commonly be used for ES6 `Symbol`s which are 
a new primitive data type:

```js
var myObject = {
  [Symbol.Something]: "hello world"
}
```

### Property vs. Method ###
Accessing properties of an object is always a **property access**, even if
it happens to get back a function (not a **method** even though the 
specification makes that type of distinction as with other languages).  Since
`this` is dependent on call-site, such a function is not strictly bound to
that object.

The words "function" and "method" are interchangeable in JavaScript

### Arrays ###
Arrays also use `[ ]` accessing, but use numeric indexing.

Since arrays are objects, although its indices are positive integers, it
can also have properties added:

```js
var myArray = [ "foo", 42, "bar" ];
myArray.baz = "baz";
myArray.length; //3
myArray.baz; // "baz"
```

Adding named properties does not change the length of the array.

If a property is added to an array that looks like a number, it will become
an index and modify the array contents:

```js
var myArray = [ "foo", 42, "bar" ];
myArray["3"] = "baz";
myArray.length; // 4
myArray[3]; // "baz"
```

### Duplicating Objects ###
JS does not have a built-in `copy()` method to duplicate objects.

JS frameworks have picked various means of performing a copy operations.

Objects that are JSON-safe (can be serialized to a JSON string, then re-parsed
to the same object) can be duplicated with:

```js
var newObj = JSON.parse( JSON.stringify( someObj ) );
```

ES6 also allows shallow copying via `Object.assign(..)`, which takes a 
target object and one or more source objects, then iterates over immediate 
enumerable (owned) keys on the source objects and copies via assignment to the
target, as well as returning the target.

### Property Descriptors ###
As of ES5, all properties have a **property descriptor**:

```js
var myObject = {
  a: 2
}

Object.getOwnPropertyDescriptor( myObject, "a" );
// {
//    value: 2,
//    writable: true,
//    enumerable: true,
//    configurable: true
// }
```

New properties can also be added or modified using `Object.defineProperty(..)`
(modifying only allowed if its `configurable`)

```js
var myObject = {};

Object.defineProperty( myObject, "a", {
  value: 2,
  writable: true,
  configurable: true,
  enumerable: true
} );
myObject.a; //2
```

#### Writable ####
Properties can only be changed if they are `writable`.  Trying to modify
properties when not writable will cause silent failures when `strict mode`
is not used, and will fail with a `TypeError` when `strict mode` is used.

#### Configurable ####
Configurable properties can have their descriptions modified using 
`defineProperty(..)`.  If `configurable` is set to `false`, however, new
`defineProperty(..)` calls will fail with a `TypeError` regardless of 
`strict mode`

When `configurable: false` is present, `delete` may not be used to remove
existing properties:

```js
var myObject = {
  a: 2
};

myObject.a; //2
delete myObject.a;
myObject.a; // undefined

Object.defineProperty( myObject, "a", {
  value: 2,
  writable: true,
  configurable: false,
  enumerable: true
});
myObject.a; // 2
delete myObject.a;
myObject.a/ // 2
```

#### Enumerable ####
The **enumerable** descriptor characteristic allows properties to show up in
certain enumerations such as the `for..in` loop.  All normal user-defined
properties default to `enumerable`, but can be set to `enumerable: false` if
there's a specific reason to.

### Immutability ###
ES5 added a series of ways to make properties and objects that cannot be
changed.  All of these methods create shallow immutability, such that they
do not affect references to other objects (those object's contents)

```js
myImmutableObject.foo; // [1, 2, 3]
myImmutableObject.foo.push(4);
myImmutableObject.foo; // [1, 2, 3, 4]
```

In the above example, `myImmutableObject` is considered as immutable.  To 
protect the contents of `myImmutableObject.foo`, however, `foo` would also have to be made immutable

#### Object Constant ####
Object properties can be made constants if `writable:false` and 
`configurable:false` are used together

```js
var myObject = {};

Object.defineProperty( myObject, "FAVORITE_NUMBER", {
  value: 42,
  writable: false,
  configurable: false
})
```

#### Prevent Extensions ####
`Object.preventExtensions(..)` prevents new properties from being added to
an object without affecting existing ones:

```js
var myObject = {
  a: 2
};

Object.preventExtensions( myObject );

myObject.b = 3;
myObject.b; // undefined
```

In `strict mode` trying to add a new property in this case would throw a 
`TypeError`, while it would fail silently otherwise

#### Seal ####
`Object.seal(..)` does the same thing as `Object.preventExtensions(..)` but 
also marks existing properties as `configurable: false`.  Properties cannot
be added, nor can existing properties be reconfigured or deleted, but existing
properties may still have their values changed

#### Freeze ####
`Object.freeze(..)` does the same thing as `Object.seal(..)` but also makes all
existing properties as `writable: false` so values cannot be changed either.

This is the most immutability that can be achieved for objects, as the object
nor its direct properties (not references to other objects) can be changed

### [[Get]] ###
When a property access occurs, a `[[Get]]` operation is performed, first
looking at the object to see if it has such a property, and returning it if
found.  If after traversing the `[[Prototype]]` chain it cannot find a value
for the property, it returns `undefined`.

In contrast, variable lookups that cannot be resolved within lexical scoping
will instead thrown a `ReferenceError` instead of returning `undefined`

### [[Put]] ###
The behavior of `[[Put]]` depends on whether or not the property already exists
on an object.  If so:
1. If the property is an accessor descriptor, call the setter, if any
2. If the property is a data descriptor with `writable: false`, throw `TypeError` or silently fail depending on `strict mode`
3. Otherwise, set the value to the existing property as normal

### Getters & Setters ###
Defining a property to have either/both a getter/setter, its definition becomes
an 'accessor descriptor'.  `value` and `writable` characteristics then become
ignored.

```js
var myObject = {
  get a() {
    return 2;
  }
};

Object.defineProperty(
  myObject, //target
  "b",      //property name
  {
    //define getter for 'b'
    get: function() {return this.a * 2 },

    // make sure 'b' shows up as an object property
    enumerable: true
  }
);

myObject.a; // 2
myObject.b; // 4
```

If a getter is defined, but no setter, any attempt to set that property will
silently fail:

```js
var myObject = {
  get a() {
    return 2;
  }
};

myObject.a = 3; // attempt to set 'a' to 3
myObject.a;  // retains value of 2 because no setter exists, but getter does
```

Instead, a setter should also be defined:

```js
var myObject = {
  get a() {
    return this._a_;
  },

  set a(val) {
    this._a_ = val * 2;
  }
};

myObject.a = 2;
myObject.a; //4
```

### Existence ###

#### Enumeration ####

## Iteration ##

[Table of Contents](_toc.md)

[Next Chapter](ch4.md)

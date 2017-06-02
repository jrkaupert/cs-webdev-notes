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

### Computed Property Names ###

### Property vs. Method ###

### Arrays ###

### Duplicating Objects ###

### Property Descriptors ###

#### Writable ####

#### Configurable ####

#### Enumerable ####

### Immutability ###

#### Object Constant ####

#### Prevent Extensions ####

#### Seal ####

#### Freeze ####

### [[Get]] ###

### [[Put]] ###

### Getters & Setters ###

### Existence ###

#### Enumeration ####

## Iteration ##

[Table of Contents](_toc.md)

[Next Chapter](ch4.md)

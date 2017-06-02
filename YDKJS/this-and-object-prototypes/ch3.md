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

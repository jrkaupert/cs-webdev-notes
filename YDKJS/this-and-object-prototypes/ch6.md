[Table of Contents](_toc.md)

[Previous Chapter](ch6.md)

# Chapter 6: Behavior Delegation #
The previous chapter spent a lot of time explaining why `[[Prototype]]` is not really 'class' or 'inheritance'-like behavior.

This chapter looks at how the `[[Prototype]]` mechanism in JavaScript **should** be used.

The `[[Prototype]]` mechanism = an internal link that exists ON one object to REFERENCE another object.  When a property or method reference is made
on the first object and that property or method cannot be found, the `[[Prototype]]` linkage tells the engine to look for the property or method on the
linked object.  If it still cannot be found, the process continues until no more `[[Prototype]]` links exist.

## Towards Delegation-Oriented Design ##
Despite the `[[Prototype]]` design pattern being quite different than traditional OOP, some OOP principles such as encapsulation are still very
important.

### Class Theory ###
In traditional OOP, a general parent (base) class is defined, so shared behavior can be inherited for child classes that then add specialized elements.

When using the class design pattern, method overriding and polymorphism are encouraged.  General behavior will be abstracted out to the parent class
wherever possible and overriden on the child classes.

Copies of the child class will then be instantiated, where each instance will perform whatever tasks are required.  Only the instances will be typically
used after instantiation, not the class definitions themselves.

### Delegation Theory ###
With behavior delegation instead of classes, now an **object** will first be defined (not a class, not a `function`) that has specific behaviors and
utility methods that other objects will delegate to.  For each specific (previously child) object, an object will be defined for the more specialized
behavior.  The specialized objects will be linked to the utility object, so they can delegate to it when necessary.

```js
// Create a generic object with utility behaviors
var Task = {
  setID: function(ID) { this.id = ID; },
  outputID: function() { console.log( this.id ); }
};

// Create `XYZ` object that will delegate to Task
var XYZ = Object.create( Task );

XYZ.prepareTask = function(ID, Label) {
  this.setID( ID );
  this.label = Label;
};

XYZ.outputTaskDetails = function() {
  this.outputID();
  console.log( this.label );
}

// Create `ABC task that will delegate to Task
// var ABC = Object.create( Task );
// ...
```

In contrast to *Object-Oriented* design, this might be called **Objects-linked-to-other-object (OLOO)** design.  All we are concerned with is that one 
object delegates to another object.

Some differences in OLOO style of code:
1. State (data properties) should generally be on the delegators (ie: `XYZ` and `ABC`) not on the delegate (`Task`)
2. Things should not be named the same thing at different levels of the prototype chain to avoid shadowing and naming collisions
  - fewer general method names should be used
  - more descriptive names specific to each object's type of behavior should be used
3. Implicit `this` binding in combination with delegation allows methods to be delegated up the prototype chain while using expected `this` binding, as
in the `this.setID( ID );` call in the above example.

**Behavior Delegation** = let one object (`XYZ`) provide a delegation (to `Task`) for property/method references if not found on the object (`XYZ`)

Note: it's better to use delegation as an internal implementation detail rather than to expose it directly in the API design, since it can look like magic
to others using the API.

#### Mutual Delegation (Disallowed) ####

#### Debugged ####

### Mental Models Compared ###

## Classes vs. Objects ##

### Widget "Classes" ###

#### ES6 `class` sugar ####

### Delegating Widget Objects ###

## Simpler Design ##

### De-class-ified ###

## Nicer Syntax ##

### Unlexical ###

## Introspection ##

[Table of Contents](_toc.md)

[Next Chapter](appendixA.md)

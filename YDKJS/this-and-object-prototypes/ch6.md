[Table of Contents](_toc.md)

[Previous Chapter](ch6.md)

# Chapter 6: Behavior Delegation #
The previous chapter spent a lot of time explaining why `[[Prototype]]` is not really 'class' or 'inheritance'-like behavior.

This chapter looks at how the `[[Prototype]]` mechanism in JavaScript **should** be used.

The `[[Prototype]]` mechanism = an internal link that exists ON one object to REFERENCE another object.  When a property or method reference is made
on the first object and that property or method cannot be found, the `[[Prototype]]` linkage tells the engine to look for the property or method on the
linked object.  If it still cannot be found, the process continues until no more `[[Prototype]]` links exist.

## Towards Delegation-Oriented Design ##

### Class Theory ###

### Delegation Theory ###

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

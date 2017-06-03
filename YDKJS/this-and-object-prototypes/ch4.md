[Table of Contents](_toc.md)

[Previous Chapter](ch3.md)

# Chapter 4: Mixing (Up) "Class" Objects #
Most normal OOP concepts such as 'classes', 'instantiation', 'inheritance',
and '(relative) polymorphism' do not map well into JavaScript

## Class Theory ##
OOP -> data has behavior naturally operates on it, so the best way to design
is to put the data and the behavior together (encapsulation or "data 
structures")

Classes give us a way of *classifying* data structures so we can consider
certain structures as more specific versions of more generic ones

**polymorphism** = general behavior from a parent class can be overridden by
the child class to make it more specific, as well as more broadly letting
the parent's behavior serve as a starting point for the more specific.  Usually
shared methods between parents and children share the same method names, but
in JS this is a recipe for disaster!

### "Class" Design Pattern ###
Classes are really just one of several common design patterns, not necessarily
a fundamental foundation of coding.  In languages like Java, there's no choice,
it must be OOP.  Other languages allow other styles at the developer's 
discretion

### JavaScript "Classes" ###
JavaScript really doesn't have classes, even as of ES6 with the `class` 
keyword or with class-like elements (`new` and `instanceof`).

With lots of effort, you can implement classes as a design pattern in JS.  
Despite this, classes in JS are not the same as classes in other languages.

## Class Mechanics ##


### Building ###

### Constructor ###

## Class Inheritance ##

### Polymorphism ###

### Multiple Inheritance ###

## Mixins ##

### Explicit Mixins ###

#### "Polymorphism" Revisited ####

#### Mixing Copies ####

#### Parasitic Inheritance ####

### Implicit Mixins ###

[Table of Contents](_toc.md)

[Next Chapter](ch5.md)

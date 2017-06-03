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
In many OOP languages, while certain data structures exist as part of the
standard library, they must first be instantiated from the class before they
can be used to do anything.

### Building ###
The normal metaphor for classes and instances comes from building construction:
Architectural blueprints provide the plan for the building but AREN'T the 
building.  Blueprints = the class, the Building = the instantiation which
creates an instance of something that resembles the blueprint

Classes are instantiated into objects using a copy operation

### Constructor ###
Class instances are typically made using a special method of the class that
tends to share the class name, called a **constructor**.  This method creates
an instance of the object and gives it any needed information (state).

The constructor belongs to the class, and almost always shares that name. 
Usually constructors get called with `new` in whatever language to let the
engine know that we want to construct a new class instance

## Class Inheritance ##
In OOP, you can also define classes that inherit from other classes.  Child
classes are separate and distinct from parent classes, and can override any
behavior they inherit from parents.

### Polymorphism ###
Polymorphism is the idea that any method can reference other methods of the
same or different name of objects higher up the inheritance chain.  "Relative"
polymorphism implies we just look **up** the chain, and don't worry about 
specifying a specific class to reference the method from.

Many languages use the keyword `super` to designate that a method will look
up the inheritance chain for behavior.  In normal OOP languages, this lets the
constructor of a child class reference the constructor of its parent class.

In JS, parent-child relationships only exist between the .prototype objects of
the constructors, meaning the constructors are not directly related and there's
no easy way to reference one another (Though ES6 `class` provides something
here via `super`)

When classes are inherited, the classes can relatively reference the class
they inherit from, where this reference is usually called `super`.  Note that
any overridden behavior does not actually override the original method on the
parent, so both versions are accessible.  

Child classes are not linked to parent classes.  Instead, child classes get
copies of what they need from parent classes.

**Class inheritance implies copies**

### Multiple Inheritance ###
Some languages allow classes to inherit from more than one parent class, such
that each parent's definition gets copied to the child.

JavaScript does not provide multiple inheritance mechanisms, which in the end
makes things a bit simpler.  Despite this, many developers try to fake it.

## Mixins ##

### Explicit Mixins ###

#### "Polymorphism" Revisited ####

#### Mixing Copies ####

#### Parasitic Inheritance ####

### Implicit Mixins ###

[Table of Contents](_toc.md)

[Next Chapter](ch5.md)

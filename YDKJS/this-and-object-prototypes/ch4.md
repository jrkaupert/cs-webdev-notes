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
JavaScript does not automatically copy things when you "inherit" or 
"instantiate".  There are **no** classes in JavaScript to instantiate, only
objects.  Objects do not get copied to other objects, they get linked to them.

JS Developers try to fake the missing copy behaviors of classes through mixins.

### Explicit Mixins ###
Since JS does not automatically copy behavior between "parent" and "child" 
classes, developers will create methods to manually copy behavior, often
called `extend(..)` in many libraries or frameworks.

```js
function extend( sourceObj, targetObj ) {
  for (var key in sourceObj) {
    if (!(key in targetObj)) {
      targetObj[key] = sourceObj[key];
    }
  }
  return targetObj;
}

var Vehicle = {
  engines: 1,

  ignition: function() {
    console.log( "Turning on my engine" );
  },
  drive: function() {
    this.ignition();
    console.log( "Steering and moving forward!" );
  }
};

var Car = mixin( Vehicle, {
  wheels: 4,

  drive: function() {
    Vehicle.drive.call( this );
    console.log( "Rolling on all " + this.wheels + "wheels!" );
  }
});
```

Since we are not dealing with classes here, `Vehicle` and `Car` are just 
objects that we make copies to and from.  `Car` gets a copy of properties and
functions from `Vehicle` (these are actually just references).  Since `car` 
already had a `drive` property (function), it was not overriden.

#### "Polymorphism" Revisited ####
The statement above `Vehicle.drive.call( this )` is a sort of 
*explicit pseudo-polymorphism* because we have to explicitly specify the
`Vehicle` object by name before calling `drive()` on it.  Calling 
`Vehicle.drive()` would use the `this` binding for `Vehicle` instead of for 
`Car`, which is not wanted here, so `.call(this)` must be used.  Had the method
name been different between the two classes, no shadowing would have occurred
and it would not be necessary to explicitly use `.call(this)`.

In JavaScript, every function where explicit pseudo-polymorphism is used will
require such a manual or explicit linkage, increasing the cost of maintaining
the code.  Avoid at all costs.

#### Mixing Copies ####
Manual copying of functions (mixins) from one object to another do not actually
emulate a real duplication from class to instance that occurs in OOP languages

JavaScript functions can really only be duplicated via shared reference so that
if the shared function object is changed, any objects sharing the reference
get that change.

Despite seeming to be powerful, Explicit mixins are really not much benefit
compared to just defining object properties on each object separately.

#### Parasitic Inheritance ####
Doug Crockford popularized a particular explicit mixin pattern called 
"parasitic inheritance":

```js
// "Traditional JS Class" `Vehicle`
function Vehicle() {
	this.engines = 1;
}
Vehicle.prototype.ignition = function() {
	console.log( "Turning on my engine." );
};
Vehicle.prototype.drive = function() {
	this.ignition();
	console.log( "Steering and moving forward!" );
};

// "Parasitic Class" `Car`
function Car() {
	// first, `car` is a `Vehicle`
	var car = new Vehicle();

	// now, let's modify our `car` to specialize it
	car.wheels = 4;

	// save a privileged reference to `Vehicle::drive()`
	var vehDrive = car.drive;

	// override `Vehicle::drive()`
	car.drive = function() {
		vehDrive.call( this );
		console.log( "Rolling on all " + this.wheels + " wheels!" );
	};

	return car;
}

var myCar = new Car();

myCar.drive();
// Turning on my engine.
// Steering and moving forward!
// Rolling on all 4 wheels!
```

This makes a copy from the `Vehicle` "parent" class, mixes in the "child class"
behavior, then passes the new composed `car` as the child instance.

### Implicit Mixins ###
**Implicit** mixins are similar to 'explicit pseudo-polymorphism' and should
be treated with care...In this case, `this` rebinding is used to mix behavior
from one object into another:

```js
var Something = {
	cool: function() {
		this.greeting = "Hello World";
		this.count = this.count ? this.count + 1 : 1;
	}
};

Something.cool();
Something.greeting; // "Hello World"
Something.count; // 1

var Another = {
	cool: function() {
		// implicit mixin of `Something` to `Another`
		Something.cool.call( this );
	}
};

Another.cool();
Another.greeting; // "Hello World"
Another.count; // 1 (not shared state with `Something`)
```

[Table of Contents](_toc.md)

[Next Chapter](ch5.md)

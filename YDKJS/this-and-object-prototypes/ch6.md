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
It is not possible to have objects delegate to one another mutually (ie: B to A and A to B)

### Mental Models Compared ###
A "prototypal" OO style example:

```js
function Foo(who) {
  this.me = who;
}
Foo.prototype.identify = function() {
  return "I am " + this.me;
};

function Bar(who) {
  Foo.call( this, who );
}
Bar.prototype = Object.create( Foo.prototype );

Bar.prototype.speak = function() {
  alert("Hello, " + this.identify() + ".");
};

var b1 = new Bar( "b1" );
var b2 = new Bar( "b2" );

b1.speak();
b2.speak();
```

Here, a parent `Foo` class is created, which is inherited by `Bar`, which then has two instances `b1`, and `b2` instantiated.  The `b1` object delegates
to `Bar.prototype`, which delegates to `Foo.prototype`.

Same example, using OLOO style code:

```js
var Foo = {
  init: function(who) {
    this.me = who;
  },
  identify: function() {
    return "I am " + this.me;
  }
};

// link to Foo
var Bar = Object.create( Foo );

Bar.speak = function() {
  alert( "Hello, " + this.identify() + ".");
};

var b1 = Object.create( Bar );
b1.init( "b1" );
var b2 = Object.create( Bar );
b2.init( "b2" );

b1.speak();
b2.speak();
```

In this version, the same prototype delegation from `b1` to `Bar` to `Foo` is used.  There are no things that look like classes, constructors, use of 
`prototype`, or `new` calls.  OLOO code is simpler because it only cares that objects get linked to other objects.  Classes, constructors, prototype, and
`new` calls are a lot of extra stuff to force the OOP design pattern onto JS code.

## Classes vs. Objects ##
Some more concrete examples - creating widgets.  JQuery will be used for some of the DOM manipulation in all examples but isn't the real point here.

### Widget "Classes" ###
Parent class: `Widget`, Child class: `Button`

```js
// Parent Class
function Widget(width, height) {
  this.width = width || 50;
  this.height = height || 50;
  this.$elem = null;
}

Widget.prototype.render = function($where) {
  if (this.$elem) {
    this.$elem.css( {
      width: this.width + "px",
      height: this.height + "px"
    } ).appendTo( $where );
  }
};

// Child Class
function Button(width, height, label) {
  // "super" constructor call
  Widget.call( this, width, height );
  this.label = label || "Default";

  this.$elem = $( "<button>" ).text( this.label );
}

// make `Button` "inherit" from `Widget`
Button.prototype = Object.create( Widget.prototype );

// override base "inherited" `render(..)`
Button.prototype.render = function($where) {
  // "super" call
  Widget.prototype.render.call( this, $where );
  this.$elem.click( this.onClick.bind( this ) );
};

Button.prototype.onClick = function(evt) {
  console.log( "Button '" + this.label + "' clicked!" );
}

$( document ).ready( function(){
  var $body = $( document.body );
  var btn1 = new Button( 125, 30, "Hello" );
  var btn2 = new Button( 150, 40, "World" );

  btn1.render( $body );
  btn2.render( $body );
});
```

Here, using OO design patterns, we declare a base `render(..)` in `Widget`, then override it in the child class, not replacing it, but instead adding to
it with button-specific functionality

#### ES6 `class` sugar ####
The same example using ES6 `class` syntactical sugar:

```js
class Widget {
  constructor(width, height) {
    this.width = width || 50;
    this.height = height || 50;
    this.$elem = null;
  }
  render($where) {
    if (this.$elem) {
      this.$elem.css( {
        width: this.width + "px",
        height: this.height + "px"
      }).appendTo( $where );
    }
  }
}

class Button extends Widget {
  constructor(width, height, label) {
    super( width, height);
    this.label = label || "Default";
    this.$elem = $( "<button>" ).text( this.label );
  }
  render($where) {
    super.render( $where );
    this.$elem.click( this.onClick.bind( this ) );
  }
  onClick(evt) {
    console.log( "Button '" + this.label + "' clicked!" );
  }
}

$( document ).ready( function(){
  var $body = $( document.body );
  var btn1 = new Button( 125, 30, "Hello" );
  var btn2 = new Button( 150, 40, "World" );

  btn1.render( $body );
  btn2.render( $body );
});
```

Here, the `class` syntax makes a few things cleaner, however this really still uses JS prototypes and not real classes.

### Delegating Widget Objects ###
Finally, the same example using delegation (OLOO style):

```js
var Widget = {
  init: function(width, height) {
    this.width = width || 50;
    this.height = height || 50;
    this.$elem = null;
  },
  insert: function($where) {
    if (this.$elem) {
      this.$elem.css( {
        width: this.width + "px",
        height: this.height + "px"
      }).appendTo( $where );
    }
  }
};

var Button = Object.create( Widget );

Button.setup = function(width, height, label) {
  // delegated call
  this.init( width, height );
  this.label = label || "Default";

  this.$elem = $( "<button" ).text( this.label );
};

Button.build = function($where) {
  //delegated call
  this.insert( $where );
  this.$elem.click( this.onClick.bind( this ) );
};

Button.onClick = function(evt) {
  console.log( "Button '" + this.label + "' clicked!" );
};

$( document ).ready( function(){
  var $body = $( document.body );
  var btn1 = Object.create( Button );
  btn1.setup( 125, 30, "Hello" );
  
  var btn2 = Object.create( Button );
  btn2.setup( 150, 40, "World" );

  btn1.build( $body );
  btn2.build( $body );
});
```

In this approach, `Widget` is no longer the "parent" to `Button`.  Instead, it's just an object with utility methods that any widget might want to 
delegate to.  `Button` is just an object, linked to `Widget`.

Different names were used for methods (`insert(..)` and `build(..)`, for example), which allowed them to be more descriptive.  Additionally, ugly 
explicity pseudo-polymorphic calls (`Widget.call` and `Widget.prototype.render.call`) were avoided by instead using simple `this.init(..)` and 
`this.insert(..)` calls.

No constructors, `.prototype`, or `new` were used.  There was an additional call made, however, as now creating a button involves two steps, but this
allows creation and initialization to occur at separate points in time, which may be beneficial in certain circumstances.

## Simpler Design ##
While OLOO can simplify code, it can also simplify architecture.

An example of two controller objects, one that handles web login form, and another to handle server authentication:

```js
// Parent Class
function Controller() {
  this.errors = [];
}
Controller.prototype.showDialog = function(title, msg) {
  // display title & message to user in dialog
};
Controller.prototype.success = function(msg) {
  this.showDialog( "Success", msg );
};
Controller.prototype.failure = function(err) {
  this.errors.push( err );
  this.showDialog( "Error", err );
}
```

```js
// Child Class
function LoginController() {
  Controller.call( this );
}

// Link child class to parent
LoginController.prototype = Object.create( Controller.prototype );
LoginController.prototype.getUser = function() {
  return document.getElementById( "login_username" ).value;
};
LoginController.prototype.getPassword = function() {
  return document.getElementById( "login_password" ).value;
};
LoginController.prototype.validateEntry = function(user, pw) {
  user = user || this.getUser();
  pw = pw || this.getPassword();

  if (!(user && pw)) {
    return this.failure( "Please enter a username & password!" );
  }
  else if (pw.length < 5) {
    return this.failure( "Password must be 5+ characters!" );
  }

  // validated user
  return true;
};
// Override to extend base `failure()`
LoginController.prototype.failure = function(err) {
  // "super" call
  Controller.prototype.failure.call( this, "Login invalid: " + err );
};
```

```js
// Child class
function AuthController(login) {
  Controller.call(this);
  // in addition to inheritance, we need composition
  this.login = login;
}
// link child class to parent
AuthController.prototype = Object.create( Controller.prototype );
AuthController.prototype.server = function(url, data) {
  return $.ajax( {
    url: url,
    data: data
  });
};
AuthController.prototype.checkAuth = function() {
  var user = this.login.getUser();
  var pw = this.login.getPassword();

  if (this.login.validateEntry( user, pw)) {
    this.server( "/check-auth", {
      user: user,
      pw: pw
    })
    .then( this.success.bind( this ))
    .fail( this.failure.bind( this ));
  }
};
// Override to extend base `success()`
AuthController.prototype.success = function() {
  // "super" call
  Controller.prototype.success.call( this, "Authenticated!" );
};

// Override to extend base `failure()`
AuthController.prototype.failure = function(err) {
  // "super" call
  Controller.prototype.failure.call( this, "Auth failed: " + err);
};
```

```js
var auth = new AuthController(
  // in addition to inheritance, need composition
  new LoginController()
);
auth.checkAuth();
```

The `success(..)`, `failure(..)`, and `showDialog(..)` behaviors are shared by all controllers here.  The child classes then override `success` and 
`failure` to add to base class behavior.

### De-class-ified ###
OLOO design can greatly simplify the architecture, however:

```js
var LoginController = {
  errors: [],
  getUser: function() {
    return document.getElementById( "login_username" ).value;
  },
  getPassword: function() {
    return document.getElementById( "login_password" ).value;
  },
  validateEntry: function(user, pw) {
    user = user || this.getUser();
    pw = pw || this.getPassword();

    if (!(user && pw)) {
      return this.failure( "Please enter a username & password!" );
    }
    else if (pw.length < 5 ) {
      return this.failure( "Password must be 5+ characters!" );
    }

    //validated
    return true;
  },
  showDialog: function(title, msg) {
    // display success message to user in dialog
  },
  failure: function(err) {
    this.errors.push( err );
    this.showDialog( "Error", "Login invalid: " + err) ;
  }
};
```

```js
// Link `AuthController` to delegate to `LoginController`
var AuthController = Object.create( LoginController );

AuthController.errors = [];
AuthController.checkAuth = function() {
  var user = this.getUser();
  var pw = this.getPassword();

  if (this.validateEntry(user, pw)) {
    this.server( "/check-auth", {
      user: user,
      pw: pw
    })
    .then( this.accepted.bind( this ) )
    .fail( this.accepted.bind( this ) );
  }
};
AuthController.server = function(url, data) {
  return $.ajax( {
    url: url,
    data: data
  });
};
AuthController.accepted = function() {
  this.showDialog( "Success", "Authenticated!" );
};
AuthController.rejected = function(err) {
  this.failure( "Auth Failed: " + err );
};
```

```js
AuthController.checkAuth();
```

With delegation, `AuthController` and `LoginController` are just objects, horizontal peers of one another.  We could have reversed the direction of 
delegation if desired.  Now we only have two entities, instead of three as before (the parent class).  There is no need to instantiate classes, nor
need for composition, because of the power of delegation.

## Nicer Syntax ##

### Unlexical ###

## Introspection ##

[Table of Contents](_toc.md)

[Next Chapter](appendixA.md)

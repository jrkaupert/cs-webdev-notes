[Table of Contents](_toc.md)

[Previous Chapter](ch2.md)

# Chapter 3: Organizing objects with classes #
While objects can be created with `Object.new` and provided methods one at a
time, Ruby offers classes as a way of bundling behaviors so many similar objects
can be created easily.

Every object is an instance of a class, and classes are a way of organizing
objects and methods

## 3.1 Classes and Instances ##
Classes are made up of method definitions and exist to create objects
(**instantiate**) that are instances of that class.

Instantiation example:
```ruby
obj = Object.new
```

The `new` method is a **constructor**, a method used to create a new instance
of the class.  Classes respond to messages like any other object.

Classes are defined with the `class` keyword, and are named with **constants**,
an identifier that **starts with a capital letter**.  Constants don't change
during program execution.

Defining and instantiating a new class:
```ruby
# define the class
class Ticket
  def event
    "can't really be specified yet..."
  end
end

# Create the new object
ticket = Ticket.new

# call the `event` method
puts ticket.event # can't really be specified yet.
```

### 3.1.1 Instance Methods ###
In contrast to defining methods directly on objects, methods can also be defined
in classes to share them with all objects of that class's type.

Such methods are called **instance methods** because they belong to any instance
of the class.

Methods defined for a single object (as opposed to all instances) are called
**singleton methods**

### 3.1.2 Overriding methods ###
Instance methods defined in a class can also be overriden if redefined later.
The newest version takes precedence.

### 3.1.3 Reopening classes ###
It is also possible to **reopen** a class definition and add new methods later:
```ruby
class C
  def x
  end
end

# reopen the class
class C
  def y
  end
end
```

The above code is equivalent to the following:
```ruby
class C
  def x
  end
  def y
  end
end
```

The ability to reopen class definitions allows class definitions to be spread
across multiple files, but generally it's better to not do so to make it easier
to follow what's going on in the program.

## 3.2 Instance variables and object state ##

### 3.2.1 Initializing an object with state ###

## 3.3 Setter methods ##

### 3.3.1 The equal sign (=) in method names ###

### 3.3.2 Syntactic sugar for assignment-like methods ###

### 3.3.3 Setter methods unleashed ###

## 3.4 Attributes and the attr_* method family ##

### 3.4.1 Automating the creation of attributes ###

### 3.4.2 Summary of attr_* methods ###

## 3.5 Inheritance and the Ruby class hierarchy ##

### 3.5.1 Single inheritance: One to a customer ###

### 3.5.2 Object ancestry and the not-so-missing link: The Object class ###

### 3.5.3 El Viejo's older brother: BasicObject ###

## 3.6 Classes as objects and message receivers ##

### 3.6.1 Creating class objects ###

### 3.6.2 How class objects call methods ###

### 3.6.3 A singleton method by any other name... ###

### 3.6.4 When, and why, to write a class method ###

### 3.6.5 Class methods vs. instance methods ###

## 3.7 Constants up close ##

### 3.7.1 Basic use of constants ###

### 3.7.2 Reassigning vs. modifying constants ###

## 3.8 Nature vs. nurture in Ruby objects ##

[Table of Contents](_toc.md)

[Next Chapter](ch4.md)

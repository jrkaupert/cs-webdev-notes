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
**instance variables** allow objects to save state for later retrieval

Different from other variables, instance variables:
- have names that start with a single `@` sign
- are only visible to the object they belong to
- can be used by any method defined within the object's class if initalized in
one of that class's methods (see example below)

```ruby
class Person
  def set_name(string)
    puts "Setting person's name..."
    @name = string
  end

  def get_name
    puts "Returning the person's name..."
    @name
  end
end

joe = Person.new
joe.set_name("Joe")
puts joe.get_name  # `get_name` is able to access @name defined in `set_name`
```

### 3.2.1 Initializing an object with state ###
When defining a class, a special method called `initialize` may be used that
will be called every time a new instance of that class is created

`initialize` can be used to set object state when the object is created:

```ruby
class Ticket
  def initialize(venue, date)
    @venue = venue
    @date = date
  end

  def venue #getter method for @venue
    @venue
  end
  def date #getter method for @venue
    @date
  end
end
```

From the above example, the Ticket object is initialized with both a 'venue'
and a 'date', and these values can be read from the object from the two getter
methods defined after `initialize`, providing the value of these instance
variables.  Since the variable in the getter methods are the last value in the
method, they are also the method's return value.

## 3.3 Setter methods ##
Instance variables can also be set outside of the `initialize` method of a class

Ruby offers a naming convention for setters so that 'set_' does not have to be
appended to all setter methods

### 3.3.1 The equal sign (=) in method names ###
Rather than using 'set_' method names everywhere, methods can be named to end
with `=` instead to indicate they are setters:

```ruby
def price=(amount)
  @price = amount
end
```

### 3.3.2 Syntactic sugar for assignment-like methods ###
Ruby offers another way to call methods that end in `=` as well to make things
read easier:

```ruby
# original way to set price
ticket.price=(63.00)

# alternative way
ticket.price = 63.00
```

The alternate (sugared) syntax above makes the set operation look like
assignment (which it is).

### 3.3.3 Setter methods unleashed ###
While the `=` syntactic sugar option allows for clear setter methods, it can
also be abused.  Ruby does check syntax, but does not enforce semantic meaning,
so care should be taken to use `=` for methods that make sense.

This syntax can also be used to filter data as well, however:

```ruby
class Ticket
  def price=(amount)
    if (amount * 100).to_i == amount * 100
      @price = amount
    else
      puts "The price seems to be malformed"
    end
  end
  def price
    @price
  end
end
```

In the code above, price is checked to be in dollars and cents, where any digits
beyond the hundredths place will be caught

This syntax can also be used to normalize data:

```ruby
class TravelAgentSession
  def year=(y)
    @year = y.to_i
    if @year < 100
      @year = @year + 2000
    end
  end
end

# assume `date` is defined
month, day, year = date.split('/')
self.year = year
```

Note that setter methods behave like assignment statements with regard to their
return value, returning the assigned value and not the last expression evaluated
in the method.

## 3.4 Attributes and the attr_* method family ##
**Attributes** are object properties that can be read or written via the object

Setters are **attribute writer** methods, getters are **attribute reader**
methods.  Read/Write is more common terminology in Ruby compared to Get/Set.

Ruby offers shortcuts for writing attribute-related methods

### 3.4.1 Automating the creation of attributes ###
Previous code for the Ticket class example:
```ruby
class Ticket
  def initialize(venue, date)
    @venue = venue
    @date = date
  end
  def price=(price)
    @price = price
  end
  def venue
    @venue
  end
  def date
    @date
  end
  def price
    @price
  end
```

The above code has a lot of repetition in defining methods to read values from
instance variables.  A cleaner way using a Ruby shortcut is:

```ruby
class Ticket
  attr_reader :venue, :date, :price
  attr_writer :price
  def initialize(venue, date)
    @venue = venue
    @date = date
  end
end
```

This new code is much shorter and more informative.  It is easy to see that
there are `venue`, `date`, and `price` attributes for the ticket object, and
that each can be read, while only `price` can be written.

Identifiers starting with `:` are called **symbols**, and are similar but a
little different than strings (See [Chapter 8](ch8.md)).

In the `attr_reader` call, no left-hand object or dot is present, so messages
go to `self`, meaning the `Ticket` class object receives the messages. `self`
is described in [Chapter 5](ch5.md).

An additional shortcut for attributes that can be both read and written is
the `attr_accessor` method:

```ruby
class Ticket
  attr_reader :venue, :date
  attr_accessor :price
  def initialize(venue, date)
    @venue = venue
    @date = date
  end
end
```

Alternatively, `attr` can be used to do the same thing as `attr_accessor`:
```ruby
attr :price, true
```

With `true`, `attr` includes both read/write, without `true`, `attr` provides
only read.  `attr_accessor` is clearer in its intent, however.

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

[Table of Contents](_toc.md)

[Previous Chapter](ch3.md)

---

# Chapter 4: Modules and program organization #
Similar to classes, modules allow modular design.

Like classes, modules are sets of methods and constants, but unlike classes
modules do not have instances.  Instead, functionality from modules is added
to classes or objects.

The `Class` class is a subclass of the `Module` class, so classes are really
just a specialized version of modules.

## 4.1 Basics of module creation and use ##
Modules are created using the `module` keyword:

```ruby
module MyFirstModule
  def say_hello
    puts "Hello"
  end
end
```

Instead of being instantiated, modules get **mixed in** to classes using either
the `include` or `prepend` methods.  This is often referred to as a 'mix-in'.

When a module is mixed into a class instance, those instances have access to the
instance methods in the module:

```ruby
class ModuleTester
  include MyFirstModule
end
mt = ModuleTester.new
mt.say_hello
```

Mixing in modules is very similar to inheriting from a superclass. The main
difference is that more than one module can be mixed in, where only a single
class can be (directly) inherited from.

Modules allow code to be shared among multiple classes without inheritance.

### 4.1.1 A module encapsulating "stacklikeness" ###
A **stack** operates on last in, first out (LIFO) basis.  A **queue** operates
on a first in, first out (FIFO) basis.

A module could be useful in describing "stacklike" behaviors:

```ruby
# stacklike.rb
module stacklike
  def stack
    @stack ||= [] # or-equals operator sets iff variable not already set
  end

  def add_to_stack(obj)
    stack.push(obj)
  end

  def take_from_stack
    stack.pop
  end
end
```

In the above module, an **array** is used to represent the stack.  An instance
variable `@stack` is used to preserve the array and provided through the `stack`
method.  

The variable is set using or-equals `||=` to set to the empty array
only if the variable is not already set to something (other than `nil` or
`false`).  The first time the code is executed, `@stack` will be set to `[]`,
otherwise the value will merely be returned.

Adding an object to the stack pushes the object onto the `@stack` array (putting
it at the end).  Removing an object pops the object from the array (removing
it from the end)

Arrays can do more than stacks, so this module selectively implements certain
array behaviors (push and pop) to achieve 'stacklikeness'

### 4.1.2 Mixing a module into a class ###
We can't use `s = Stacklike.new` because modules don't have instances.  Instead
we can mix `Stacklike` into a class.

```ruby
# stack.rb
require_relative "stacklike"
class Stack
  include Stacklike # mixes Stacklike into the Stack class
end
```

Note that `include` does not use quotation marks (nor would `prepend`), unlike
`require` and `load`.  This is because `include` and `prepend` take constants
as their arguments where `require` and `load` use strings.

While not mandatory, it is common that class names are nouns ('Stack'), where
module names are adjectives ('Stacklike').  This leads to **Stack objects are
stacklike**, or in code:

```ruby
class Stack
  include Stacklike
end
```

An alternative, class-based approach to the same approach would be:

```ruby
class Stack
  attr_reader :stack
  def initialize
    @stack = [] # constructor method, so we don't need ||=
  end
  def add_to_stack(obj)
    @stack.push(obj)
  end
  def take_from_stack
    @stack.pop
  end
end
```

This approach achieves the same goal as the current module definition of
a stacklike object that's mixed in to stack, but stacklikeness could apply
to other things too...

### 4.1.3 Using the module further ###
Another example using our Stacklikeness module:
- A Suitcase class
- A CargoHold class with `load_and_report` and `unload` methods

```ruby
# cargohold.rb
require_relative "stacklike"
class Suitcase
end

class CargoHold
  include Stacklike
  def load_and_report(obj)
    print "Loading object "
    puts obj.object_id

    add_to_stack(obj)
  end
  def unload
    take_from_stack
  end
end
```

This new code isn't that different than the previous, mixing in Stacklike to
a class, but using a module to mix in the functionality means CargoHold and
Stack don't have to both inherit from the same superclass (since they seem
like very different objects)

## 4.2 Modules, classes, and method lookup ##

### 4.2.1 Illustrating the basics of method lookup ###
When looking up methods, an object will undergo the following process until
the method being searched for is found or an error condition occurs:

- Does my class define an instance method with this name?
- If no, does my class mix in any modules that contain this name?
- If no, does my superclass define an instance method with this name?
- If no, does my superclass mix in any modules that contain this name?

The error condition gets triggered by the `method_missing` method, which gets
called when messages are otherwise not matched.  The overall search process
can continue all the way up the inheritance chain to the `BasicObject` class.

In reality, much of the common behavior of all Ruby objects is mixed into the
`Object` class via the `Kernel` module.  

The most basic and fundamental Ruby methods are defined in the `Kernel` module.

The definitions of `BasicObject`, `Object`, and `Kernel` are written in C.

### 4.2.2 Defining the same method more than once ###
As with classes, if a method is redefined in a module, the latest takes
precedence over the earlier definition.

From an object's perspective, however, having access to two or more methods
with the same name is possible since they can come from a variety of classes
and modules.

An object can only see one version of a method with a given name at a given
time.  If the method-lookup path includes multiples, the first encountered is
the one used.

If multiple modules are mixed in with the same method names, the modules are
searched in reverse order of inclusion (most recent module first).  Reincluding
a module does not do anything, so a second include of a module will not be
prioritized.

### 4.2.3 How prepend works ###
With the `prepend` method, a prepended module is searched before the class is
when trying to resolve messages to method names.

```ruby
module MeFirst
  def report
    puts "Hello from module!"
  end
end

class Person
  prepend MeFirst
  def report
    puts "Hello from class!"
  end
end

p = Person.new
p.report # "Hello from module!"
```

As opposed to `include`, `prepend` forces the module to be searched before the
class.  This can be used to override a class's methods with a module's

### 4.2.4 The rules of method lookup summarized ###
Objects look for methods when resolving messages in the following order

1. Modules prepended to the class, in reverse order of prepending
2. The object's class
3. Modules mixed into the class, in reverse order of inclusion
4. Modules prepended to the superclass
5. The object's superclass
6. Modules included in the superclass
7. Up the inheritance chain until `Object`, the `Kernel` mix-in, and
`BasicObject`

### 4.2.5 Going up the method seach path with super ###
The `super` keyword can be used to jump up the method-lookup path for the
method being executed:

```ruby
module M
  def report
    puts "'report' method in module M"
  end
end
class C
  include M
  def report
    puts "'report' method in class C"
    puts "About to trigger the next higher-up report method..."
    super
    puts "back from the 'super' call."
  end
end
c = C.new
c.report

# 'report' method in class C
# About to trigger the next higher-up report method...
# 'report' method in module M
# Back from the 'super' call.
```

Sometimes when writing a subclass, `super` makes it convenient to keep most, but
not all of the behavior:

```ruby
class Bicycle
  atrr_reader :gears, :wheels, :seats
  def initialize(gears = 1)
    @wheels = 2
    @seats = 1
    @gears = gears
  end
end

class Tandem < Bicycle
  def initialize(gears)
    super
    @seats = 2
  end
end
```

The `super` keyword provides a clean way to make a subclass look almost like its
parent class.  All of the previous methods in `initialize` in the above code are
called in Tandem's `initialize`, and then `@seats` is set differently.

`super` can also be called with arguments and pass those to the higher-up method
- called with no arguments, `super` uses the arguments that were passed into
the method `super` was called in
- called with an empty argument list, `super()` sends no arguments to the
higher-up method even if the method `super()` resides in had arguments
- called with specific arguments, `super(a, b, c)` passes arguments to the
higher-up method as-is

## 4.3 The method_missing method ##
The `Kernel` module has a `method_missing` instance method that fires anytime
an object receives a message it doesn't know how to respond to.

The `method_missing` method can be overriden on a singleton basis or for the
object's class or superclasses.

When overriden, the `method_missing` method signature needs to be adhered to,
with the first argument being the name of the missing method, and the second
argument being the \*args sponge parameter for any remaining arguments.

Even when overriden, the original `method_missing` method is available using
`super`

### 4.3.1 Combining method_missing and super ###
One way to handle unrecognized messages using `method_missing` override is as
follows:
```ruby
class Student
  def method_missing(m, *args)
    if m.to_s.start_with?("grade_for_")
      # return the appropriate grade, based on parsing the method name
    else
      super
    end
  end
end
```

In the above code, a call to any method beginning with `grade_for_` will return
the appropriate grade.  Otherwise, the lookup will continue to `super` where
the `method_missing` will be located if overriden, or eventually at `Kernel` if
not.

## 4.4 Class/module design and naming ##
There are no definite rules that determine when code definition should be put
into modules versus classes.  It is possible to overmodularize, however.

### 4.4.1 Mix-ins and/or inheritance ###
Mix-ins from modules are similar to class inheritance.  Both provide a
relationship from one object to another by inserting something into the
method-lookup path.

No single rule will result in the best design, but using class inheritance
does use up an opportunity for a better class option to inherit from.

Some considerations:
- Modules don't have instances.  Noun-like things and their characteristics and
properties may be best handled in classes, where adjective-like-things may be
best handled in modules
- Classes may only have a single superclass, but as many modules can be mixed
in as needed.

### 4.4.2 Nesting modules and classes ###
Class definitions can also be nested inside of modules:

```ruby
module Tools
  class Hammer
  end
end

h = Tools::Hammer.new # instantiates a new Hammer object via constant lookup
```

Nested modules/classes are often used to create namespaces for classes, modules,
and methods.


---
[Table of Contents](_toc.md)

[Next Chapter](ch5.md)

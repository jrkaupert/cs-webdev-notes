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

### 4.2.2 Defining the same method more than once ###

### 4.2.3 How prepend works ###

### 4.2.4 The rules of method lookup summarized ###

### 4.2.5 Going up the method seach path with super ###

## 4.3 The method_missing method ##

### 4.3.1 Combining method_missing and super ###

## 4.4 Class/module design and naming ##

### 4.4.1 Mix-ins and/or inheritance ###

### 4.4.2 Nesting modules and classes ###

---
[Table of Contents](_toc.md)

[Next Chapter](ch5.md)

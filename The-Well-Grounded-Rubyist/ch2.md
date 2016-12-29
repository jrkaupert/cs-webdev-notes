# Chapter 2: Objects, methods, and local variables #
Objects receive messages which usually correspond to names of methods
the objects are being asked to execute.  Objects are usually represented
by variables.

## 2.1 Talking to objects ##
Writing Ruby programs is largely about creating objects that play distinct
roles and perform actions related to that role

### 2.1.1 Ruby and object orientation ###
Every object is an instance of a class, and behavior of objects is
determined by method of the object's class

### 2.1.2 Creating a generic object ###
In Ruby, the class concept fits on top of objects and not the other way
around.  Objects in Ruby can "learn" methods that weren't given by its
class

A generic new object can be created using `obj = Object.new`

To ask an object to do something, we send messages, and if the object
has the appropriate method corresponding to the message, it responds
by performing that behavior.  If a method with that name is not found,
error-handling occurs

### 2.1.3 Methods that take arguments ###
Variables listed in a method's definition are its *formal parameters*

Values supplied to the method when calling the method are known as
*arguments*

### 2.1.4 The return value of a method ###
Ruby is made up of expressions that evaluate to particular values.
Method calls are also expressions and evaluate to values as well (the
method's *return value*)

The return value for a method is the same as the last expression evaluated
in that method.  The `return` keyword makes return values explicit, but
is usually optional.  The `return` keyword must be used to return Multiple
values or return in the middle of a method.

## 2.2 Crafting an object: The behavior of a ticket ##

### 2.2.1 The ticket object, behavior first ###
Ticket example:

```ruby
ticket = Object.new

def ticket.date
  "01/02/03"
end

def ticket.venue
  "Town Hall"
end

def ticket.event
  "Author's reading"
end

def ticket.performer
  "Mark Twain"
end

def ticket.seat
  "Second Balcony, row J, seat 12"
end

def ticket.price
  5.50
end
```

In this example, most of the methods return string values, other than
`price` which returns a floating point number.

### 2.2.2 Querying the ticket object ###
Information about the ticket can be printed using `print` or `puts`
and by calling `ticket.seat` or the desired ticket method.  The return
values of each method are embedded in the printed message:

```ruby
print "This ticket is for: "
print ticket.event + ", at "
print ticket.venue + ", on "
puts ticket.date + "."
print "The performer is "
puts ticket.performer + "."
print "The seat is "
print ticket.seat + ", "
print "and it costs $"
puts "%.2f." % ticket.price
```

The ability for the program to useful stuff resides in the object. In
Ruby it's all about asking objects to do things and tell us things.

### 2.2.3 Shortening the ticket code via string interpolation ###
*String interpolation* provides a mechanism for easily putting anything
into strings.  The above example can be rewritten as:

```ruby
puts "This ticket is for: #{ticket.event}, at #{ticket.venue}." +
  "The performer is #{ticket.performer}." +
  "The seat is #{ticket.seat}, " +
  "and it costs $#{"%.2f." % ticket.price}"
```
Everything in the `#{..}` gets calculated separately and then inserted
into the string.

### 2.2.4 Ticket availability: Expressing Boolean state in a method ###
`true` and `false` are special objects in Ruby that represent results of
comparison operations

Ruby methods may end in a `?` to indicate they evaluate to `true` or `false`

All Ruby objects except `false` and `nil` evaluate to `true` in a Boolean
context

## 2.3 The innate behaviors of an object ##
Every object is created with an initial set of methods which can be viewed with
the `methods` method (use `sort` to make it easier to search) `p Object.new.methods.sort`

### 2.3.1 Identifying objects uniquely with the object_id method ###
Every object in Ruby has a unique ID value that can be accessed using
`object_id`

The following code produces two variables that both point to the same object:
```ruby
a = Object.new
b = a
```

The following code produces 2 objects that appear to be the same but aren't:
```ruby
string_1 = "Hello"
string_2 = "Hello"
```

Object ID is just one way to compare equality of objects.

### 2.3.2  Querying an object's abilities with the respond_to? method ###
Ruby objects respond to messages.  Depending on whether or not a method has
been defined for an object, the object will or will not respond.

The `respond_to?` method can be used to determine in advance if an object can
handle the message you want to send

```ruby
obj = Object.new
if obj.respond_to?("talk")
  obj.talk
else
  puts "Sorry, the object doesn't understand the 'talk' message"
end
```

`respond_to?` is an example of **introspection** or **reflection**, terms that
refer to looking at the state of a program during execution, similar to using
the `methods` method described earlier

### 2.3.3 Sending messages to objects with the send method ###
The `send` method can be used to send messages to objects when the message
is not known in advance:

```ruby
if ticket.respond_to?(request)
  puts ticket.send(request)
else
  puts "No such information available"
end
```

The methods `__send__` and `public_send` can be used instead of `send` as a
safer alternative since `send` is often used by libraries and can cause
collisions

Usually the dot operator will be used to send messages to objects, but the
`send` command is powerful and may warrant use (but make sure to use it safely,
likely with `respond_to?` - don't want to just send arbitrary messages to
objects)

## 2.4 A close look at method arguments ##
- Methods can take zero or more arguments
- Methods may take variable number of arguments

### 2.4.1 Required and optional arguments ###
Ruby will indicate there's a problem if you don't supply the correct number
of arguments to a method (throws `ArgumentError`)

Any number of arguments may be provided to a method that has an asterisk
in front of one of its arguments:

```ruby
def two_or_more(a, b, *c)
  puts "I require two or more arguments!"
  puts "And sure enough, I got: "
  p a, b, c
```

In the above example, `a` and `b` are required, but `*c` will collect any other
arguments that are sent and put them into an array in the variable `c`

Using `p` to print rather than `puts` or `print` will display `c` as an array
rather than each element alone

Arguments may be made optional by giving them default values

### 2.4.2 Default values for arguments ###
When an argument with a default value is not supplied to the method, the method
uses the default value instead:

```ruby
def default_args(a, b, c=1)
  puts "Values of variables: ", a, b, c
end

default_args(3, 2)

# Values of variables:
# 3
# 2
# 1
```

If a value is supplied to a parameter with a default, that value is used instead

### 2.4.3 Order of parameters and arguments ###
When multiple values are provided to a method with a starred parameter, the
method will try to assign values to as many variables as possible.  If the
method runs out, it will assign to the starred parameter last after all required
parameters have been assigned, even if they come after the starred parameter in
the definition:

```ruby
def mixed_args(a, b, *c, d)
  puts "Arguments:"
  p a, b, c, d
end
mixed_args(1, 2, 3, 4, 5)
# Arguments:
# 1
# 2
# [3, 4]
# 5

mixed_args(1, 2, 3)
# Arguments:
# 1
# 2
# []
# 3
```

### 2.4.4 What you can't do in argument lists ###
Parameters are handled via a priority list:
1. Required parameters are highest regardless of whether they occur at the left
or right of the list of parameters
2. Optional parameters have to occur in the middle
3. You can't put default-valued arguments after a sponge (starred) parameter
4. You can't have more than one sponge parameter in a list of arguments

## 2.5 Local variables and variable assignment ##
By convention, local variables start with a lowercase letter or underscore
and are made of alphanumerics and underscores

Local variables have a limited scope such as a method definition.  Local
variable names can be reused in different scopes as a result

### 2.5.1 Variables, objects, and references ###
Variables in Ruby (well, most of them) don't hold object values, but instead
contain references to objects.  

During assignment, the variable name on the left receives a reference to the
object on the right.

During assignment from one variable to another, the variable on the left
receives a copy of the reference stored in the variable on the right, meaning
both variables now contain references to the same object, meaning changes to
that object affect both variables.

Integers, symbols, and `true` and `false` and `nil` are stored as immediate
values rather than references.  Ruby dereferences them automatically. As a
result of integers behaving this way, Ruby does not contain `++` type operators
like other languages.

Every object in Ruby must have one or more references to have object, or its
memory space is released.

### 2.5.2 References in variable assignment and reassignment ###
When a variable is assigned an object, the variable is wiped clean and a new
assignment is made, referencing a new object.  Any variables referencing the
old object maintain those references.

### 2.5.3 References and method arguments ###
Ruby has some ways to protect objects from being changed if needed:

The `dup` method duplicates an object and the `freeze` method prevents it
from being changed at all:
```ruby
def change_string(str)
  str.replace("New string content!")
end

s = "Original string content!"
change_string(s.dup)
puts s # "Original string content!"
s.freeze
change_string(s) # RuntimeError: can't modify frozen string
```
There is no unfreeze method, however.  Freezing is forever.  Frozen objects
that are `clone`ed have their clones also frozen, but frozen objects that are
`dup`ed have their duplicates not frozen.

If an array is frozen, while the array itself cannot be changed, the objects
inside it can if they are not also frozen.  **A reference to an object inside
a collection is not the same as the reference to the collection**

### 2.5.4 Local variables and the things that look like them ###
When Ruby sees a bare identifier, it interprets as one of three things:
1. A local variable
2. A keyword
3. A method call

*Keywords* = special reserved values that can't be used as variable names

Rules for how Ruby decides how to handle bare identifiers:
1. If keyword, it's a keyword
2. If there's an equal sign to the right of the identifier, it's a local
variable
3. Otherwise, it's assumed to be a method call
4. If it's not one of the above three, Ruby will throw a `NameError`

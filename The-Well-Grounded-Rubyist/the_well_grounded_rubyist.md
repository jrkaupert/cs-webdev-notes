# Notes from The Well-Grounded Rubyist #
My notes from:
[The Well Grounded Rubyist]
(https://www.manning.com/books/the-well-grounded-rubyist)

Some of my notes are my own summary, others are taken directly / verbatim.
All rights belong to the original author

# Chapter 1: Bootstrapping your Ruby literacy #
- Ruby is an object-oriented language
- objects are created by classes
- Modules let you fine-tune classes and objects (reuse of and splitting
  of code into units)
  Default object = `self`

## 1.1 Basic Ruby language literacy ##
- "Ruby" = the language
- `ruby` = the interpreter (CLI tool)

The `irb` command lets you use the interactive Ruby shell at a command
line.  Can use for basic calculations or execute any Ruby code in
real-time.  

`irb --simple-prompt` keeps the screen a bit clearer (no line numbers)

`quit()` to exit `irb`

### 1.1.1 A Ruby syntax survival kit ###
- Can do arithmetic, assignment, comparison of values, conversion of one
type to another:

```ruby
# Arithmetic
2 + 3 # 5
2 - 3 # -1
2 * 3 # 6
2 / 3 # 0
2 / 3.0 # 0.6666666...
10.3 + 20.25 # 30.55
103 - 202.5 # -99.5
32.9 * 10 # 329.0
100.0 / 0.23 # 434.78260869...

# Assignment
x = 1
string = "Hello"

# Comparison of values
x == y

# Convert a numeric string to a number
x = "100".to_i
s = "100"
x = s.to_i
```

Basic input/output methods and flow control:
```ruby
print "Hello" # prints "Hello" and nothing else
puts "Hello" # adds newline to end of string
p "Hello" # outputs inspect string which may have additional info

s = gets # assigns user input to a variable

# conditional execution (statements must always finish with `end`)
if x == y
  puts "Yes!"
else
  puts "No!"
end
```

Special objects:
```ruby
true   # `true` and `false` often used as return values for conditionals
false
nil    # `nil` indicates absence of a value or result
       # `false` and `nil` cause conditional expression to fail, all
       # other objects are considered true

self  #refers to default object. Methods than don't specify calling
      # object are called on `self`
```

### 1.1.2 The variety of Ruby identifiers ###
Types of Ruby identifiers:
- Variables
  - Local - start with lowercase letter or underscore
  - Instance - always start with "@".  Store info for individual objects
  - Class - store info for classes.  Start with "@@"
  - Global - start with "$"
- Constants - begin with uppercase letter.  Either camel case or
underscore separated all-uppercase
- Keywords - various predefined reserved terms for the language
- Method names - Same convention as local variables, but may also
end with ?, !, or = as well

### 1.1.3 Method calls, messages, and Ruby objects ###
All data structures and values in Ruby are objects.  All objects can
understand sets of messages, corresponding to methods

Methods are named, executable routines the object has the ability to
trigger and can take arguments (which are also objects)

Message sending occurs via "." operator (among other ways).  In general
when you see a dot, the message on the right is being sent to an object
on the left.

Most time will be spent either defining things objects should be able
to do (via methods), or asking objects to do those things (by sending
them messages)

Classes define clusters of behavior/functionality.  Every object is
an instance of exactly one class.  They are responsible for bringing
objects into existence (instantiation).  Objects can adopt behaviors
beyond their class-given ones, however, and this is a core part of
the Ruby language.

### 1.1.4 Writing and saving a simple program ###
Simple programs can be written as text files with the ".rb" extension

### 1.1.5 Feeding the program to Ruby ###
Running Ruby programs involves passing source files to the `ruby`
interpreter.

`ruby -cw <filename>` can be used to check for syntax errors without
actually running the program.

### 1.1.6 Keyboard and file I/O ###
There's no need to include `\n` like in other languages because most of
the time `puts` will add the newline for you

Read files: `filename = File.read("filename.txt")`
Write files: `filehandle = File.new("fileout.txt", "w")`
Make sure to close the file with `filehandle.close` afterward!

## 1.2 Anatomy of the Ruby Installation ##
`irb --simple-prompt -rrbconfig` can be used to put `irb` into mode where
you can find config info about system Ruby installation:
`>> RbConfig::CONFIG["bindir"]`

Key Ruby directories and their corresponding RbConfig terms:
- rubylibdir = Ruby standard library
- bindir = Ruby command-line tools
- archdir = Architecture-specific extensions / libraries (compiled binaries)
- sitedir = your own or third-party extensions & libraries (written in Ruby)
- vendordir = Third-party extensions & libraries (written in Ruby)
- sitelibdir = Your own Ruby language extensions (written in Ruby)
- sitearchdir = Your own Ruby language extensions (written in C)

### 1.2.1 The Ruby standard library subdirectory (RbConfig::CONFIG[rubylibdir]) ###
rubylibdir has standard library functions which can be used via `require`,
written in Ruby

### 1.2.2 The C extensions directory (RbConfig::CONFIG[archdir]) ###
Architecture-specific extensions and libraries (.so, .dll, .bundle files)

Standard library components written in C, but usable just the same as Ruby
extensions

### 1.2.3 The site_ruby (RbConfig::CONFIG[sitedir]) and vendor_ruby (RbConfig::CONFIG[vendordir]) directories ###
site_ruby = Place to store tools / libraries / extensions written by 3rd parties or yourself

vendor_ruby = Place where some 3rd party tools will install themselves

### 1.2.4 The gems directory ###
RubyGems utility is standard way to package and distribute Ruby libraries

Unbundled library files end up in gems directory when a gem is installed

## 1.3 Ruby extensions and programming libraries ##
Extensions that ship with Ruby are collectively known as the *standard-library*, which contains ways to handle many common tasks

Extensions can be loaded using `require` and `load` methods to be
included at runtime in programs

### 1.3.1 Loading external files and extensions ###
Things loaded at runtime go by several names:
- Feature = most abstract, included by `require`
- Library = more concrete and common, and implies can be loaded
- Extension = any loadable add-on library, but usually meaning something
for Ruby written in C rather than Ruby

Files can be loaded at runtime using `load` from the current working
directory or the *load path*:
`load "file.rb"`

### 1.3.2 "Load"-ing a file in the default load path ###
The *load path* of the Ruby interpreter is a set of directories that
`ruby` searches for files you ask it to load.  These directories can be
listed by examining the contents of the special global variable `$:` as shown below:
`ruby -e 'puts $:'`, where the `-e` flag runs command line arguments as
a script

The current working directory (represented by a single dot) is not
actually included in the load path, even though `load` handles it

Relative directories can be included in `load` by using the `../` syntax.
Changing the current directory during a program will affect relative
directory references.  `load` can also find files using an absolute path

`load` is handled during program execution.  `load` is not found up front, so `load` directives can load files containing dynamically set
names, and `load` can be wrapped in conditional blocks that only load
files conditionally

`load` always loads the file, even if it was previously loaded, meaning
it can be used to load files that have been changed since the first load,
which overrides the previous functionality

### 1.3.3 "Require"-ing a feature ###
`require` if called more than once does not reload files that have
already been loaded (Ruby keeps track, unlike with `load`).

`require` is more abstract than load (You don't require a file, you
require a feature), and usually don't specify the file extension

`require` doesn't know about the current working directory, but it can
be added as follows:
`require "./file.rb"` or `$: << "."`

`require` can also be given a fully qualified file path.

Typically `require` is used more frequently than `load`

### 1.3.4 require_relative ###
`require_relative` can also be used to load files by searching relative
to the directory in which the file it is called from resides.  This
does not manipulate the load path to include the current directory

## 1.4 Out-of-the-box Ruby tools and applications ##
Ruby comes installed with a few command-line tools installed in the
'bindir' directory:

- `ruby` - The interpreter
- `irb` - The interactive ruby interpreter
- `rdoc` and `ri` - Ruby documentation tools
- `rake` - Ruby `make`, a task-management utility
- `gem` - a Ruby library and application package-management utility
- `erb` - a templating system
- `testrb` - a high-level tool for use with the Ruby test framework

### 1.4.1 Interpreter command-line switches ###
Commonly used command-line switches:
```ruby
-c # check syntax of program without executing it
-w # give warning messages during program execution
-e # execute code provided in quotation marks on the command line
-l # line mode: print a newline after every line of output
-rname # require the named feature
-v # show Ruby version info and execute program in verbose mode
--version # show Ruby version info
-h # show info about all command-line switches for the interpreter
```

### 1.4.2 A closer look at interactive Ruby interpretation with irb ###
`irb` processes Ruby commands interactively, making it great for testing
code or learning Ruby

`irb --simple-prompt` will keep `irb` output shorter

`--noecho` can be used to prevent `irb` from reporting back results

`exit` can be used to exit `irb`

### 1.4.3 ri and RDoc ###
`ri` = Ruby Index command-line tool
`rdoc` = Ruby Documentation (RDoc) system command-line tool

`rdoc` looks at comments in program files and if correctly formatted,
organizes them and creates nicely formatted documentation

`ri` displays RDoc information. For example, `ri String#upcase` will
display information about the upcase String method.  The `#` indicates
it is an instance method, instead of a class method which would use `::`

### 1.4.4 The rake task-management utility ###
`rake` is a task management utility that reads Rakefiles

The `--tasks` flag can be used to see all of the defined tasks in a
Rakefile

Tasks can be invoked using `rake <taskname>` and can be namespaced using
colons

### 1.4.5 Installing packages with the gem command ###
Gems can be installed using `gem install <gemname>`, or locally using
`gem install /path/to/my/file.gem`

Gems aren't shown in the initial load path (`$:`), but they can be
included via `require` which will put them on the load path

Gems can have multiple versions installed on the same system and can
be selected by version number `gem "cucumber", "2.0.1"`

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

### 2.5.1 Variables, objects, and references ###

### 2.5.2 References in variable assignment and reassignment ###

### 2.5.3 References and method arguments ###

### 2.5.4 Local variables and the things that look like them ###

# Chapter 3: Organizing objects with classes #

## 3.1 Classes and Instances ##

## 3.2 Instance variables and object state ##

## 3.3 Setter methods ##

## 3.4 Attributes and the attr_* method family ##

## 3.5 Inheritance and the Ruby class hierarchy ##

## 3.6 Classes as objects and message receivers ##

## 3.7 Constants up close ##

## 3.8 Nature vs. nurture in Ruby objects ##

# Chapter 4: Modules and program organization #

## 4.1 Basics of module creation and use ##

## 4.2 Modules, classes, and method lookup ##

## 4.3 The method_missing method ##

## 4.4 Class/module design and naming ##

# Chapter 5: The default object (self), scope, and visibility #

## 5.1 Understanding self, the current/default object ##

## 5.2 Determining scope ##

## 5.3 Deploying method-access rules ##

## 5.4 Writing and using top-level methods ##

# Chapter 6: Control-flow techniques #

## 6.1 Conditional code execution ##

## 6.2 Repeating actions with loops ##

## 6.3 Iterators and code blocks ##

## 6.4 Error handling and exceptions ##

# Chapter 7: Built-in essentials #

## 7.1 Ruby's literal constructors ##

## 7.2 Recurrent syntactic sugar ##

## 7.3 Bang (!) and "danger" ##

## 7.4 Built-in and custom to_* (conversion) methods ##

## 7.5 Boolean states, Boolean objects, and nil ##

## 7.6 Comparing two objects ##

## 7.7 Inspecting object capabilities ##

# Chapter 8: Strings, symbols, and other scalar objects #

## 8.1 Working with strings ##

## 8.2 Symbols and their uses ##

## 8.3 Numerical objects ##

## 8.4 Times and dates ##

# Chapter 9: Collection and container objects #

## 9.1 Arrays and hashes in comparison ##

## 9.2 Collection handling with arrays ##

## 9.3 Hashes ##

## 9.4 Ranges ##

## 9.5 Sets ##

# Chapter 10: Collections central: Enumerable and Enumerator #

## 10.1 Gaining enumerability through each ##

## 10.2 Enumerable Boolean queries ##

## 10.3 Enumerable searching and selecting ##

## 10.4 Element-wise enumerable operations ##

## 10.5 Relatives of each ##

## 10.6 The map method ##

## 10.7 Strings as quasi-enumerables ##

## 10.8 Sorting enumerables ##

## 10.9 Enumerators and the next dimension of enumerability ##

## 10.10 Enumerator semantics and uses ##

## 10.11 Enumerator method chaining ##

## 10.12 Lazy enumerators ##

# Chapter 11: Regular expressions and regexp-based string operations #

## 11.1 What are regular expressions? ##

## 11.2 Writing regular expressions ##

## 11.3 Building a pattern in a regular expression ##

## 11.4 Matching, substring captures, and MatchData ##

## 11.5 Fine-tuning regular expressions with quantifiers, anchors, and modifiers ##

## 11.6 Converting strings and regular expressions to each other ##

## 11.7 Common methods that use regular expressions ##

# Chapter 12: File and I/O operations #

## 12.1 How Ruby's I/O system is put together ##

## 12.2 Basic file operations ##

## 12.3 Querying IO and File objects ##

## 12.4 Directory manipulation with the Dir class ##

## 12.5 File tools from the standard library ##

# Chapter 13: Object individuation #

## 13.1 Where the singleton methods are: The singleton class ##

## 13.2 Modifying Ruby's core classes and modules ##

## 13.3 BasicObject as an ancestor and class ##

# Chapter 14: Callable and runnable objects #

## 14.1 Basic anonymous functions: The Proc class ##

## 14.2 Creating functions with lambda and -> ##

## 14.3 Methods as objects ##

## 14.4 The eval family of methods ##

## 14.5 Parallel execution with threads ##

## 14.6 Issuing system commands from inside Ruby programs ##

# Chapter 15: Callbacks, hooks, and runtime introspection #

## 15.1 Callbacks and hooks ##

## 15.2 Interpreting object capability queries ##

## 15.3 Introspection of variables and constants ##

## 15.4 Tracing execution ##

## 15.5 Callbacks and method inspection in practice ##

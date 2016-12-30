[Table of Contents](_toc.md)

---

# Chapter 1: Bootstrapping your Ruby literacy #
- Ruby is an object-oriented language
- objects are created by classes
- Modules let you fine-tune classes and objects (reuse of and splitting
  of code into units)
- Default object = `self`

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

---
[Table of Contents](_toc.md)

[Next Chapter](ch2.md)

# Notes from You Don't Know Javascript - Scope & Closures #
My notes from:
[You Don't Know JavaScript - Scope & Closures]
(https://github.com/getify/You-Dont-Know-JS/blob/master/scope%20&%20closures/README.md#you-dont-know-js-scope--closures)

Some of my notes are my own summary, others are taken directly / verbatim.
All rights belong to the original author and contributors at the link above

# Chapter 1: What is Scope? #
- Storing values and being able to access them from variables gives programs
*state*
- where variables are stored and how they are accessed is defined by a set of
rules called *scope*

## Compiler Theory ##
Traditional Compile Process:
1. *Tokenizing* or *Lexing* = splitting strings of characters into sets of
things that are meaningful to the language (*tokens*).  When tokens are defined
in a *stateful* way, tokenizing is actually called *lexing*
2. *Parsing* = turning a series of tokens into a "tree of nested elements"
called an *Abstract Syntax Tree (AST)*
3. *Code Generation* = turning an AST into code that can be executed

- JavaScript typically compiles code right before execution

## Understanding Scope ##
Components to understanding scope:
1. *Engine* - the piece that handles the compile process as a whole and JS
execution
2. *Compiler* - the piece that handles the details of compiling (parsing and
  code-generation)
3. *Scope* - responsible for maintaining a look-up table of all declared
variables, and for enforcing how and when the variables may be accessed during
code execution

# Chapter 2: Lexical Scope #

# Chapter 3: Function vs. Block Scope #

# Chapter 4: Hoisting #

# Chapter 5: Scope Closures #

# Dynamic Scope #

# Polyfilling Block Scope #

# Lexical-this #

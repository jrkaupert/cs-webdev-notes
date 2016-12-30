[Table of Contents](_toc.md)

# Chapter 1: Into Programming #
## Statements ##
- *Statements* are a series of words, numbers, and operators that perform a
specific task
- *Variables* are little boxes to store values in
- *Literal Values* are just values not stored in variables
- *Operators* allow you to perform actions using variables/values

## Expressions ##
- Statements made up of >= 1 expression, which combine variables, values, and
operators
- Types of expressions
  1. literal value expressions - just a value
  2. variable expressions - retrieve variable value
  3. arithmetic expressions - perform arithmetic
  4. assignment expressions - assign result of an operation to variable
  5. call expressions - function calls

## Executing a Program ##
- Computer runs statements via interpreter or compiler to translate code into
something it knows how to work with
- JavaScript is usually called *interpreted* but is actually *compiled* in
real-time and then immediately run

## Try It Yourself ##
- Code can be executed in the JavaScript console of browser dev tools
- `console.log(stuff);` lets you print to console
- `alert(stuff);` can be used to display a popup box with an "OK" button
- `aVariable = prompt("text");` can be used to prompt user and save their input

## Operators ##
- Operators let us act on variables and values
- Variables should always be declared in advance with *var*

### Types of operators: ###
- Assignment: =
- Mathematical: + - / *
- Compound Assignment: +=, -=, \*=, /=.  a+=2 is same as a = a + 2
- Object Property Access: . (like console.log)
- Equality:
  - == (loose equals)
  - === (strict equals)
  - != (loose not equals)
  - !== (strict not equals)
- Comparison: <, >, <= (less than or loose equals), >= (greater than or loose
equals)
- Logical: &&, ||
- also see [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators)

## Values & Types ##
- *types* are representations for primitive values
- *literals* are values included directly in source code
  - `string` literals get wrapped in double quotes or single quotes (no
    difference)
  - `number` literals not wrapped in anything
  - `boolean` literals not wrapped in anything

### Converting between types ###
- *coercion* lets you force values to different types
- example:
```javascript
var x = "301";
var y = Number(x);
console.log(x); // "301"    
console.log(y); // 301
```
- We can explicitly coerce as in previous example, or implicitly coerce when
performing a comparison of two items that are not the same type
  - If two items are not of same type, implicit coercion checks if loosely equal
  (ie: using == or !== operators)
  - Implicit coercion is not inherently bad and not a flaw of the language

## Comments ##
- Single line comments can be done via //
- Multi-line comments can be done via /\* \*/

## Variables ##
- *variables* are symbolic containers for values
- *static typing* or *type enforcement* requires variables be declared to hold
specific types of values and prevents unintended value conversions
- *dynamic typing* or *weak typing* allows variables to hold any value at any
time, allowing flexibility.  This is what JavaScript uses
- the `var` statement declares variables in JavaScript but no type is provided
at declaration
- variables are used to manage *state*
- *constants* are used to represent values that should not change throughout
the execution of a program and are typically all uppercase with underscores
between words.  Constants can also be specified using the `const` declaration
in ES6, and will produce validation errors in strict mode if changed during
program execution

## Blocks ##
- A series of statements captured together in a set of { } braces, usually
attached to a control statement
- blocks do not require semicolons to end them

## Conditionals ##
- decision points in a program
- *if* statements require boolean expression to determine if block executed
- *else* clause provides alternative branch if the *if* condition not true
- example:
  ```javascript
  if (value < limit) {
    console.log("Value is less than the limit.");
  }
  else {
    console.log("Value is greater than or equal to the limit.")
  }
  ```
- values that are not of expected type will be coerced!

## Loops ##
- *while* and *do..while* loops can be used to repeat actions until a condition
fails to be met
- examples:
```javascript
// while loop
while (counter > 0) {
  console.log(counter);
  counter = counter - 1;
}
// do..while loop
do {
  console.log(counter);
  counter = counter - 1;
} while (counter > 0);
```
- the *do..while* loop will always be executed at least once, even if condition
is not met
- *break* statement can be used to stop a loop mid-way
- *for* loops can be used to iterate over specific set of values
- example:
```javascript
for (var i = 0; i <= 5; i++) {
  console.log(i);
}
```

## Functions ##
- *functions* allow code to be reused easily, letting code be called by a name
- functions can take arguments / parameters to pass values in
- example:
```javascript
function printAmount(amount) {
  console.log( amount.toFixed(2) );
}
var amount = 50.123;
printAmount(amount);
```
- functions can also return values

## Scope ##
- *lexical scope* refers to a collection of variables and how those variables
are accessed by name.  
- Names must be unique within a single scope, but can be
repeated in different scopes without issues
- Scopes can be nested.
  - Code in one scope can access variables in own scope or any scope outside (but
  not inside!.  
  - Inner scopes cannot be accessed from outer ones)

[Table of Contents](_toc.md)

[Next Chapter](ch2.md)

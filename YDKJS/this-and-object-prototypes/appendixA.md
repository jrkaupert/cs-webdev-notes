[Table of Contents](_toc.md)

[Previous Chapter](ch6.md)

# Appendix A: ES6 `class` #
As indicated throughout Chapters 4-6, classes are an optional design pattern in coding, and are awkward to implement in Javascript

## `class` ##
Problems solved by `class` in ES6 (looking back at the Widget example from Chapter 6)
1. There's no more references to `.prototype` cluttering the code
2. Classes inherit from other classes directly using `extends` instead of having to call `Object.create(..)`, `.__proto__`, or 
`Object.setPrototypeOf(..)`
3. `super(..)` allows for relative polymorphism exactly as expected
4. `class` literal syntax can only specify methods, not properties, which acts as a safety mechanism against cases where properties (state) exist 
elsewhere (shared state)
5. `extends` allows built-in objects types or subtypes like `Array` or `RegExp` to be extended easily

## `class` Gotchas ##


## Static > Dynamic? ##

[Table of Contents](_toc.md)

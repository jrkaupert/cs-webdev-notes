[Table of Contents](_toc.md)

[Previous Chapter](ch1.md)

# Chapter 2: Selection Sort #

## How Memory Works
Think of a chest of drawers...

If you need to store something, and if you assume each drawer can hold one
thing, this chest is a way of thinking about how a computer stores things in
memory.

Each "drawer" or slot in memory has an address and can hold one thing.

If you want to store multiple
items, you can do it one of two ways, using an array or a list.

## Arrays and Linked Lists
> **Arrays** store things contiguously in memory, one after the other

Adding new items to an array when the computer has no more contiguous memory
requires the computer to move the entire array.

Sometimes it's necessary to have the computer hold space in reserve when you know how large you may want the array to grow

This can be wasted space if you don't use it

The array may grow larger at some point anyways and then require
being moved

> **Linked lists** let items be stored anywhere in memory (random locations)

Linked lists store the address of the next item in the list, which is used
to maintain the order of the list

With linked lists, the items never have to be moved if the array gets too big
to hold things in contiguous memory.  As long as there's enough space in
memory overall, you're fine.

Thus, linked lists are great for inserting items

Unfortunately, if you want to view items at a certain point in a linked list,
you have to go item by item until you get to the one you want.

Arrays let you go immediately to any item in the array, because the address is
known absolutely

Arrays are good for reading random elements, unlike linked lists

Run times for reading and inserting using arrays and linked lists:

|         | Arrays | Lists |
| --------| :----: | :---: |
| Reading | O(1)   | O(n)  |
| Insert  | O(n)   | O(1)  |

> **Exercise 2.1** - Suppose you're building a finance tracking app.  Every
day you write down everything you spent money on.  At the end of the month,
you review your expenses and sum up how much you spent.  You have lots of
inserts and few reads.  Would it be better to use an array or a list for this?
>
> **Answer:** - Linked list

## Selection Sort

[Table of Contents](_toc.md)

[Next Chapter](ch3.md)

[Table of Contents](_toc.md)

# Chapter 1: Introduction #

## Introduction
> **algorithm** = set of instructions for doing something

## Binary Search
> **binary search** = algorithm that takes a sorted list of input elements and
> identifies the position at which a specified element is located, or `null`
> otherwise

> **simple search** = naive algorithm that tries to search by exhaustively
> enumerating all possible guesses consecutively, incrementing each time, with
> no regard to trying to achieve better performance

Binary search is useful because it eliminates half of the search space with
every iteration.  By selecting an element in the middle of the search space
for comparison against the desired element and identifying if the selected
element is higher or lower than the desired element, it is possible to
quickly cut down the search space even for massive ones.

Binary search will take *log2(n)* steps for a list of size *n*

A binary search example in Python:

```python
def binary_search(list, item):
    low = 0
    high = len(list) - 1
    while low <= high:
        mid = (low + high)
        guess = list[mid]
        if guess == item:
            return mid
        if guess > item:
            high = mid - 1
        else:
            low = mid + 1
    return None
```

> **Exercise 1.1** - Suppose you have a sorted list of 128 names, and you're
> searching through it using binary search.  What's the max number of steps it
> would take?
>
> **Answer:** log2(128) = 7 steps

> **Exercise 1.2** - Suppose you double the size of the list.  What's the max
> number of steps now?
>
> **Answer:** log2(256) = 8 steps

Algorithmic efficiency can be expressed in terms of time or space.  Generally
will optimize for one of these two quantities

When the max number of steps required for a search is the same as the size
of the list itself, the search takes **linear time**

Binary search runs in **logarithmic time** (aka **log time**)

## Big O Notation
> **Big O Notation** = notation that indicates how fast an algorithm is in
terms of the number of operations performed (not seconds). This provides a
sense of how quickly the run time grows as the size of input grows

The runtimes for algorithms of different classes don't grow at the same rate!

Running time for binary search: *O(log n)*

Big O establishes a type of worst-case run time for an algorithm - the
absolute slowest an algorithm will perform

### Common Big O run times
**log time** = *O(log n)*
**linear time** = *O(n)*
**linearithmic time** = *O(n + log n)*
**quadratic time** = *O(n^2)*
**factorial time** = *O(n!)*

> *Give the run time for each scenario in Big O notation*
>
> **Exercise 1.3** - You have a name, and you want to find the person's phone
> number in the phone book
>
> **Answer:** - *O(log n)* log time
>
> **Exercise 1.4** - You have a phone number, and you want to find the person's
> name in the phone book
>
> **Answer:** - *O(n)* linear time
>
> **Exercise 1.5** - You want to read the numbers of every person in the phone
> book
>
> **Answer:** - *O(n)* linear time
>
> **Exercise 1.6** - You want to read the numbers of just the A's
>
> **Answer:** - *O(n)* linear time
>







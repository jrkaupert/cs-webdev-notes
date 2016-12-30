[Table of Contents](_toc.md)

---

# Chapter 1: Why Cucumber? #
Software starts as ideas, but they need to be communicated because most of the
time, the person with the idea doesn't have the programming skills to develop
the idea into reality.

Collaboration is a common element in software projects, so communication between
stakeholders is very important.  Feedback is critical to ensure everyone's on
the same page.

Agile software teams work in small increments, using built software as the
feedback that asks stakeholders "Is this what you wanted?".  Despite this,
it's still important to improve on things, because we don't want to spend time
building things that aren't desired (the fragments used in creating them will
likely never be removed from the codebase completely).

## Automated Acceptance Tests ##
In **automated acceptance tests**, developers and stakeholders collaborate to
develop automated tests that express what the stakeholder wants in the product.
They are called **acceptance tests** because they define what the software needs
to do in order to be deemed acceptable by the stakeholders.

At the time of writing, the test will fail because no software is written yet,
but it identifies what the stakeholder is interested in and gives everyone an
idea of the work that needs to be done.

Acceptance tests are different from unit tests.  Unit tests are tools for
developers to check software designs.  Unit tests ensure you **build the thing
right**, acceptance tests ensure you **build the right thing**.

## Behaviour-Driven Development ##
Behaviour-Driven Development (BDD) takes Test-Driven Development (TDD) and
looks to write acceptance tests as examples anyone on the team can read, around
a **shared language** for talking about the system.

Cucumber helps with the development of a shared language within the team by
giving the technical and business sides a place to meet.

Cucumber tests interact directly with the code, but are written so that the
business stakeholders can understand them.  This helps explore and remove
misunderstandings well before they make it into the code.

The true value of acceptance tests are as a communication and collaboration
tool.

```gherkin
Feature: sign up
  Sign up should be quick and friendly.
  Scenario: Successful sign up
    New users should get a confirmation
    email and be greeted personally by
    the site once signed in.

    Given I have chosen to sign up
    When I sign up with valid details
    Then I should receive a confirmation email
    And I should see a personalized greeting message

  Scenario: Duplicate email
    Where someone tries to create an account for an
    email address that already exists.

    Given I have chosen to sign up
    But I enter an email address that has already registered
    Then I should be told that the email is already registered
    And I should be offered the option to recover my password
```

The test provides **examples** of how we want the system to work in selected
scenarios.

Acceptance tests written in this Given / When / Then style become **executable
specifications**.

## Living Documentation ##
Tests written in Cucumber are similar to traditional specifications because
stakeholders can read them, however they have an advantage over traditional
requirements because they can be executed on the computer at any time to
understand how accurate they are in reality.  

This often leads to the acceptance tests becoming the definitive source of truth
for how the system works.

## How Cucumber Works ##
Cucumber is a command-line tool that reads specifications from plain-text files
(called **features**), looks for **scenarios** to run, and runs the scenarios
on the system under test.

Scenarios provide a list of **steps** for Cucumber to work through.  These steps
have a few simple syntax rules (the **Gherkin** language) so that Cucumber can
understand them.

In addition to the features, a set of **step definitions** are defined to map
the business-readable language for each step into Ruby code to execute the
necessary actions described by the step.

In mature test suites, step definitions will likely consist of a few lines of
Ruby that rely on libraries of **support code** that is specific to the domain
of the application under test.  For example, the **Capybara** library is a
browser automation library that interacts with the web.

When step definitions execute without errors, Cucumber continues to the next
step, and marks a scenario as passing if all steps in the scenario complete
without issues.  

If any steps in the scenario fail, Cucumber fails the scenario
immediately and moves to the next scenario.

As steps and scenarios are completed, Cucumber prints the results to the
command-line for immediate feedback.

Tags can be used to organize scenarios into groups.

Cucumber integrates with many Ruby automation libraries to drive any sort of
application.

---
[Table of Contents](_toc.md)

[Next Chapter](ch2.md)

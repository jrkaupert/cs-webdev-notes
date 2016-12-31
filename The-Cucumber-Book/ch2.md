[Table of Contents](_toc.md)

[Previous Chapter](ch1.md)

---

# Chapter 2: First Taste #
This chapter includes a simple example of driving development with Cucumber.

[Appendix 2](Appendix 2) includes instructions for installing Cucumber.

## Understanding Our Goal ##
The example in this chapter will be a simple calculator, implemented as a Ruby
script, to compute things like `2+2` (for an output of `4`) or `100/2` for
an output of `50`.

## Creating a Feature ##
Cucumber tests are organized into **features** because they should describe
specific features a user can use in the program.

For the example calculator project, create a new directory from a command-line,
then switch to that directory:
```
mkdir calculator

cd calculator
```

Run the `cucumber` command and you should see an error indicating there is no
'features' directory.  Make a features directory using `mkdir features`, then
rerun the `cucumber` command.  Now the output should indicate 0 scenarios and
steps, and a runtime of 0s.

Individual Cucumber tests are called **scenarios**, each containing specific
**steps** that determine what the test will do.

In a text editor, add a 'adding.feature' file to the features folder with the
following text:

```gherkin
Feature: Adding

  Scenario: Add two numbers
    Given the input "2+2"
    When the calculator is run
    Then the output should be "4"
```

The 'Feature', 'Scenario', 'Given', 'When', and 'Then' are all structural pieces
that Cucumber expects to see, however the rest is strictly documentation for the
calculator program.

Save the file and run `cucumber` from the 'calculator' directory.  This time,
there will be a lot more output because it found a feature file and reported
back the results of trying to run it.  It now recognizes that 1 scenario exists,
although it is still undefined because there are no steps.

In the output, there are also code snippets for suggested **step definitions**
we can use to start filling out actual steps Cucumber will run.  This is how
Cucumber is able to translate plain English into actionable steps written in
Ruby.

Review of the Cucumber architecture:
- **Features** => Contain **scenarios** and **steps**
- **Scenarios** => Contain plain english test **steps**
- **Steps** => Call **step definitions** written in Ruby to link plain english
to code and run actual tests.

## Creating Step Definitions ##
To create step definitions, the easiest way to begin is to copy the suggested
step definitions from the `cucumber` command-line output, and paste them into
a file.  
  - First, create a 'features/step_definitions' directory using
`mkdir features/step_definitions` for the step definitions files to reside in.
  - Then create a file called 'calculator_steps.rb' in a text editor and save it
inside that directory.
  - Paste the snippets (below) from the `cucumber` output into the file and
save.

```gherkin
Given(/^then input "([^"]*)"$/) do |arg1|
  pending # Write code here that turns the phrase above into concrete actions
end

When(/^the calculator is run$/) do
  pending # Write code here that turns the phrase above into concrete actions
end

Then(/^the output should be "([^"]*)"$/) do |arg1|
  pending # Write code here that turns the phrase above into concrete actions
end
```

Now rerun the `cucumber` command from the top-level 'calculator' directory. The
output now lists 1 scenario as 'pending' instead of undefined like before. The
other two steps are listed as 'skipped' because Cucumber stopped execution after
finding a 'pending' definition ('failed' tests will cause Cucumber to do the
same)

## Implementing Our First Step Definition ##

## Running Our Program ##

## Changing Formatters ##

## Adding an Assertion ##

## Making it Pass ##

---
[Table of Contents](_toc.md)

[Next Chapter](ch3.md)

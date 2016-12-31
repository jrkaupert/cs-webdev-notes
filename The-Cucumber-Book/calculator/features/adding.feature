Feature: Adding

  Scenario: Add two numbers
    Given then input "2+2"
    When the calculator is run
    Then the output should be "4"

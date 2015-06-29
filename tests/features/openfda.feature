Feature: OpenFDA DKAN
  In order to ensure my site works well
  As a web developer
  I want to be able to write and run tests really easiy.

  @api
  Scenario: Test basic functionality.
    Given I am on the homepage
    Then I should see "This site contains data from open.fda.gov"
    And I should not see "Demo Data"
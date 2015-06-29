Feature: OpenFDA DKAN
  In order to ensure my site works well
  As a web developer
  I want to be able to write and run tests really easiy.

  @api
  Scenario: Test basic functionality.
    Given I am on the homepage
    Then I should see "This site is NuCivic's working prototype as part of the application for the GSA 18F Agile Delivery Blanket Purchase Agreement."
    # And I should see "Welcome to OpenFDA"
Feature: OpenFDA DKAN
 
  @api
  Scenario: Test basic functionality.
    Given I am on the homepage
    Then I should see "This is just a test. I am expected to fail."
    Then I should see "This is a prototype of DKAN implemented for OpenFDA."
    And I should see "This site is NuCivic's working prototype as part of the application for the GSA 18F Agile Delivery Blanket Purchase Agreement"
    
    When I click "Drugs"
    And I click "Drugs: Enforcement reports"
    And I click "Drugs: Enforcement reports: Enforcement reports over time"
    Then I should see "Drugs: Enforcement reports: Enforcement reports over time"
    And I should see "Link to API"

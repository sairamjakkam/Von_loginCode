Feature: Vonage Login


@vonageLogin
    Scenario: Login with valid credentials with 2 factor authentication
        Given I am on the login page
        When I enter my username and password
        And I click the login button
        Then I should be redirected to two factor authentication page
        Then I should be logged in successfully
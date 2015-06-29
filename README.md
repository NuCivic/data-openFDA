Open FDA Data Portal
====================

*Agile Delivery BPA Application Prototype*

This repo is NuCivic's working prototype as part of the application for the GSA 18F Agile Delivery Blanket Purchase Agreement.

About
-----

### DKAN on DevShop
*Open Data Portal on an Open Source Web Stack*

Our prototype will be an instance of the DKAN Open Data Portal, setup with OpenFDA data, running on the open source continous testing & delivery platform DevShop.

- About DKAN: [nucivic.com/dkan](http://nucivic.com/dkan/)
- About DevShop: [devshop.readthedocs.org](http://devshop.readthedocs.org/)

Steps
-----

1. Create a GitHub Repository: https://github.com/NuCivic/data-openFDA
2. Add the DKAN Starter repository located at https://github.com/nucivic/data_starter as a remote and pull the master branch into the repo.
1. Create a ubuntu 14 server on softlayer named "devshop.opendata.nucivic.build"
2. Login as root.
3. Run the devshop install script.
4. Click link to login to devshop.
5. Go to Admin > Hosting > Devshop > GitHub.
5. Visit https://github.com/settings/tokens. Create a token and copy it. 
5. Return to devshop to enter your token and hit "Save Configuration".
5. Click "Create your first Project".
6. Call it "dkan", add this repo as the git url.
7. Click "show ssh key" to access the server's public key. add it to your github account so the server can clone the repo.
8. Click "Next".
9. Select "Immediate "Deployment" for "Deploy Code Method", Check "Create Environments for Pull Requests", "Delete Pull Request Environments", and "Clone the live environment".  Enter "openfda.nucivic.build" as the "Live Domain", and check "For new environments, create subdomains under Live Domain.".   Fill in "docroot" for "Path to Drupal", then click "Next".
10. Create a "live" environment, set to master branch.
11. Click "Next" and wait for your code to clone. 
12. Select DKAN as the install profile.
13. Click "Finish" to complete project setup.
14. Click "Setup Webhook". Copy webhook URL and click "Add a Webhook at GitHub.com."
15. Paste the project's webhook URL into "Payload URL".  Content type should be "application/json", Secret can be empty.  Select "Let me select individual events" and select "Pull Request", "Push", and "Create". Click "Add webhook".
16. Go back to devshop, reload the project dashboard and note the "last commit" should now read "x seconds ago".
17. Click Settings > project settings. Select "live" for "live environment". Hit Save.
18. Click "Log In" on the live environment to access the DKan site.
20. Populate the site with data.

DKAN Setup
----------
1. Create user accounts for anyone who needs access to the dkan site.
2. Turn off registration for anonymous users: 
  1. Visit "Configuration" > "People" > "Account Settings".
  2. Select "Administrators only" for "Who can register accounts".
3. Add a new logo:
  1. Visit "Appearance" > "Settings".
  2. Uncheck "Use the default logo".
  3. Click "Choose File" and select your desired logo.
  4. Click "Save configuration".

Testing Deployment
------------------

With the Webhook setup, any git pushes to the branch being used for the live environment will automatically be deployed. 

Make a change and commit and push it, then view the devshop dashboard and you should see the deployment of live in progress.

Pull Request Environments
-------------------------

Instead of pushing code directly to the `master` branch, and thereby deploying to the live environment, you can create a Pull Request in GitHub on a new branch, and DevShop will create a new environment based on that branch.

If your project is configured to "Delete Pull Request Environments" then the environments will be destroyed when the pull request is merged or closed.

Behat Testing Setup
-------------------

DevShop can be configured to automatically run behat tests when you push code to your site.

To enable behat testing:

1. Enable the "DevShop Testing" module.
2. Visit Project Settings page.
2. Select "Behat" as the "Test Type".
3. Enter the path to your behat tests folder into "Behat folder path".  For this repo, it is "tests"
4. Enter the path to the behat executable. For almost all projects it will be "bin/behat".
5. Click "Save".
6. Enable testing on the "live" environment:
  1. Click "Settings" > "live". or click the Gear icon in an environment and click "Environment settings".
  2. Check "Run Tests" under "Deployment Hooks".
  3. Select the tests you wish to run for this environment, or leave unchecked to run them all.
  4. Click "Save".
7. Click the "Run Tests" button to try out the test runner or push code to your branch to trigger a test run.

When a pull request environment is created, the live environment will be cloned with all of its settings.  Tests will be run on the PR environment and status will be sent back to GitHub, providing a Continuous Testing infrastructure.

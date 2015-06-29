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
1. Create a ubuntu 14 server on softlayer.
2. Login as root.
3. Run the devshop install script.
4. Click link to login to devshop.
5. Go to Admin > Hosting > Devshop > GitHub.
5. Visit https://github.com/settings/tokens. Create a token and copy it. 
5. Return to devshop to enter your token and hit "Save Configuration".
5. Click "Create your first project."
6. Call it "dkan", add this repo as the git url.
7. Click "show ssh key" to access the server's public key. add it to your github account so the server can clone the repo.
8. Click "next".
9. set immediate deployment, create envs from pull request, clone live site, and delete pr environments.
10. create a "live" environment, set to master branch.
11. Click "next" and wait for your code to clone. 
12. Select DKAN as the install profile.
13. Click next to complete project setup.
14. click "setup webhook". Copy webhook URL and click "go to github to setup webhook."
15. paste webhook in to github. select "Send" pull requests, pushes. click save webhook
16. go back to devshop, reload the project dashboard and note the "last commit". 
17. Click Settings > project settings. Select "live" for "live environment". Hit Save.
18. Click "Log In" on the live environment to access the DKan site.
19. Create user accounts for anyone who needs access to the dkan site.
20. Populate the site with data.

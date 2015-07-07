Open FDA Data Portal
====================

*Agile Delivery BPA Application Prototype*

This repo is NuCivic's working prototype as part of the application for the GSA 18F Agile Delivery Blanket Purchase Agreement.  Our prototype is an instance of the DKAN Open Data Portal, setup with OpenFDA data, extended with a new OpenFDA.js javascript library, running on the open source continuous testing & delivery platform DevShop and , and hosted on IBM’s Softlayer IaaS

- Prototype: openfda.nucivic.build
- About DKAN: nucivic.com/dkan
- About DevShop: devshop.readthedocs.org
- About OpenFDA Recline Backend: https://github.com/NuCivic/openfda.js 

We elected to deploy the Drupal-based DKAN platform for this prototype in order to demonstrate the speed and utility of cataloging and visualizing data from an API within a comprehensive open data portal, including the ability to: 
- catalog datasets by pointing to OpenFDA APIs
- describe datasets with US Project Open Data compliant metadata including data.json
- apply workflow to datasets by organizing them into Groups
- provide a full featured content management system to help content creators put data in context
- provide a portal that could readily be extended in an ongoing agile project with 100s of pluggable Drupal features like blogs and public comments
- integrate well with cross-platform javascript libraries like Recline.js for data visualization

About
-----

DKAN Site: http://openfda.nucivic.build

DevShop Site: http://devshop.openfda.nucivic.build/

### DKAN on DevShop
*Open Data Portal on an Open Source Web Stack*

Our prototype will be an instance of the DKAN Open Data Portal, setup with OpenFDA data, running on the open source continous testing & delivery platform DevShop.

- About DKAN: [nucivic.com/dkan](http://nucivic.com/dkan/)
- About DevShop: [devshop.readthedocs.org](http://devshop.readthedocs.org/)

Goals
-----
- [x] Quickly stand up a data portal with links to the datasets available on open.fda.gov: http://openfda.nucivic.build 
- [x] Setup a continuous testing & delivery server in minutes with entirely open source software ([DevShop](http://devshop.readthedocs.org/)).
- [x] Demonstrate quick and easy localhost development with [Terra](http://github.com/terra-ops/terra), which uses docker containers.
- [x] Create a [Recline](http://okfnlabs.org/recline/) backend for OpenFDA: https://github.com/NuCivic/openfda.js
- [ ] <strike>Create tools to import large datasets directly into Drupal Search API powered back-ends like Solr.  (If possible.)</strike> This was decided against after user feedback.
Setup Process
-------------

The processes we went through to create and deploy this prototype are located at https://github.com/NuCivic/data-openFDA/blob/master/docs/PROCESS.md

Continuous Delivery
-------------------

The site was setup using devshop in "Continuous Delivery" mode.  This means that any pushes to the primary `master` branch will automatically be deployed. 

When using the GitHub Pull Request interface, clicking "Merge" will trigger a deploy to the live site.

Continuous Testing
------------------

Developers should create a branch from the `master` branch to do their work.  When they feel the code is ready, they submit a Pull Request. 

When a Pull Request is submitted, DevShop will automatically create a new environment and run the tests, notifying the developer through the github interface.

When new code is pushed to the Pull Request branch, it is automatically deployed to that new environment, and tests are run again.

If your project is configured to "Delete Pull Request Environments" then the environments will be destroyed when the pull request is merged or closed.

See an example pull request here: https://github.com/NuCivic/data-openFDA/pull/25

Running "Locally"
-----------------

Because this is just a Drupal site, it can be run locally on any number of tools: Acquia DevDeskop, MAMP, Kalabox, Vagrant, etc.

We've created a new tool for launching Drupal sites very easily on Docker containers called [Terra](https://github.com/terra-ops/terra-app)".  

To get this site running on Terra, follow the [Installation Instructions](http://terra.readthedocs.org/en/latest/install/), then the [Setting up a Drupal Site instructions](http://terra.readthedocs.org/en/latest/drupal/).

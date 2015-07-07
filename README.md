Open FDA Data Portal
====================

*Agile Delivery BPA Application Prototype*

This repo is NuCivic's working prototype as part of the application for the GSA 18F Agile Delivery Blanket Purchase Agreement.  Our prototype is an instance of the DKAN Open Data Portal, setup with OpenFDA data, extended with a new OpenFDA.js javascript library, running on the open source continuous testing & delivery platform DevShop and , and hosted on IBM’s Softlayer IaaS

- OpenFDA DKAN Prototype: http://openfda.nucivic.build
- DevShop Site: http://devshop.openfda.nucivic.build/
- About DKAN: http://nucivic.com/dkan
- About DevShop: http://devshop.readthedocs.org
- About OpenFDA Recline Backend: https://github.com/NuCivic/openfda.js 

We elected to deploy the Drupal-based DKAN platform for this prototype in order to demonstrate the speed and utility of cataloging and visualizing data from an API within a comprehensive open data portal, including the ability to: 
- catalog datasets by pointing to OpenFDA APIs
- describe datasets with US Project Open Data compliant metadata including data.json
- apply workflow to datasets by organizing them into Groups
- provide a full featured content management system to help content creators put data in context
- provide a portal that could readily be extended in an ongoing agile project with 100s of pluggable Drupal features like blogs and public comments
- integrate well with cross-platform javascript libraries like Recline.js for data visualization

Approach
--------
- Put together an Agile team and delivered prototype within one two week sprint
- Setup a continuous testing & delivery server in minutes with entirely open source software (DevShop), deploying the DKAN instance on Softlayer IaaS (while often hosted by commercial Drupal PaaS providers, for this prototype we wanted to demonstrate how a fully open source stack from devops to front-end presentation layer could quickly deploy and maintain a full turnkey solution on any IaaS).
- Performed minimal configuration of DKAN’s Bootstrap-based front-end to apply OpenFDA branding
- Catalogued OpenFDA API endpoints using DKAN’s administrative GUI to add them.  
- Conducted user feedback sessions and learned that user utility of the application was limited by a) the challenge of importing large datasets directly into DKAN, and b) that the standard Recline.js backend data previews that ship with DKAN were not effective in this case because of OpenFDA’s unique API (while we already had an ElasticSearch backend, OpenFDA only supports 4 query parameters which made it challenging to filter, search across all fields, select specific fields etc.).
- Based on further feedback, after vetting creating tools to import large datasets directly into Drupal Search API-powered back-ends like Solr, we elected instead to create a new custom OpenFDA Recline Backend to translate the data provided by the OpenFDA API into a format consumable by Recline.js.(https://github.com/NuCivic/openfda.js), resulting in the data visualizations visible in the prototype today, and also affording end-users the ability to create visualizations (http://openfda.nucivic.build/create-chart).
- Set up automated tests and monitoring tools to maintain the production application.

Pool Three Requirements
-----------------------

**assigned one leader, gave that person authority and responsibility and held that person accountable for the quality of the prototype submitted:**

An internal team Skype call was convened to determine staffing; Jon Pugh was assigned Team Leader based on skills and availability: https://github.com/NuCivic/data-openFDA/blob/master/TEAM.md 

**assembled a multidisciplinary and collaborative team including a minimum of 5 labor categories from the Development Pool labor categories to design and develop the prototype:**

Jon Pugh organized a team on this same Skype call based on skills and availability, and later added participants via Slack channel as project needs became clearer: https://github.com/NuCivic/data-openFDA/blob/master/TEAM.md 

**understand what people need, by including people in the prototype development and design process:**

Team involved NuCivic business team and Fig Leaf partner organization team both not directly involved in prototype development, throughout the project, as subject matter experts in end-user open data use cases, and as non-engineer end-user QA testers (e.g.: https://github.com/NuCivic/data-openFDA/issues/20, https://github.com/NuCivic/data-openFDA/issues/21, https://github.com/NuCivic/data-openFDA/issues/26).

**used at least three "human-centered design" techniques or tools**

Team used:
- an iterative design process, adjusting the prototype based on what we learned, as we worked on it, e.g.: https://www.evernote.com/l/AAFsEuAR7iVB8oDT6o-Ii_ef24UDFy58mec  and https://www.evernote.com/l/AAG23Oev4ctEKKUEDG1cbrm5KMsfbpwLBMw 
- testing with external users, incorporating user feedback throughout, e.g.: https://github.com/NuCivic/data-openFDA/issues/20, https://github.com/NuCivic/data-openFDA/issues/21, https://github.com/NuCivic/data-openFDA/issues/26
- human-like language behat tests, e.g.: https://github.com/NuCivic/data-openFDA/blob/master/tests/features/openfda.feature 

**created or used a design style guide and/or a pattern library:**

Used Bootstrap (http://getbootstrap.com/) as design style guide and pattern library: https://github.com/NuCivic/data-openFDA/search?utf8=%E2%9C%93&q=bootstrap   

**performed usability tests with people:**

Demonstrated work in progress prototype to non-engineers such as Jared Shapiro and collected feedback: https://github.com/NuCivic/data-openFDA/issues/20#issuecomment-118991061 

**used an iterative approach, where feedback informed subsequent work or versions of the prototype**

Team talked through proposed approach on calls with NuCivic business team and Fig Leaf partner, and used this feedback to establish initial technical and conceptual approach-- cataloguing and visualizing OpenFDA data by configuring and extending DKAN.  After initial deployment, the team solicited additional feedback via email and slack, resulting in specific issues we then addressed (e.g.: based on receiving feedback that the initial state of datasets (first calls, then reinforced on https://github.com/NuCivic/data-openFDA/issues/21 and https://github.com/NuCivic/data-openFDA/issues/23), we invested in building the OpenFDA Recline Backend charts tool (https://github.com/NuCivic/openfda.js), after determining it was feasible in the timeline.  

**created a prototype that works on multiple devices, and presents a responsive design**

DKAN leverages bootstrap (http://getbootstrap.com/), so is responsive out of the box (note: in the interests of time, this OpenFDA prototype was optimized only for Chrome browsers; charting functionality may not render properly on other browsers)

**used at least five modern and open-source technologies, regardless of architectural layer (frontend, backend, etc.)**

- Drupal: https://github.com/NuCivic/data-openFDA/search?utf8=%E2%9C%93&q=drupal 
- DKAN: https://github.com/NuCivic/data-openFDA/search?utf8=%E2%9C%93&q=dkan 
- JQuery: https://github.com/NuCivic/data-openFDA/search?utf8=%E2%9C%93&q=jquery 
- Bootstrap: https://github.com/NuCivic/data-openFDA/search?utf8=%E2%9C%93&q=bootstrap 
- Recline: https://github.com/NuCivic/data-openFDA/search?utf8=%E2%9C%93&q=recline.js 
- DevShop: https://github.com/NuCivic/data-openFDA/search?utf8=%E2%9C%93&q=devshop 

**deployed the prototype on an Infrastructure as a Service (IaaS) or Platform as a Service (PaaS) provider, and indicated which provider they used**

The prototype’s IaaS is Softlayer (http://www.softlayer.com/), and we manage our own PaaS running DevShop (https://github.com/opendevshop/devshop).

**wrote unit tests for their code**

DKAN uses Behat tests, and we also created a custom test for the openFDA site: https://github.com/NuCivic/data-openFDA/blob/master/tests/features/openfda.feature 

**set up or used a continuous integration system to automate the running of tests and continuously deployed their code to their IaaS or PaaS provider**

The site was setup using devshop in "Continuous Delivery" mode (any pushes to primary master branch will automatically be deployed).  DevShop creates test environments for each Pull Request, and runs tests on every git push.  Merge to ‘master’ branch deploys to the live environment (http://devshop.openfda.nucivic.build/).  

**set up or used configuration management**

DevShop manages all configuration for sites including Apache, MySQL, and PHP, and the filesystem.  See for example http://devshop.readthedocs.org/en/latest/architecture/#apache 

**set up or used continuous monitoring**

We set up NewRelic for continuous monitoring: https://raw.githubusercontent.com/NuCivic/data-openFDA/master/docs/continuous-monitoring.png 

**deploy their software in a container (i.e., utilized operating-system-level virtualization)**

In the interests of time, the main prototype site itself at openfda.nucivic.build is not yet running on containers, but to demonstrate deploying in containers, we deployed a copy at http://openfda.nucivic.build:32780/ using Terra (http://github.com/terra-ops/terra-app using Docker containers.  In a future sprint, we would integrate Terra with Devshop for continuous integration combined with container deployment.  It could also be readily be deployed to Pantheon PaaS (https://pantheon.io/docs/articles/sites/all-about-application-containers/).

**provided sufficient documentation to install and run their prototype on another machine**

DKAN can be installed locally on any number of tools: Acquia DevDeskop, MAMP, Kalabox, Vagrant, or our new tool for Drupal sites on Docker: https://github.com/terra-ops/terra-app (installation Instructions (http://terra.readthedocs.org/en/latest/install/ and (http://terra.readthedocs.org/en/latest/drupal/). Specific process documentation about this prototype: https://github.com/NuCivic/data-openFDA/blob/master/docs/PROCESS.md.  
Commercial PaaS alternatives include Pantheon (http://pantheon.io) or Acquia (http://acquia.com).

**openly licensed and free of charge:**

Components are open sourced, including (https://github.com/NuCivic/dkan/blob/7.x-1.x/LICENSE.txt and (https://github.com/opendevshop/devshop/blob/0.x/LICENSE.txt  

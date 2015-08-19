[![Code Climate](https://codeclimate.com/github/FullSailWDD/ProRubric/badges/gpa.svg)](https://codeclimate.com/github/FullSailWDD/ProRubric)

[![Codeship Status](https://www.codeship.io/projects/a5dda180-1d33-0133-224b-76f7207d5aaa/status?branch=master)](https://codeship.com/projects/94948)

# ProRubrics

## Installation

Setup your Local Dev Environment. It should support NodeJS, MongoDB, Gulp and Nodemon. (todo Videos covering this)

Clone the repo files to your Local Dev Environment:

`git clone --origin github git@github.com:FullSailWDD/ProRubric.git `

Run the installer to download the dependency modules:

`npm install`

## Run Locally

To run your Local Dev Environment run the Gulp command

`gulp`

Launch [localhost:3000](http://localhost:3000)

## Branched Dev Procedure

All development should strictly adhere to this workflow.

1. Start On the Master Branch `git checkout master`
1. Ensure you have the latest shared code `git pull github master`
1. Create new *Local Branch* for your feature with a *good* semantic name `git checkout -b DescriptiveFeatureName`
1. Edit the files appropriate to your feature.
1. Test
1. Add / Commit
1. Write Relevant Unit Test
1. Test
1. Add / Commit
1. Push *Local Branch* to Remote
1. On Github, create *Pull Request* to merge your FeatureBranch into master. NOTE: You should not be approving your own Pull Request, request another team member to *Code Check* and merge.


## Deployment Procedure

The sequential steps needed to be preformed by the PM and aided by the Team Members.

1. Increment  [Semver](http://semver.org/) in package.json (todo automate)
1. Add / Commit
1. Tag Commit for Release
1. Create pull request to Releases Branch
1. Team preforms final spot check (todo Automate collection of Trello Archived cards to cross reference)
1. Merge upon CodeShip's approval
## About Developers community

This is one of the open-source repositories to support developers as well as a journalist to be more productive in their workplace.

## About structured journalism

This project helps in structuring the content/creating a template(story) on trending topics by customizing the news articles to grab the reader's attention. Learn more about [structure journalism](https://github.com/nervecentergarage/structured-journalism-developer-community/wiki/Structured-Journalism-at-DXC-AI-COE-Garages)

## How to use this repo

### For Developers:

#### Installation & System Requirements:

Currently we supporting most of the latest version of LINUX, Windows and MAC OS X systems.

## To setup Automation Journalism 

### Steps to install “Docker”
>Install docker from https://www.docker.com/products/docker-desktop
>
>Follow the installation steps mentioned in the link https://nodered.org/docs/getting-started/docker
>
>The node-red is deployed in the docker.
>
>Deploy the Docker in the Heroku.

### Steps to install “Heroku”
>Click on the link and sign-up http://heroku.com/
>
>Click on the “Create new app”, under “New” button, and create an application in the Heroku.
>
>Open the terminal window/command prompt
>
>Login to the “Heroku” using the command and follow the below steps

```
$ heroku login
$ docker tag nodered/node-red registry.heroku.com/nerve-center-automation/web
$ heroku container:login
$ docker push registry.heroku.com/nerve-center-automation/web
$ heroku container:release web --app nerve-center-automation
$ heroku logs --app nerve-center-automation
```
Go back to the Heroku web, and launch the application by clicking the “Open app”

The node red will be launched and below is the url to access https://nerve-center-automation.herokuapp.com/

### Steps to install “node red”
Node-red installed in the system. Installation of Node-red locally https://nodered.org/docs/getting-started/local

Upon Node-red installation, the required nodes shall be available by navigating to “Manage Palette->Palette” option found on top-right in the Node-red window.

### The Node-red flow consist of:
Timestamp node(Inject node)- to trigger the flow
```
Module : node-red : inject (Core node)

Description: Will inject the message into the flow at regular intervals.
finite-state-machine - A finite state machine implementation for node red
```
```
Module: node-red-contrib-finite-statemachine : finite-state-machine

Description: This node will have the transition from different states.
msg payload node - to debug and display in the sidebar
```
```
Module : node-red : debug (Core node)

Description : It displays the message property in the sidebar, and through msg.payload we get to see the full message of the JSON expression.
```
Steps to display the transition of different states:
```
Trigger the node timestamp upon each different transition state.
```
### For Journalist/Non-Developers:

Tool developement in process

## Projects overview

## Getting started

### Pre-Requsites:

#### Developers:

Knowledge on 
+ Python
+ Docker
+ Node-red

## Supporting Repositories of Developers Community

Here some of the supporting project repositories of structure journalism listed below with a brief overview,

##### Content Template Team:

> Group of members focusing on creating responsive and more efficient templates to present the content(stories) created by [article production team](https://github.com/nervecentergarage/structured-journalism-article-production).
To know more about Content template [click here](https://github.com/nervecentergarage/structured-journalism-content-templates)

##### Article Production Team:

> Team focusing on AI to support journalists on assembling the final stories and to find any tedium contents in the final content prepared for publishing before the approval process. Click here to know more about [article production team](https://github.com/nervecentergarage/structured-journalism-article-production).

##### Automation Team:

> Automation team mainly focuses on automating most of the steps carried out within the Journalism ecosystem to make the process simpler in assigning stories based on the journalist's availability, notifying the editors on completed stories to review, and further sending for approval to publish contents and other process involved.Click here to find [Automation Team Repository](https://github.com/nervecentergarage/structured-journalism-automation)

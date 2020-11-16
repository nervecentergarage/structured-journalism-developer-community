## About Developers community

This is one of the open-source repositories to support journalist to be more productive in publishing the news articles. A group of developers involved in assisting journalist,  by creating and personalizing news snippets to provide enough information as well as to grab reader's attention.

## About structured journalism

This project helps in structuring the content/creating a template(story) on trending topics by customizing the news articles to grab the reader's attention. Learn more about [structure journalism](https://github.com/nervecentergarage/structured-journalism-developer-community/wiki/2.-Structured--Journalism-at-DXC-AI-COE-Garages)

## Projects overview

## Getting started
Flow between different teams will be added sooner

### How to use this repo

### For Developers:

#### Installation & System Requirements:

Currently we supporting most of the latest version of LINUX, Windows and MAC OS X systems.

## To setup content templates:

Yet to be added. In progress.

### Pre-Requsites:

Knowledge on 
+ Heroku
+ HTML

## To setup Article Production:

### Pre-Requsites:

Knowledge on 
+ Docker
+ Heroku
+ Python
+ Flask
+ MongoDB

### To setup the Heroku API endpoint
### Setting up Heroku and Github Secrets

1. **Create a Heroku account**_ - you will need a heroku account to setup the API endpoint through a hosted heroku app. Create your account through the heroku site: https://www.heroku.com/

2. **Create a Heroku app** - once created take note of the following variables so that you can replace the github secrets found in the yml file found in the repository.
    + Heroku Email - the email address used for the Heroku account used to create the app.
    + Heroku App name - the name of the Heroku app you just created.
    + Heroku App key - the API key for the Heroku app you just created.
  
3. **Setup Github Secrets** - with the following variables noted above you will have to set them within your own Github repository secrets settings. The created secrets should be assigned the following names.
    + HEROKU_EMAIL - to be set to the noted Heroku email.
    + HEROKU_APP_NAME - to be set to the noted Heroku app name
    + HEROKU_API_KEY - to be set to the noted Heroku API key
    
#### Setting up Heroku Addons

4. **Get the Heroku Redis Add-on** - this will be required for your Heroku web components to enqueue tasks for your Heroku worker component to process them.

#### Setting up MongoDB

5. **Create a MongoDB account** - this account will be used to create the Databases. Create and login here: https://www.mongodb.com/

6. **Create the Following Databases**

    + Snippet_DB - this database will be used in the mongo connection string for the web component in your Heroku App.
    + News_Article_DB - this database will be used in the mongo connection string for the worker in your Heroku App.
    
7. **Create a User with Database Access** - this user will be used in the mongo connection string.

#### Setting up the Heroku Config Variables

8. **Set the Redis URI** - take the Heroku Redis add-on URI link and set it in the config variables within your Heroku application.
    + REDIS_URL - set the Redis URI to this name within the config vars.
    
9. **Get the two Mongo Connection Strings** - take note of the 2 connection strings and set them to the following variables in the setting of your Heroku application within the config vars option (Show Config Vars).
    + WEB_MONGO_SNIPPET_DB - set the name of this config var to the Mongo connection string that references the Snipper_DB.
    + WORKER_MONGO_ARTICLES_DB - set the name of this confic var to the Mongo conneciton string that references the News_Article_DB.
    + *It is a good practice to hide database connection strings, and if you look into the code you will notice the two config variables being set.
 
10. **Setup Elasticsearch** - create an account and take note of the password. Then set another pair of config variables in your Heroku application.
    + ELASTIC_API - which is used the API key used to connect to your Elasticsearch function.
    + ELASTIC_USER - which is the username used to access your Elasticsearch endpoint.
    + PASS_ELASTIC - which is the password that you set to access your Elasticsearch endpoint.

## To setup Automation Journalism 

### Pre-Requsites:

Knowledge on 
+ Python
+ Docker
+ Node-red
+ Heroku

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
> Node-red installed in the system. Installation of Node-red locally https://nodered.org/docs/getting-started/local
> 
> Upon Node-red installation, the required nodes shall be available by navigating to “Manage Palette->Palette” option found on top-right in the Node-red window.

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

List of API's will be added for the benifit of journalist/Non-developers.Using API's journalist/Non-developers can able to process the data by providing input to produce desired output.

## Related Repositories of Developers Community

Here some of the supporting project repositories of structure journalism listed below with a brief overview,

##### Content Template Team:

> Group of members focusing on creating responsive and more efficient templates to present the content(stories) created by [article production team](https://github.com/nervecentergarage/structured-journalism-article-production).
To know more about Content template [click here](https://github.com/nervecentergarage/structured-journalism-content-templates)

##### Article Production Team:

> Team focusing on AI to support journalists on assembling the final stories and to find any tedium contents in the final content prepared for publishing before the approval process. Click here to know more about [article production team](https://github.com/nervecentergarage/structured-journalism-article-production).

##### Automation Team:

> Automation team mainly focuses on automating most of the steps carried out within the Journalism ecosystem to make the process simpler in assigning stories based on the journalist's availability, notifying the editors on completed stories to review, and further sending for approval to publish contents and other process involved.Click here to find [Automation Team Repository](https://github.com/nervecentergarage/structured-journalism-automation)

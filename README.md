# CODAWEEN

For our unit 2 project, we decided to create a Halloween costume ranking app for CODA!

## Overview

The app allows users to create, edit, and delete user accounts, create, edit, and delete costumes, create, edit, join, leave, and delete groups, and vote for existing costumes. You can check it out at: https://codaween.herokuapp.com/authenticate/register

## User Stories

The user stores can be accessed at: https://trello.com/b/iZu5bNXR/codaween

## Wireframes 

### Home: 

https://wireframe.cc/rAbUUd

### Costume Show Page: 

https://wireframe.cc/XAc3tu

### User Show Page: 

https://wireframe.cc/IUlt0a

### Login/Sign up page: 

https://wireframe.cc/TycH6x

## Technologies Used

We used Express.js for writing routes, Sequelize and Postgres for database creation and management, JavaScript and jQuery for front-end logic, CSS and Bootstrap for styling, Ejs for for rendering views, Chai, Mocha, and Supertest for testing, Bcrypt for encrypting passwords, cookies and JSON Web Tokens for authentication, Csurf for CSRF protection, Nodemon for running a local server during development, Node.js for installing dependencies and testing, and Heroku for hosting the app on the web. 

## Development Approach

We began the development process with writing down user stories on a trello board and making wireframes to help visualize the end product. Then, we set up the folder structure and git repository, downloaded the necessary dependancies using npm, created the models, migrations, and seed files for the database, set up the database, wrote the back-end routes, created views, wrote the front-end logic for voting, added authentication, added CSRF protection, clickjacking protection (by denying permission to enclose the app in an i-frame), and other security features, and finally, added styling. 

## Unsolved Problems

The voting functionality doesn't always work: when the Vote for Costume button is pressed, a GET request is submitted to retrieve the number of votes for a costume and a PUT request is submitted to update this number - it seems that the PUT request isn't always going through, which is probably a problem with Heroku. It does work occasionally, which is how some of the votes on the leaderboard have been incremented. 
  
It seems that the Leaderboard on the home page doesn't show up on some computers - if you can't see it on yours, please slack Viktoria for a demo. 

![60% of the time, it works everytime...](http://e.lvme.me/nzu2igx.jpg)

## Folders

``` 
/config 
  * config.json - connects to remote Heroku database
  * herokuconfig.json - used during development to store the Heroku database info while the config.json was set to a local database
  * main.js - contains the secret for authentication
/controllers
  * authenticate.js - contains routes for logging in, logging out, and registering new users
  * costumes.js - contains routes for costumes
  * groups.js - contains routes for groups
  * users.js - contains routes for users
/migrations
  * contains migrations for each of our models
/models
  * contains the models for the costume, group, and user tables, as well as the usercostume and usergroup models for the join tables
/planning
  * trello-link.md - contains a link to the trello board with user stories
  * wireframes.md - contains links to wireframes on wireframe.cc
/public
  /css
    * box.css - some elements of page styling
    * master.css - main CSS styling
  /js
    * jquery-3.2.1.js
    * main.js - voting logic
    * sort.js - sorts costumes by number of votes received in descending order on the homepage of the website     (codaween.herokuapp.com)
/seeders
  * contains files to seed the costumes, users, and groups tables 
/test
  * authentication_test.js - tests authentication
  * costumes_test.js - used to test the costumes routes before implementing authentication 
  * groups_test.js - used to test the groups routes before implementing authentication
  * users_test.js - used to test the users routes before implementing authentication
/views
  * contains views for all rendered routes
```



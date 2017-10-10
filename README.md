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



## Unsolved Problems

The voting functionality doesn't always work: when the Vote for Costume button is pressed, a GET request is submitted to retrieve the number of votes for a costume and a PUT request is submitted to update this number - it seems that the PUT request isn't always going through, which is probably a problem with Heroku. It does work occasionally, which is how some of the votes on the leaderboard have been incremented. 

It seems that the Leaderboard on the home page doesn't show up on some computers - if you can't see it on yours, please slack Viktoria for a demo. 

## Folders

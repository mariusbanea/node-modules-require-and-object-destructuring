Live coding practice interview question
=======================================

## Overview

- Application: FullStack Todo Application, the client is based on [Todo MVC](http://todomvc.com/)
- Stack:
  - Client: Basic jQuery selectors, event-handlers, DOM manipulation and AJAX
  - Web Server: Node and Express with Mongoose 
  - Database: Mongo hosted by [MLab](mlab.com)
  - Tests: Mocha, Chai, Chai-Http and Shai-Spies

## The "Rules"

- You should attempt to complete this challenge without looking at any other resources such as googling stack-overflow, documentation or course materials. However, you may ask the interviewer clarifying questions at any point.
- If you get stuck you have 3 lifelines (like Who Wants to Be a Millionaire)
  - 1) Online documentation - browse Express, Mongoose, Chai, Chai-Http docs
  - 2) Interview Hint - Ask the interview for a hint
  - 3) Google search - 30 seconds of google search including stack-overflow

## Setup

- Go to `mLab.com` and create a new Sandbox database
- Create a User for this database:  
  - Click "Users" tab and then click "Add database user"
  - Enter "Username" and "Password"
- Copy the `mongodb://...` URI to the `.env` file in this project

```
DATABASE_URL=mongodb://<USER>:<PASSWORD>@ds112345.mlab.com:12345/<DBNAME>
```

- Open the "Logs" in this project
- You should see output from 10 integration tests

## Test
## Introduction

This is an API which was developed as a part of a selection process for evaluation purposes. It is responsible for processing a User's Sign Up, Sign In and to search for User's info.

## Table of Contents

- [Technologies](#technologies)
- [Getting Started](#getting-started)
- [Running Tests](#running-tests)
- [How to use the API and Checkout](#how-to-use-the-api-and-checkout)
- [Routes](#routes)

## Technologies

In this project the following technologies were used:

- [Npm](https://www.npmjs.com/) - Package manager
- [Express](https://expressjs.com/) - Web development framework for node.js
- [Mongoose](https://mongoosejs.com) - Object modeling for node.js
- [MongoDB](https://www.mongodb.com) - Database
- [MongoDBAtlas](https://www.mongodb.com/cloud/atlas) - Database host (cloud database)
- [Jest](https://jestjs.io) - Test runner for node.js

## Getting Started

First of all, you need Node.js and Npm installed and then clone this repository to you computer:

```
$ git clone https://github.com/ramoncrescenti/test-backend.git
```

Now you need to have to install the project's dependencies on your computer, enter the project's folder and run:

```
$ npm install
```

Once that's done, you're set! If you want to run the server:

```
$ npm run dev
```

## Running Tests

To run the unit tests, you can either run any test file separetly like this:

```
$ npm test -- file-name.test.js
```

Or you can run all of them in sequence using this command:

```
$ npm run test
```

## How to use the API

Here is a [Postman Documentation](https://documenter.getpostman.com/view/16820458/UV5UkKQH) that describes how the API should be correctly used.

## Routes

|  Routes   |     Description     | Methods |
| :-------: | :-----------------: | :-----: |
|  /signup  | register a new user |  POST   |
|  /signin  |    user logs in     |  POST   |
| /user/:id | get data from user  |   GET   |

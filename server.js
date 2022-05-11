/* 
server.js

This script contains necessary code to run the server of Employee Management System

Copyright Leo Wong 2022
*/

// express is an npm library package which links client requests to server responses
const express = require('express');

// mysql2 is an npm library package which allows javascript access to an SQL database
const mysql = require('mysql2');

// import modular router for /api
const api = require('./routes/index');

// process.env.PORT is a requirement for Heroku deployment, in case we need to later on: https://help.heroku.com/P1AVPANS/why-is-my-node-js-app-crashing-with-an-r10-error
const PORT = process.env.PORT || 3001;

// assign variable for readability
const app = express();

// function to start server
function init() {
	//
	// implement middleware for parsing JSON
	app.use(express.json());

	// implement middleware for parsing urlencoded form data
	app.use(express.urlencoded({ extended: false }));

	// implement middleware for handling /api routes
	app.use('/api', api);
}

// call function to start server
init();

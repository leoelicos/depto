/* 
server.js

This script contains necessary code to run the server of Employee Management System

Copyright Leo Wong 2022
*/

// express is an npm library package which links client requests to server responses
const express = require('express');

// mysql2 is an npm library package which allows javascript access to an SQL database
const mysql = require('mysql2');

// process.env.PORT is a requirement for Heroku deployment, in case we need to later on: https://help.heroku.com/P1AVPANS/why-is-my-node-js-app-crashing-with-an-r10-error
const PORT = process.env.PORT || 3001;

// assign variable for readability
const app = express();

// function to start server
function init() {}

// call function to start server
init();

/* 
index.js

This script contains necessary code to handle routes to /api

Copyright Leo Wong 2022
*/

// express is an npm library package which links client requests to server responses
const express = require('express');

// import modular router for /add
const addRouter = require('./add');

// import modular router for /view
const viewRouter = require('./view');

// import modular router for /update
const updateRouter = require('./update');

// import modular router for /delete
const deleteRouter = require('./delete');

// assign variable for readability
const app = express();

// implement mounted middleware for handling /add
app.use('/add', addRouter);

// implement mounted middleware for handling /view
app.use('/view', viewRouter);

// implement mounted middleware for handling /update
app.use('/update', updateRouter);

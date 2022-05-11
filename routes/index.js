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

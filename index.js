/* 
server.js

This script contains necessary code to run Employee Management System

Copyright Leo Wong 2022
*/

// utility function to create new classes based on user input
const run = require('./src/run');
const { tertiary } = require('./src/utils/chalkRender');
// function to start app
function init() {
	//
	console.log(' ' + tertiary(''.padEnd(120, ' ')));
	console.log(' ' + tertiary(''.padEnd(120, '*')));
	console.log(' ' + tertiary(' EMPLOYEE MANAGEMENT SYSTEM '.padEnd(120, ' ')));
	console.log(' ' + tertiary(''.padEnd(120, '*')));
	console.log(' ' + tertiary(''.padEnd(120, ' ')));

	run();
}

// call function to start app
init();

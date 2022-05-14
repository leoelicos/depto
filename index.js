/* 
index.js

This script contains necessary code to run Employee Management System

Copyright Leo Wong 2022
*/

const { logoHelper } = require('./src/utils/chalkRender');

const EMS = require('./src/Ems.js');
const ems = new EMS();

// function to start app
function init() {
	//
	logoHelper('', ' ');
	logoHelper('', '*');
	logoHelper(' EMPLOYEE MANAGEMENT SYSTEM ', ' ');
	logoHelper('', '*');
	logoHelper('', ' ');

	ems.run();
}

// call function to start app
init();

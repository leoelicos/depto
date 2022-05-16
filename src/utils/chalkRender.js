/*
 * Employee Management System
 * chalkRender.js
 * this file contains necessary code to customize messages for console
 * Copyright 2022 Leo Wong
 */

// utility function to create good-looking console logs
const chalk = require('chalk');

// chalk callback functions add color to console logs for visual impact
const primary = (w) => chalk.magenta.bgWhite(` ${w} `);
const secondary = (w) => chalk.cyan.bgWhite(` ${w} `);
const tertiary = (w) => chalk.black.bgWhite(` ${w} `);
const quaternary = (w) => chalk.red(` ${w} `);
const quinary = (w) => chalk.green(` ${w} `);

const pad = ''.padStart(4);
const red = (text) => pad + quaternary(text);
const white = (text) => pad + tertiary(text);
const green = (text) => pad + quinary(text);

const SIZE_OF_SCREEN = 120;
const logoHelper = (message, padChar) => console.log(' ' + tertiary(message.padEnd(SIZE_OF_SCREEN, padChar)));

// static helper functions to log errors with sql
const sqlErr = (sql, err) => red(`Check your SQL: ${sql}\n${err}\n`);

// static helper functions to log errors with sql and params
const sqlParamsErr = (sql, params, err) => red(`Check your SQL: ${sql}\n${JSON.stringify(params)}\n${err}\n`);

module.exports = { primary, secondary, tertiary, quaternary, logoHelper, quinary, red, white, green, sqlErr, sqlParamsErr };

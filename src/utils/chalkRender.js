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

module.exports = { primary, secondary, tertiary, quaternary, logoHelper, quinary, red, white, green };

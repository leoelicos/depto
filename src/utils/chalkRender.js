/* 
 chalkRender.js
 
 this file contains code to render messages in the console using customization via chalk

 Copyright Leo Wong 2022
 */

// utility function to create good-looking console logs
const chalk = require('chalk');

// chalk callback functions add color to console logs for visual impact
const primary = (w) => chalk.magenta.bgWhite(` ${w} `);
const secondary = (w) => chalk.cyan.bgWhite(` ${w} `);
const tertiary = (w) => chalk.black.bgWhite(` ${w} `);
const tableOfContents = (heading, headingLength, subheading, subheadingLength, delimiter) => primary(heading).padEnd(headingLength, delimiter) + primary(subheading).padStart(subheadingLength, delimiter);

module.exports = { primary, secondary, tertiary, tableOfContents };

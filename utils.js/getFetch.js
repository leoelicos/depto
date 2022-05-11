/* 
getFetch.js

This utility file contains helper GET fetch functions

Copyright Leo Wong 2022
*/

const getDepartments = () =>
	fetch('/api/view/departments', {
		method: 'GET',
	})
		.then((res) => res.json())
		.then((data) => data);

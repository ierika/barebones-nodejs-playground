'use strict';
const gulp = require('gulp');


gulp.task("message", () => {
    console.log('test has been ran by gulp runner');
});

gulp.task("default", ["message"], () => {
    console.log('Running default');
});

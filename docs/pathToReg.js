let { pathToRegexp } = require('path-to-regexp');
const reg = pathToRegexp('/', [], { end: false });
console.log(reg.exec('/aaa'));
const {app,PORT} = require("../../index.js");
const fs = require('fs');
const path = require('path');

console.log('Current directory:', process.cwd());
console.log('Files in current directory:', fs.readdirSync('.'));
console.log('Parent directory:', path.resolve('..'));
console.log('Files in parent directory:', fs.readdirSync('..'));

app.listen(PORT, () => {
    console.log("서버실행")
});
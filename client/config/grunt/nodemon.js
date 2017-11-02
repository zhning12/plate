module.exports = function () {
    var port = require("../config").port.www || 80;
    return {
        dist:{
            options: {
                script: 'app.js',
                ignore: ['README.md', 'node_modules/**'],
                watch: ['routes/**', 'app.js','app/views/*.html'],
                delay: 300,
                env: {
                    PORT: port
                }
            }
        }
    }
}

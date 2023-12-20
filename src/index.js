const app = require('./app');
const config = require('./config/config');


app.listen(config.port,() => {
    console.log('server listening on port', config.port)
})
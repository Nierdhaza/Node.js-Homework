const express = require('express');
const mustache_express = require('mustache-express');
const body_parser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes/routes')


mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/Node_express', { 
    useNewUrlParser: true
}).then( () => {
    console.log('Database connected');
});

process.on('unhandledRejection', (reason, promise) => {
    console.log('Unhandled Rejection at:', reason.stack || reason)
   
});
  
const app = express();

app.use(body_parser.urlencoded( {extended: true} ) );

const mustache_expressInstance = mustache_express();

mustache_expressInstance.cache = null;

app.engine('mustache', mustache_expressInstance);


app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

app.use('/', routes);

app.listen(3000, () => console.log('Listening on port 3000'));



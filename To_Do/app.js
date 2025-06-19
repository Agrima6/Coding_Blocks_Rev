const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const todoRouter = require('./routes/todo');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

app.use('/', todoRouter);

app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});

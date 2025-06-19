const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const app = express();

let tasks = [];

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('home', { tasks });
});

app.post('/add', (req, res) => {
    const task = req.body.task;
    if (task) {
        tasks.push(task);
    }
    res.redirect('/');
});

app.post('/delete', (req, res) => {
    const index = req.body.index;
    tasks.splice(index, 1);
    res.redirect('/');
});

app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});

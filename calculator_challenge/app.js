const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

// Serve static HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Handle form submission
app.post('/calculate', (req, res) => {
    const num1 = parseFloat(req.body.num1);
    const num2 = parseFloat(req.body.num2);

    const sum = num1 + num2;
    const product = num1 * num2;
    const division = num2 !== 0 ? (num1 / num2).toFixed(2) : 'Cannot divide by zero';

const resultHTML = `
    <link rel="stylesheet" href="/style.css">
    <div class="container">
        <h2>Results</h2>
        <p><strong>Sum:</strong> ${sum}</p>
        <p><strong>Product:</strong> ${product}</p>
        <p><strong>Division:</strong> ${division}</p>
        <a href="/">Back</a>
    </div>
`;

    res.send(resultHTML);
});

app.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});

const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');


app.use(morgan('combined'));
app.use(express.static(path.join(__dirname, 'styles')));
app.set('views', './views');
app.set('view engine', 'pug');
app.get('/', (req, res) => res.render('index', { name: "David"}));

app.listen(3000, () => console.log("listening on port 3000"));

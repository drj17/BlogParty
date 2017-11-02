const express = require('express');
const app = express();
const morgan = require('morgan');


app.use(morgan('combined'));
app.set('views', './views');
app.set('view engine', 'pug');
app.get('/', (req, res) => res.render('hello', { name: "David"}));

app.listen(3000, () => console.log("listening on port 3000"));

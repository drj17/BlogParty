const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const path = require('path');
const morgan = require('morgan');
const blogFile = fs.readFileSync('./seeds/blogs.json', 'utf-8');
const blogArray = JSON.parse(blogFile);


app.use(morgan('combined'));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static(path.join(__dirname, 'styles')));
app.set('views', './views');
app.set('view engine', 'pug');

app.get('/', (req, res) => {
  res.render('index', {
    blogs: blogArray
  });
});

app.get('/new', (req, res) => {
  res.render('new');
});

app.post('/', (req, res) => {
  console.log(req.body);
  blogArray.push(req.body);

  fs.writeFile('./seeds/blogs.json', JSON.stringify(blogArray));
  res.redirect('/');
});

app.listen(3000, () => console.log("listening on port 3000"));

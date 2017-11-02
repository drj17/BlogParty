const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const path = require('path');
const morgan = require('morgan');
const uuid = require('uuid/v4');
const blogFile = fs.readFileSync('./seeds/blogs.json', 'utf-8');
const methodOverride = require('method-override');
const blogArray = JSON.parse(blogFile);


app.use(morgan('combined'));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(methodOverride('_method'));
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
  req.body["id"] = uuid();
  blogArray.push(req.body);

  fs.writeFile('./seeds/blogs.json', JSON.stringify(blogArray));
  res.redirect('/');
});

app.delete('/:id', (req, res) => {
  console.log(req.params.id);
  let newArray = blogArray.filter(post => {
    return post['id'] !== req.params.id;
  });
  console.log(blogArray);
  fs.writeFile('./seeds/blogs.json', JSON.stringify(newArray));
  res.redirect('back');
});

app.listen(3000, () => console.log("listening on port 3000"));

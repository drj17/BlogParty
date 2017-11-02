const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');
const uuid = require('uuid/v4');
const blogFile = fs.readFileSync('./seeds/blogs.json', 'utf-8');
const methodOverride = require('method-override');
require('dotenv').config({ path: './variables.env'});
mongoose.connect(process.env.DATABASE, { useMongoClient: true });
const db = mongoose.connection;

db.on('error', (err) => console.error(err));
let Blog, blogSchema;
db.once('open', () => {
  blogSchema = new mongoose.Schema({
    author: String,
    title: String,
    body: String,
    updatedAt: Date,
    createdAt: Date
  });

  Blog = mongoose.model('Blog', blogSchema);
});



app.use(morgan('combined'));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'styles')));
app.set('views', './views');
app.set('view engine', 'pug');

app.get('/', (req, res) => {
  Blog.find((err, blogArray) => {
    if(err) {
      res.status(500);
    } else {
      res.render('index', {
        blogs: blogArray
      });
    }
  });

});

app.get('/new', (req, res) => {
  res.render('new');
});

app.post('/', (req, res) => {
  Blog.create(req.body, (err, create) => {
    if (err) {
      console.log(err);
    }
  });
  res.redirect('/');
});

app.delete('/:id', (req, res) => {
  Blog.deleteOne({ _id: req.params.id }).remove(() => res.redirect('/'));
});

app.listen(process.env.PORT, () => console.log("listening on port 3000"));

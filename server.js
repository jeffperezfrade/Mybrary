if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');

const indexRouter = require('./routes/index');
const authorRouter = require('./routes/authors');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');

app.use(expressLayouts);
// Para scripts, css, imagenes, etc (archivos publicos)
app.use(express.static('public'));
// Pq estamos enviando los datos mediante url al servidor
// Limit -> util para cuando agregamos archivos a nuestro servidor
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }));

const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', error => console.error(error));
db.once('open', () => console.log('Conectado con Mongoose :)'));

app.use('/', indexRouter);
app.use('/authors', authorRouter); // authors/ -> es lo que aparecera en la url

app.listen(process.env.PORT || 3000);
const express = require('express');
const router = express.Router();

// Acceso a author models que hemos creado
const Author = require('../models/author');

// All authors route
router.get('/', async (req, res) => {
    let searchOptions = {};
    // .query aparece en la url algo como: ?name=(lo que escribas en el buscador) 
    // nos aseguramos que valga algo antes de enviarlo al servidor y si no vale nada lo mostramos todo
    if(req.query.name != null && req.query.name !== ''){
        // Pasamos la 'i' para que sea no sensible a mayusculas y minusculas
        searchOptions.name = new RegExp(req.query.name, 'i')
    }
    try {
        // {} queremos decir sin condiciones, es decir, devolver todos los autores
        const authors = await Author.find(searchOptions);
        res.render('authors/index', { 
            authors: authors, 
            searchOptions: req.query 
        });
    } catch {
        res.redirect('/');
    }    
});

// New Author route
router.get('/new', (req, res) => {
    // Crea un author que podemos utilizar para guardar o eliminar, actualizar cosas dentro de la base de datos
    // Ademas crea un objeto que podemos usar en nuestro archivo ejs
    res.render('authors/new', { author: new Author() });
});

// Create Author route
router.post('/', async (req, res) => {
    // Pasamos el name pq el usuario puede pasar un parametro ID en vez del body
    const author = new Author({
        name: req.body.name
    })
    try {
        // Esperamos al author.save() que termine con el 'await'
        // Esto se hace pq todo en mongoose es asincrono
        const newAuthor = await new author.save();
        //res.redirect(`authors/${newAuthor.id}`)
        res.redirect(`authors`);
    } catch {
        res.render('authors/new', {
            author: author,
            errorMessage: `Error creando Autor`
        });
    }
});

module.exports = router;
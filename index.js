import express from 'express'
import { engine } from 'express-handlebars';
import path from 'path'

const app = express()

// ruta absoluta
const __dirname = import.meta.dirname

// middleware archivos estáticos
app.use(express.static('public'))
console.log(__dirname)
app.use('/assets/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'))
app.use('/assets/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')))

app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', __dirname + '/views');

app.get('/', (req, res) => {
    res.render('home', { title: "Ejercicio hbs", user: null })
})


app.get('/servicios', (req, res) => {
    res.render('servicios', { products: products, fruts })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`App corriendo en el siguiente puerto: ${PORT}`)
})
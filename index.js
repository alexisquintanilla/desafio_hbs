import express from 'express'
import { engine } from 'express-handlebars';
import path from 'path'
import { services } from './data/service.data.js'

const app = express()

// ruta absoluta
const __dirname = import.meta.dirname

// middleware archivos estáticos
app.use(express.static('public'))
console.log(__dirname)
app.use('/assets/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')))
app.use('/assets/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')))

app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', __dirname + '/views');

app.get('/', (req, res) => {
    res.render('home', { title: "Ejercicios hbs", user: null })
})

app.get('/services/:name', (req, res) => {
    const service = req.params.name
    const serviceData = services.find((url) => url.url === `/services/${service}`)

    if (!serviceData) {
        return res.status(404).render('404', { title_error: "Error no se encuentra el servicio" })
    }

    res.render('service', { service: serviceData })

})

app.get('/services', (req, res) => {
    res.render('servicios', { services: services })
})



// error si la ruta no es correcta
app.use('*', (req, res) => {
    res.status(404).render('404', { title_error: "Pagina no encontrada" })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`App corriendo en el siguiente puerto: ${PORT}`)
})
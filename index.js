import express from 'express';
import router from './routes/productos.js'

const app = express();
const PORT = 8080;
const productosRouter = router

// --- Root
app
.use(express.static('public'))
.use(express.json())
.use(express.urlencoded({ extended: true }));

app.get('/', function (req, res) {
  res.send('Express Test is Working!');
})
app.use('/api/productos', productosRouter)

app.listen(PORT, () => console.log('The port is: ' + PORT));
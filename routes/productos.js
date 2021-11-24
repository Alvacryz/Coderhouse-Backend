import express from 'express';
import Container from '../ContainerProduct.js'
const router = express.Router()

// --- Productos
router
.route("/")
.get((req, res) => {
    res.send(test.getAll());
})
.post((req, res) => {
    const newTitle = req.body.title
    const newPrice = req.body.price
    const newURL = req.body.thumbnail

    const newObject = {
        title: req.body.title,
        price: req.body.price,
        thumbnail: req.body.thumbnail
    }

    console.log('New object added:');
    console.log(newObject);
    res.send(test.save(newObject));
});

// --- Productos por ID
router
.route("/:id")
.get((req, res) => {
    res.send(test.getById(+req.params.id));
})
.put((req, res) => {
    if(req.params.id !== null){
        const resProduct = test.getById(res.params.id)
        const inputProduct = req.query;
        const newProduct = Object.assign(resProduct, inputProduct);
        res.send(test.saveById(obj));
    }
})
.delete((req, res) => {
    res.send(test.deleteById(+req.params.id));
}); export default router

let test = new Container('./productos.txt');
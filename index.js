const fs = require('fs')
const express = require('express');

const app = express();
const PORT = 8080;
 
// Hosting Express
app.get('/', function (req, res) {
  res.send('Express Test is Working!');
})
app.get('/productos', function (req, res) {
    res.send(test.getAll());
  })
  app.get('/productosRandom', function (req, res) {
    let array = test.getAll()
    let randomized = array[Math.floor(Math.random()*array.length)];
    res.send(randomized);
  })
app.listen(PORT, () => console.log('The port is: ' + PORT));


// ----- Container Constructor
class Container{
    constructor(url){
        this.url = url
    };
    // Save the products into the array.
    save(obj){
        try{
            const data = fs.readFileSync(this.url, 'utf-8');
            let products = JSON.parse(data);
            // Buscar el ID mas grande
            let maxID = Math.max.apply(null, products.map(item => item.id));
            // Agregar el ID siguiente al objeto
            obj.id = maxID + 1;
            try {
                products.push(obj)
                const newProducts = JSON.stringify(products);
                fs.writeFileSync(this.url, newProducts);
                console.log('Un nuevo producto a sido agregado al array!');
            } catch (error) {
                console.log('El producto no pudo ser agregado!');
            };
        } catch (error){
            console.log(error);
            console.log('El archivo no puede ser leido.')
            };
        };
    // Get product within the array by ID.
    getById(a){
        if(a > 0){
            let data = JSON.parse(fs.readFileSync(this.url, 'utf-8'));
            let product = data.find(product => product.id === a);
            if(product != null){
                return product;
            } else {
                console.log('El producto no existe.');
            };
        } else {
            console.log('ID Invalido.');
        };
    };
    // Get all the products inside the array.
    getAll(){
        let readFile = JSON.parse(fs.readFileSync(this.url, 'utf-8'));
        return readFile;
    };
    // Delete a specific product in the array.
    deleteById(a){
        if(a > 0){
            let data = JSON.parse(fs.readFileSync(this.url, 'utf-8'));
            let products = data.find(product => product.id === a);
            if(products != null){
                const removeItem = data.findIndex(product => product.id === a);
                data.splice(removeItem, 1);
                const newProducts = JSON.stringify(data);
                fs.writeFileSync(this.url, newProducts);
                console.log('El producto a sido borrado.')
            } else {
                console.log('El producto que desea eliminar no existe.');
            };
        } else {
            console.log('ID Invalido.');
        };
    };
    // YEET all.
    deleteAll(){
        return fs.unlinkSync(this.url);
    };
}

let test = new Container('./productos.txt');

//let testObject = {
//        title:"Test D",
//        price:"Price D",
//        thumbnail:"Picture D"
//};

//console.log(test.getAll());
//console.log(test.save(testObject));
//console.log(test.getAll());
//console.log(test.deleteById(4));
//console.log(test.getAll());
const fs = require('fs');

class Container{
    constructor(url){
        this.url = url
    };

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

    getAll(){
        let readFile = JSON.parse(fs.readFileSync(this.url, 'utf-8'));
        return readFile;
    };

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

    deleteAll(){
        return fs.unlinkSync(this.url);
    };
}

let testObject = {
        title:"Test D",
        price:"Price D",
        thumbnail:"Picture D"
};

let test = new Container('./productos.txt');
console.log(test.getAll());
console.log(test.save(testObject));
console.log(test.getAll());
console.log(test.deleteById(4));
console.log(test.getAll());
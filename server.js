const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json());

let products = [
    { id: 1, name: "Kopi Tubruk", price: 10000 },
    { id: 2, name: "Teh Manis", price: 8000 }
];

app.get("/products", (req, res) => {
    res.json({
        status: "success",
        data: products
    });
});

app.post("/products", (req, res) => {
    const { name, price } = req.body;

    if (!name || price === undefined) {
        return res.status(400).json({
            status: "error",
            message: "Field 'name' dan 'price' wajib diisi"
        });
    }

    const newProduct = {
        id: products.length + 1,
        name,
        price
    };

    products.push(newProduct);

    res.status(201).json({
        status: "success",
        data: newProduct
    });
});

app.put("/products/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const { name, price } = req.body;

    const productIndex = products.findIndex (p => p.id === id);

    if (productIndex === -1) {
        return res.status(404).json({ status: "error", message: "Produk tidak ditemukan" })
    }
    if (!name || price === undefined || price === "") {
        return res.status(400).json({
            status: "error",
            message: "Field 'name' dan 'price' wajib diisi"
        });
    }

    products[productIndex] = {
        id,
        name,
        price: parseFloat(price)
    };

    res.json({
        status: "success",
        message: "Produk berhasil diperbarui",
        data: products[productIndex]
    });
});

app.delete("/products/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const productIndex = products.findIndex(p => p.id === id);

    if (productIndex === -1) {
        return res.status(404).json({ status: "error", message: "Produk tidak ditemukan" });
    }

    const deletedProduct = products.splice(productIndex, 1);

    res.json({
        status: "success",
        message: "Produk berhasil dihapus",
        data: deletedProduct[0]
    });
});
app.listen(port, () => {
    console.log('Server berjalan di http://localhost:3000/products');
});
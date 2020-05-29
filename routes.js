const express = require("express");
const cart = express.Router();
const cartEndpointUri = "/cart";

let cartItems = [

    {
        id: 1,
        product: "Bauer Ultrasonic Goalie Pads",
        price: 1600,
        quantity: 1
    },
    {
        id: 2,
        product: "True AX9 Composite Goalie Stick",
        price: 259,
        quantity: 3
    },
    {
        id: 3,
        product: "Vaughn V9 Chest Protector",
        price: 300,
        quantity: 1
    }

];

let nextId = cartItems.length + 1;

// 1
// GET
cart.get(cartEndpointUri, (request, response) => {
    response.json(cartItems);
    response.status(200);
})

// 2
// GET :/id
cart.get(`${cartEndpointUri}/:id`, (request, response) => {
    let id = parseInt(request.params.id);
    let cartItem = cartItems.find((item) => {
        if (item.id === id) {
            return true;
        }
    })
    if (cartItem) {
        response.json(cartItem);
        response.status(200)
    } else {
        response.status(404);
        response.send(`ID not found`);
    }
})

// 3
// POST
cart.post(cartEndpointUri, (request, response) => {
    let newCartItem = request.body;
    newCartItem.id = nextId;
    nextId++;
    cartItems.push(newCartItem);
    response.status(201);
    response.json(newCartItem);
})


// 4
// PUT
cart.put(`${cartEndpointUri}/:id`, (request, response) => {
    let id = parseInt(request.params.id);
    let updatedCartItem = request.body;
    updatedCartItem.id = id;
    let foundIndex = cartItems.findIndex((item) => {
        if (item.id === id) {
            return true;
        }
    })
    cartItems.splice(foundIndex, 1, updatedCartItem);
    response.status(201);
    response.json(updatedCartItem);
})


// 5
// DELETE
cart.delete(`${cartEndpointUri}/:id`, (request, response) => {
    let id = parseInt(request.params.id);
    let foundIndex = cartItems.findIndex((item) => {
        if (item.id === id) {
            return true;
        }
    })
    if (foundIndex > -1) {
        cartItems.splice(foundIndex, 1);
        response.json(cartItems);
        response.status(204);
    }
})








module.exports = { cart };
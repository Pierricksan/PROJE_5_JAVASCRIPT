const urlOrders = 'http://localhost:3000/api/products/order'

async function sendData (contact, products) {
const requete = await fetch(urlOrders, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: {
        contact, 
        products
    }
});

if (!requete.ok) {
    alert('un problème est survenu')
} else {
    const orderID = await requete.json();
    console.log(orderID)
    }   
}


////////////////////////////////
// VARIABLES POUR L'ENVOI
let products = JSON.parse(localStorage.getItem('Product-ID')) // récupération des id des produits
let contact = JSON.parse(localStorage.getItem("contact")) // récupération de l'object stocké dans le localstorage et remodelage en objet 

console.log(products)
console.log(contact)

sendData(contact, products)


/// variable de l'URL
const urlOrders = 'http://localhost:3000/api/products/order'

////////////////////////////////
// VARIABLES POUR L'ENVOI
let productArray = JSON.parse(localStorage.getItem('Product-ID')) // récupération des id des produits
let userData = JSON.parse(localStorage.getItem("contact")) // récupération de l'object stocké dans le localstorage et remodelage en objet 
// let products = productsJSON.toString()

let contact = {
    contact: userData,
    products: productArray,
}

async function sendData (contact) {
    console.log(contact);
    const requete = await fetch(urlOrders, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    mode : 'cors',
    body: JSON.stringify(contact),
});

if (!requete.ok) {
    alert('un problème est survenu')
} else {
    const orderID = await requete.json();
    console.log(orderID);

    }   
}

sendData(contact);


/// variable de l'URL pour l'envoie de données
const urlOrders = 'http://localhost:3000/api/products/order'

////////////////////////////////
// VARIABLES POUR L'ENVOI
// récupération des données du LocalStorage
let productArray = JSON.parse(localStorage.getItem('Product-ID')) // récupération des id des produits
let userData = JSON.parse(localStorage.getItem("contact")) // récupération de l'object stocké dans le localstorage et remodelage en objet 

// injection des variables dans un objet contact contenant les variables à transmettre
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
    const request = await requete.json();
  
    // Récupération du DOM contenant l'id à afficher
    let orderNumberDOM = document.getElementById("orderId")
    // injection de la requete de l'API contenant le numéro de l'ID
    orderNumberDOM.textContent = request.orderId

    }   
}

sendData(contact);

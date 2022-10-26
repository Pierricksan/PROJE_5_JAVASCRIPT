
/// variable de l'URL pour l'envoie de données
const urlOrders = 'http://localhost:3000/api/products/order'

////////////////////////////////
// VARIABLES POUR L'ENVOI
////////////////////////////////
// récupération des données du LocalStorage
let productArray = JSON.parse(localStorage.getItem('Product-ID')) // récupération des id des produits
let userData = JSON.parse(localStorage.getItem("contact")) // récupération de l'object stocké dans le localstorage et remodelage en objet 

// injection des variables dans un objet contact contenant les variables à transmettre
let contact = {
    contact: userData,
    products: productArray,
}

////////////////////////////////
// FONCTION D'ENVOIE DES DONNEES A L'API POUR RECUPERER L'ID DE LA COMMANDE --- PAGE DE CONFIRMATION
////////////////////////////////
async function sendData (contact) {
    // initialisation de la requête fetch en await
    const requete = await fetch(urlOrders, {
    method: 'POST', // method POST pour envoie de données sensibles de l'utilisateur et récupération d'un ID de commande 
    headers: {
        'Content-Type': 'application/json'
    },
    mode : 'cors',
    body: JSON.stringify(contact), // appel de l'objet à envoyer à l'API pour un retour de celle-ci en fonction des données envoyées en POST
    });

    if (!requete.ok) {
        alert('un problème est survenu')
    } else {
        const request = await requete.json();
        // Récupération du DOM contenant l'id à afficher
        let orderNumberDOM = document.getElementById("orderId");
        // injection de la requete de l'API contenant le numéro de l'ID
        orderNumberDOM.textContent = request.orderId
    }   
}

// Appel de la fonction pour l'envoie et récupération des données de l'API
sendData(contact);


    // récupération de l'ID de l'adresse html
let linkID = new URL(location.href).searchParams.get("id");
    // insertion de l'url dans la varibla de l'appel de l'API
const urlProduct = `http://localhost:3000/api/products/${linkID}`;

async function recupererProduit(){
    const requete = await fetch(urlProduct, {
        method : 'GET'
    });

    if(!requete.ok){
        alert('un problème est survenu');
    } else {

        
        // création de l'image du produit
        let imgProduct = document.createElement("img");
        // récupération des données
        let titleProduct = document.querySelector('h1#title');

        let priceProduct = document.querySelector('span#price');

        let descriptionProduct = document.querySelector('p#description');


    }
}

recupererProduit()
// création de la constante d'appel concernant l'Appel de l'API
const urlApi = 'http://localhost:3000/api/products';



////////////////////////////////
// FONCTION D'APPEL DES PRODUITS VIA L'API --- PAGE D'ACCUEIL
////////////////////////////////
// function asynchrone pour faire une requête GET a l'API ---
// cette requête GET permettra de demander les données de tous les produits contenusdans l'API pour en faire l'affichage
// la réponse de l'API devra être les produits de l'API à afficher
async function recupererProduit(){
    const requete = await fetch(urlApi, {
        method : 'GET' // méthode GET pour lancer un appel de récupération 
    });
    if(!requete.ok){
        alert('un problème est survenu');
    } else {
        let productList = await requete.json();
    
        for (const product in productList) {
        // création des autres cardProduct avec élaboration d'une fonction
            let sectionItems = document.querySelector('#items')
        // création d'un lien
            let linkProduct = document.createElement('a');
        // création de l'article du product
            let articleProduct = document.createElement('article');
        // création de l'image Produit
            let imgProduct = document.createElement('img');
        // création du titre
            let titleProduct = document.createElement('h3')
        // création de la description
            let descriptionProduct = document.createElement('p')

        // Ajout des éléments dans l'ordre d'apparition
            sectionItems.appendChild(linkProduct);
            linkProduct.appendChild(articleProduct);
            articleProduct.appendChild(imgProduct);
            articleProduct.appendChild(titleProduct);
            articleProduct.appendChild(descriptionProduct);

        // ajout des classes et attributs
        // attribut du lien
            linkProduct.href = `./product.html?id=${productList[product]._id}`;
        // classes 
            titleProduct.classList.add("productName");
            descriptionProduct.classList.add("productDescription");

        // ajout du contenu
            imgProduct.src = productList[product].imageUrl;
            imgProduct.alt = productList[product].altTxt;
            titleProduct.textContent = productList[product].name;
            descriptionProduct.textContent = productList[product].description;
        }
    }
}

// APPEL DE LA FONCTION POUR RECUPERER LES PRODUITS
recupererProduit();




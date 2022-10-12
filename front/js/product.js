// récupération de l'ID de l'adresse html
let linkID = new URL(location.href).searchParams.get("id");
// insertion de l'url dans la varibla de l'appel de l'API
const urlProduct = `http://localhost:3000/api/products/${linkID}`;

async function displayProduit(){
    const requete = await fetch(urlProduct, {
        method : 'GET'
    });

    if(!requete.ok){
        alert('un problème est survenu');
    } else {

////////////////////////////////
// AFFICHAGE DU PRODUIT 
////////////////////////////////
        //appel de la requete en format JSON
        let productListItem = await requete.json();

        // récupération des données
        let selectImgItems = document.querySelector('.item__img');
        let titleProduct = document.getElementById('title');
        let priceProduct = document.getElementById('price');
        let descriptionProduct = document.getElementById('description');
        // création de l'image du produit
        let imgItemProduct = document.createElement('img');
    
        
        // ajout de l'élément image
        selectImgItems.appendChild(imgItemProduct);
        
        // ajout du contenu
        imgItemProduct.src = productListItem.imageUrl;
        imgItemProduct.alt = productListItem.altTxt;
        titleProduct.textContent = productListItem.name;
        priceProduct.textContent = productListItem.price;
        descriptionProduct.textContent = productListItem.description;


        // boucle pour afficher les options de couleurs
        let colorsList = productListItem.colors;

            for (const color of colorsList) {
                let itemOption = new Option(color, color);
                let selectOptionList = document.querySelector('#colors')
                selectOptionList.add(itemOption, undefined);
            }
        


    }       
}


// APPEL DE LA FONCTION POUR AFFICHER LE PRODUIT EN FONCTION DE L'ID
displayProduit()
////////////////////////////////


////////////////////////////////
// RECUPERATION DU PRODUIT 
////////////////////////////////

// la creation d'un panier va consister en l'implémentation dans le localStorage d'un élément panier
// Cet élément panier sera un tableau vide au premier appel 
// puis viendra s'ajouter les valeurs récupérer par une fonction d'événement 
// Par l'intermédiaire de cette

function savePanier(panier) {
    localStorage.setItem("panier", JSON.stringify(panier));

}

function getBasket() {
    let panier = localStorage.getItem("panier");
    if (panier == null) { 
        return [];
    } else {
        return JSON.parse(panier);
    }
}

function ajoutAuPanier(product) {
    let panier = getBasket();
    panier.push(product);
    savePanier(panier);
}


const colorSelected = document.getElementById("colors");
const numberSelected = document.getElementById("quantity");
const button = document.getElementById("addToCart");
const buttonClear = document.getElementById("deleteFromStorage");


button.addEventListener("click", () =>{
    const test = {
        nom : linkID,
        quantite : numberSelected.value,
        couleurs : colorSelected.value,
    }
    return ajoutAuPanier(test);
})




// récupération de l'ID de l'adresse html 
let linkID = new URL(location.href).searchParams.get("id");
// insertion de l'url dans la varibla de l'appel de l'API
const urlProduct = `http://localhost:3000/api/products/${linkID}`;


////////////////////////////////
// FONCTION D'APPEL DES PRODUITS VIA L'API --- PAGE D'ACCUEIL
////////////////////////////////
async function displayProduit(){
    const requete = await fetch(urlProduct, {
        method : 'GET' // method GET car récupération et affichage des données d'un produit :: pas de données sensibles
    });

    if(!requete.ok){
        alert('un problème est survenu');
    } else {
        ////////////////////////////////
        // POUR AFFICHAGE DU PRODUIT 
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
        
        // injection du contenu dans les balises correspondantes
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


// création dans le localStorage dun item Panier
function savePanier(panier) {
    localStorage.setItem("panier", JSON.stringify(panier));
}


// si le panier est vide, on return un panier array vide
// si panier non vide on return le panier
function getPanier() {
    let panier = localStorage.getItem("panier");
    if (panier == null) { 
        return [];
    } else {
        return JSON.parse(panier);
    }
}

// fonction pour récupérer le produit et le mettre dans le panier 
function ajoutAuPanier(product) {
    // récupération du panier
    let panier = getPanier();
    // analyse de l'item ajouté en fonction de son ID et couleur 
    // si l'item ajouté contient le même ID et couleur qu'un élément du tableau panier (situé dans le local storage), il ajoute une quantité en plus 
    let foundItemID = panier.find(p => p.id === product.id && p.couleurs === product.couleurs); 
    // si l'objet est trouvé et correspond à la variable attribué, soit il ajoute la quantité, soit il ajoute le produit dans le panier 
    if (foundItemID != undefined) {
        //ajout d'une quantité si couleur et ID d'un produit correspondant à un produit déjà attribué dans le panier
        foundItemID.quantite += Number.parseInt(numberSelected.value);
        alert("La quantité de l'article a été ajoutée")
    } else {
        // ajout du produit si une caractéristique est différentes (ID ou couleur) 
        panier.push(product);
        alert("Article bien ajouté")
    }    
    // on appele le Panier pour que le produit y soit ajouté
    savePanier(panier);
}


// déclaration des variables pour la récupération des données du produit
const colorSelected = document.getElementById("colors");
const numberSelected = document.getElementById("quantity");
const button = document.getElementById("addToCart");
const buttonClear = document.getElementById("deleteFromStorage");

// fonction d'événement de clique pour récuprer le produit choisi par l'utilisateur
button.addEventListener("click", () =>{
    // création de la constant item qui est le produit sélectionné contenant les caractéristiques ID, couleur et quantité. 
    const item = {
        id : linkID,
        quantite : Number.parseInt(numberSelected.value),
        couleurs : colorSelected.value,
    }
// condition : si l'utilisateur n'a pas bien rempli les champs correspondants, un message d'erreur est affiché, pas d'envoi dans le local storage;
//  sinon envoie dans le panier par la Fonction ajoutAuPanier de l'item
    if (numberSelected.value == 0 || numberSelected.value == "" || colorSelected.value == 0 || colorSelected.value == "") {
        alert("Toutes les options ne sont pas sélectionnées,\n veuillez choisir une couleur et une quantité")
    } else {
        return ajoutAuPanier(item);
    }
})




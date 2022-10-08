
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
        //appel de la requete en format JSON
        let productListItem = await requete.json();

        // récupération des données
        let selectImgItems = document.querySelector('.item__img');
        let titleProduct = document.getElementById('title');
        let priceProduct = document.getElementById('price');
        let descriptionProduct = document.getElementById('description');
        // création de l'image du produit
        let imgItemProduct = document.createElement('img');
        let selectOptionList = document.querySelector('#colors')
        
        // ajout des éléments 
        selectImgItems.appendChild(imgItemProduct);
        
        
        // ajout du contenu
        imgItemProduct.src = productListItem.imageUrl;
        imgItemProduct.alt = productListItem.altTxt;
        titleProduct.textContent = productListItem.name;
        priceProduct.textContent = productListItem.price;
        descriptionProduct.textContent = productListItem.description;

        
    }
}

recupererProduit()
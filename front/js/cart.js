

// récupération de l'ID de l'adresse html
// let linkID = new URL(location.href).searchParams.get("id");
// insertion de l'url dans la varibla de l'appel de l'API
const urlPanier = `http://localhost:3000/api/products/`;

// récupération du panier et transformation en objet JSON
var recoverPanier = JSON.parse(localStorage.getItem('panier'));
console.log(recoverPanier);


async function displayPanier(){
    const requete = await fetch(urlPanier, {
        method : 'GET'
    });

    if(!requete.ok){
        alert('un problème est survenu');
    } else { 
        let productListItem = await requete.json();

        // selection de la balise section.cart__items
        let selectedSectionCart = document.querySelector('#cart__items');
        // création de tous les éléments nécessaires à l'affichage de chaque produit du panier
        let createArticleCart = document.createElement('article');
        let createArticleDivCart = document.createElement('div');
        let createArticleDivImgCart = document.createElement('img');
        let createArticleDivCartBis = document.createElement('div');
        let createArticleDivCartBisDescription = document.createElement('div');
        let createDescriptionTitle = document.createElement('h2');
        let createDescriptionColor = document.createElement('p')
        let createDescriptionPrice = document.createElement('p')
        let createArticleDivCartBisSettings = document.createElement('div');
        let createSettingsDivQuantity = document.createElement('div');
        let createSettingQuantity = document.createElement('p');
        let createSettingQuantityInput = document.createElement('input');
        let createSettingsDivDelete = document.createElement('div');
        let createSettingDelete = document.createElement('p');

        // création de la partie article après la balise section
        selectedSectionCart.appendChild(createArticleCart).classList.add('cart__item');
        // création de la partie div + img après la balise article
        createArticleCart.appendChild(createArticleDivCart).classList.add('cart__item__img');
        createArticleDivCart.appendChild(createArticleDivImgCart);

        // selection de la balise article
        let getArticleCart = document.querySelector('.cart__item');

        // création de la partie div + description de l'article 
        getArticleCart.appendChild(createArticleDivCartBis).classList.add('cart__item__content');
        getArticleCart.setAttribute('data-id', "{product-ID}");
        getArticleCart.setAttribute('data-color', "{product-color}");
        createArticleDivCartBis.appendChild(createArticleDivCartBisDescription).classList.add('cart__item__content__description');
        createArticleDivCartBisDescription.appendChild(createDescriptionTitle);
        createArticleDivCartBisDescription.appendChild(createDescriptionColor);
        createArticleDivCartBisDescription.appendChild(createDescriptionPrice);

        // création de la partie div + quantité 
        createArticleDivCartBis.appendChild(createArticleDivCartBisSettings).classList.add('cart__item__content__settings');
        createArticleDivCartBisSettings.appendChild(createSettingsDivQuantity).classList.add('cart__item__content__settings__quantity');
        createSettingsDivQuantity.appendChild(createSettingQuantity);
        createSettingsDivQuantity.appendChild(createSettingQuantityInput).classList.add('itemQuantity');
        createSettingQuantityInput.type = "number";
        createSettingQuantityInput.min = "1";
        createSettingQuantityInput.max = "100";
        createSettingQuantityInput.name = "itemQuantity";
        // createSettingQuantityInput.value = ;
        // création de la partie div + suppression 
        createArticleDivCartBisSettings.appendChild(createSettingsDivDelete).classList.add('cart__item__content__settings__delete');
        createSettingsDivDelete.appendChild(createSettingDelete).classList.add('deleteItem');

        // Ajout du contenu dynamique des données du panier selon le produit 


       


    }

}

displayPanier()
// for (const product in recoverPanier) {
    
//     console.log(recoverPanier[product]);
// }
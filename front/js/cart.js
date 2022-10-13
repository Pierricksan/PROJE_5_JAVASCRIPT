// récupération de l'ID de l'adresse html
// let linkID = new URL(location.href).searchParams.get("id");
// insertion de l'url dans la varibla de l'appel de l'API
const urlPanier = `http://localhost:3000/api/products/`;

// récupération du panier et transformation en objet JSON
let recoverPanier = JSON.parse(localStorage.getItem('panier'));


async function displayPanier(){
    const requete = await fetch(urlPanier, {
        method : 'GET'
    });

    if(!requete.ok){
        alert('un problème est survenu');
    } else { 
        let productListItem = await requete.json();

        for (const key in recoverPanier) {
           let IDproduct = recoverPanier[key].id;
           let colorProduct = recoverPanier[key].couleurs;
            console.log(IDproduct);
            console.log(colorProduct);

            let findID = productListItem.find(data => data._id === recoverPanier[key].id);

            console.log(findID);
            console.log(findID.imageUrl)
            
        }

    }

}

displayPanier()



// ------------------------TEST 1 
// for (const product in productListItem) {

    //         recoverPanier.forEach(function (produit){
    //             var ID  = produit.id;
    //             console.log(ID)
    //     })
    
    //      let findID = recoverPanier.find(data => data.id === productListItem[product]._id);
    //      console.log(findID)
    //          if (findID != undefined) {
    //  // selection de la balise section.cart__items
    //  let selectedSectionCart = document.querySelector('section#cart__items');
    //  // création de tous les éléments nécessaires à l'affichage de chaque produit du panier
    //  let createArticleCart = document.createElement('article');
    //  let createArticleDivCart = document.createElement('div');
    //  let createArticleDivImgCart = document.createElement('img');
    //  let createArticleDivCartBis = document.createElement('div');
    //  let createArticleDivCartBisDescription = document.createElement('div');
    //  let createDescriptionTitle = document.createElement('h2');
    //  let createDescriptionColor = document.createElement('p')
    //  let createDescriptionPrice = document.createElement('p')
    //  let createArticleDivCartBisSettings = document.createElement('div');
    //  let createSettingsDivQuantity = document.createElement('div');
    //  let createSettingQuantity = document.createElement('p');
    //  let createSettingQuantityInput = document.createElement('input');
    //  let createSettingsDivDelete = document.createElement('div');
    //  let createSettingDelete = document.createElement('p');
    //  // ------------------------------------------------------------------------------
    //  // création de la partie article après la balise section
    //  selectedSectionCart.appendChild(createArticleCart).classList.add('cart__item');
    //  // création de la partie div + img après la balise article
    //  createArticleCart.appendChild(createArticleDivCart).classList.add('cart__item__img');
    //  createArticleDivCart.appendChild(createArticleDivImgCart);
    //  // selection de la balise article
    //  let getArticleCart = document.querySelector('.cart__item');
    //  // création de la partie div + description de l'article 
    //  createArticleCart.appendChild(createArticleDivCartBis).classList.add('cart__item__content');
    //  createArticleDivCartBis.appendChild(createArticleDivCartBisDescription).classList.add('cart__item__content__description');
    //  createArticleDivCartBisDescription.appendChild(createDescriptionTitle);
    //  createArticleDivCartBisDescription.appendChild(createDescriptionColor);
    //  createArticleDivCartBisDescription.appendChild(createDescriptionPrice);
    //  // création de la partie div + quantité 
    //  createArticleDivCartBis.appendChild(createArticleDivCartBisSettings).classList.add('cart__item__content__settings');
    //  createArticleDivCartBisSettings.appendChild(createSettingsDivQuantity).classList.add('cart__item__content__settings__quantity');
    //  createSettingsDivQuantity.appendChild(createSettingQuantity);
    //  createSettingsDivQuantity.appendChild(createSettingQuantityInput).classList.add('itemQuantity');
    //  createSettingQuantityInput.type = "number";
    //  createSettingQuantityInput.min = "1";
    //  createSettingQuantityInput.max = "100";
    //  createSettingQuantityInput.name = "itemQuantity";
    //  // création de la partie div + suppression 
    //  createArticleDivCartBisSettings.appendChild(createSettingsDivDelete).classList.add('cart__item__content__settings__delete');
    //  createSettingsDivDelete.appendChild(createSettingDelete).classList.add('deleteItem');
    
    //  // Ajout du contenu dynamique des données du panier selon le produit 
    
    // //  getArticleCart.setAttribute('data-id', `${findID.id}`);
    // //  getArticleCart.setAttribute('data-color', findID.couleurs);
    //  createArticleDivImgCart.src = productListItem[product].imageUrl;
    //  createArticleDivImgCart.alt = productListItem[product].imageUrl;
    //  createDescriptionTitle.textContent = productListItem[product].name;
    //  createDescriptionPrice.textContent = productListItem[product].description;
    //  createDescriptionColor.textContent = findID.couleurs;
    //  createDescriptionPrice.textContent = `${productListItem[product].price} €`;
    //  createSettingQuantity.textContent = "Quantité :"
    //  createSettingQuantityInput.value = findID.quantite;
    //  createSettingDelete.textContent = "Supprimer";
    
    //          }
    // }
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
            // récupération des données de chaque produit contenu dans le panier 
           let IDproduct = recoverPanier[key].id;
           let colorProduct = recoverPanier[key].couleurs;
           let quantityProduct = recoverPanier[key].quantite;
            // console.log(IDproduct);
            // console.log(colorProduct);
            // console.log(quantityProduct);

            // récupération de l'ID dans l'API par rapport à l'ID trouvé dans le produit contenu dans le panier
            let findID = productListItem.find(data => data._id === recoverPanier[key].id);

            // console.log(findID);
            // console.log(findID.imageUrl)
              
            if (findID != undefined) {

              // selection de la balise section.cart__items
              let selectedSectionCart = document.querySelector('section#cart__items');
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
              // ------------------------------------------------------------------------------
              // création de la partie article après la balise section
              selectedSectionCart.appendChild(createArticleCart).classList.add('cart__item');
              // création de la partie div + img après la balise article
              createArticleCart.appendChild(createArticleDivCart).classList.add('cart__item__img');
              createArticleDivCart.appendChild(createArticleDivImgCart);
              // selection de la balise article
          
              
              
              // création de la partie div + description de l'article 
              createArticleCart.appendChild(createArticleDivCartBis).classList.add('cart__item__content');
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
              // création de la partie div + suppression 
              createArticleDivCartBisSettings.appendChild(createSettingsDivDelete).classList.add('cart__item__content__settings__delete');
              createSettingsDivDelete.appendChild(createSettingDelete).classList.add('deleteItem');
            
              // Ajout du contenu dynamique des données du panier selon le produit 
            
              createArticleCart.setAttribute('data-id', recoverPanier[key].id);
              createArticleCart.setAttribute('data-color', recoverPanier[key].couleurs);
              createArticleDivImgCart.src = findID.imageUrl;
              createArticleDivImgCart.alt = findID.altTxt;
              createDescriptionTitle.textContent = findID.name;
              createDescriptionPrice.textContent = findID.description;
              createDescriptionColor.textContent = recoverPanier[key].couleurs;
              createDescriptionPrice.textContent = `${findID.price} €`;
              createSettingQuantity.textContent = "Quantité :"
              createSettingQuantityInput.value = recoverPanier[key].quantite;
              createSettingDelete.textContent = "Supprimer";

            }   
        }

        // evenement pour supprimer un objet
        let buttonDelete = document.getElementsByClassName('deleteItem')
        
        // recercher du bouton correspondant lors du clique avec une boucle, 
        //  puis en fonction du bouton suppresion du produit 
        // et rechargement de la page pour faire apparaitre les changements
        for (let i = 0; i < buttonDelete.length; i++) {
          buttonDelete[i].addEventListener("click", () =>{
            // console.log(buttonDelete[i])
            // console.log(i)
            // console.log(recoverPanier.length)
            // console.log(recoverPanier[i].couleurs)
            // console.log(getArticle.closest('.cart__item'))
            recoverPanier.splice(i, 1);
            localStorage.setItem("panier", JSON.stringify(recoverPanier));
            location.reload()
            alert('Votre article a bien été supprimé du panier')
          })
        }

        let buttonQuantity = document.getElementsByClassName('itemQuantity')
        
        for (let i = 0; i < buttonQuantity.length; i++) {
          buttonQuantity[i].addEventListener('change',() => {
            // console.log(buttonQuantity[i].value);
            newValueQuantite = buttonQuantity[i].value
            // console.log(recoverPanier[i].quantite)
            if (newValueQuantite != recoverPanier[i].quantite){
              recoverPanier[i].quantite = newValueQuantite;
              localStorage.setItem("panier", JSON.stringify(recoverPanier));
            }
          })
            
         
        }
        // événement pour modifier la quantité du produit 
       
        
    }
}

displayPanier()






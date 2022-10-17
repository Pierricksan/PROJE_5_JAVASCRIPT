// récupération de l'ID de l'adresse html
// let linkID = new URL(location.href).searchParams.get("id");
// insertion de l'url dans la varibla de l'appel de l'API
const urlPanier = `http://localhost:3000/api/products/`;
// récupération du panier et transformation en objet JSON
let recoverPanier = JSON.parse(localStorage.getItem('panier'));

// fonction asynchrone pour recevoir les données de l'API, la consulter en fonction des éléments contenus dans le panier(localStorage)
async function displayPanier(){
    const requete = await fetch(urlPanier, {
        method : 'GET'
    });

    if(!requete.ok){
        alert('un problème est survenu');
    } else { 
      let productListItem = await requete.json();

        // fonction du calcul du prix pour un produit 
        function getPrice (produitKey, prixAPI) {
          return produitKey * prixAPI 
        }
        // function getTotalPrice ()
        let arrayTotalPrice = [];
        function getArrayTotalPrice(arrayPrice) {
          return arrayPrice.reduce(function (prevPrice, curPrice) {
            return prevPrice + curPrice;
          },0)
        }
        // function affichage des produits du panier
        function affichageDesProduits (itemsPanier, itemsAPI) {
          for (const key in itemsPanier) {
            IDproduct = itemsAPI.find(data => data._id === itemsPanier[key].id)
            if ( IDproduct != undefined) {
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
              // let getTotalQuantity = document.getElementById('totalQuantity');
              // ------------------------------------------------------------------------------
              // création de la partie article après la balise section
              selectedSectionCart.appendChild(createArticleCart).classList.add('cart__item');
              // création de la partie div + img après la balise article
              createArticleCart.appendChild(createArticleDivCart).classList.add('cart__item__img');
              createArticleDivCart.appendChild(createArticleDivImgCart);
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
              //---------------------------------------------------------------------------
              // Ajout du contenu dynamique des données du panier selon le produit 
              createArticleCart.setAttribute('data-id', recoverPanier[key].id);
              createArticleCart.setAttribute('data-color', recoverPanier[key].couleurs);
              createArticleDivImgCart.src = IDproduct.imageUrl;
              createArticleDivImgCart.alt = IDproduct.altTxt;
              createDescriptionTitle.textContent = IDproduct.name;
              createDescriptionPrice.textContent = IDproduct.description;
              createDescriptionColor.textContent = recoverPanier[key].couleurs;
              createDescriptionPrice.textContent = `${IDproduct.price} €`;
              createSettingQuantity.textContent = "Quantité :"
              createSettingQuantityInput.value = recoverPanier[key].quantite;
              createSettingDelete.textContent = "Supprimer";
            
              //  affichage du nombre d'articles lors du premier chargement de la page
              let getTotalQuantity = document.getElementById('totalQuantity');
              let totalQuantity = recoverPanier.reduce((total, produit)=>{
                return total + produit.quantite
              }, 0)
              getTotalQuantity.textContent = totalQuantity  
            
              // // récupération du prix d'un produit 
              let priceProduct = getPrice(recoverPanier[key].quantite, IDproduct.price)
              // console.log(priceProduct);
              // après récupération du prix, pousser le prix dans le tableau des prix pour les comptabiliser
              arrayTotalPrice.push(priceProduct)
              let totalPriceFinal = getArrayTotalPrice(arrayTotalPrice);
              let getTotalPrice = document.getElementById('totalPrice');
              getTotalPrice.textContent = totalPriceFinal
            }

          }
        }

        affichageDesProduits(recoverPanier, productListItem);

        // boucle d'affichage des produits 
        // for (const key in recoverPanier) {
        //   // récupération des données de chaque produit contenu dans le panier 
        //   let IDproduct = recoverPanier[key].id;
        //   let colorProduct = recoverPanier[key].couleurs;
        //   let quantityProduct = recoverPanier[key].quantite;
        //   // récupération de l'ID dans l'API par rapport à l'ID trouvé dans le produit contenu dans le panier
        //   let findID = productListItem.find(data => data._id === recoverPanier[key].id);
        //     // condition d'existence du lien entre l'id du produit du panier et celui de l'API produit
        //     if (findID != undefined) {
        //       // selection de la balise section.cart__items
        //       let selectedSectionCart = document.querySelector('section#cart__items');
        //       // création de tous les éléments nécessaires à l'affichage de chaque produit du panier
        //       let createArticleCart = document.createElement('article');
        //       let createArticleDivCart = document.createElement('div');
        //       let createArticleDivImgCart = document.createElement('img');
        //       let createArticleDivCartBis = document.createElement('div');
        //       let createArticleDivCartBisDescription = document.createElement('div');
        //       let createDescriptionTitle = document.createElement('h2');
        //       let createDescriptionColor = document.createElement('p')
        //       let createDescriptionPrice = document.createElement('p')
        //       let createArticleDivCartBisSettings = document.createElement('div');
        //       let createSettingsDivQuantity = document.createElement('div');
        //       let createSettingQuantity = document.createElement('p');
        //       let createSettingQuantityInput = document.createElement('input');
        //       let createSettingsDivDelete = document.createElement('div');
        //       let createSettingDelete = document.createElement('p');
        //       // let getTotalQuantity = document.getElementById('totalQuantity');
        //       // ------------------------------------------------------------------------------
        //       // création de la partie article après la balise section
        //       selectedSectionCart.appendChild(createArticleCart).classList.add('cart__item');
        //       // création de la partie div + img après la balise article
        //       createArticleCart.appendChild(createArticleDivCart).classList.add('cart__item__img');
        //       createArticleDivCart.appendChild(createArticleDivImgCart);
        //       // création de la partie div + description de l'article 
        //       createArticleCart.appendChild(createArticleDivCartBis).classList.add('cart__item__content');
        //       createArticleDivCartBis.appendChild(createArticleDivCartBisDescription).classList.add('cart__item__content__description');
        //       createArticleDivCartBisDescription.appendChild(createDescriptionTitle);
        //       createArticleDivCartBisDescription.appendChild(createDescriptionColor);
        //       createArticleDivCartBisDescription.appendChild(createDescriptionPrice);
        //       // création de la partie div + quantité 
        //       createArticleDivCartBis.appendChild(createArticleDivCartBisSettings).classList.add('cart__item__content__settings');
        //       createArticleDivCartBisSettings.appendChild(createSettingsDivQuantity).classList.add('cart__item__content__settings__quantity');
        //       createSettingsDivQuantity.appendChild(createSettingQuantity);
        //       createSettingsDivQuantity.appendChild(createSettingQuantityInput).classList.add('itemQuantity');
        //       createSettingQuantityInput.type = "number";
        //       createSettingQuantityInput.min = "1";
        //       createSettingQuantityInput.max = "100";
        //       createSettingQuantityInput.name = "itemQuantity";
        //       // création de la partie div + suppression 
        //       createArticleDivCartBisSettings.appendChild(createSettingsDivDelete).classList.add('cart__item__content__settings__delete');
        //       createSettingsDivDelete.appendChild(createSettingDelete).classList.add('deleteItem');
        //       //---------------------------------------------------------------------------
        //       // Ajout du contenu dynamique des données du panier selon le produit 
        //       createArticleCart.setAttribute('data-id', recoverPanier[key].id);
        //       createArticleCart.setAttribute('data-color', recoverPanier[key].couleurs);
        //       createArticleDivImgCart.src = findID.imageUrl;
        //       createArticleDivImgCart.alt = findID.altTxt;
        //       createDescriptionTitle.textContent = findID.name;
        //       createDescriptionPrice.textContent = findID.description;
        //       createDescriptionColor.textContent = recoverPanier[key].couleurs;
        //       createDescriptionPrice.textContent = `${findID.price} €`;
        //       createSettingQuantity.textContent = "Quantité :"
        //       createSettingQuantityInput.value = recoverPanier[key].quantite;
        //       createSettingDelete.textContent = "Supprimer";

              //----------------------------------
          //     // affichage du nombre d'articles lors du premier chargement de la page
          //     let getTotalQuantity = document.getElementById('totalQuantity');
          //     let totalQuantity = recoverPanier.reduce((total, produit)=>{
          //       return total + produit.quantite
          //     }, 0)
          //     getTotalQuantity.textContent = totalQuantity  
          //     // -----------------------------
          //     // récupération du prix d'un produit 
          //     let priceProduct = getPrice(recoverPanier[key].quantite, findID.price)
          //     // console.log(priceProduct);
          //     // après récupération du prix, pousser le prix dans le tableau des prix pour les comptabiliser
          //     arrayTotalPrice.push(priceProduct)
             
          //     let totalPriceFinal = getArrayTotalPrice(arrayTotalPrice);
             
          //     let getTotalPrice = document.getElementById('totalPrice');
      
          //     getTotalPrice.textContent = totalPriceFinal
          //   }   
          // }

          
        // événement pour supprimer un objet
        let buttonDelete = document.getElementsByClassName('deleteItem')
          // recercher du bouton correspondant lors du clique avec une boucle, 
          // puis en fonction du bouton suppresion du produit 
          // et rechargement de la page pour faire apparaitre les changements
          function clickDeleteProduct(buttonDOM, itemsPanier) {
            for (let i = 0; i < buttonDOM.length; i++) {
              buttonDOM[i].addEventListener("click", () =>{
                // suppresion de l'index approprié par rapport au bouton selectionné
                itemsPanier.splice(i, 1);
                localStorage.setItem("panier", JSON.stringify(itemsPanier));
                location.reload()
                alert('Votre article a bien été supprimé du panier')
              })
            }
          }
          clickDeleteProduct(buttonDelete, recoverPanier);

        //   for (let i = 0; i < buttonDelete.length; i++) {
        //     buttonDelete[i].addEventListener("click", () =>{
        //       // suppresion de l'index approprié par rapport au bouton selectionné
        //       recoverPanier.splice(i, 1);
        //       localStorage.setItem("panier", JSON.stringify(recoverPanier));
        //       location.reload()
        //       alert('Votre article a bien été supprimé du panier')
        //     })
        // }
        // fin boucle événement pour supprimer un objet
        //----------------------------------------------------------------
        // événement pour modifier la quantité du produit 
        let buttonQuantity = document.getElementsByClassName('itemQuantity');
        let getTotalQuantity = document.getElementById('totalQuantity');


        //   for (let i = 0; i < buttonQuantity.length; i++) {
        //     buttonQuantity[i].addEventListener('change',() => {           
        //       newValueQuantite = buttonQuantity[i].value
        //       if (newValueQuantite != recoverPanier[i].quantite){
        //         // modification de la nouvelle quantité
        //         recoverPanier[i].quantite = Number.parseInt(newValueQuantite);
        //         // modification du total des articles
        //         let totalQuantity = recoverPanier.reduce((total, produit)=>{
        //           return total + produit.quantite
        //         }, 0)
        //         getTotalQuantity.textContent = totalQuantity   
                
        //         // insertion du changement dans le panier 
        //         localStorage.setItem("panier", JSON.stringify(recoverPanier));
        //        location.reload();
        //       }
        //     })
        //   // fin boucle modification de la quantité
        // }

function clickModifyQuantity (buttonDOM, itemsPanier, totalOfQuantity) {
  for (let i = 0; i < buttonDOM.length; i++) {
    buttonDOM[i].addEventListener('change',() => {           
      newValueQuantite = buttonDOM[i].value
      if (newValueQuantite != itemsPanier[i].quantite){
        // modification de la nouvelle quantité
        itemsPanier[i].quantite = Number.parseInt(newValueQuantite);
        // modification du total des articles
        let totalQuantity = itemsPanier.reduce((total, produit)=>{
          return total + produit.quantite
        }, 0)
        totalOfQuantity.textContent = totalQuantity   
        
        // insertion du changement dans le panier 
        localStorage.setItem("panier", JSON.stringify(itemsPanier));
      //  location.reload();
      }
    })
  // fin boucle modification de la quantité
  }
}

clickModifyQuantity(buttonQuantity, recoverPanier, getTotalQuantity);

// fin du ELSE
    }
// fin de la fonction displayPANIER
}
displayPanier()



////////////////////////////////////////////////////////////////
//// fonction pour le formulaire 
const buttonOrder = document.getElementById("order");
// récupération des values saisies 
const getFirstName = document.getElementById("firstName");
const getLastName = document.getElementById("lastName");
const getAdress = document.getElementById("address");
const getCity = document.getElementById("city");
const getEmail = document.getElementById("email");



// récupération des messages d'alertes à afficher
const alertFirstName = document.getElementById("firstNameErrorMsg")
const alertLastName = document.getElementById("lastNameErrorMsg")
const alertAddress = document.getElementById("addressErrorMsg")
const alertCity = document.getElementById("cityErrorMsg")
const alertEmail = document.getElementById("emailErrorMsg")



buttonOrder.addEventListener("click", () => {
  
  const user = {
    firstName: getFirstName.value,
    lastName: getLastName.value,
    adress: getAdress.value,
    city: getCity.value,
    email: getEmail.value,
  }

  localStorage.setItem("contact", JSON.stringify(user));
 
})


function putProductInArray(listProduct) {
    let array = [];
    for (const key in listProduct){
      array.push(listProduct[key].id)  
    }
    return array
}

let arrayProduct = putProductInArray(recoverPanier)
console.log(arrayProduct)







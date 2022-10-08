
    // récupération de l'ID de l'adresse html
let linkID = new URL(location.href).searchParams.get("id");
    // insertion de l'url dans la varibla de l'appel de l'API
const urlProduct = `http://localhost:3000/api/products/${linkID}`;

async function afficherProduit(){
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

afficherProduit()


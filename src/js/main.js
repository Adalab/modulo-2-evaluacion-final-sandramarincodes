"use strict";

// SECCIÓN DE VARIANLES GLOBALES (DATOS)
let url = "https://fakestoreapi.com/products";
let storeProducts = [];
let shoppingCart = [];
let currentProductList = [];

// Sección de query-selectors (elementos que usamos de la página)
const ulList = document.querySelector(".js_list");
const inputSearch = document.querySelector(".js_input-search");
const btnSearch = document.querySelector(".js_btn-search");
const ulShopping = document.querySelector(".js_shopping-cart");

// SECCIÓN DE FUNCIONES

function renderProduct(product) {
  let imgURL;
  if (product.image === "") {
    imgURL = "https://placehold.co/600x400";
  } else {
    imgURL = product.image;
  }

  let isOnCart = false;
  for (const item of shoppingCart) {
    if (item.id === product.id) {
      isOnCart = true;
    }
  }

  let divClass;
  if (isOnCart) {
    divClass = "selected-card";
  }

  let buttonText;
  if (isOnCart) {
    buttonText = "Eliminar";
  } else {
    buttonText = "Comprar";
  }
  return `<li><div class="${divClass}"><img src="${imgURL}" style="width: 200px;"/>
    <p>${product.title}</p><p>${product.price}</p>
    <button class="js_btn-cart" id="${product.id}">${buttonText}</button></div></li>`;
}

function renderAllProducts(productList) {
  currentProductList = productList;
  ulList.innerHTML = "";
  for (const product of productList) {
    ulList.innerHTML += renderProduct(product);
  }
  // al principio lo puse esto fuera pero no tiene sentido porque los botones aún no existen no? al principio puse queryselector normal y solo seleeccionaba un elemento.
  const btnsCart = document.querySelectorAll(".js_btn-cart");
  for (const btn of btnsCart) {
    btn.addEventListener("click", handleAddToCart);
  }
}

function renderShoppingCartProduct(product) {
  let imgURL;
  if (product.image === "") {
    imgURL = "https://placehold.co/600x400";
  } else {
    imgURL = product.image;
  }
  return `<li><div><img src="${imgURL}" style="width: 200px;"/>
    <p>${product.title}</p><p>${product.price}</p>
    </div></li>`;
}

function renderAllShoppingCartProducts(productList) {
  ulShopping.innerHTML = "";
  for (const product of productList) {
    ulShopping.innerHTML += renderShoppingCartProduct(product);
  }
  // Almacenar información en el localStorage
  localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
}
// si ya  tengo productos en local storage pinta los del local.

function getProducts() {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      storeProducts = data;
      renderAllProducts(storeProducts);
    });
}

// Sección de funciones de eventos

function handleSearch(event) {
  event.preventDefault();
  let valueSearch = inputSearch.value;
  const filteredProducts = storeProducts.filter((product) =>
    product.title.toLowerCase().includes(valueSearch.toLowerCase())
  );
  console.log(filteredProducts);
  renderAllProducts(filteredProducts);
}

function handleAddToCart(event) {
  event.preventDefault();
  const clickedId = parseInt(event.currentTarget.id);
  const foundProduct = storeProducts.find(
    (product) => product.id === clickedId
  );
  if (!shoppingCart.find((item) => item.id === foundProduct.id)) {
    shoppingCart.push(foundProduct);
    renderAllProducts(currentProductList);
    renderAllShoppingCartProducts(shoppingCart);
  }
}

// Sección de eventos
btnSearch.addEventListener("click", handleSearch);

// Local storage shoping cart restore
if (localStorage.getItem("shoppingCart") !== null) {
  shoppingCart = JSON.parse(localStorage.getItem("shoppingCart"));
  renderAllShoppingCartProducts(shoppingCart);
}

// Sección de código a ejecutar cuando carga la página
getProducts();

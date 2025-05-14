"use strict";

// SECCIÓN DE VARIANLES GLOBALES (DATOS)
let url = "https://fakestoreapi.com/products";
let storeProducts = [];

// Sección de query-selectors (elementos que usamos de la página)
const ulList = document.querySelector(".js_list");
const inputSearch = document.querySelector(".js_input-search");
const btnSearch = document.querySelector(".js_btn-search");

// SECCIÓN DE FUNCIONES

function renderProduct(product) {
  let imgURL;
  if (product.image === "") {
    imgURL = "https://placehold.co/600x400";
  } else {
    imgURL = product.image;
  }

  return `<li><div><img src="${imgURL}" style="width: 200px;"/>
    <p>${product.title}</p><p>${product.price}</p>
    <button>Comprar</button></div></li>`;
} // DUDA ANTES LO TENIA ASÍ ulList.innerHtml = `<li>... (Comprobé que sí que pintaba. Lo he pasado a return porque siento que luego la usaré. Tiene sentido?)

function renderAllProducts(productList) {
  ulList.innerHTML = "";
  for (const product of productList) {
    ulList.innerHTML += renderProduct(product);
  }
}

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
// Sección de eventos
btnSearch.addEventListener("click", handleSearch);
// Sección de código a ejecutar cuando carga la página
getProducts();

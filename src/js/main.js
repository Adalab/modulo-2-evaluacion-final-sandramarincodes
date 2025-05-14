"use strict";

// Sección de variables globales (datos)
let url = "https://fakestoreapi.com/products";
// Sección de query-selectors (elementos que usamos de la página)
const ulList = document.querySelector(".js_list");

/* const product1 = {
  id: 1,
  title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
  price: 109.95,
  description:
    "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
  category: "men's clothing",
  image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
  rating: {
    rate: 3.9,
    count: 120,
  },
}; */
// Sección de funciones

function renderProduct(product) {
  return `<li><div><img src="${product.image}" style="width: 200px;"/>
    <p>${product.title}</p><p>${product.price}</p>
    <button>Comprar</button></div></li>`;
} // DUDA ANTES LO TENIA ASÍ ulList.innerHtml += `<li>... (Comprobé que sí que pintaba. Lo he pasado a return porque siento que luego la usaré. Tiene sentido?)

/* renderProduct(product1); */

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
        renderAllProducts(data)
    });
}

getProducts()
// Sección de funciones de eventos
// Sección de eventos
// Sección de código a ejecutar cuando carga la página

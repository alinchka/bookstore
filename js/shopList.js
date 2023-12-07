
// Утилиты (в число, в валюту)
function toNum(str) {
    const num = Number(str.replace(/ /g, ""));
    return num;
  }
  
  function toCurrency(num) {
    const format = new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency: "RUB",
      minimumFractionDigits: 0,
    }).format(num);
    return format;
  }
  
  // Считываем все элементы корзины:
  const cardAddArr = Array.from(document.querySelectorAll(".card__add"));
  const cartNum = document.querySelector("#cart_num");
  const cart = document.querySelector("#cart");
  
  //Считываем все элементы попапа (всплывающего окна):
  const popup = document.querySelector(".popup");
  const popupClose = document.querySelector("#popup_close");
  const body = document.body;
  const popupContainer = document.querySelector("#popup_container");
  const popupProductList = document.querySelector("#popup_product_list");
  const popupCost = document.querySelector("#popup_cost");
  const popupDiscount = document.querySelector("#popup_discount");
  const popupCostDiscount = document.querySelector("#popup_cost_discount");
  
  //открытие и закрытие окна корзины
  //Считываем нужные элементы и навешиваем обработчики на клик
  cart.addEventListener("click", (e) => {
    e.preventDefault();
    popup.classList.add("popup--open");
    body.classList.add("lock");
    popupContainerFill();
  });
  
  popupClose.addEventListener("click", (e) => {
    e.preventDefault();
    popup.classList.remove("popup--open");
    body.classList.remove("lock");
  });
  
  
  
  //класс для одного товара
  class Product {
    imageSrc;
    name;
    count;
    price;
    priceDiscount;
    constructor(card) {
      this.imageSrc = card.querySelector(".card__image").children[0].src;
      this.name = card.querySelector(".card__title").innerText;
      this.price = card.querySelector(".card__price--common").innerText;
      this.priceDiscount = card.querySelector(".card__price--discount").innerText;
      this.count = 0;
    }
  }
  
  //класс для описания корзины покупок и расчета стоимости и скидок
  class Cart {
    products;
    constructor() {
      this.products = [];
    }
    get count() {
      let n = 0;
      for (let i = 0; i < this.products.length; i++){
          n += this.products[i].count;
      }
      return n;
    }
    addProduct(product) {
      let index = -1;
      for (let i = 0; i < this.products.length; i++){
          if (product.name != this.products[i].name){}
          else {
              index = i;
          }
      }
      if (this.products.length == 0){
          this.products.push(product);
      }
      else if(index === (-1)){
          this.products.push(product);
      }
      else {
          this.products[index].count += 1;
      }
      
    }
    minusProduct(product) {
      let index = -1;
      for (let i = 0; i < this.products.length; i++){
          if (product.name != this.products[i].name){}
          else {
              index = i;
          }
      }
      this.products[index].count -= 1;
      this.products[index].preventDefault
      if (this.products[index].count == 0){
          this.products.splice(index, 1);
      }
    }
    removeProduct(index) {
      this.products.splice(index, 1);
    }
    get cost() {
      const prices = this.products.map((product) => {
        return toNum(product.price) * product.count;
      });
      const sum = prices.reduce((acc, num) => {
        return acc + num;
      }, 0);
      return sum;
    }
    get costDiscount() {
      const prices = this.products.map((product) => {
        return toNum(product.priceDiscount) * product.count;
      });
      const sum = prices.reduce((acc, num) => {
        return acc + num;
      }, 0);
      return sum;
    }
    get discount() {
      return this.cost - this.costDiscount;
    }
  }
  
  //Создаем объект корзины и сохраняем его в localStorage
  const myCart = new Cart();
  
  if (localStorage.getItem("cart") == null) {
    localStorage.setItem("cart", JSON.stringify(myCart));
  }
  
  const savedCart = JSON.parse(localStorage.getItem("cart"));
  myCart.products = savedCart.products;
  cartNum.textContent = myCart.count;
  
  //Добавляем товар в корзину
  myCart.products = cardAddArr.forEach((cardAdd) => {
    cardAdd.addEventListener("click", (e) => {
      e.preventDefault();
      const card = e.target.closest(".card");
      const product1 = new Product(card);
      const savedCart = JSON.parse(localStorage.getItem("cart"));
      myCart.products = savedCart.products;
      product1.count += 1;
      myCart.addProduct(product1);
      localStorage.setItem("cart", JSON.stringify(myCart));
      cartNum.textContent = myCart.count;
    });
  });
  
  //Заполнение корзины
  //заполняет всплывающий контейнер информацией о продукте из корзины покупок, хранящейся в локальном хранилище
  function popupContainerFill() {
    popupProductList.innerHTML = null;
    const savedCart = JSON.parse(localStorage.getItem("cart"));
    myCart.products = savedCart.products;
    const productsHTML = myCart.products.map((product) => {
      const productItem = document.createElement("div");
      productItem.classList.add("popup__product");
  
      const productWrap1 = document.createElement("div");
      productWrap1.classList.add("popup__product-wrap");
      const productWrap2 = document.createElement("div");
      productWrap2.classList.add("popup__product-wrap");
  
      const productImage = document.createElement("img");
      productImage.classList.add("popup__product-image");
      productImage.setAttribute("src", product.imageSrc);
  
      const productTitle = document.createElement("h2");
      productTitle.classList.add("popup__product-title");
      productTitle.innerHTML = product.name;
  
      const productMinus = document.createElement("button");
      productMinus.classList.add("popup__product-minus");
      productMinus.innerHTML = "&#8722;";
  
      productMinus.addEventListener("click", () => {
          myCart.minusProduct(product);
          localStorage.setItem("cart", JSON.stringify(myCart));
          cartNum.textContent = myCart.count;
          popupContainerFill();
        });
  
      const productCount = document.createElement("div");
      productCount.classList.add("popup__product-count");
      productCount.innerHTML = product.count;
  
      const productPlus = document.createElement("button");
      productPlus.classList.add("popup__product-plus");
      productPlus.innerHTML = "&#43;";
  
      productPlus.addEventListener("click", () => {
          myCart.addProduct(product);
          localStorage.setItem("cart", JSON.stringify(myCart));
          cartNum.textContent = myCart.count;
          popupContainerFill();
        });
  
      const productPrice = document.createElement("div");
      productPrice.classList.add("popup__product-price");
      productPrice.innerHTML = toCurrency(toNum(product.priceDiscount));
  
      const productDelete = document.createElement("button");
      productDelete.classList.add("popup__product-delete");
      productDelete.innerHTML = "&#10006;";
  
      productDelete.addEventListener("click", () => {
        myCart.removeProduct(product);
        localStorage.setItem("cart", JSON.stringify(myCart));
        cartNum.textContent = myCart.count;
        popupContainerFill();
      });
  
      productWrap1.appendChild(productImage);
      productWrap1.appendChild(productTitle);
      productWrap2.appendChild(productMinus);
      productWrap2.appendChild(productCount);
      productWrap2.appendChild(productPlus);
      productWrap2.appendChild(productPrice);
      productWrap2.appendChild(productDelete);
      productItem.appendChild(productWrap1);
      productItem.appendChild(productWrap2);
  
      return productItem;
    });
  
    productsHTML.forEach((productHTML) => {
      popupProductList.appendChild(productHTML);
    });
  
    popupCost.value = toCurrency(myCart.cost);
    popupDiscount.value = toCurrency(myCart.discount);
    popupCostDiscount.value = toCurrency(myCart.costDiscount);
  }
  
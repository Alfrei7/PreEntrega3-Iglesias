document.addEventListener("DOMContentLoaded", () => {
    const viewCartBtn = document.getElementById("viewCartBtn");
    const closeCartBtn = document.getElementById("closeCartBtn");
    const clearCartBtn = document.getElementById("clearCartBtn");
    const cartOverlay = document.getElementById("cartOverlay");
    const cartItems = document.getElementById("cartItems");
  
    const products = [
      { name: "Celular", price: 100 },
      { name: "Notebook", price: 20 },
      { name: "xBox one", price: 30 }
    ];
  
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    addToCartButtons.forEach(button => {
      button.addEventListener("click", addToCart);
    });
  
    function addToCart(event) {
      const product = products.find(product => product.name === event.target.parentElement.querySelector("h2").textContent);
      const cartItem = document.createElement("li");
      cartItem.textContent = `${product.name} - $${product.price}`;
      cartItems.appendChild(cartItem);
      saveCartToStorage();
    }
  
    viewCartBtn.addEventListener("click", () => {
      cartOverlay.style.display = "flex";
    });
  
    closeCartBtn.addEventListener("click", () => {
      cartOverlay.style.display = "none";
    });
  
    clearCartBtn.addEventListener("click", () => {
      cartItems.innerHTML = "";
      saveCartToStorage();
    });
  
    function saveCartToStorage() {
      const cartItemTexts = Array.from(cartItems.children).map(cartItem => cartItem.textContent);
      localStorage.setItem("cartItems", JSON.stringify(cartItemTexts));
    }
  
    function loadCartFromStorage() {
      const cartItemTexts = JSON.parse(localStorage.getItem("cartItems")) || [];
      cartItemTexts.forEach(cartItemText => {
        const cartItem = document.createElement("li");
        cartItem.textContent = cartItemText;
        cartItems.appendChild(cartItem);
      });
    }
  
    loadCartFromStorage();
  });
  
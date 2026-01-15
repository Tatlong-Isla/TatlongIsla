let cart = [];

// ADD TO CART
function addToCart(itemName, price) {
  const existingItem = cart.find((item) => item.name === itemName);

  if (existingItem) {
    existingItem.qty += 1;
  } else {
    cart.push({ name: itemName, qty: 1, price: price });
  }

  renderCart();
}

// RENDER CART
function renderCart() {
  const cartContainer = document.getElementById("cartItems");
  const totalContainer = document.getElementById("total");
  cartContainer.innerHTML = "";

  if (cart.length === 0) {
    cartContainer.innerHTML = "<li style='font-size:13px;'>Cart is empty</li>";
    totalContainer.innerText = "0";
    return;
  }

  let total = 0;

  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `${item.name} (x${item.qty}) - ₱${
      item.price * item.qty
    } <button onclick="removeItem(${index})">✖</button>`;
    cartContainer.appendChild(li);

    total += item.price * item.qty;
  });

  totalContainer.innerText = total;
}

// REMOVE ITEM
function removeItem(index) {
  cart.splice(index, 1);
  renderCart();
}

// TOGGLE ADDRESS BOX
function toggleAddress(show) {
  const addressBox = document.getElementById("addressBox");
  if (addressBox) addressBox.style.display = show ? "block" : "none";
}
function toggleQR(show) {
  const qr = document.getElementById("qrCode");
  if (qr) qr.style.display = show ? "block" : "none";
}

function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty.");
    return;
  }

  const orderType = document.querySelector(
    'input[name="orderType"]:checked'
  ).value;
  const fulfillment = document.querySelector(
    'input[name="fulfillment"]:checked'
  ).value;
  const payment = document.querySelector('input[name="payment"]:checked').value;

  const addressInput = document.getElementById("address");
  const address = addressInput ? addressInput.value.trim() : "";

  if (fulfillment === "Delivery" && address === "") {
    alert("Please enter your delivery address.");
    return;
  }

  alert(
    `Order placed successfully!\n\n` +
      `Order Type: ${orderType}\n` +
      `Fulfillment: ${fulfillment}\n` +
      (fulfillment === "Delivery" ? `Address: ${address}\n` : "") +
      `Payment: ${payment}\n` +
      `Items: ${cart.map((i) => `${i.name} x${i.qty}`).join(", ")}\n` +
      `Total: ₱${cart.reduce((a, i) => a + i.price * i.qty, 0)}`
  );

  cart = [];
  renderCart();
  toggleAddress(false);
  toggleQR(false);
  if (addressInput) addressInput.value = "";
}

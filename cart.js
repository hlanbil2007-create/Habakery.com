let cart = JSON.parse(localStorage.getItem('bakeryCart')) || [];

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    let total = 0;
    let count = 0;
    cart.forEach(item => {
        total += item.price * item.quantity;
        count += item.quantity;
        const itemDiv = document.createElement('div');
        itemDiv.className = 'cart-item';
        itemDiv.innerHTML = `
            <div class="cart-item-thumb">
              <img src="${item.image || 'https://via.placeholder.com/80'}" alt="${item.name}">
            </div>
            <div class="cart-item-left">
              <div class="cart-item-name">${item.name}</div>
              <div class="cart-item-controls">
                <button class="qty-btn" onclick="changeQuantity('${item.name}', -1)">-</button>
                <span class="qty">${item.quantity}</span>
                <button class="qty-btn" onclick="changeQuantity('${item.name}', 1)">+</button>
              </div>
            </div>
            <div class="cart-item-right">
              <div class="cart-item-price">${item.price * item.quantity} L.e</div>
              <button class="cart-item-remove" onclick="removeFromCart('${item.name}')">×</button>
            </div>
        `;
        cartItems.appendChild(itemDiv);
    });
    document.getElementById('total-price').textContent = total;
    localStorage.setItem('bakeryCart', JSON.stringify(cart));
}

function changeQuantity(name, delta) {
    const item = cart.find(item => item.name === name);
    if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) {
            removeFromCart(name);
        } else {
            updateCart();
        }
    }
}

function removeFromCart(name) {
    cart = cart.filter(item => item.name !== name);
    updateCart();
}

document.getElementById('continue-purchase').addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Your cart is empty!');    } else {
        window.location.href = 'checkout.html';
    }
});

updateCart();

// Navbar active state
function setActiveNav() {
    const currentPath = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.navbar-menu a');

    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === currentPath || (currentPath === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

setActiveNav();
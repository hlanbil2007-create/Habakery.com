let cart = JSON.parse(localStorage.getItem('bakeryCart')) || [];

const SHIPPING_FEE = 25;

function formatPrice(amount) {
    return `${amount} L.e`;
}

function renderOrderSummary() {
    const orderItemsEl = document.getElementById('order-items');
    const subtotalEl = document.getElementById('summary-subtotal');
    const shippingEl = document.getElementById('summary-shipping');
    const totalEl = document.getElementById('summary-total');

    orderItemsEl.innerHTML = '';

    if (cart.length === 0) {
        orderItemsEl.innerHTML = '<p class="empty-order">Your cart is empty. Add items before checking out.</p>';
        subtotalEl.textContent = formatPrice(0);
        totalEl.textContent = formatPrice(0);
        shippingEl.textContent = formatPrice(0);
        return;
    }

    let subtotal = 0;

    cart.forEach(item => {
        subtotal += item.price * item.quantity;
        const row = document.createElement('div');
        row.className = 'order-item';
        row.innerHTML = `
            <div class="order-item-left">
                <img src="${item.image || 'photos/muffin6.jpg'}" alt="${item.name}" class="order-item-img">
                <div>
                    <div class="order-item-name">${item.name}</div>
                    <div class="order-item-meta">Qty: ${item.quantity}</div>
                </div>
            </div>
            <div class="order-item-price">${formatPrice(item.price * item.quantity)}</div>
        `;
        orderItemsEl.appendChild(row);
    });

    const total = subtotal + SHIPPING_FEE;

    subtotalEl.textContent = formatPrice(subtotal);
    shippingEl.textContent = formatPrice(SHIPPING_FEE);
    totalEl.textContent = formatPrice(total);
}

const checkoutForm = document.getElementById('checkout-form');
checkoutForm.addEventListener('submit', (e) => {
    e.preventDefault();
    localStorage.setItem('orderPlaced', 'true');
    localStorage.removeItem('bakeryCart');

    alert('Order placed successfully! You can track your order.');
    window.location.href = 'index.html';
});

renderOrderSummary();

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
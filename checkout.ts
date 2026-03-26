

type CartItem = {
  name: string;
  price: number;
  quantity: number;
};

const SHIPPING_FEE = 25;

function formatPrice(amount: number): string {
  return `${amount} L.e`;
}

function getCart(): CartItem[] {
  const stored = localStorage.getItem('bakeryCart');
  if (!stored) return [];

  try {
    return JSON.parse(stored) as CartItem[];
  } catch {
    return [];
  }
}

function renderOrderSummary(): void {
  const orderItemsEl = document.getElementById('order-items');
  const subtotalEl = document.getElementById('summary-subtotal');
  const shippingEl = document.getElementById('summary-shipping');
  const totalEl = document.getElementById('summary-total');

  if (!orderItemsEl || !subtotalEl || !shippingEl || !totalEl) {
    return;
  }

  const cart = getCart();

  orderItemsEl.innerHTML = '';

  if (cart.length === 0) {
    orderItemsEl.innerHTML = '<p class="empty-order">Your cart is empty. Add items before checking out.</p>';
    subtotalEl.textContent = formatPrice(0);
    shippingEl.textContent = formatPrice(0);
    totalEl.textContent = formatPrice(0);
    return;
  }

  let subtotal = 0;

  cart.forEach((item) => {
    subtotal += item.price * item.quantity;

    const row = document.createElement('div');
    row.className = 'order-item';
    row.innerHTML = `
            <div class="order-item-left">
                <div class="order-item-name">${item.name}</div>
                <div class="order-item-meta">Qty: ${item.quantity}</div>
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

function setupCheckoutForm(): void {
  const checkoutForm = document.getElementById('checkout-form') as HTMLFormElement | null;
  if (!checkoutForm) return;

  checkoutForm.addEventListener('submit', (event) => {
    event.preventDefault();

    localStorage.setItem('orderPlaced', 'true');
    localStorage.removeItem('bakeryCart');

    alert('Order placed successfully! You can track your order.');
    window.location.href = 'index.html';
  });
}

renderOrderSummary();
setupCheckoutForm();

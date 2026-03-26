document.querySelector(".shop").addEventListener("click", () => {
    document.querySelector('.menu').scrollIntoView({ behavior: 'smooth' });
});

const btn = document.getElementById("offerBtn");
btn.onclick = function(){
    alert("20% discount applied to your first order!");
};

let cart = JSON.parse(localStorage.getItem('bakeryCart')) || [];

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-btn')) {
        const name = e.target.dataset.name;
        const price = parseInt(e.target.dataset.price);
        const card = e.target.closest('.product-card');
        const image = card.querySelector('img').src;

        const existingItem = cart.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ name, price, quantity: 1, image });
        }

        updateCart();
        alert(`${name} added to cart!`);
    }
});

function updateCart() {
    const cartCountEl = document.getElementById('cart-count');
    let count = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartCountEl) cartCountEl.textContent = count;
    localStorage.setItem('bakeryCart', JSON.stringify(cart));
}

updateCart();
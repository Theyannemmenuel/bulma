document.addEventListener('DOMContentLoaded', () => {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartCount = document.getElementById('cart-count');
    const cartItemsContainer = document.getElementById('cart-items');
    const totalContainer = document.getElementById('total');
    const checkoutButton = document.getElementById('checkout-button');

    function updateCart() {
        cartCount.textContent = cartItems.length;
        cartItemsContainer.innerHTML = '';
        let total = 0;

        cartItems.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'box';
            itemElement.innerHTML = `
                <article class="media">
                    <div class="media-left">
                        <figure class="image is-64x64">
                            <img src="${item.image}" alt="Produit">
                        </figure>
                    </div>
                    <div class="media-content">
                        <div class="content">
                            <p>
                                <strong>${item.name}</strong> <br>
                                Quantité: ${item.quantity} <br>
                                Prix: ${item.price}€
                            </p>
                        </div>
                    </div>
                    <div class="media-right">
                        <button class="delete" data-id="${item.id}"></button>
                    </div>
                </article>
            `;
            cartItemsContainer.appendChild(itemElement);
            total += item.price * item.quantity;
        });

        totalContainer.querySelector('h2').textContent = `Total: ${total}€`;
        checkoutButton.disabled = cartItems.length === 0;
    }

    function addItemToCart(id, name, price, image) {
        const existingItem = cartItems.find(item => item.id === id);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cartItems.push({ id, name, price, image, quantity: 1 });
        }
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        updateCart();
    }

    function removeItemFromCart(id) {
        cartItems = cartItems.filter(item => item.id !== id);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        updateCart();
    }

    cartItemsContainer.addEventListener('click', event => {
        if (event.target.classList.contains('delete')) {
            const id = event.target.getAttribute('data-id');
            removeItemFromCart(id);
            
        }
    });

    updateCart();

    window.addToCart = function(id, name, price, image) {
        addItemToCart(id, name, price, image);
        alert(`${name} a été ajouté au panier!`);
    };
});
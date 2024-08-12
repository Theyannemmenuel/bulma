document.addEventListener('DOMContentLoaded', () => {
    const products = [
        { id: '1', name: 'Nike Air Max', price: 120, image: 'Adidas_chaussures.png' },
        { id: '2', name: 'Adidas Ultraboost', price: 180, image: 'Adidas_Messi_Bienvenido_Miami_FG.png' },
        { id: '3', name: 'Puma RS-X', price: 110, image: 'puma-rs-x.jpg' },
        { id: '4', name: 'New Balance 990', price: 175, image: 'new-balance-990.jpg' },
        // Ajoutez d'autres produits ici
    ];

    const productsContainer = document.getElementById('products-container');

    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('column', 'is-3-desktop', 'is-4-tablet', 'is-6-mobile');
        productElement.innerHTML = `
            <div class="card product-card">
                <div class="card-image">
                    <figure class="image">
                        <img src="${product.image}" alt="${product.name}">
                    </figure>
                </div>
                <div class="card-content">
                    <p class="title is-5">${product.name}</p>
                    <p class="subtitle is-6 price">${product.price}€</p>
                </div>
                <footer class="card-footer">
                    <a href="#" class="card-footer-item">Voir détails</a>
                    <a href="#" class="card-footer-item" onclick="addToCart('${product.id}', '${product.name}', ${product.price}, '${product.image}')">Ajouter au panier</a>
                </footer>
            </div>
        `;
        productsContainer.appendChild(productElement);
    });

    // Gestion du menu burger pour mobile
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
    if ($navbarBurgers.length > 0) {
        $navbarBurgers.forEach(el => {
            el.addEventListener('click', () => {
                const target = el.dataset.target;
                const $target = document.getElementById(target);
                el.classList.toggle('is-active');
                $target.classList.toggle('is-active');
            });
        });
    }
});

function addToCart(id, name, price, image) {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const existingItem = cartItems.find(item => item.id === id);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cartItems.push({ id, name, price, image, quantity: 1 });
    }
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    alert(`${name} a été ajouté au panier!`);
    updateCartCount();
}

function updateCartCount() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cart-count').textContent = totalItems;
}

// Mettez à jour le compteur du panier au chargement de la page
updateCartCount();
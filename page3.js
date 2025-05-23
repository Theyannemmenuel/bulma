document.addEventListener('DOMContentLoaded', () => {
    

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

    // Nouvelle partie : Gestion des filtres
    setupFilters();
});

function setupFilters() {
    const filterDropdown = document.querySelector('.dropdown-trigger[data-target="dropdown-menu-filter"]');
    const filterMenu = document.getElementById('dropdown-menu-filter');
    const filterItems = filterMenu.querySelectorAll('.dropdown-item');

    filterDropdown.addEventListener('click', (e) => {
        e.preventDefault();
        filterMenu.classList.toggle('is-active');
    });

    filterItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const selectedFilter = e.target.textContent;
            console.log(`Filtre sélectionné : ${selectedFilter}`);
            // Ici, vous pouvez ajouter la logique pour appliquer le filtre
            filterMenu.classList.remove('is-active');
        });
    });

    // Fermer le menu si on clique en dehors
    document.addEventListener('click', (e) => {
        if (!filterDropdown.contains(e.target) && !filterMenu.contains(e.target)) {
            filterMenu.classList.remove('is-active');
        }
    });
}

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

        document.addEventListener('DOMContentLoaded', () => {
            
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
   
        




document.addEventListener('DOMContentLoaded', () => {
    // Récupère tous les éléments de "navbar-burger"
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

    // Vérifie s'il y a des "navbar-burgers"
    if ($navbarBurgers.length > 0) {

        // Ajoute un événement "click" sur chacun d'entre eux
        $navbarBurgers.forEach(el => {
            el.addEventListener('click', () => {

                // Récupère la cible du "data-target"
                const target = el.dataset.target;
                const $target = document.getElementById(target);

                // Alterne la classe "is-active" sur le "navbar-burger" et le "navbar-menu"
                el.classList.toggle('is-active');
                $target.classList.toggle('is-active');

            });
        });
    }
});

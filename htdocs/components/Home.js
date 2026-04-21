import { Component } from '@fusewire/client/component.js';

/**
 *
 */
export class Home extends Component {
    /** @type {import('./Catalog/Showcase.js').Showcase} */
    showcase = null;

    /** @type {import('./Cart/Button.js').Button} */
    cartButton = null;

    /** @type {import('./Cart/Toast.js').Toast} */
    cartToast = null;

    /** @type {import('./Cart/Modal.js').Modal} */
    cartModal = null;

    /**
     * Inicialización del componente.
     */
    async init() {
        this.cartButton = /** @type {import('./Cart/Button.js').Button} */ (
            this.createChild('Cart/Button', 'cartButton', {})
        );

        this.cartToast = /** @type {import('./Cart/Toast.js').Toast} */ (
            this.createChild('Cart/Toast', 'cartToast', {})
        );

        this.cartModal = /** @type {import('./Cart/Modal.js').Modal} */ (
            this.createChild('Cart/Modal', 'cartModal', {})
        );

        this.showcase = /** @type {import('./Catalog/Showcase.js').Showcase} */ (
            this.createChild('Catalog/Showcase', 'catalog', {})
        );

        this.showcase.on('cartUpdated', (items) => {
            this.cartButton.updateCart(items);
            this.cartToast.show(items);
            this.cartModal.updateCart(items);
        });

        this.cartButton.on('openModal', () => this.cartModal.open());
    }

    /**
     * Mueve el scroll hasta el catalogo.
     */
    scrollToCatalog() {
        this.showcase.scrollIntoView();
    }
}

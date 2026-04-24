import { Component } from '@fusewire/client/component.js';

/**
 * Header component for the Home page.
 */
export class Header extends Component {
    /** @type {import('../Cart/Button.js').Button} */
    cartButton = /** @type {import('../Cart/Button.js').Button} */ (/** @type {unknown} */ (null));

    /** @type {import('@fusewire/client/component.js').PortalChild} */
    cartModal = /** @type {import('@fusewire/client/component.js').PortalChild} */ (/** @type {unknown} */ (null));

    /**
     * Initializes the Header component and creates the cart button child.
     */
    async init() {
        this.cartButton = /** @type {import('../Cart/Button.js').Button} */ (
            this.createChild('Cart/Button', 'cartButton', {})
        );

        this.cartModal = /** @type {import('@fusewire/client/component.js').PortalChild} */ (
            this.createPortalChild('Cart/Modal', 'cartModal', {})
        );

        this.cartButton.on('openModal', () => {
            const modal = /** @type {import('../Cart/Modal.js').Modal} */ (
                this.cartModal.getChild()
            );
            modal.open();
        });
    }

    /**
     * Emits event to scroll to home
     * @param {Event} e The click event
     */
    scrollToHome(e) {
        if (e) e.preventDefault();
        this.emit('scrollToHome');
    }

    /**
     * Emits event to scroll to catalog
     * @param {Event} e The click event
     */
    scrollToCatalog(e) {
        if (e) e.preventDefault();
        this.emit('scrollToCatalog');
    }

    /**
     * Emits event to scroll to contact
     * @param {Event} e The click event
     */
    scrollToContact(e) {
        if (e) e.preventDefault();
        this.emit('scrollToContact');
    }

    /**
     * Updates the cart items in the button.
     * @param {Array<any>} items The items in the cart.
     */
    updateCart(items) {
        this.cartButton.updateCart(items);
        const modal = /** @type {import('../Cart/Modal.js').Modal} */ (this.cartModal.getChild());
        modal.updateCart(items);
    }
}

import { Component } from '@fusewire/client/component.js';

/**
 * Header component for the Home page.
 */
export class Header extends Component {
    /** @type {import('../Cart/Button.js').Button} */
    cartButton = null;

    /**
     * Initializes the Header component and creates the cart button child.
     */
    async init() {
        this.cartButton = /** @type {import('../Cart/Button.js').Button} */ (
            this.createChild('Cart/Button', 'cartButton', {})
        );

        this.cartButton.on('openModal', () => this.emit('openCartModal'));
    }

    /**
     * Updates the cart items in the button.
     * @param {Array} items The items in the cart.
     */
    updateCart(items) {
        this.cartButton.updateCart(items);
    }
}

import { Component } from "@fusewire/client/component.js";

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
            this.createChild("Cart/Button", "cartButton", {})
        );

        this.cartButton.on("openModal", () => this.emit("openCartModal"));
    }

    /**
     * Emits event to scroll to home
     * @param {Event} e The click event
     */
    scrollToHome(e) {
        if (e) e.preventDefault();
        this.emit("scrollToHome");
    }

    /**
     * Emits event to scroll to catalog
     * @param {Event} e The click event
     */
    scrollToCatalog(e) {
        if (e) e.preventDefault();
        this.emit("scrollToCatalog");
    }

    /**
     * Emits event to scroll to contact
     * @param {Event} e The click event
     */
    scrollToContact(e) {
        if (e) e.preventDefault();
        this.emit("scrollToContact");
    }

    /**
     * Updates the cart items in the button.
     * @param {Array} items The items in the cart.
     */
    updateCart(items) {
        this.cartButton.updateCart(items);
    }
}

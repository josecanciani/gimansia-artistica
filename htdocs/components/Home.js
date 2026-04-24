import { Component } from "@fusewire/client/component.js";

/**
 * Main Home component.
 */
export class Home extends Component {
    /** @type {boolean} */
    showFeatures = false;

    /** @type {import('./Home/Header.js').Header} */
    header = null;

    /** @type {import('./Home/Hero.js').Hero} */
    hero = null;

    /** @type {import('./Home/Features.js').Features} */
    features = null;

    /** @type {import('./Catalog/Showcase.js').Showcase} */
    showcase = null;

    /** @type {import('./Contact/Page.js').Page} */
    contactPage = null;

    /** @type {import('./Home/Footer.js').Footer} */
    footer = null;

    /** @type {import('./Cart/Toast.js').Toast} */
    cartToast = null;

    /** @type {import('./Cart/Modal.js').Modal} */
    cartModal = null;

    /**
     * Inicialización del componente.
     */
    async init() {
        this.header = /** @type {import('./Home/Header.js').Header} */ (
            this.createChild("Home/Header", "header", {})
        );

        this.hero = /** @type {import('./Home/Hero.js').Hero} */ (
            this.createChild("Home/Hero", "hero", {})
        );

        this.features = /** @type {import('./Home/Features.js').Features} */ (
            this.createChild("Home/Features", "features", {})
        );

        this.contactPage = /** @type {import('./Contact/Page.js').Page} */ (
            this.createChild("Contact/Page", "contactPage", {})
        );

        this.footer = /** @type {import('./Home/Footer.js').Footer} */ (
            this.createChild("Home/Footer", "footer", {})
        );

        this.cartToast = /** @type {import('./Cart/Toast.js').Toast} */ (
            this.createChild("Cart/Toast", "cartToast", {})
        );

        this.cartModal = /** @type {import('./Cart/Modal.js').Modal} */ (
            this.createChild("Cart/Modal", "cartModal", {})
        );

        this.showcase =
            /** @type {import('./Catalog/Showcase.js').Showcase} */ (
                this.createChild("Catalog/Showcase", "catalog", {})
            );

        this.showcase.on("cartUpdated", (items) => {
            this.header.updateCart(items);
            this.cartToast.show(items);
            this.cartModal.updateCart(items);
        });

        this.header.on("openCartModal", () => this.cartModal.open());
        this.header.on("scrollToHome", () => window.scrollTo({ top: 0, behavior: "smooth" }));
        this.header.on("scrollToCatalog", () => this.scrollToCatalog());
        this.header.on("scrollToContact", () => this.contactPage.scrollIntoView());

        this.hero.on("scrollToCatalog", () => this.scrollToCatalog());
    }

    /**
     * Mueve el scroll hasta el catalogo.
     */
    scrollToCatalog() {
        this.showcase.scrollIntoView();
    }
}

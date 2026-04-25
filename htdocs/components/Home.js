import { Component } from '@fusewire/client/component.js';

/**
 * Main Home component.
 */
export class Home extends Component {
    /** @type {boolean} */
    showFeatures = false;

    /** @type {import('./Home/Header.js').Header} */
    header = /** @type {import('./Home/Header.js').Header} */ (/** @type {unknown} */ (null));

    /** @type {import('./Home/Hero.js').Hero} */
    hero = /** @type {import('./Home/Hero.js').Hero} */ (/** @type {unknown} */ (null));

    /** @type {import('./Home/Features.js').Features} */
    features = /** @type {import('./Home/Features.js').Features} */ (/** @type {unknown} */ (null));

    /** @type {import('./Catalog/Showcase.js').Showcase} */
    showcase = /** @type {import('./Catalog/Showcase.js').Showcase} */ (
        /** @type {unknown} */ (null)
    );

    /** @type {import('./Contact/Page.js').Page} */
    contactPage = /** @type {import('./Contact/Page.js').Page} */ (/** @type {unknown} */ (null));

    /** @type {import('./Home/Footer.js').Footer} */
    footer = /** @type {import('./Home/Footer.js').Footer} */ (/** @type {unknown} */ (null));

    /**
     * Inicialización del componente.
     */
    async init() {
        this.header = /** @type {import('./Home/Header.js').Header} */ (
            this.createChild('Home/Header', 'header', {})
        );

        this.hero = /** @type {import('./Home/Hero.js').Hero} */ (
            this.createChild('Home/Hero', 'hero', {})
        );

        this.features = /** @type {import('./Home/Features.js').Features} */ (
            this.createChild('Home/Features', 'features', {})
        );

        this.contactPage = /** @type {import('./Contact/Page.js').Page} */ (
            this.createChild('Contact/Page', 'contactPage', {})
        );

        this.footer = /** @type {import('./Home/Footer.js').Footer} */ (
            this.createChild('Home/Footer', 'footer', {})
        );

        this.showcase =
            /** @type {import('./Catalog/Showcase.js').Showcase} */ (
                this.createChild('Catalog/Showcase', 'showcase', {})
            );

        this.showcase.on('cartUpdated', (items) => {
            this.header.updateCart(items);
        });

        this.header.on('scrollToHome', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
        this.header.on('scrollToCatalog', () => this.scrollToCatalog());
        this.header.on('scrollToContact', () => this.contactPage.scrollIntoView());

        this.hero.on('scrollToCatalog', () => this.scrollToCatalog());
    }

    /**
     * Mueve el scroll hasta el catalogo.
     */
    scrollToCatalog() {
        this.showcase.scrollIntoView();
    }
}

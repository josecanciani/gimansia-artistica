import { Component } from '@fusewire/client/component.js';

/**
 * Main Home component.
 */
export class Home extends Component {
    /** @type {boolean} */
    showFeatures = false;

    /* eslint-disable-next-line jsdoc/no-undefined-types */
    /** @type {IntersectionObserver|null} */
    #observer = null;

    /** @type {boolean} */
    #isAutoScrolling = false;

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

    /** @type {import('./Home/Help.js').Help} */
    help = /** @type {import('./Home/Help.js').Help} */ (/** @type {unknown} */ (null));

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

        this.help = /** @type {import('./Home/Help.js').Help} */ (
            this.createChild('Home/Help', 'help', {})
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

        this.header.on('scrollToHome', () =>
            this.#handleScroll(() => window.scrollTo({ top: 0, behavior: 'smooth' })),
        );
        this.header.on('scrollToHelp', () => this.#handleScroll(() => this.help.scrollIntoView()));
        this.header.on('scrollToCatalog', () => this.scrollToCatalog());
        this.header.on('scrollToContact', () =>
            this.#handleScroll(() => this.contactPage.scrollIntoView()),
        );

        this.hero.on('scrollToCatalog', () => this.scrollToCatalog());
        this.hero.on('scrollToHelp', () => this.#handleScroll(() => this.help.scrollIntoView()));

        this.help.on('scrollToContact', () =>
            this.#handleScroll(() => this.contactPage.scrollIntoView()),
        );
    }

    /**
     * Helper to wrap programmatic scrolling and disable the ScrollSpy temporarily
     * @param {() => void} scrollFn Function that performs the scroll
     */
    #handleScroll(scrollFn) {
        this.#isAutoScrolling = true;
        scrollFn();
        setTimeout(() => {
            this.#isAutoScrolling = false;
        }, 800); // Assuming smooth scroll takes less than 800ms
    }

    /**
     * Called by the framework after the component has rendered.
     */
    hydrate() {
        // Setup scroll spy after rendering
        this.#setupScrollSpy();
    }

    /**
     * Called by the framework when the component is destroyed.
     */
    destroy() {
        if (this.#observer) {
            this.#observer.disconnect();
            this.#observer = null;
        }
    }

    /**
     * Sets up an IntersectionObserver to update the active navigation link on scroll
     */
    #setupScrollSpy() {
        const sections = [
            { id: 'home', el: this.hero.componentContainer.firstElementChild },
            { id: 'help', el: this.help.componentContainer.firstElementChild },
            { id: 'catalog', el: this.showcase.componentContainer.firstElementChild },
            { id: 'contact', el: this.contactPage.componentContainer.firstElementChild },
        ];

        const coverageMap = new Map();

        this.#observer = new IntersectionObserver(
            (entries) => {
                if (this.#isAutoScrolling) return;

                entries.forEach((entry) => {
                    const viewportHeight = entry.rootBounds
                        ? entry.rootBounds.height
                        : window.innerHeight;
                    const coverage = entry.intersectionRect.height / viewportHeight;
                    coverageMap.set(entry.target, coverage);
                });

                let mostVisible = null;
                let maxCoverage = 0;

                sections.forEach((s) => {
                    const coverage = coverageMap.get(s.el) || 0;
                    if (coverage > maxCoverage) {
                        maxCoverage = coverage;
                        mostVisible = s.id;
                    }
                });

                if (mostVisible && maxCoverage > 0) {
                    this.header.setActiveSection(mostVisible);
                }
            },
            {
                rootMargin: '-80px 0px 0px 0px',
                threshold: Array.from({ length: 21 }, (_, i) => i / 20),
            },
        );

        sections.forEach((s) => {
            if (s.el && this.#observer) {
                coverageMap.set(s.el, 0);
                this.#observer.observe(s.el);
            }
        });
    }

    /**
     * Mueve el scroll hasta el catalogo.
     */
    scrollToCatalog() {
        this.#handleScroll(() => this.showcase.scrollIntoView());
    }
}

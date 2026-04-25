import { Component } from '@fusewire/client/component.js';

/**
 *
 */
export class Showcase extends Component {
    /** @type {Array<import('../Product/Card.js').Card>} */
    cards = [];

    /** @type {Record<string, Record<string, unknown>>} */
    cartMap = {};

    /** @type {import('@fusewire/client/component.js').PortalChild} */
    cartToast = /** @type {import('@fusewire/client/component.js').PortalChild} */ (
        /** @type {unknown} */ (null)
    );

    /**
     * Inicialización del componente.
     */
    async init() {
        this.cartToast = /** @type {import('@fusewire/client/component.js').PortalChild} */ (
            this.createPortalChild('Cart/Toast', 'cartToast', {})
        );

        // Fetch the product catalog we created
        try {
            const response = await fetch('./data/products.json');
            const catalog = await response.json();

            // Map each JSON item to a ProductCard component instance
            this.cards = catalog.map(
                (
                    /** @type {{id: string, title: string, description: string, images: string[], selections: Record<string, unknown>[]}} */ product,
                ) => {
                    return /** @type {import('../Product/Card.js').Card} */ (
                        this.createChild('Product/Card', product.id, {
                            productId: product.id,
                            title: product.title,
                            description: product.description,
                            images: product.images,
                            selections:
                                /** @type {Array<import('@fusewire/client/component.js').VarValue>} */ (
                                    product.selections
                                ),
                        })
                    );
                },
            );

            // We subscribe to the add-to-cart events emitted by children
            this.cards.forEach((card) => {
                card.on('addToCart', (data) => this.#handleAddToCart(data));
            });
        } catch (e) {
            this.console.error('Error loading product catalog', e);
        }
    }

    /**
     * Mueve el scroll hasta el catalogo.
     */
    scrollIntoView() {
        /** @type {HTMLElement} */ (this.querySelector('.showcase')).scrollIntoView({
            behavior: 'smooth',
        });
    }

    /**
     * Cachea las entidades temporalmente y emite hacia el Widget
     * @param {Record<string, unknown>} data - Datos de la orden
     */
    #handleAddToCart(data) {
        if (data.selections && /** @type {Array<unknown>} */ (data.selections).length > 0) {
            this.cartMap[/** @type {string} */ (data.id)] = data;
        } else {
            delete this.cartMap[/** @type {string} */ (data.id)];
        }

        this.emit('cartUpdated', Object.values(this.cartMap));

        const toast = /** @type {import('../Cart/Toast.js').Toast} */ (this.cartToast.getChild());
        toast.show(Object.values(this.cartMap));
    }
}

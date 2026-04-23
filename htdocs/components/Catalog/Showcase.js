import { Component } from '@fusewire/client/component.js';

/**
 *
 */
export class Showcase extends Component {
    /** @type {Array<import('../Product/Card.js').Card>} */
    cards = [];

    /** @type {Record<string, any>} */
    cartMap = {};

    /**
     * Inicialización del componente.
     */
    async init() {
        // Fetch the product catalog we created
        try {
            const response = await fetch('./data/products.json');
            const catalog = await response.json();

            // Map each JSON item to a ProductCard component instance
            this.cards = catalog.map((product) => {
                return /** @type {import('../Product/Card.js').Card} */ (
                    this.createChild('Product/Card', product.id, {
                        productId: product.id,
                        title: product.title,
                        description: product.description,
                        images: product.images,
                        selections: product.selections,
                    })
                );
            });

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
        this.querySelector('.showcase').scrollIntoView({ behavior: 'smooth' });
    }

    /**
     * Cachea las entidades temporalmente y emite hacia el Widget
     * @param {Record<string, any>} data - Datos de la orden
     */
    #handleAddToCart(data) {
        if (data.selections && data.selections.length > 0) {
            this.cartMap[data.id] = data;
        } else {
            delete this.cartMap[data.id];
        }

        this.emit('cartUpdated', Object.values(this.cartMap));
    }
}

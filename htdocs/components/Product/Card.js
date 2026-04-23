import { Component } from '@fusewire/client/component.js';

/**
 * Componente que orquesta la tarjeta del producto, sus imagenes y selecciones.
 */
export class Card extends Component {
    // Public Vars driven by Parent
    /** @type {string} */
    productId = '';
    /** @type {string} */
    title = '';
    /** @type {string} */
    description = '';
    /** @type {Array<string>} */
    images = [];
    /** @type {Array<Record<string, any>>} */
    selections = [];

    // Internal private state mapping selected items array
    /** @type {Array<Record<string, any>>} */
    shoppingList = [];

    /** @type {import('../Common/Carousel.js').Carousel} */
    carousel = null;

    /** @type {import('./Selection/Summary.js').Summary} */
    summary = null;

    /**
     * Inicialización del componente.
     */
    async init() {
        // Mount image carousel
        this.carousel = /** @type {import('../Common/Carousel.js').Carousel} */ (
            this.createChild('Common/Carousel', `carousel-${this.productId}`, {
                images: this.images,
            })
        );

        // Mount single unified variant selection component
        this.summary = /** @type {import('./Selection/Summary.js').Summary} */ (
            this.createChild('Product/Selection/Summary', `sel-${this.productId}`, {
                groups: this.selections,
            })
        );
        this.summary.on('optionsChanged', (items) => this.#handleSelectionChange(items));
    }

    /**
     * Handler interno para mutaciones de la lista de compras del hijo.
     * @param {Array<Record<string, any>>} items La lista mapeada de items agregados.
     */
    #handleSelectionChange(items) {
        this.shoppingList = items;
        this.emit('addToCart', {
            id: this.productId,
            title: this.title,
            totalPrice: this.$totalPrice,
            selections: this.shoppingList,
        });
        this.react();
    }

    /**
     * Verifica si el usuario agregó algo a la lista y se puede encargar.
     * @returns {boolean} Check if ready
     */
    get $isReadyToOrder() {
        return this.shoppingList.length > 0;
    }

    /**
     * Total calculator.
     * @returns {number} Sum of selected variant prices
     */
    get $totalPrice() {
        return this.shoppingList.reduce((sum, item) => sum + item.price, 0);
    }

    /**
     * Safe string price formatter for template.
     * @returns {string} locale formatted string
     */
    get $formattedTotal() {
        return this.$totalPrice > 0 ? this.$totalPrice.toLocaleString('es-AR') : '0';
    }
}

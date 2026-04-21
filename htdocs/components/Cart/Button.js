import { Component } from '@fusewire/client/component.js';

/**
 * Componente interactivo iconografico de estado global
 */
export class Button extends Component {
    /** @type {Array<Record<string, any>>} */
    items = [];

    /** Overridden method */
    async init() {}

    /**
     * Acumulado general de precio
     * @returns {number} sumatoria monetaria
     */
    get $totalPrice() {
        return this.items.reduce((acc, curr) => acc + curr.totalPrice, 0);
    }

    /**
     * Cadena formateada nativa
     * @returns {string} precio string
     */
    get $formattedTotal() {
        return this.$totalPrice.toLocaleString('es-AR');
    }

    /**
     * Cantidad total iterada
     * @returns {number} cantidad
     */
    get $totalItemsCount() {
        return this.items.reduce((acc, curr) => acc + curr.selections.length, 0);
    }

    /**
     * Booleano para rendering nativo reactivo
     * @returns {boolean} activo
     */
    get $hasItems() {
        return this.$totalItemsCount > 0;
    }

    /**
     * Setter principal
     * @param {Array<Record<string, any>>} newItems - config
     */
    updateCart(newItems) {
        this.items = newItems;
        this.react();
    }

    /**
     * Detonador publico global
     */
    triggerClick() {
        this.emit('openModal');
    }
}

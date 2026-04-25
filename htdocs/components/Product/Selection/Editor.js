import { Component } from '@fusewire/client/component.js';

/**
 * Componente modal para interactuar las cantidades sobre el draft en vivo.
 */
export class Editor extends Component {
    /** @type {Array<{label: string, price: number, options: string[]}>} */
    groups = [];

    /** @type {Record<string, number>} */
    initialCounts = {};

    /** @type {string} */
    colClass = 'col-md-12';

    /** @type {Array<{label: string, priceFormatted: string, options: {label: string, price: number, payload: string, count: number}[]}>} */
    draftOptions = [];

    /**
     * Parsing dinámico inicial y seteo de la UI draft
     */
    async init() {
        this.draftOptions = this.groups.map((g) => {
            return {
                label: g.label,
                priceFormatted: g.price.toLocaleString('es-AR'),
                options: g.options.map((/** @type {string} */ opt) => {
                    const payload = JSON.stringify({ group: g.label, option: opt, price: g.price });
                    return {
                        label: opt,
                        price: g.price,
                        payload,
                        count: this.initialCounts[payload] || 0,
                    };
                }),
            };
        });

        if (this.groups.length > 1) {
            this.colClass = 'col-md-6';
        }
    }

    /**
     * Acumula el precio subtotal provisoriamente.
     * @returns {number} precio total array
     */
    get $draftTotalPrice() {
        let sum = 0;
        this.draftOptions.forEach((g) =>
            g.options.forEach(
                (
                    /** @type {{label: string, price: number, payload: string, count: number}} */ o,
                ) => {
                    sum += o.count * o.price;
                },
            ),
        );
        return sum;
    }

    /**
     * Formatea el layout en string en pesos locales.
     * @returns {string} string representable precio UI local
     */
    get $formattedDraftTotal() {
        return this.$draftTotalPrice.toLocaleString('es-AR');
    }

    /**
     * Vacía el layout de borrador local
     */
    clear() {
        this.draftOptions.forEach((g) =>
            g.options.forEach(
                (
                    /** @type {{label: string, price: number, payload: string, count: number}} */ o,
                ) => {
                    o.count = 0;
                },
            ),
        );
        this.react();
    }

    /**
     * Aviso a padre
     */
    close() {
        this.emit('closed');
    }

    /**
     * Añade elemento al borrador de ser tocado en el layout
     * @param {Event} event handler plus button
     */
    handleIncrement(event) {
        const target = /** @type {HTMLElement} */ (event.currentTarget);
        const payload = target.getAttribute('data-payload');
        this.draftOptions.forEach((g) => {
            const match = g.options.find(
                (/** @type {{label: string, price: number, payload: string, count: number}} */ o) =>
                    o.payload === payload,
            );
            if (match) match.count++;
        });
        this.react();
    }

    /**
     * Descuenta al presionar validando si se posee cuenta activa
     * @param {Event} event handler minus button
     */
    handleDecrement(event) {
        const target = /** @type {HTMLElement} */ (event.currentTarget);
        const payload = target.getAttribute('data-payload');
        this.draftOptions.forEach((g) => {
            const match = g.options.find(
                (/** @type {{label: string, price: number, payload: string, count: number}} */ o) =>
                    o.payload === payload,
            );
            if (match && match.count > 0) match.count--;
        });
        this.react();
    }

    /**
     * Dispara diccionario reconstruido a su owner Summary object
     */
    accept() {
        /** @type {Record<string, number>} */
        const countsMap = {};
        this.draftOptions.forEach((g) => {
            g.options.forEach(
                (
                    /** @type {{label: string, price: number, payload: string, count: number}} */ opt,
                ) => {
                    if (opt.count > 0) {
                        countsMap[opt.payload] = opt.count;
                    }
                },
            );
        });

        this.emit('confirmed', countsMap);
    }
}

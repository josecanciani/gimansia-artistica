import { Component } from '@fusewire/client/component.js';

/**
 * UI Checkout overlay
 */
export class Modal extends Component {
    /** @type {Array<Record<string, any>>} */
    items = [];

    /** @type {Array<Record<string, any>>} */
    groupedItems = [];

    /** @type {boolean} */
    isOpen = false;

    /** Overridden method */
    async init() { }

    /**
     * Dinero sumarizado
     * @returns {number} precio
     */
    get $totalPrice() {
        return this.items.reduce((acc, curr) => acc + curr.totalPrice, 0);
    }

    /**
     * Dinero formateado string
     * @returns {string} render
     */
    get $formattedTotal() {
        return this.$totalPrice.toLocaleString('es-AR');
    }

    /**
     * Set data arr
     * @param {Array<Record<string, any>>} newItems arr configs
     */
    updateCart(newItems) {
        this.items = newItems;

        // Build the groupedItems array strictly for UI rendering
        this.groupedItems = this.items.map(product => {
            /** @type {Record<string, any>} */
            const grouped = {};

            for (const item of product.selections) {
                const key = `${item.group} - ${item.option}`;
                if (!grouped[key]) {
                    grouped[key] = { group: item.group, option: item.option, count: 0, price: item.price };
                }
                grouped[key].count++;
            }

            return {
                title: product.title,
                selections: Object.values(grouped).map(g => ({
                    group: g.group,
                    option: g.option,
                    count: g.count,
                    countBadge: g.count > 1 ? `x${g.count}` : '',
                    totalLinePrice: (g.count * g.price).toLocaleString('es-AR')
                }))
            };
        });

        this.react();
    }

    /** Levanta model manual */
    open() {
        this.isOpen = true;
        this.react();
    }

    /** Oculta modal override */
    close() {
        this.isOpen = false;
        this.react();
    }

    /**
     * Generador de cadena central de texto con toda la data consolidada.
     * @returns {string} Generates the payload text
     */
    #generatePayloadText() {
        if (this.items.length === 0) return '';

        let text = `Hola! Me gustaría confirmar mi pedido de indumentaria de Hacoaj G.A:\n\n`;

        this.items.forEach(product => {
            text += `*${product.title}*\n`;

            /** @type {Record<string, any>} */
            const grouped = {};
            for (const item of product.selections) {
                const key = `${item.group} - ${item.option}`;
                if (!grouped[key]) grouped[key] = { count: 0, price: item.price };
                grouped[key].count++;
            }
            for (const [key, obj] of Object.entries(grouped)) {
                text += `- ${obj.count}x ${key} ($${obj.price.toLocaleString('es-AR')} c/u)\n`;
            }
            text += `\n`;
        });

        text += `*Total a abonar: $${this.$formattedTotal}*\n`;
        return text;
    }

    /**
     * Builder link whatsapp
     */
    checkout() {
        const text = this.#generatePayloadText();
        if (!text) return;

        const email = 'indumentariagimnasiahacoaj@gmail.com';
        const subject = 'Pedido de Indumentaria';
        const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;
        window.open(mailtoLink, '_blank');
    }

    /**
     * Fallback link whatsapp
     */
    checkoutWhatsApp() {
        const text = this.#generatePayloadText();
        if (!text) return;

        const waLink = `https://wa.me/+5491151562602?text=${encodeURIComponent(text)}`;
        window.open(waLink, '_blank');
    }
}

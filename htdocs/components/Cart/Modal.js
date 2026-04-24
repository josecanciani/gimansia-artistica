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

    /** @type {number} */
    step = 1;

    /** @type {boolean} */
    get $isStep1() { return this.step === 1; }

    /** @type {boolean} */
    get $isStep2() { return this.step === 2; }

    /** @type {import('../Contact/PersonInfoForm.js').PersonInfoForm|null} */
    personForm = null;

    /** Overridden method */
    async init() {
        this.personForm = /** @type {import('../Contact/PersonInfoForm.js').PersonInfoForm} */ (
            this.createChild('Contact/PersonInfoForm', 'personInfoFormForCart', {
                messageLabel: 'Comentarios',
                messagePlaceholder: 'Escribí opcionalmente un comentario extra acá...',
                messageRequired: false,
                showDirectEmail: false,
                showSubmitButtons: false,
            })
        );
        this.personForm.on('submit', (data) => this.#handleFormSubmit(data));
    }

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
        this.groupedItems = this.items.map((product) => {
            /** @type {Record<string, any>} */
            const grouped = {};
            for (const item of product.selections) {
                const key = `${item.group} - ${item.option}`;
                if (!grouped[key]) {
                    grouped[key] = {
                        group: item.group,
                        option: item.option,
                        count: 0,
                        price: item.price,
                    };
                }
                grouped[key].count++;
            }
            return {
                title: product.title,
                selections: Object.values(grouped).map((g) => ({
                    group: g.group,
                    option: g.option,
                    count: g.count,
                    countBadge: g.count > 1 ? `x${g.count}` : '',
                    totalLinePrice: (g.count * g.price).toLocaleString('es-AR'),
                })),
            };
        });
        this.react();
    }

    /** Levanta model manual */
    open() {
        this.isOpen = true;
        this.step = 1;
        this.react();
    }

    /** Oculta modal override */
    close() {
        this.isOpen = false;
        this.react();
    }

    /** Ir al paso 1 */
    goToStep1() {
        this.step = 1;
        this.react();
    }

    /** Ir al paso 2 */
    goToStep2() {
        this.step = 2;
        this.react();
    }

    /**
     * Generador de cadena central de texto con toda la data consolidada.
     * @param {Record<string, any>} userData User details from form
     * @returns {string} Generates the payload text
     */
    #generatePayloadText(userData) {
        let text = `Hola! Me gustaría confirmar mi pedido de indumentaria de Hacoaj G.A:\n\n`;
        text += `*MIS DATOS*\n`;
        text += `Sede: ${userData.sede}\n`;
        text += `Modalidad: ${userData.modalidad}\n`;
        text += `Gimnasta: ${userData.nombre}\n`;
        text += `Grupo: ${userData.grupo}\n`;
        text += `Mail: ${userData.email}\n`;
        text += `Celular: ${userData.celular}\n`;
        if (userData.mensaje) {
            text += `Comentarios: ${userData.mensaje}\n`;
        }
        text += `\n*MI PEDIDO*\n`;
        this.items.forEach((product) => {
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
     * Procesar envío del formulario final
     * @param {Record<string, any>} data Data del formulario
     */
    #handleFormSubmit(data) {
        const text = this.#generatePayloadText(data);
        if (data.method === 'email') {
            const email = 'indumentariagimnasiahacoaj@gmail.com';
            const subject = 'Pedido de Indumentaria';
            const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;
            window.open(mailtoLink, '_blank');
        } else if (data.method === 'whatsapp') {
            const waLink = `https://wa.me/+5491151562602?text=${encodeURIComponent(text)}`;
            window.open(waLink, '_blank');
        }
        this.close();
    }
}

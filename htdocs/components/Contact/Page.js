import { Component } from '@fusewire/client/component.js';

/**
 * Contact Page component.
 */
export class Page extends Component {
    /** @type {import('./PersonInfoForm.js').PersonInfoForm} */
    personInfoForm = /** @type {import('./PersonInfoForm.js').PersonInfoForm} */ (/** @type {unknown} */ (null));

    /**
     * Initializes the component.
     */
    async init() {
        this.personInfoForm = /** @type {import('./PersonInfoForm.js').PersonInfoForm} */ (
            this.createChild('Contact/PersonInfoForm', 'personInfoFormForContact', {})
        );

        this.personInfoForm.on('submit', (data) => {
            this.#handleFormSubmit(data);
        });
    }

    /**
     * Process contact form submission and open external links.
     * @param {Record<string, any>} data Data del formulario
     */
    #handleFormSubmit(data) {
        const text =
            `Hola! Tengo una consulta:\n\n` +
            `Sede: ${data.sede}\n` +
            `Modalidad: ${data.modalidad}\n` +
            `Gimnasta: ${data.nombre}\n` +
            `Grupo: ${data.grupo}\n` +
            `Mail: ${data.email}\n` +
            `Celular: ${data.celular}\n\n` +
            `Mensaje:\n${data.mensaje}`;

        if (data.method === 'email') {
            const email = 'indumentariagimnasiahacoaj@gmail.com';
            const subject = 'Consulta - Gimnasia Artística Hacoaj';
            const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;
            window.open(mailtoLink, '_blank');
        } else if (data.method === 'whatsapp') {
            const waLink = `https://wa.me/+5491151562602?text=${encodeURIComponent(text)}`;
            window.open(waLink, '_blank');
        }
    }

    /**
     * Scrolls the component into view.
     */
    scrollIntoView() {
        /** @type {HTMLElement} */ (this.querySelector('#contact')).scrollIntoView({ behavior: 'smooth' });
    }
}

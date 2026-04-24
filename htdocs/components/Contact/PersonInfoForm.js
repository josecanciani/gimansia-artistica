import { Component } from '@fusewire/client/component.js';

/**
 * Person info form to capture Gymnast details.
 */
export class PersonInfoForm extends Component {
    /**
     * Emits form submission.
     * @param {Event} event The submit event.
     */
    submitForm(event) {
        event.preventDefault();
        // eslint-disable-next-line jsdoc/no-undefined-types
        const form = /** @type {HTMLFormElement} */ (event.target);
        this.#processSubmission(form, 'email');
    }

    /**
     * Fallback to WhatsApp
     * @param {Event} event The click event.
     */
    submitWhatsApp(event) {
        event.preventDefault();
        // eslint-disable-next-line jsdoc/no-undefined-types
        const form = /** @type {HTMLFormElement} */ (this.querySelector('form'));
        if (form) {
            this.#processSubmission(form, 'whatsapp');
        }
    }

    /**
     * Process form submission and open external links.
     * @param {HTMLFormElement} form Form reference.
     * @param {string} method Method string.
     */
    #processSubmission(form, method) {
        if (!form.checkValidity()) {
            form.classList.add('was-validated');
            
            // Scroll to the first invalid element so the user knows what's wrong
            const firstInvalidElement = form.querySelector(':invalid');
            if (firstInvalidElement) {
                firstInvalidElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            
            return;
        }

        const formData = new FormData(form);

        const data = {
            sede: formData.get('sede'),
            modalidad: formData.get('modalidad'),
            nombre: formData.get('nombre'),
            grupo: formData.get('grupo'),
            email: formData.get('email'),
            celular: formData.get('celular'),
            mensaje: formData.get('mensaje'),
        };

        const text = `Hola! Tengo una consulta:\n\n` +
            `Sede: ${data.sede}\n` +
            `Modalidad: ${data.modalidad}\n` +
            `Gimnasta: ${data.nombre}\n` +
            `Grupo: ${data.grupo}\n` +
            `Mail: ${data.email}\n` +
            `Celular: ${data.celular}\n\n` +
            `Mensaje:\n${data.mensaje}`;

        if (method === 'email') {
            const email = 'indumentariagimnasiahacoaj@gmail.com';
            const subject = 'Consulta - Gimnasia Artística Hacoaj';
            const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;
            window.open(mailtoLink, '_blank');
        } else if (method === 'whatsapp') {
            const waLink = `https://wa.me/+5491151562602?text=${encodeURIComponent(text)}`;
            window.open(waLink, '_blank');
        }

        this.emit('submit', data);
    }

    /**
     * Resets the form fields.
     */
    reset() {
        // eslint-disable-next-line jsdoc/no-undefined-types
        const form = /** @type {HTMLFormElement} */ (this.querySelector('form'));
        if (form) {
            form.reset();
            form.classList.remove('was-validated');
        }
    }
}

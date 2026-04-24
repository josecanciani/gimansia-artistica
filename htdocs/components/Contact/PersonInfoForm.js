import { Component } from '@fusewire/client/component.js';

/**
 * Person info form to capture Gymnast details.
 */
export class PersonInfoForm extends Component {
    /** @type {string} */
    messageLabel = 'Consulta / Mensaje';

    /** @type {string} */
    messagePlaceholder = 'Escribí tu consulta acá...';

    /** @type {boolean} */
    messageRequired = true;

    /** @type {boolean} */
    showDirectEmail = true;

    /** @type {string} */
    submitEmailText = 'Enviar consulta por Email';

    /** @type {string} */
    submitWhatsappText = 'Enviar por WhatsApp';

    /** @type {boolean} */
    showSubmitButtons = true;

    /**
     * Emits form submission.
     * @param {Event} event The submit event.
     */
    submitForm(event) {
        event.preventDefault();
        const form = /** @type {HTMLFormElement} */ (event.target);
        this.#processSubmission(form, 'email');
    }

    /**
     * Fallback to WhatsApp
     * @param {Event} event The click event.
     */
    submitWhatsApp(event) {
        event.preventDefault();
        const form = /** @type {HTMLFormElement} */ (this.querySelector('form'));
        if (form) {
            this.#processSubmission(form, 'whatsapp');
        }
    }

    /**
     * Trigger submission from an external button
     * @param {string} method The method to use ('email' or 'whatsapp')
     */
    requestSubmit(method) {
        const form = /** @type {HTMLFormElement} */ (this.querySelector('form'));
        if (form) {
            this.#processSubmission(form, method);
        }
    }

    /**
     * Process form submission and open external links.
     * @param {HTMLFormElement} form Form reference.
     * @param {string} method Method string.
     */
    #processSubmission(form, method) {
        const messageField = /** @type {HTMLInputElement} */ (form.querySelector('[name="mensaje"]'));
        messageField.setCustomValidity(
            this.messageRequired && !messageField.value.trim() ? 'required' : '',
        );
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
            method: method,
            sede: formData.get('sede'),
            modalidad: formData.get('modalidad'),
            nombre: formData.get('nombre'),
            grupo: formData.get('grupo'),
            email: formData.get('email'),
            celular: formData.get('celular'),
            mensaje: formData.get('mensaje'),
        };
        this.emit('submit', data);
    }

    /**
     * Resets the form fields.
     */
    reset() {
        const form = /** @type {HTMLFormElement} */ (this.querySelector('form'));
        if (form) {
            form.reset();
            form.classList.remove('was-validated');
        }
    }
}

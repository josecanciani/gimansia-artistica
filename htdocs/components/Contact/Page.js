import { Component } from "@fusewire/client/component.js";

/**
 * Contact Page component.
 */
export class Page extends Component {
    /** @type {import('./PersonInfoForm.js').PersonInfoForm} */
    personInfoForm =
        /** @type {import('./PersonInfoForm.js').PersonInfoForm} */ (
            /** @type {unknown} */ (null)
        );

    /** @type {boolean} */
    copied = false;

    /**
     * Initializes the component.
     */
    async init() {
        this.personInfoForm =
            /** @type {import('./PersonInfoForm.js').PersonInfoForm} */ (
                this.createChild(
                    "Contact/PersonInfoForm",
                    "personInfoFormForContact",
                    {},
                )
            );
    }

    /**
     * Submit by email
     */
    submitByEmail() {
        const data = this.personInfoForm.getFormData();
        if (data) {
            this.#processSubmission(data, "email");
        }
    }

    /**
     * Copy to clipboard fallback
     */
    async handleCopy() {
        const data = this.personInfoForm.getFormData();
        if (!data) return;

        const text = this.#generatePayloadText(data);
        try {
            await navigator.clipboard.writeText(text);
            this.copied = true;
            this.react();
            setTimeout(() => {
                this.copied = false;
                this.react();
            }, 2000);
        } catch (err) {
            window.console.error("Failed to copy: ", err);
        }
    }

    /**
     * Generate the query text
     * @param {Record<string, any>} data Form data
     * @returns {string} Text
     */
    #generatePayloadText(data) {
        return (
            `Hola! Tengo una consulta:\n\n` +
            `Sede: ${data.sede}\n` +
            `Modalidad: ${data.modalidad}\n` +
            `Gimnasta: ${data.nombre}\n` +
            `Grupo: ${data.grupo}\n` +
            `Mail: ${data.email}\n` +
            `Celular: ${data.celular}\n\n` +
            `Mensaje:\n${data.mensaje}`
        );
    }

    /**
     * Process contact form submission and open external links.
     * @param {Record<string, any>} data Data del formulario
     * @param {string} method Method
     */
    #processSubmission(data, method) {
        const text = this.#generatePayloadText(data);

        if (method === "email") {
            const email = "indumentariagimnasiahacoaj@gmail.com";
            const subject = "Consulta - Gimnasia Artística Hacoaj";
            const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;
            window.open(mailtoLink, "_blank");
        }
    }

    /**
     * Scrolls the component into view.
     */
    scrollIntoView() {
        /** @type {HTMLElement} */ (
            this.querySelector("#contact")
        ).scrollIntoView({
            behavior: "smooth",
        });
    }
}

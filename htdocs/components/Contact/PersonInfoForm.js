import { Component } from "@fusewire/client/component.js";

/**
 * Person info form to capture Gymnast details.
 */
export class PersonInfoForm extends Component {
    // Labels
    sedeLabel = "Sede";
    modalidadLabel = "Modalidad";
    nombreLabel = "Nombre y apellido de la gimnasta";
    grupoLabel = "Grupo al que pertenece";
    emailLabel = "Mail de contacto";
    celularLabel = "Celular de contacto";
    messageLabel = "Consulta / Mensaje";
    messagePlaceholder = "Escribí tu consulta acá...";

    // Mandatory flags
    sedeRequired = true;
    modalidadRequired = true;
    nombreRequired = true;
    grupoRequired = true;
    emailRequired = true;
    celularRequired = true;
    messageRequired = true;

    // Form field states
    sede = "";
    modalidad = "";
    nombre = "";
    grupo = "";
    email = "";
    celular = "";
    mensaje = "";

    /**
     * Synchronizes input value with component state
     * @param {Event} event The input event
     */
    sync(event) {
        const target =
            /** @type {HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement} */ (
                event.target
            );
        const name = target.getAttribute("name");
        if (name && name in this) {
            // @ts-ignore
            this[name] = target.value;
        }
    }

    /**
     * Resets the form fields.
     */
    reset() {
        this.sede = "";
        this.modalidad = "";
        this.nombre = "";
        this.grupo = "";
        this.email = "";
        this.celular = "";
        this.mensaje = "";

        const form = /** @type {HTMLFormElement} */ (
            this.querySelector("form")
        );
        if (form) {
            form.reset();
            form.classList.remove("was-validated");
        }
        this.react();
    }

    /**
     * Returns the form data if valid, otherwise triggers validation UI and returns null.
     * @returns {Record<string, any> | null}
     */
    getFormData() {
        const form = /** @type {HTMLFormElement} */ (
            this.querySelector("form")
        );
        if (!form) return null;

        // Custom validation for textarea since it's hard to do via attribute-only in some cases
        const messageField = /** @type {HTMLInputElement} */ (
            form.querySelector('[name="mensaje"]')
        );
        if (messageField) {
            messageField.setCustomValidity(
                this.messageRequired && !this.mensaje.trim() ? "required" : "",
            );
        }

        if (!form.checkValidity()) {
            form.classList.add("was-validated");
            const firstInvalidElement = form.querySelector(":invalid");
            if (firstInvalidElement) {
                firstInvalidElement.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                });
            }
            return null;
        }

        return {
            sede: this.sede,
            modalidad: this.modalidad,
            nombre: this.nombre,
            grupo: this.grupo,
            email: this.email,
            celular: this.celular,
            mensaje: this.mensaje,
        };
    }
}

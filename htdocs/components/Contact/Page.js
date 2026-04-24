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
            this.createChild('Contact/PersonInfoForm', 'personInfoForm', {})
        );

        this.personInfoForm.on('submit', (data) => {
            this.console.log('Form submitted', data);
        });
    }

    /**
     * Scrolls the component into view.
     */
    scrollIntoView() {
        /** @type {HTMLElement} */ (this.querySelector('#contact')).scrollIntoView({ behavior: 'smooth' });
    }
}

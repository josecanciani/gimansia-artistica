import { Component } from '@fusewire/client/component.js';

/**
 * Contact Page component.
 */
export class Page extends Component {
    /** @type {import('./PersonInfoForm.js').PersonInfoForm} */
    personInfoForm = null;

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
        this.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
    }
}

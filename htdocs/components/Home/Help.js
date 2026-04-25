import { Component } from '@fusewire/client/component.js';

/**
 * Help section explaining how to reserve items.
 */
export class Help extends Component {
    /**
     * Scrolls the component into view.
     */
    scrollIntoView() {
        const element = this.querySelector('section');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }

    /**
     * Emits event to scroll to contact.
     */
    scrollToContact() {
        this.emit('scrollToContact');
    }
}

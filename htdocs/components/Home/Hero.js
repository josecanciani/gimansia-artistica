import { Component } from '@fusewire/client/component.js';

/**
 * Hero component for the Home page.
 */
export class Hero extends Component {
    /**
     * Emits event to scroll to catalog.
     */
    scrollToCatalog() {
        this.emit('scrollToCatalog');
    }
}

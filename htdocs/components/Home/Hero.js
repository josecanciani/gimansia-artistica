import { Component } from '@fusewire/client/component.js';
import { CONFIG } from '../../js/config.js';

/**
 * Hero component for the Home page.
 */
export class Hero extends Component {
    /** @type {boolean} */
    showMarketplace = CONFIG.enableMarketplace;
    /**
     * Emits event to scroll to catalog.
     */
    scrollToCatalog() {
        this.emit('scrollToCatalog');
    }

    /**
     * Emits event to scroll to help section.
     */
    scrollToHelp() {
        this.emit('scrollToHelp');
    }
}

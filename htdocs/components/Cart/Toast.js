import { Component } from '@fusewire/client/component.js';

/**
 * Notificador rapido efimero
 */
export class Toast extends Component {
    /** @type {boolean} */
    isVisible = false;
    
    /** @type {string} */
    formattedTotal = '0';

    /** @type {number} */
    timeoutId = 0;

    /** Overridden method */
    async init() {}

    /**
     * Levanta el toast durante 3 segundos
     * @param {Array<Record<string, any>>} items - array final
     */
    show(items) {
        const total = items.reduce((acc, curr) => acc + curr.totalPrice, 0);
        this.formattedTotal = total.toLocaleString('es-AR');
        
        this.isVisible = true;
        this.react();

        if (this.timeoutId) window.clearTimeout(this.timeoutId);
        
        this.timeoutId = window.setTimeout(() => {
            this.isVisible = false;
            this.react();
        }, 3000);
    }
}

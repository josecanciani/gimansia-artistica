import { Component } from '@fusewire/client/component.js';

/**
 * Componente de Carrusel para imagenes.
 */
export class Carousel extends Component {
    /** @type {Array<string>} */
    images = [];

    /** @type {number} */
    activeIndex = 0;

    /**
     * URL actual en base al indice.
     * @returns {string} current image url
     */
    get $currentImage() {
        return this.images[this.activeIndex];
    }

    /**
     * Verifica multi-imagen.
     * @returns {boolean} Check if multiple images exist
     */
    get $hasMultiple() {
        return this.images.length > 1;
    }

    /**
     * Increment the carousel
     */
    next() {
        if (this.activeIndex < this.images.length - 1) {
            this.activeIndex++;
        } else {
            this.activeIndex = 0;
        }
        this.react();
    }

    /**
     * Decrement the carousel
     */
    prev() {
        if (this.activeIndex > 0) {
            this.activeIndex--;
        } else {
            this.activeIndex = this.images.length - 1;
        }
        this.react();
    }

    /**
     * Go directly to an index
     * @param {number} index - Index to display
     */
    goTo(index) {
        this.activeIndex = index;
        this.react();
    }
}

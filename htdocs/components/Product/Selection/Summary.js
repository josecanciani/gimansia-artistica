import { Component } from '@fusewire/client/component.js';

/**
 * Componente principal estático que detona el editor y guarda el estado global validado.
 */
export class Summary extends Component {
    /** @type {Array<Record<string, any>>} */
    groups = [];

    /** @type {boolean} */
    isOpen = false;

    /** @type {Record<string, number>} */
    confirmedCounts = {};

    /** @type {import('./Editor.js').Editor} */
    editor = null;

    /**
     * Cachea los datos de base.
     */
    async init() {}

    /**
     * Monto real salvado iterado desde diccionarios.
     * @returns {number} sumatoria de items reales confirmados
     */
    get $confirmedAmount() {
        return Object.values(this.confirmedCounts).reduce((a, b) => a + b, 0);
    }

    /**
     * Detecta si se posee algo checkeado.
     * @returns {boolean} confirmacion booleana general
     */
    get $hasSelections() {
        return this.$confirmedAmount > 0;
    }

    /**
     * Acumulado en texto plano ARS global referenciado.
     * @returns {string} string final monetario mapeado
     */
    get $formattedConfirmedTotal() {
        let sum = 0;
        for (const [payload, count] of Object.entries(this.confirmedCounts)) {
            const obj = JSON.parse(payload);
            sum += obj.price * count;
        }
        return sum.toLocaleString('es-AR');
    }

    /**
     * Cierra el estado actual eliminando el componente de la memoria si aplicaba.
     */
    close() {
        this.isOpen = false;
        this.editor = null;
        this.react();
    }

    /**
     * Inicia visualmente y levanta el editor efimero hijo instanciándolo lazy
     */
    toggle() {
        if (!this.isOpen) {
            this.editor = /** @type {import('./Editor.js').Editor} */ (
                this.createChild('Product/Selection/Editor', `editor-${Math.random().toString(36).substring(2)}`, {
                    groups: this.groups,
                    initialCounts: this.confirmedCounts
                })
            );
            
            // Listeners locales para este runtime de editor
            this.editor.on('closed', () => this.close());
            this.editor.on('confirmed', (newCountsMap) => this.#handleCommit(newCountsMap));
            
            this.isOpen = true;
            this.react();
        } else {
            this.close();
        }
    }

    /**
     * Recibe la validación definitiva
     * @param {Record<string, number>} newCounts mapa JSON contra int
     */
    #handleCommit(newCounts) {
        this.confirmedCounts = newCounts;
        this.close();
        
        // Translada al layout tradicional
        const items = [];
        for (const [payload, count] of Object.entries(this.confirmedCounts)) {
            const meta = JSON.parse(payload);
            for (let i = 0; i < count; i++) {
                items.push({
                    id: Math.random().toString(36).substring(2, 11),
                    group: meta.group,
                    option: meta.option,
                    price: meta.price
                });
            }
        }
        
        // Transmite de vuelta a su padre (Product/Card)
        this.emit('optionsChanged', items);
    }
}

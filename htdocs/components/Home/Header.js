import { Component } from '@fusewire/client/component.js';

/**
 * Header component for the Home page.
 */
export class Header extends Component {
    /** @type {import('../Cart/Button.js').Button} */
    cartButton = /** @type {import('../Cart/Button.js').Button} */ (/** @type {unknown} */ (null));

    /** @type {import('@fusewire/client/component.js').PortalChild} */
    cartModal = /** @type {import('@fusewire/client/component.js').PortalChild} */ (
        /** @type {unknown} */ (null)
    );

    /** @type {Array<{id: string, label: string, href: string, activeClass: string}>} */
    sections = [
        { id: 'home', label: 'Inicio', href: '#', activeClass: 'active-link' },
        { id: 'help', label: 'Ayuda', href: '#help', activeClass: '' },
        { id: 'catalog', label: 'Catálogo', href: '#catalog', activeClass: '' },
        { id: 'contact', label: 'Contacto', href: '#contact', activeClass: '' },
    ];

    /**
     * Initializes the Header component and creates the cart button child.
     */
    async init() {
        this.cartButton = /** @type {import('../Cart/Button.js').Button} */ (
            this.createChild('Cart/Button', 'cartButton', {})
        );

        this.cartModal = /** @type {import('@fusewire/client/component.js').PortalChild} */ (
            this.createPortalChild('Cart/Modal', 'cartModal', {})
        );

        this.cartButton.on('openModal', () => {
            const modal = /** @type {import('../Cart/Modal.js').Modal} */ (
                this.cartModal.getChild()
            );
            modal.open();
        });
    }

    /**
     * Closes the mobile menu if open.
     */
    #closeMenu() {
        const toggler = /** @type {HTMLElement} */ (this.querySelector('.navbar-toggler'));
        const collapse = this.querySelector('.navbar-collapse');
        if (collapse && collapse.classList.contains('show') && toggler) {
            toggler.click();
        }
    }

    /**
     * Updates the active section indicator without emitting a scroll event
     * @param {string} sectionId The section to highlight
     */
    setActiveSection(sectionId) {
        let changed = false;
        this.sections.forEach((s) => {
            const newClass = s.id === sectionId ? 'active-link' : '';
            if (s.activeClass !== newClass) {
                s.activeClass = newClass;
                changed = true;
            }
        });

        if (changed) {
            this.react();
        }
    }

    /**
     * Handles scrolling to a dynamic section by its data-id
     * @param {Event} e The click event
     */
    handleScrollTo(e) {
        if (e) e.preventDefault();

        const target = /** @type {HTMLElement} */ (e.currentTarget);
        const sectionId = target.getAttribute('data-id');
        if (!sectionId) return;

        this.setActiveSection(sectionId);
        this.#closeMenu();

        // Convert e.g. 'home' -> 'scrollToHome'
        const eventName = 'scrollTo' + sectionId.charAt(0).toUpperCase() + sectionId.slice(1);
        this.emit(eventName);
    }

    /**
     * Updates the cart items in the button.
     * @param {Array<any>} items The items in the cart.
     */
    updateCart(items) {
        this.cartButton.updateCart(items);
        const modal = /** @type {import('../Cart/Modal.js').Modal} */ (this.cartModal.getChild());
        modal.updateCart(items);
    }
}

import { Component } from '@fusewire/client/component.js';

/**
 * Features container component.
 */
export class Features extends Component {
    /** @type {import('./FeatureCard.js').FeatureCard} */
    cardCompetencia = null;

    /** @type {import('./FeatureCard.js').FeatureCard} */
    cardSalud = null;

    /** @type {import('./FeatureCard.js').FeatureCard} */
    cardEspiritu = null;

    /**
     * Initializes the Features component and creates child cards.
     */
    async init() {
        this.cardCompetencia =
            /** @type {import('./FeatureCard.js').FeatureCard} */ (
                this.createChild('Home/FeatureCard', 'cardCompetencia', {
                    icon: 'bi-trophy',
                    title: 'Alta Competencia',
                    description:
                        'Preparación física y mental para torneos nacionales e internacionales.',
                })
            );

        this.cardSalud = /** @type {import('./FeatureCard.js').FeatureCard} */ (
            this.createChild('Home/FeatureCard', 'cardSalud', {
                icon: 'bi-heart-pulse',
                title: 'Salud y Deporte',
                description:
                    'Desarrollo psicomotriz para todas las edades y niveles de experiencia.',
            })
        );

        this.cardEspiritu =
            /** @type {import('./FeatureCard.js').FeatureCard} */ (
                this.createChild('Home/FeatureCard', 'cardEspiritu', {
                    icon: 'bi-people',
                    title: 'Espíritu Hacoaj',
                    description:
                        'Formación en valores, trabajo en equipo y compañerismo constante.',
                })
            );
    }
}

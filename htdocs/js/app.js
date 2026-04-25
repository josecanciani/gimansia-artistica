import { Reactor } from '@fusewire/client/reactor.js';

document.addEventListener('DOMContentLoaded', async () => {
    const reactor = new Reactor('app', {
        basePath: new URL('./components', document.baseURI).href,
    });

    await reactor.start(
        /** @type {HTMLElement} */ (document.getElementById('app')),
        'Home',
        'main',
        {},
    );
});

import { Reactor } from '@fusewire/client/reactor.js';

document.addEventListener('DOMContentLoaded', async () => {
    const reactor = new Reactor('app', {
        basePath: new URL('/components', window.location.origin).href,
    });

    await reactor.start(document.getElementById('app'), 'Home', 'main', {});
});

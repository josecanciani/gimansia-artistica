const fs = require('fs');
const { JSDOM } = require('jsdom');

const html = fs.readFileSync('tmp/Solicitud de pedido de Indumentaria Gimnasia Artística 2026 Hacoaj - Google Forms.html', 'utf8');
const dom = new JSDOM(html);
const document = dom.window.document;

const products = [];
// In Google Forms, items are usually within a container that has role="listitem"
const listItems = document.querySelectorAll('div[role="listitem"]');

console.log("Found list items: " + listItems.length);

listItems.forEach(item => {
    // Title is usually in an element with role="heading"
    const headingEl = item.querySelector('[role="heading"]');
    const title = headingEl ? headingEl.textContent.trim() : '';
    
    // Description might be the next sibling or an element with a specific class, 
    // but usually it's in a div right after the heading
    const descEl = item.querySelector('div[id*="-desc"]'); 
    const desc = descEl ? descEl.textContent.trim() : '';

    // Options might be radio buttons or dropdowns
    const optionEls = item.querySelectorAll('span[dir="auto"], div[role="option"]');
    const options = Array.from(optionEls)
        .map(el => el.textContent.trim())
        .filter(t => t && t !== 'Choose' && t !== 'Elegir');
    
    // Images are usually img tags inside the listitem
    const imgEl = item.querySelector('img');
    const imageUrl = imgEl ? imgEl.src : null;
    
    if (title || items.length > 0) {
        products.push({
            title,
            desc,
            imageUrl,
            options: [...new Set(options)] // Unique options
        });
    }
});

console.log(JSON.stringify(products, null, 2));

const fs = require('fs');

const html = fs.readFileSync('tmp/Solicitud de pedido de Indumentaria Gimnasia Artística 2026 Hacoaj - Google Forms.html', 'utf8');

const chunks = html.split('role="listitem"').slice(1);
const products = [];

chunks.forEach(chunk => {
    // Basic regex extraction
    const headingMatch = chunk.match(/role="heading"[^>]*>([^<]+)<\//);
    const title = headingMatch ? headingMatch[1].trim() : '';
    
    // Google forms often put description in a div after heading
    const descMatch = chunk.match(/id="i\d+"[^>]*>([^<]+)<\/div>/);
    const desc = descMatch ? descMatch[1].trim() : '';
    
    const imgMatch = chunk.match(/<img[^>]+src="([^"]+)"/);
    let imageUrl = imgMatch ? imgMatch[1] : null;
    if (imageUrl && !imageUrl.startsWith('http')) {
        // Handle local files
        imageUrl = imageUrl;
    }
    
    // Find options inside span dir="auto"
    const options = [];
    const optionMatches = chunk.matchAll(/<span dir="auto"[^>]*>([^<]+)<\/span>/g);
    for (const match of optionMatches) {
        let val = match[1].trim();
        if (val && val !== 'Choose' && val !== 'Elegir' && val !== title) {
            options.push(val);
        }
    }
    
    if (title && title.indexOf('indumentaria') === -1) {
        products.push({
            title,
            desc,
            imageUrl,
            options: [...new Set(options)]
        });
    }
});

console.log(JSON.stringify(products, null, 2));

// Copy images to htdocs/images/products
products.forEach((p, i) => {
    if (p.imageUrl && !p.imageUrl.startsWith('http')) {
        // Local file
        const sourcePath = 'tmp/' + decodeURIComponent(p.imageUrl);
        const destPath = 'htdocs/images/products/product_image_' + i + '.jpg'; // assumption on ext
        try {
            fs.mkdirSync('htdocs/images/products', {recursive: true});
            fs.copyFileSync(sourcePath, destPath);
            p.imageUrl = '/images/products/product_image_' + i + '.jpg';
        } catch(e) {
            console.error("Error copying", sourcePath, e);
        }
    }
});

fs.writeFileSync('htdocs/data/products.json', JSON.stringify(products, null, 2));
console.log("Written to htdocs/data/products.json");

const fs = require('fs');
const html = fs.readFileSync('tmp/Solicitud de pedido de Indumentaria Gimnasia Artística 2026 Hacoaj - Google Forms.html', 'utf8');

const match = html.match(/var FB_PUBLIC_LOAD_DATA_ = (\[.*?\]);\s*<\/script>/);
if (match) {
    try {
        const data = JSON.parse(match[1]);
        const formTitle = data[1][8];
        const formDescription = data[1][0];
        
        const items = data[1][1];
        const products = [];
        
        items.forEach(item => {
            // Check for image URL
            let imageUrl = null;
            
            try {
                // Image usually at item[4][0][2] or similar, let's just log it if we find an array with http
                const str = JSON.stringify(item);
                const imgMatch = str.match(/(https:\/\/[^"]+\.(?:png|jpg|jpeg|webp|gif))/i) || str.match(/(https:\/\/lh3\.googleusercontent\.com\/[^"]+)/i);
                if (imgMatch) imageUrl = imgMatch[1];
            } catch(e) {}

            let options = [];
            try {
                // If it's a dropdown or multiple choice, choices are in item[4][0][1]
                if (item[4] && item[4][0] && item[4][0][1]) {
                    options = item[4][0][1].map(o => o[0]);
                }
            } catch(e) {}
            
            products.push({
                title: item[1] || "",
                desc: item[2] || "",
                type: item[3],
                imageUrl: imageUrl,
                options: options
            });
        });
        
        console.log(JSON.stringify(products, null, 2));
    } catch(e) {
        console.error("Parse error:", e);
    }
} else {
    console.log("No FB_PUBLIC_LOAD_DATA_ found.");
}

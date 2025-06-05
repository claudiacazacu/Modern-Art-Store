const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 8080;

// Afișarea căilor importante
console.log('__dirname:', __dirname);
console.log('__filename:', __filename);
console.log('process.cwd():', process.cwd());
console.log('Sunt __dirname și process.cwd() identice?', __dirname === process.cwd());

// Variabilă globală pentru erori
let obGlobal = {
    obErori: null
};

// ===================================================================
// GALERIE ANIMATĂ - Identificator: galerie-animata
// ===================================================================

// 1. JSON-ul cu imaginile pentru galeria statică - NUMELE EXACTE DIN FOLDERUL TĂU
const imaginiGalerie = [
    "arta1.jpg", "arta2.jpg", "arta3.jpg", "arta4.jpg", "arta5.jpg",
    "arta6.jpg", "arta7.jpg", "arta8.jpg", "arta9.jpg", "arta10.jpg",
    "arta11.jpg", "arta12.jpg", "arta13.jpg", "arta14.jpg", "arta15.jpg",
    "arta16.jpg", "arta17.jpg", "arta18.jpg", "arta19.jpg", "arta20.jpg",
    "brush.png", "brushstroke.png", "paint stroke.png", "paint stroke1.png",
    "problema.png", "StarryNight.jpg"
];

// Dacă nu funcționează, să verificăm dacă imaginile se încarcă
// Adaugă această funcție pentru debugging:
function verificaImagini() {
    console.log('Imaginile din array:');
    imaginiGalerie.forEach((img, index) => {
        console.log(`${index}: ${img}`);
    });
}

// 2. Funcție pentru generarea numărului aleator divizibil cu 3, mai mic de 16
function genereazaNumarImagini() {
    const numereValide = [3, 6, 9, 12, 15]; // Divizibile cu 3, mai mici de 16
    return numereValide[Math.floor(Math.random() * numereValide.length)];
}

// 3. Funcție pentru generarea offset-ului aleator
function genereazaOffset(numarImagini) {
    const offsetMaxim = imaginiGalerie.length - numarImagini;
    return Math.floor(Math.random() * (offsetMaxim + 1));
}

// 4. Funcție pentru selectarea imaginilor consecutive
function selecteazaImagini() {
    const numarImagini = genereazaNumarImagini();
    const offset = genereazaOffset(numarImagini);
    
    const imaginiSelectate = [];
    for (let i = 0; i < numarImagini; i++) {
        imaginiSelectate.push(imaginiGalerie[offset + i]);
    }
    
    return {
        imagini: imaginiSelectate,
        numarImagini: numarImagini,
        offset: offset
    };
}

// 5. Variabilă globală pentru stocarea datelor galeriei (regenerează la fiecare cerere)
let dataGalerie = null;

// 6. Funcție pentru generarea CSS-ului din SASS (simulare) - CORECTATĂ
function compileazaSASS() {
    if (!dataGalerie) {
        dataGalerie = selecteazaImagini();
    }
    
    const { numarImagini } = dataGalerie;
    const durataAnimatie = numarImagini * 4; // 4 secunde per imagine
    const durataFiecareiImagini = 100 / numarImagini; // Procentaj pentru fiecare imagine
    
    let css = `
/* ===================================================================*/
/* GALERIE ANIMATĂ - CSS GENERAT DINAMIC DIN SASS */
/* Identificator: galerie-animata */
/* Numărul de imagini: ${numarImagini} */
/* ===================================================================*/

.galerie-animata {
    width: 800px;
    height: 500px;
    position: relative;
    margin: 40px auto;
    overflow: hidden;
    border-radius: 15px;
    box-shadow: 0 12px 35px rgba(0, 0, 0, 0.3);
    
    /* Border-image cu imagine artistică - folosind una din imaginile tale */
    border: 20px solid;
    border-image: url('/resurse/imagini/StarryNight.jpg') 30 repeat;
    border-image-slice: 30;
    border-image-width: 20px;
    border-image-outset: 0;
    border-image-repeat: repeat;
}

/* Ascunde galeria pe ecrane medii și mici */
@media (max-width: 1024px) {
    .galerie-animata {
        display: none !important;
    }
}

.galerie-animata .imagine-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0; /* Toate încep invizibile */
    z-index: 1;
}

/* PRIMA imagine să înceapă vizibilă pentru un start smooth */
.galerie-animata .imagine-container:first-child {
    opacity: 1;
}

.galerie-animata .imagine-container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    /* Începem cu imaginea vizibilă complet */
    clip-path: inset(0 0% 0 0%);
}
`;

    // Generez delay-uri și z-index pentru fiecare imagine
    for (let i = 0; i < numarImagini; i++) {
        const delay = (i * durataAnimatie) / numarImagini;
        const zIndex = numarImagini - i;
        
        css += `
.galerie-animata .imagine-container:nth-child(${i + 1}) {
    z-index: ${zIndex};
    /* Fiecare imagine își controlează propria opacitate prin animație */
    animation: container-reveal ${durataAnimatie}s infinite;
    animation-delay: ${delay}s;
}

.galerie-animata .imagine-container:nth-child(${i + 1}) img {
    animation: clip-reveal ${durataAnimatie}s infinite;
    animation-delay: ${delay}s;
}
`;
    }

    css += `
/* Pauzare animație la hover */
.galerie-animata:hover .imagine-container,
.galerie-animata:hover .imagine-container img {
    animation-play-state: paused;
}

/* Animația pentru container (controlează opacity) */
@keyframes container-reveal {
    0% {
        opacity: 0;
    }
    
    /* Devine vizibil */
    ${durataFiecareiImagini * 0.05}% {
        opacity: 1;
    }
    
    /* Rămâne vizibil */
    ${durataFiecareiImagini * 0.95}% {
        opacity: 1;
    }
    
    /* Devine invizibil */
    ${durataFiecareiImagini}% {
        opacity: 0;
    }
    
    /* Rămâne invizibil restul timpului */
    100% {
        opacity: 0;
    }
}

/* Animația pentru imagine (controlează clip-path) */
@keyframes clip-reveal {
    0% {
        clip-path: inset(0 50% 0 50%);
    }
    
    /* Se deschide din centru */
    ${durataFiecareiImagini * 0.1}% {
        clip-path: inset(0 25% 0 25%);
    }
    
    /* Complet vizibilă */
    ${durataFiecareiImagini * 0.2}% {
        clip-path: inset(0 0% 0 0%);
    }
    
    /* Rămâne complet vizibilă */
    ${durataFiecareiImagini * 0.8}% {
        clip-path: inset(0 0% 0 0%);
    }
    
    /* Se închide spre centru */
    ${durataFiecareiImagini * 0.9}% {
        clip-path: inset(0 25% 0 25%);
    }
    
    /* Complet închisă */
    ${durataFiecareiImagini}% {
        clip-path: inset(0 50% 0 50%);
    }
    
    /* Rămâne închisă */
    100% {
        clip-path: inset(0 50% 0 50%);
    }
}

/* Pentru debugging - să vedem containerele */
.galerie-animata .imagine-container {
    border: 2px solid red;
    box-sizing: border-box;
}

.galerie-animata .imagine-container img {
    border: 1px solid blue;
    box-sizing: border-box;
}

/* Titlu galerie */
.galerie-animata-titlu {
    text-align: center;
    font-size: 1.8em;
    margin: 20px 0;
    color: #2c3e50;
    font-family: 'Georgia', serif;
}

/* Informații tehnice */
.galerie-info {
    text-align: center;
    font-size: 0.9em;
    color: #7f8c8d;
    margin: 10px 0;
    font-style: italic;
}

/* Responsive - verificare suplimentară */
@media (max-width: 1000px) {
    .galerie-animata {
        display: none !important;
    }
    
    .galerie-animata-titlu {
        display: none !important;
    }
    
    .galerie-info {
        display: none !important;
    }
}

/* Efecte hover pe container */
.galerie-animata:hover {
    transform: scale(1.02);
    transition: transform 0.3s ease;
    box-shadow: 0 15px 45px rgba(0, 0, 0, 0.4);
}
`;

    return css;
}

// 7. Funcție pentru generarea HTML-ului galeriei cu debugging
function genereazaHTMLGalerie() {
    // Regenerează datele la fiecare apel pentru a avea imagini noi
    dataGalerie = selecteazaImagini();
    const { imagini, numarImagini, offset } = dataGalerie;
    
    // Debugging - să vedem ce imagini se aleg
    console.log(`Galerie generată cu ${numarImagini} imagini, offset ${offset}`);
    console.log('Imaginile selectate:', imagini);
    
    let html = `<h3 class="galerie-animata-titlu">Galerie Animată - Colecția Noastră</h3>\n`;
    html += `<p class="galerie-info">Imaginile: ${numarImagini} | Offset: ${offset} | Durată ciclu: ${numarImagini * 4}s</p>\n`;
    html += '<div class="galerie-animata">\n';
    
    imagini.forEach((imagine, index) => {
        const caleCompleta = `/resurse/imagini/${imagine}`;
        console.log(`Imagine ${index + 1}: ${caleCompleta}`);
        html += `    <div class="imagine-container">
        <img src="${caleCompleta}" alt="Operă de artă ${index + 1} - ${imagine}" loading="lazy" 
             onerror="console.error('Nu s-a putut încărca imaginea: ${caleCompleta}')" 
             onload="console.log('Imaginea s-a încărcat cu succes: ${caleCompleta}')" />
    </div>\n`;
    });
    
    html += '</div>\n';
    
    return html;
}

// ===================================================================
// FUNCȚII PENTRU APLICAȚIA EXPRESS (CODUL ORIGINAL)
// ===================================================================

// Setări Express și EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Definirea folderului static pentru resurse
app.use('/resurse', express.static(path.join(__dirname, 'resurse')));

// Vectorul cu folderele de creat
const vect_foldere = ['temp'];

// Funcția pentru inițializarea erorilor
function initErori() {
    obGlobal.obErori = {
        cale_baza: '/resurse/imagini/erori/',
        eroare_default: {
            titlu: 'Eroare',
            text: 'A apărut o eroare neașteptată',
            imagine: '/resurse/imagini/erori/default.jpg'
        },
        info_erori: [
            {
                identificator: 400,
                status: true,
                titlu: 'Cerere invalidă',
                text: 'Cererea dumneavoastră nu poate fi procesată. Fișierele EJS nu pot fi accesate direct.',
                imagine: '/resurse/imagini/erori/400.jpg'
            },
            {
                identificator: 403,
                status: true,
                titlu: 'Acces interzis',
                text: 'Nu aveți permisiunea să accesați această resursă sau director.',
                imagine: '/resurse/imagini/erori/403.jpg'
            },
            {
                identificator: 404,
                status: true,
                titlu: 'Pagina nu a fost găsită',
                text: 'Pagina pe care o căutați nu există. Verificați URL-ul sau navigați către pagina principală.',
                imagine: '/resurse/imagini/erori/404.jpg'
            }
        ]
    };
    console.log('Erorile au fost încărcate cu succes');
}

// Funcția pentru afișarea erorilor
function afisareEroare(res, identificator, titlu, text, imagine) {
    let dateleErorii = obGlobal.obErori.eroare_default;
    let statusCode = 200;
    
    if (identificator && obGlobal.obErori.info_erori) {
        const eroareGasita = obGlobal.obErori.info_erori.find(e => e.identificator == identificator);
        if (eroareGasita) {
            dateleErorii = eroareGasita;
            if (eroareGasita.status) {
                statusCode = identificator;
            }
        }
    }
    
    const dateleFinale = {
        titlu: titlu || dateleErorii.titlu,
        text: text || dateleErorii.text,
        imagine: imagine || dateleErorii.imagine
    };
    
    res.status(statusCode);
    res.send(`
    <!DOCTYPE html>
    <html lang="ro">
    <head>
        <title>ArtModern - ${dateleFinale.titlu}</title>
        <meta charset="UTF-8">
        <link rel="stylesheet" type="text/css" href="/resurse/CSS/general.css">
    </head>
    <body>
        <header>
            <h1>Magazin Online de Artă Modernă</h1>
            <nav><ul><li><a href="/">Acasă</a></li></ul></nav>
        </header>
        <main>
            <section class="eroare-section">
                <h2>${dateleFinale.titlu}</h2>
                <div class="eroare-content">
                    <div class="eroare-text">
                        <p>${dateleFinale.text}</p>
                        <p><a href="/">Înapoi la pagina principală</a></p>
                    </div>
                </div>
            </section>
        </main>
    </body>
    </html>
    `);
}

// Funcția pentru crearea folderelor
function creeazaFoldere() {
    vect_foldere.forEach(numeFolder => {
        const caleFolder = path.join(__dirname, numeFolder);
        if (!fs.existsSync(caleFolder)) {
            fs.mkdirSync(caleFolder);
            console.log(`Folderul '${numeFolder}' a fost creat.`);
        } else {
            console.log(`Folderul '${numeFolder}' există deja.`);
        }
    });
}

// ===================================================================
// RUTE EXPRESS CU INTEGRAREA GALERIEI ANIMATE
// ===================================================================

// Ruta pentru CSS-ul galeriei animate (GENERAT DINAMIC DIN SASS)
app.get('/resurse/CSS/galerie-animata.css', (req, res) => {
    try {
        const cssContent = compileazaSASS();
        res.setHeader('Content-Type', 'text/css');
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('Expires', '0');
        res.send(cssContent);
        console.log('CSS galerie animată generat cu succes');
    } catch (error) {
        console.error('Eroare la generarea CSS galerie:', error);
        res.status(500).send('/* Eroare la generarea CSS-ului galeriei */');
    }
});

// Helper functions pentru template-uri EJS
app.locals.genereazaGalerieAnimata = genereazaHTMLGalerie;

// Middleware pentru blocarea accesului la foldere din resurse
app.get('/resurse/*/', (req, res) => {
    afisareEroare(res, 403);
});

// Middleware pentru blocarea fișierelor .ejs
app.get('*.ejs', (req, res) => {
    afisareEroare(res, 400);
});

// Rutele pentru pagina principală
app.get(['/', '/index', '/home'], (req, res) => {
    const ipUtilizator = req.ip || req.connection.remoteAddress || '::1';
    
    // Reset datele galeriei pentru a genera noi imagini
    dataGalerie = null;
    
    res.render('pagini/index', { 
        title: 'ArtModern - Acasă',
        ipUtilizator: ipUtilizator
    }, function(eroare, rezultatRandare) {
        if (eroare) {
            console.log('Eroare la randarea index:', eroare.message);
            afisareEroare(res, 404);
        } else {
            res.send(rezultatRandare);
        }
    });
});

// Ruta pentru favicon
app.get('/favicon.ico', (req, res) => {
    const faviconPath = path.join(__dirname, 'resurse', 'ico', 'favicon', 'favicon.ico');
    if (fs.existsSync(faviconPath)) {
        res.sendFile(faviconPath);
    } else {
        res.status(404).send('Favicon not found');
    }
});

// Ruta generală pentru orice pagină
app.get('/*', (req, res) => {
    const numePagina = req.params[0];
    const ipUtilizator = req.ip || req.connection.remoteAddress || '::1';
    
    res.render(`pagini/${numePagina}`, { 
        title: `ArtModern - ${numePagina}`,
        ipUtilizator: ipUtilizator
    }, function(eroare, rezultatRandare) {
        if (eroare) {
            console.log('Eroare la randarea paginii:', eroare.message);
            afisareEroare(res, 404);
        } else {
            res.send(rezultatRandare);
        }
    });
});

// ===================================================================
// INIȚIALIZAREA ȘI PORNIREA SERVERULUI
// ===================================================================

// Inițializarea aplicației
initErori();
creeazaFoldere();

// Pornirea serverului
app.listen(PORT, () => {
    console.log(`Serverul rulează pe http://localhost:${PORT}`);
    console.log('Galerie animată implementată cu identificatorul: galerie-animata');
});
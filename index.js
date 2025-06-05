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

// 1. JSON-ul cu imaginile pentru galeria statică (DOAR IMAGINI EXISTENTE)
const imaginiGalerie = [
    "StarryNight.jpg", 
    "StarryNight-medium.jpg", 
    "StarryNight-small.jpg",
    "galerie-interior.jpg", 
    "galerie-interior-medium.jpg", 
    "galerie-interior-small.jpg",
    "evolutie-galerie.jpg", 
    "evolutie-galerie-medium.jpg", 
    "evolutie-galerie-small.jpg",
    "StarryNight.jpg", 
    "StarryNight-medium.jpg", 
    "StarryNight-small.jpg",
    "galerie-interior.jpg", 
    "galerie-interior-medium.jpg", 
    "galerie-interior-small.jpg",
    "evolutie-galerie.jpg", 
    "evolutie-galerie-medium.jpg", 
    "evolutie-galerie-small.jpg"
];

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

// 5. Funcție pentru generarea CSS-ului din SASS (simulare)
function compileazaSASS() {
    const { imagini, numarImagini } = selecteazaImagini();
    
    let css = `
/* ===================================================================*/
/* GALERIE ANIMATĂ - CSS GENERAT DINAMIC */
/* Identificator: galerie-animata */
/* ===================================================================*/

.galerie-animata {
    width: 600px;
    height: 400px;
    position: relative;
    margin: 40px auto;
    border: 20px solid transparent;
    border: 20px solid #8d6e63;
    overflow: hidden;
    border-radius: 10px;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
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
    opacity: 1;
    z-index: 5;
}

.galerie-animata .imagine-container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    /* clip-path: inset(0 50% 0 50%); */
    /* animation: clip-reveal ${numarImagini * 3}s infinite; */
    opacity: 1;
    position: relative;
    z-index: 10;
}
`;

    // Generez delay-uri pentru fiecare imagine
    for (let i = 0; i < numarImagini; i++) {
        const delay = (i / numarImagini) * 100;
        css += `
.galerie-animata .imagine-container:nth-child(${i + 1}) img {
    animation-delay: ${delay}%;
}
`;
    }

    css += `
/* Pauzare animație la hover */
.galerie-animata:hover .imagine-container img {
    animation-play-state: paused;
}

/* Animația de clip-path care începe din centru */
@keyframes clip-reveal {
    0% {
        opacity: 0;
        clip-path: inset(0 50% 0 50%);
    }
    
    ${100 / numarImagini * 0.1}% {
        opacity: 1;
        clip-path: inset(0 45% 0 45%);
    }
    
    ${100 / numarImagini * 0.5}% {
        opacity: 1;
        clip-path: inset(0 0% 0 0%);
    }
    
    ${100 / numarImagini * 0.9}% {
        opacity: 1;
        clip-path: inset(0 0% 0 0%);
    }
    
    ${100 / numarImagini}% {
        opacity: 0;
        clip-path: inset(0 50% 0 50%);
    }
    
    100% {
        opacity: 0;
        clip-path: inset(0 50% 0 50%);
    }
}

/* Responsive - verificare suplimentară */
@media (max-width: 1000px) {
    .galerie-animata {
        display: none !important;
    }
}
`;

    return css;
}

// 6. Funcție pentru generarea HTML-ului galeriei
function genereazaHTMLGalerie() {
    const { imagini, numarImagini, offset } = selecteazaImagini();
    
    let html = '<div class="galerie-animata">\n';
    
    imagini.forEach((imagine, index) => {
        html += `    <div class="imagine-container">
        <img src="/resurse/imagini/${imagine}" alt="Operă de artă ${index + 1}" loading="lazy" />
    </div>\n`;
    });
    
    html += '</div>';
    
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

// Ruta pentru CSS-ul galeriei animate (GENERAT DINAMIC)
app.get('/resurse/CSS/galerie-animata.css', (req, res) => {
    try {
        const cssContent = compileazaSASS();
        res.setHeader('Content-Type', 'text/css');
        res.setHeader('Cache-Control', 'no-cache');
        res.send(cssContent);
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
});
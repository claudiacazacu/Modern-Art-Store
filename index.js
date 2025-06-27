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

// Setări Express și EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Variabilă globală pentru erori
const obGlobal = { obErori: null };

// ===================================================================
// GALERIE ANIMATĂ
// ===================================================================

const imaginiGalerie = [
    "arta1.jpg", "arta2.jpg", "arta3.jpg", "arta4.jpg", "arta5.jpg",
    "arta6.jpg", "arta7.jpg", "arta8.jpg", "arta9.jpg", "arta10.jpg",
    "arta11.jpg", "arta12.jpg", "arta13.jpg", "arta14.jpg", "arta15.jpg",
    "arta16.jpg", "arta17.jpg", "arta18.jpg", "arta19.jpg", "arta20.jpg",
    "brush.png", "brushstroke.png", "paint stroke.png", "paint stroke1.png",
    "problema.png", "StarryNight.jpg"
];

function genereazaNumarImagini() {
    const numereValide = [3, 6, 9, 12, 15];
    return numereValide[Math.floor(Math.random() * numereValide.length)];
}

function genereazaOffset(numarImagini) {
    const offsetMaxim = imaginiGalerie.length - numarImagini;
    return Math.floor(Math.random() * (offsetMaxim + 1));
}

function selecteazaImagini() {
    const numarImagini = genereazaNumarImagini();
    const offset = genereazaOffset(numarImagini);
    
    const imaginiSelectate = [];
    for (let i = 0; i < numarImagini; i++) {
        imaginiSelectate.push(imaginiGalerie[offset + i]);
    }
    
    return { imagini: imaginiSelectate, numarImagini, offset };
}

function genereazaHTMLGalerie() {
    const { imagini, numarImagini, offset } = selecteazaImagini();
    
    let html = `<h3 class="galerie-animata-titlu">Galerie Animată - Colecția Noastră</h3>\n`;
    html += `<p class="galerie-info">Imaginile: ${numarImagini} | Offset: ${offset}</p>\n`;
    html += '<div class="galerie-animata">\n';
    
    imagini.forEach((imagine, index) => {
        const caleCompleta = `/resurse/imagini/${imagine}`;
        html += `    <div class="imagine-container">
        <img src="${caleCompleta}" alt="Operă de artă ${index + 1}" loading="lazy" />
    </div>\n`;
    });
    
    html += '</div>\n';
    return html;
}

// ===================================================================
// FUNCȚII PENTRU ERORI
// ===================================================================

function initErori() {
    try {
        const eroriPath = path.join(__dirname, 'erori.json');
        const eroriData = JSON.parse(fs.readFileSync(eroriPath, 'utf-8'));
        
        // Asigură-te că cale_baza se termină cu "/"
        let caleBaza = eroriData.cale_baza;
        if (!caleBaza.endsWith('/')) {
            caleBaza += '/';
        }
        
        // Setăm calea absolută pentru fiecare eroare
        eroriData.info_erori.forEach(eroare => {
            eroare.imagine = caleBaza + eroare.imagine;
        });
        
        // Setăm și pentru eroarea default
        if (eroriData.eroare_default) {
            eroriData.eroare_default.imagine = caleBaza + eroriData.eroare_default.imagine;
        }
        
        obGlobal.obErori = eroriData;
        console.log('Erorile au fost încărcate cu succes din erori.json');
        
        // Debug - să vedem căile finale
        console.log('Cale 404:', eroriData.info_erori.find(e => e.identificator === 404)?.imagine);
        console.log('Cale default:', eroriData.eroare_default.imagine);
        
    } catch (error) {
        console.error('Eroare la încărcarea fișierului erori.json:', error.message);
        // Fallback la date hardcodate
        obGlobal.obErori = {
            cale_baza: '/resurse/imagini/erori/',
            eroare_default: {
                titlu: 'Eroare',
                text: 'A apărut o eroare neașteptată',
                imagine: '/resurse/imagini/erori/default.png'
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
        console.log('S-au încărcat datele de eroare implicite');
    }
}

function afisareEroare(res, identificator, titlu, text, imagine, ipUtilizator) {
    let eroare;
    
    console.log('=== DEBUG afisareEroare ===');
    console.log('Identificator primit:', identificator);
    
    if (identificator) {
        eroare = obGlobal.obErori.info_erori.find(e => e.identificator === identificator);
        console.log('Eroare găsită pentru', identificator, ':', !!eroare);
    }
    
    if (!eroare) {
        eroare = obGlobal.obErori.eroare_default;
        console.log('Folosind eroarea default');
    }
    
    const statusCode = (eroare.status && identificator) ? identificator : 200;
    
    // Determină IP-ul utilizatorului
    const ipFinal = ipUtilizator || (res.req ? (res.req.ip || res.req.connection.remoteAddress || '::1') : '::1');
    
    const dateleFinale = {
        titlu: titlu || eroare.titlu,
        text: text || eroare.text,
        imagine: imagine || eroare.imagine,
        ipUtilizator: ipFinal
    };
    
    console.log('Datele finale pentru template:', dateleFinale);
    console.log('===========================');
    
    res.status(statusCode);
    
    // Încearcă să randeze template-ul
    res.render('pagini/eroare', dateleFinale, function(eroareRender, rezultatRandare) {
        if (eroareRender) {
            console.log('EROARE la randarea template-ului eroare.ejs:', eroareRender.message);
            // Fallback HTML simplu
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
                    <div class="user-info"><p>IP utilizator: ${ipFinal}</p></div>
                    <nav><ul><li><a href="/">Acasă</a></li></ul></nav>
                </header>
                <main>
                    <section class="eroare-section">
                        <h2>${dateleFinale.titlu}</h2>
                        <div class="eroare-content">
                            <img src="${dateleFinale.imagine}" alt="${dateleFinale.titlu}" style="max-width: 200px;" />
                            <p>${dateleFinale.text}</p>
                            <p><a href="/">Înapoi la pagina principală</a></p>
                        </div>
                    </section>
                </main>
            </body>
            </html>`);
        } else {
            console.log('Template-ul de eroare a fost randat cu succes');
            res.send(rezultatRandare);
        }
    });
}

// ===================================================================
// FUNCȚII UTILITARE
// ===================================================================

function creeazaFoldere() {
    const vect_foldere = ['temp'];
    vect_foldere.forEach(folder => {
        const folderPath = path.join(__dirname, folder);
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath);
            console.log(`Folderul '${folder}' a fost creat: ${folderPath}`);
        } else {
            console.log(`Folderul '${folder}' există deja: ${folderPath}`);
        }
    });
}

// ===================================================================
// INIȚIALIZARE
// ===================================================================

initErori();
creeazaFoldere();

// Helper pentru template-uri EJS
app.locals.genereazaGalerieAnimata = genereazaHTMLGalerie;

// ===================================================================
// MIDDLEWARE ȘI RUTE
// ===================================================================

// Middleware pentru blocarea fișierelor .ejs - TREBUIE să fie primul
app.get('*.ejs', function(req, res) {
    console.log("Încercare de accesare directă a unui fișier .ejs:", req.path);
    const ipUtilizator = req.ip || req.connection.remoteAddress || '::1';
    afisareEroare(res, 400, null, null, null, ipUtilizator);
});

// Middleware pentru a bloca accesul direct la fișierele .ejs
app.use((req, res, next) => {
    if (req.path.endsWith('.ejs')) {
        console.log("Încercare de accesare directă a unui fișier .ejs (middleware):", req.path);
        const ipUtilizator = req.ip || req.connection.remoteAddress || '::1';
        return afisareEroare(res, 400, null, null, null, ipUtilizator);
    }
    next();
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

// Middleware pentru blocarea accesului la directoare din /resurse/
app.all('/resurse/*', (req, res, next) => {
    if (req.path.endsWith('/')) {
        console.log("Încercare de accesare director din /resurse/:", req.path);
        const ipUtilizator = req.ip || req.connection.remoteAddress || '::1';
        return afisareEroare(res, 403, null, null, null, ipUtilizator);
    }
    next();
});

// Servește fișierele statice din folderul 'resurse'
app.use('/resurse', express.static(path.join(__dirname, 'resurse')));

// RUTELE PENTRU PAGINA PRINCIPALĂ - Cerința 8
app.get(['/', '/index', '/home'], (req, res) => {
    const ipUtilizator = req.ip || req.connection.remoteAddress || '::1';
    
    res.render('pagini/index', { 
        title: 'ArtModern - Acasă',
        ipUtilizator: ipUtilizator
    }, function(eroare, rezultatRandare) {
        if (eroare) {
            console.log('Eroare la randarea index:', eroare.message);
            if (eroare.message.startsWith('Failed to lookup view')) {
                afisareEroare(res, 404, null, null, null, ipUtilizator);
            } else {
                afisareEroare(res, 500, null, null, null, ipUtilizator);
            }
        } else {
            res.send(rezultatRandare);
        }
    });
});

// Pentru testarea explicita a erorii 400
app.get('/test-400', (req, res) => {
    console.log("Testare eroare 400");
    const ipUtilizator = req.ip || req.connection.remoteAddress || '::1';
    afisareEroare(res, 400, null, null, null, ipUtilizator);
});

// ULTIMA RUTĂ: Catch-all pentru orice alte cereri '/*' - Cerința 9
app.get('/*', (req, res) => {
    let url = req.url;
    
    // Elimină slash-ul inițial
    if (url.startsWith('/')) {
        url = url.substring(1);
    }
    
    // Dacă URL-ul este gol, nu ar trebui să ajungă aici datorită rutelor de mai sus
    if (!url) {
        return res.redirect('/');
    }
    
    const ipUtilizator = req.ip || req.connection.remoteAddress || '::1';
    
    console.log(`Încercare de randare pentru pagina: ${url}`);
    
    // Încearcă să randeze fișierul EJS corespunzător
    res.render(`pagini/${url}`, { 
        title: `ArtModern - ${url}`,
        ipUtilizator: ipUtilizator
    }, function(eroare, rezultatRandare) {
        if (eroare) {
            console.log(`Eroare la randarea paginii ${url}:`, eroare.message);
            
            if (eroare.message.startsWith('Failed to lookup view')) {
                console.log(`Pagina ${url} nu a fost găsită - afișez eroarea 404`);
                return afisareEroare(res, 404, null, null, null, ipUtilizator);
            } else {
                console.log(`Eroare generică pentru pagina ${url} - afișez eroarea 500`);
                return afisareEroare(res, 500, null, null, null, ipUtilizator);
            }
        } else {
            res.send(rezultatRandare);
        }
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Serverul rulează pe http://localhost:${PORT}`);
    console.log('Galerie animată implementată cu succes');
});
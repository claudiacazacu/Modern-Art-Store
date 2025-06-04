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

// Inițializarea aplicației
initErori();
creeazaFoldere();

// Pornirea serverului
app.listen(PORT, () => {
    console.log(`Serverul rulează pe http://localhost:${PORT}`);
});
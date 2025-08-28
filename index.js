const express = require('express');
const path = require('path');
const fs = require('fs');
const sass = require('sass'); // Pentru compilarea SCSS
const db = require('./db'); // conexiunea la baza de date PostgreSQL
const sharp = require('sharp');

const app = express();
const PORT = 8080;

// Afișarea căilor importante
console.log('__dirname:', __dirname);
console.log('__filename:', __filename);
console.log('process.cwd():', process.cwd());
console.log('Sunt __dirname și process.cwd() identice?', __dirname === process.cwd());

// ===================================================================
// OBIECT GLOBAL ACTUALIZAT CU SCSS
// ===================================================================

// Definirea căilor pentru SCSS și CSS în obiectul global
const obGlobal = { 
    obErori: null,
    obImagini: null,
    folderScss: path.join(__dirname, 'resurse', 'SCSS'),
    folderCss: path.join(__dirname, 'resurse', 'CSS')
};

console.log('Folder SCSS:', obGlobal.folderScss);
console.log('Folder CSS:', obGlobal.folderCss);

// ===================================================================
// FUNCȚII PENTRU BAZA DE DATE
// ===================================================================

/**
 * Preia toate produsele din baza de date
 */
async function getProduse(categorieFilter = null) {
    try {
        let query = 'SELECT * FROM produse';
        let params = [];
        
        if (categorieFilter) {
            query += ' WHERE categoria_mare = $1';
            params = [categorieFilter];
        }
        
        query += ' ORDER BY id';
        
        const rezultat = await db.query(query, params);
        console.log(`✅ Preluate ${rezultat.length} produse din baza de date`);
        return rezultat;
    } catch (error) {
        console.error('❌ Eroare la preluarea produselor:', error.message);
        return [];
    }
}

/**
 * Preia un produs specific după ID
 */
async function getProdusById(id) {
    try {
        const query = 'SELECT * FROM produse WHERE id = $1';
        const rezultat = await db.oneOrNone(query, [id]);
        
        if (rezultat) {
            console.log(`✅ Produs găsit: ${rezultat.nume}`);
            return rezultat;
        } else {
            console.log(`⚠️ Nu s-a găsit produsul cu ID: ${id}`);
            return null;
        }
    } catch (error) {
        console.error('❌ Eroare la preluarea produsului:', error.message);
        return null;
    }
}

/**
 * Preia categoriile distincte din baza de date pentru meniu
 */
async function getCategorii() {
    try {
        const query = 'SELECT DISTINCT categoria_mare FROM produse ORDER BY categoria_mare';
        const rezultat = await db.query(query);
        
        const categorii = rezultat.map(row => row.categoria_mare);
        console.log(`✅ Categorii găsite: ${categorii.join(', ')}`);
        return categorii;
    } catch (error) {
        console.error('❌ Eroare la preluarea categoriilor:', error.message);
        return ['pictura', 'sculptura', 'arta_digitala', 'ceramica', 'fotografie']; // fallback
    }
}

/**
 * Testează conexiunea la baza de date
 */
async function testConexiune() {
    try {
        await db.connect();
        console.log('✅ Conexiune reușită la baza de date PostgreSQL');
        
        // Verifică dacă tabelul produse există
        const tabelExista = await db.oneOrNone(
            "SELECT to_regclass('public.produse') as tabel"
        );
        
        if (tabelExista.tabel) {
            console.log('✅ Tabelul produse există în baza de date');
            
            // Numără produsele
            const numarProduse = await db.one('SELECT COUNT(*) FROM produse');
            console.log(`📊 Numărul de produse în baza de date: ${numarProduse.count}`);
        } else {
            console.log('⚠️ Tabelul produse nu există încă în baza de date');
        }
        
    } catch (error) {
        console.error('❌ Eroare la conexiunea cu baza de date:', error.message);
    }
}

// ===================================================================
// GALERIA STATICĂ CU FUNCȚIA initImagini()
// ===================================================================

function initImagini(){    
    try {
        var continut = fs.readFileSync(path.join(__dirname,"resurse/json/galerie.json")).toString("utf-8"); 
        obGlobal.obImagini=JSON.parse(continut);
        let vImagini=obGlobal.obImagini.imagini;
        let caleAbs=path.join(__dirname,obGlobal.obImagini.cale_galerie);  
        let caleAbsMediu=path.join(__dirname,obGlobal.obImagini.cale_galerie, "mediu");    
        
        if (!fs.existsSync(caleAbsMediu)) fs.mkdirSync(caleAbsMediu, { recursive: true });
      
        for (let imag of vImagini){ 
            let [numeFis, ext] = imag.cale_imagine.split(".");     
            let caleFisAbs=path.join(caleAbs,imag.cale_imagine);     
            let caleFisMediuAbs=path.join(caleAbsMediu, numeFis+".webp");   
            
            if (fs.existsSync(caleFisAbs)) {
                sharp(caleFisAbs).resize(300).toFile(caleFisMediuAbs);
                imag.fisier_mediu=path.join("/", obGlobal.obImagini.cale_galerie, "mediu",numeFis+".webp" );    
            }
            imag.fisier=path.join("/", obGlobal.obImagini.cale_galerie, imag.cale_imagine );      
        }
        
        console.log(`✅ Galerie inițializată cu ${vImagini.length} imagini`);
    } catch (error) {
        console.error('❌ Eroare la inițializarea imaginilor:', error.message);
    }
}

// Funcție pentru verificarea timpului - VERSIUNE CORECTATĂ
function esteInInterval(oraActuala, interval) {
    try {
        const [oraStart, oraEnd] = interval.split('-');
        const [startHour, startMin] = oraStart.split(':').map(Number);
        const [endHour, endMin] = oraEnd.split(':').map(Number);
        
        const startMinutes = startHour * 60 + startMin;
        let endMinutes = endHour * 60 + endMin;
        
        const [currentHour, currentMin] = oraActuala.split(':').map(Number);
        const currentMinutes = currentHour * 60 + currentMin;
        
        console.log(`🔍 Debug: Ora ${oraActuala} (${currentMinutes} min) vs interval ${interval} (${startMinutes}-${endMinutes} min)`);
        
        // Gestionează intervalele care trec peste miezul nopții
        if (endMinutes <= startMinutes) {
            // Interval peste miezul nopții (ex: 22:00-02:00)
            const result = currentMinutes >= startMinutes || currentMinutes <= endMinutes;
            console.log(`   Interval peste miez: ${result}`);
            return result;
        } else {
            // Interval normal în aceeași zi
            const result = currentMinutes >= startMinutes && currentMinutes <= endMinutes;
            console.log(`   Interval normal: ${result}`);
            return result;
        }
        
    } catch (error) {
        console.error(`❌ Eroare la verificarea intervalului ${interval}:`, error.message);
        return false;
    }
}

// Funcție pentru filtrarea imaginilor pe baza orei - VERSIUNE CU DEBUG
function filtreazaImaginiDupaOra(imagini, oraActuala) {
    console.log(`\n🕐 FILTRARE pentru ora: ${oraActuala}`);
    console.log(`📋 Toate imaginile disponibile:`);
    
    imagini.forEach((imagine, index) => {
        console.log(`   ${index + 1}. ${imagine.titlu} - ${imagine.timp}`);
    });
    
    const imaginiFiltrate = imagini.filter((imagine, index) => {
        const potrivita = esteInInterval(oraActuala, imagine.timp);
        console.log(`   ${index + 1}. ${imagine.titlu} (${imagine.timp}): ${potrivita ? '✅' : '❌'}`);
        return potrivita;
    });
    
    // Limitează la maxim 10 imagini conform cerințelor
    const imaginiLimitate = imaginiFiltrate.slice(0, 10);
    
    console.log(`\n📊 REZULTAT: ${imaginiFiltrate.length} imagini potrivite, afișăm ${imaginiLimitate.length}`);
    
    if (imaginiLimitate.length > 0) {
        console.log('✅ Imagini selectate:');
        imaginiLimitate.forEach((imagine, index) => {
            console.log(`   ${index + 1}. ${imagine.titlu}`);
        });
    } else {
        console.log('❌ Nicio imagine nu se potrivește pentru ora curentă');
    }
    
    return imaginiLimitate;
}

// Funcția principală pentru obținerea datelor galeriei
function obtineGalerieData(oraFortat = null) {
    try {
        if (!obGlobal.obImagini) {
            console.log('⚠️ Imaginile nu sunt inițializate');
            return null;
        }
        
        // Obține ora curentă (sau ora forțată pentru testare)
        const oraActuala = oraFortat || new Date().toTimeString().slice(0, 5);
        
        console.log(`🕐 Procesare galerie pentru ora: ${oraActuala}`);
        
        // Filtrează imaginile pe baza orei
        const imaginiFiltrate = filtreazaImaginiDupaOra(obGlobal.obImagini.imagini, oraActuala);
        
        // Returnează datele pentru template
        return {
            cale_galerie: obGlobal.obImagini.cale_galerie,
            imagini: imaginiFiltrate,
            totalImagini: obGlobal.obImagini.imagini.length,
            oraAfisare: oraActuala
        };
        
    } catch (error) {
        console.error('❌ Eroare la obținerea datelor galeriei:', error.message);
        return null;
    }
}

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
// FUNCȚII PENTRU COMPILAREA SCSS
// ===================================================================

function compileazaScss(caleScss, caleCss) {
    try {
        let caleAbsolutaScss;
        if (path.isAbsolute(caleScss)) {
            caleAbsolutaScss = caleScss;
        } else {
            caleAbsolutaScss = path.join(obGlobal.folderScss, caleScss);
        }

        let caleAbsolutaCss;
        if (caleCss) {
            if (path.isAbsolute(caleCss)) {
                caleAbsolutaCss = caleCss;
            } else {
                caleAbsolutaCss = path.join(obGlobal.folderCss, caleCss);
            }
        } else {
            const numeScss = path.basename(caleAbsolutaScss, '.scss');
            caleAbsolutaCss = path.join(obGlobal.folderCss, numeScss + '.css');
        }

        console.log(`Compilare SCSS: ${path.basename(caleAbsolutaScss)} -> ${path.basename(caleAbsolutaCss)}`);

        if (!fs.existsSync(caleAbsolutaScss)) {
            console.error(`Fișierul SCSS nu există: ${caleAbsolutaScss}`);
            return false;
        }

        salvareInBackup(caleAbsolutaCss);

        const rezultat = sass.compile(caleAbsolutaScss, {
            style: 'expanded',
            sourceMap: false
        });

        const folderDestinatie = path.dirname(caleAbsolutaCss);
        if (!fs.existsSync(folderDestinatie)) {
            fs.mkdirSync(folderDestinatie, { recursive: true });
            console.log(`Folder creat: ${folderDestinatie}`);
        }

        fs.writeFileSync(caleAbsolutaCss, rezultat.css);
        console.log(`✅ Compilat cu succes: ${path.basename(caleAbsolutaScss)} -> ${path.basename(caleAbsolutaCss)}`);
        
        return true;

    } catch (error) {
        console.error(`❌ Eroare la compilarea SCSS ${caleScss}:`, error.message);
        return false;
    }
}

function salvareInBackup(caleCss) {
    try {
        if (!fs.existsSync(caleCss)) {
            return;
        }

        const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
        const numeFisierBackup = `${path.basename(caleCss, '.css')}_${timestamp}.css`;
        
        const caleBackup = path.join(__dirname, 'backup', 'resurse', 'css', numeFisierBackup);
        
        const folderBackup = path.dirname(caleBackup);
        if (!fs.existsSync(folderBackup)) {
            fs.mkdirSync(folderBackup, { recursive: true });
            console.log(`Folder backup creat: ${folderBackup}`);
        }

        fs.copyFileSync(caleCss, caleBackup);
        console.log(`💾 Backup salvat: ${numeFisierBackup}`);

    } catch (error) {
        console.error(`❌ Eroare la salvarea în backup pentru ${caleCss}:`, error.message);
    }
}

function compilareInitiala() {
    console.log('\n🔄 Începe compilarea inițială SCSS...');
    
    if (!fs.existsSync(obGlobal.folderScss)) {
        console.log(`📁 Creez folderul SCSS: ${obGlobal.folderScss}`);
        fs.mkdirSync(obGlobal.folderScss, { recursive: true });
        return;
    }

    try {
        const fisiere = fs.readdirSync(obGlobal.folderScss);
        const fisiereScss = fisiere.filter(fisier => path.extname(fisier) === '.scss');

        if (fisiereScss.length === 0) {
            console.log('📝 Nu s-au găsit fișiere SCSS pentru compilare');
            return;
        }

        console.log(`📋 Găsite ${fisiereScss.length} fișiere SCSS:`);
        fisiereScss.forEach(fisier => console.log(`   - ${fisier}`));

        let compilateReusit = 0;
        fisiereScss.forEach(fisier => {
            if (compileazaScss(fisier)) {
                compilateReusit++;
            }
        });

        console.log(`✅ Compilare inițială completă: ${compilateReusit}/${fisiereScss.length} fișiere`);

    } catch (error) {
        console.error('❌ Eroare la compilarea inițială:', error.message);
    }
}

function configurareWatch() {
    if (!fs.existsSync(obGlobal.folderScss)) {
        console.log('⚠️  Folderul SCSS nu există pentru watch');
        return;
    }

    console.log(`👁️  Urmăresc modificările în: ${obGlobal.folderScss}`);

    try {
        fs.watch(obGlobal.folderScss, { recursive: true }, (eventType, filename) => {
            if (!filename || !filename.endsWith('.scss')) {
                return;
            }

            console.log(`\n🔔 Detectată modificare: ${filename} (${eventType})`);

            setTimeout(() => {
                const caleCompletaScss = path.join(obGlobal.folderScss, filename);
                
                if (fs.existsSync(caleCompletaScss)) {
                    console.log(`🔄 Recompilare automată: ${filename}`);
                    compileazaScss(filename);
                } else {
                    console.log(`🗑️  Fișier șters: ${filename}`);
                }
            }, 100);
        });

        console.log('✅ Watch configurat cu succes pentru fișierele SCSS');

    } catch (error) {
        console.error('❌ Eroare la configurarea watch:', error.message);
    }
}

// ===================================================================
// FUNCȚII PENTRU ERORI
// ===================================================================

function initErori() {
    try {
        const eroriPath = path.join(__dirname, 'erori.json');
        const eroriData = JSON.parse(fs.readFileSync(eroriPath, 'utf-8'));
        
        let caleBaza = eroriData.cale_baza;
        if (!caleBaza.endsWith('/')) {
            caleBaza += '/';
        }
        
        eroriData.info_erori.forEach(eroare => {
            eroare.imagine = caleBaza + eroare.imagine;
        });
        
        if (eroriData.eroare_default) {
            eroriData.eroare_default.imagine = caleBaza + eroriData.eroare_default.imagine;
        }
        
        obGlobal.obErori = eroriData;
        console.log('Erorile au fost încărcate cu succes din erori.json');
        
    } catch (error) {
        console.error('Eroare la încărcarea fișierului erori.json:', error.message);
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
    
    res.render('pagini/eroare', dateleFinale, function(eroareRender, rezultatRandare) {
        if (eroareRender) {
            console.log('EROARE la randarea template-ului eroare.ejs:', eroareRender.message);
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
    const vect_foldere = ['temp', 'backup'];
    vect_foldere.forEach(folder => {
        const folderPath = path.join(__dirname, folder);
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath, { recursive: true }); //aici fac folderul dacă nu există
            console.log(`Folderul '${folder}' a fost creat: ${folderPath}`);
        } else {
            console.log(`Folderul '${folder}' există deja: ${folderPath}`);
        }
    });

    [obGlobal.folderScss, obGlobal.folderCss].forEach(folder => {
        if (!fs.existsSync(folder)) {
            fs.mkdirSync(folder, { recursive: true });
            console.log(`Folder SCSS/CSS creat: ${folder}`);
        }
    });
}

// ===================================================================
// INIȚIALIZARE
// ===================================================================

// Setări Express și EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware pentru parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Inițializarea aplicației
initErori();
creeazaFoldere();
compilareInitiala();
configurareWatch();

// Inițializarea galeriei
initImagini();

// Helper pentru template-uri EJS
app.locals.genereazaGalerieAnimata = genereazaHTMLGalerie;

// ===================================================================
// MIDDLEWARE ȘI RUTE
// ===================================================================

// Middleware pentru blocarea fișierelor .ejs
app.get('*.ejs', function(req, res) {
    console.log("Încercare de accesare directă a unui fișier .ejs:", req.path);
    const ipUtilizator = req.ip || req.connection.remoteAddress || '::1';
    afisareEroare(res, 400, null, null, null, ipUtilizator);
});

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

// RUTELE PENTRU PAGINA PRINCIPALĂ
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

// RUTA PENTRU GALERIE STATICĂ
app.get('/galerie', (req, res) => {
    const ipUtilizator = req.ip || req.connection.remoteAddress || '::1';
    
    try {
        // Permite testarea cu ora specifică prin query parameter
        const oraTest = req.query.ora || null;
        const galerieData = obtineGalerieData(oraTest);
        
        res.render('pagini/galerie', { 
            title: 'ArtModern - Galeria de Artă',
            ipUtilizator: ipUtilizator,
            galerieData: galerieData,
            oraAfisare: galerieData ? galerieData.oraAfisare : new Date().toTimeString().slice(0, 5),
            oraTest: oraTest
        }, function(eroare, rezultatRandare) {
            if (eroare) {
                console.log('Eroare la randarea galerie:', eroare.message);
                afisareEroare(res, 500, null, null, null, ipUtilizator);
            } else {
                res.send(rezultatRandare);
            }
        });
        
    } catch (error) {
        console.error('Eroare la încărcarea galeriei:', error.message);
        afisareEroare(res, 500, 'Eroare galerie', 'Nu s-au putut încărca imaginile galeriei.', null, ipUtilizator);
    }
});

// RUTĂ PENTRU TESTAREA GALERIEI CU ORE DIFERITE
app.get('/galerie/test/:ora', (req, res) => {
    const ipUtilizator = req.ip || req.connection.remoteAddress || '::1';
    const oraTest = req.params.ora;
    
    // Validează formatul orei (HH:MM)
    if (!/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(oraTest)) {
        return afisareEroare(res, 400, 'Format oră invalid', 'Folosiți formatul HH:MM (de exemplu: 14:30)', null, ipUtilizator);
    }
    
    try {
        const galerieData = obtineGalerieData(oraTest);
        
        res.render('pagini/galerie', { 
            title: `ArtModern - Galerie (Test ora ${oraTest})`,
            ipUtilizator: ipUtilizator,
            galerieData: galerieData,
            oraAfisare: oraTest,
            oraTest: oraTest
        }, function(eroare, rezultatRandare) {
            if (eroare) {
                console.log('Eroare la randarea galerie test:', eroare.message);
                afisareEroare(res, 500, null, null, null, ipUtilizator);
            } else {
                res.send(rezultatRandare);
            }
        });
        
    } catch (error) {
        console.error('Eroare la testarea galeriei:', error.message);
        afisareEroare(res, 500, 'Eroare test galerie', 'Nu s-au putut încărca imaginile pentru testare.', null, ipUtilizator);
    }
});

// Pentru testarea explicita a erorii 400
app.get('/test-400', (req, res) => {
    console.log("Testare eroare 400");
    const ipUtilizator = req.ip || req.connection.remoteAddress || '::1';
    afisareEroare(res, 400, null, null, null, ipUtilizator);
});

app.get('/bootstrap-demo', (req, res) => {
    const ipUtilizator = req.ip || req.connection.remoteAddress || '::1';
    
    res.render('pagini/bootstrap-demo', { 
        title: 'ArtModern - Demo Bootstrap',
        ipUtilizator: ipUtilizator
    }, function(eroare, rezultatRandare) {
        if (eroare) {
            console.log('Eroare la randarea bootstrap-demo:', eroare.message);
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

// RUTA PENTRU PRODUSE - cu date din PostgreSQL
app.get('/produse', async (req, res) => {
    const ipUtilizator = req.ip || req.connection.remoteAddress || '::1';
    const categorieSelectata = req.query.categorie || null;
    
    try {
        // Preia produsele din baza de date
        const produse = await getProduse(categorieSelectata);
        
        // Preia categoriile pentru meniu
        const categorii = await getCategorii();
        
        console.log(`Accesare pagina produse: ${produse.length} produse`);
        if (categorieSelectata) {
            console.log(`Filtrat pentru categoria: ${categorieSelectata}`);
        }
        
        res.render('pagini/produse', { 
            title: categorieSelectata ? `ArtModern - ${categorieSelectata}` : 'ArtModern - Produse',
            ipUtilizator: ipUtilizator,
            produse: produse,
            categorii: categorii,
            categoriaSelectata: categorieSelectata
        }, function(eroare, rezultatRandare) {
            if (eroare) {
                console.log('Eroare la randarea produse:', eroare.message);
                if (eroare.message.startsWith('Failed to lookup view')) {
                    afisareEroare(res, 404, null, null, null, ipUtilizator);
                } else {
                    afisareEroare(res, 500, null, null, null, ipUtilizator);
                }
            } else {
                console.log('Pagina produse randată cu succes');
                res.send(rezultatRandare);
            }
        });
        
    } catch (error) {
        console.error('Eroare la încărcarea produselor:', error.message);
        afisareEroare(res, 500, 'Eroare bază de date', 'Nu s-au putut încărca produsele din baza de date.', null, ipUtilizator);
    }
});

// RUTA PENTRU PRODUS INDIVIDUAL
app.get('/produs/:id', async (req, res) => {
    const ipUtilizator = req.ip || req.connection.remoteAddress || '::1';
    const produsId = parseInt(req.params.id);
    
    if (isNaN(produsId)) {
        return afisareEroare(res, 400, 'ID invalid', 'ID-ul produsului trebuie să fie un număr.', null, ipUtilizator);
    }
    
    try {
        const produs = await getProdusById(produsId);
        
        if (!produs) {
            return afisareEroare(res, 404, 'Produs negăsit', `Produsul cu ID-ul ${produsId} nu a fost găsit.`, null, ipUtilizator);
        }
        
        res.render('pagini/produs', { 
            title: `ArtModern - ${produs.nume}`,
            ipUtilizator: ipUtilizator,
            produs: produs
        }, function(eroare, rezultatRandare) {
            if (eroare) {
                console.log('Eroare la randarea produs:', eroare.message);
                if (eroare.message.startsWith('Failed to lookup view')) {
                    afisareEroare(res, 404, null, null, null, ipUtilizator);
                } else {
                    afisareEroare(res, 500, null, null, null, ipUtilizator);
                }
            } else {
                console.log(`Pagina produsului ${produs.nume} randată cu succes`);
                res.send(rezultatRandare);
            }
        });
        
    } catch (error) {
        console.error('Eroare la încărcarea produsului:', error.message);
        afisareEroare(res, 500, 'Eroare bază de date', 'Nu s-a putut încărca produsul din baza de date.', null, ipUtilizator);
    }
});

// ULTIMA RUTĂ: Catch-all pentru orice alte cereri
app.get('/*', (req, res) => {
    let url = req.url;
    
    if (url.startsWith('/')) {
        url = url.substring(1);
    }
    
    if (!url) {
        return res.redirect('/');
    }
    
    const ipUtilizator = req.ip || req.connection.remoteAddress || '::1';
    
    console.log(`Încercare de randare pentru pagina: ${url}`);
    
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

// Inițializarea și pornirea serverului
async function startServer() {
    try {
        // Testează conexiunea la baza de date
        await testConexiune();
        
        // Start the server
        app.listen(PORT, () => {
            console.log(`\n🚀 Serverul rulează pe http://localhost:${PORT}`);
            console.log('✅ Galerie statică implementată și funcțională');
            console.log('✅ Galerie animată implementată cu succes');
            console.log('✅ Compilator SCSS configurat și activ');
            console.log('✅ Conexiune PostgreSQL activă');
            console.log('📊 Pagina de produse cu filtrare și sortare gata');
            console.log('🕐 Pentru testare galerie: /galerie/test/14:30');
        });
        
    } catch (error) {
        console.error('❌ Eroare la pornirea serverului:', error.message);
        process.exit(1);
    }
}

// Pornește serverul
startServer();
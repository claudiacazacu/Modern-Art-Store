const express = require('express')
const path = require('path')
const fs = require('fs')
const sass = require('sass')
const db = require('./db')
const sharp = require('sharp')

const app = express()
const PORT = 8080

function normMsg(s) {
  if (s == null) return ''
  let t = String(s)
  t = t.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  t = t.replace(/[\p{Extended_Pictographic}\p{Emoji_Presentation}]/gu, '')
  t = t.toLowerCase()
  t = t.replace(/[.,!?;:()'"`~^_\-\[\]{}<>\|\\/]+/g, ' ')
  t = t.replace(/\s+/g, ' ').trim()
  return t
}

const obGlobal = {
  obErori: null,
  obImagini: null,
  folderScss: path.join(__dirname, 'resurse', 'SCSS'),
  folderCss: path.join(__dirname, 'resurse', 'CSS')
}

async function getProduse(categorieFilter = null) {
  try {
    let query = 'SELECT * FROM produse'
    let params = []
    if (categorieFilter) {
      query += ' WHERE categoria_mare = $1'
      params = [categorieFilter]
    }
    query += ' ORDER BY id'
    const rezultat = await db.query(query, params)
    console.log(normMsg(`preluate ${rezultat.length} produse din baza de date`))
    return rezultat
  } catch (error) {
    console.error(normMsg('eroare la preluarea produselor'))
    return []
  }
}

async function getProdusById(id) {
  try {
    const query = 'SELECT * FROM produse WHERE id = $1'
    const rezultat = await db.oneOrNone(query, [id])
    if (rezultat) {
      console.log(normMsg(`produs gasit ${rezultat.nume}`))
      return rezultat
    } else {
      console.log(normMsg(`nu am gasit produsul cu id ${id}`))
      return null
    }
  } catch (error) {
    console.error(normMsg('eroare la preluarea produsului'))
    return null
  }
}

async function getCategorii() {
  try {
    const query = 'SELECT DISTINCT categoria_mare FROM produse ORDER BY categoria_mare'
    const rezultat = await db.query(query)
    const categorii = rezultat.map(row => row.categoria_mare)
    console.log(normMsg(`categorii gasite ${categorii.join(' ')}`))
    return categorii
  } catch (error) {
    console.error(normMsg('eroare la preluarea categoriilor'))
    return ['pictura', 'sculptura', 'arta_digitala', 'ceramica', 'fotografie']
  }
}

async function testConexiune() {
  try {
    await db.connect()
    console.log(normMsg('conexiunea merge la baza de date'))
    const tabelExista = await db.oneOrNone("SELECT to_regclass('public.produse') as tabel")
    if (tabelExista && tabelExista.tabel) {
      console.log(normMsg('tabelul produse exista in baza de date'))
      const numarProduse = await db.one('SELECT COUNT(*) FROM produse')
      console.log(normMsg(`numar de produse in baza de date ${numarProduse.count}`))
    } else {
      console.log(normMsg('tabelul produse nu exista in baza de date'))
    }
  } catch (error) {
    console.error(normMsg('eroare la conexiunea cu baza de date'))
  }
}

function toRows(result) {
  if (!result) return []
  if (Array.isArray(result)) return result
  if (result.rows) return result.rows
  return []
}

const ADMIN_SECRET = process.env.ADMIN_SECRET || null

function requireAdmin(req, res, next) {
  if (!ADMIN_SECRET) return next()
  const ok = req.query.key === ADMIN_SECRET || req.headers['x-admin-key'] === ADMIN_SECRET
  if (ok) return next()
  return res.status(401).send(normMsg('acces neautorizat adauga key in url sau header x admin key'))
}

async function listTables() {
  const sql = `
    SELECT table_name
    FROM information_schema.tables
    WHERE table_schema='public' AND table_type='BASE TABLE'
    ORDER BY table_name;
  `
  const rs = await db.query ? await db.query(sql) : await db.any(sql)
  const rows = toRows(rs)
  return rows.map(r => r.table_name)
}

async function listColumns(table) {
  const sql = `
    SELECT column_name, data_type, ordinal_position
    FROM information_schema.columns
    WHERE table_schema='public' AND table_name = $1
    ORDER BY ordinal_position;
  `
  const rs = await (db.query ? db.query(sql, [table]) : db.any(sql, [table]))
  return toRows(rs)
}

function safeIdent(name) {
  return `"${String(name).replace(/"/g, '""')}"`
}

async function fetchRows(table, { page = 1, limit = 20, sort = null, dir = 'asc' } = {}) {
  const cols = await listColumns(table)
  if (!cols.length) return { rows: [], total: 0, cols: [] }
  const offset = (page - 1) * limit
  const sortCol = sort && cols.find(c => c.column_name === sort) ? sort : cols[0].column_name
  const dirSql = (String(dir).toLowerCase() === 'desc') ? 'DESC' : 'ASC'
  const tIdent = safeIdent(table)
  const sIdent = safeIdent(sortCol)
  const dataSql = `SELECT * FROM ${tIdent} ORDER BY ${sIdent} ${dirSql} LIMIT $1 OFFSET $2;`
  const countSql = `SELECT COUNT(*)::int AS cnt FROM ${tIdent};`
  const dataRes = await (db.query ? db.query(dataSql, [limit, offset]) : db.any(dataSql, [limit, offset]))
  const countRes = await (db.query ? db.query(countSql) : db.any(countSql))
  const rows = toRows(dataRes)
  const countRows = toRows(countRes)
  const total = countRows[0]?.cnt || 0
  return { rows, total, cols }
}

function initImagini() {
  try {
    const continut = fs.readFileSync(path.join(__dirname, 'resurse/json/galerie.json')).toString('utf-8')
    obGlobal.obImagini = JSON.parse(continut)
    const vImagini = obGlobal.obImagini.imagini
    const caleAbs = path.join(__dirname, obGlobal.obImagini.cale_galerie)
    const caleAbsMediu = path.join(__dirname, obGlobal.obImagini.cale_galerie, 'mediu')
    if (!fs.existsSync(caleAbsMediu)) fs.mkdirSync(caleAbsMediu, { recursive: true })
    for (const imag of vImagini) {
      const [numeFis] = imag.cale_imagine.split('.')
      const caleFisAbs = path.join(caleAbs, imag.cale_imagine)
      const caleFisMediuAbs = path.join(caleAbsMediu, numeFis + '.webp')
      if (fs.existsSync(caleFisAbs)) {
        sharp(caleFisAbs).resize(300).toFile(caleFisMediuAbs)
        imag.fisier_mediu = path.join('/', obGlobal.obImagini.cale_galerie, 'mediu', numeFis + '.webp')
      }
      imag.fisier = path.join('/', obGlobal.obImagini.cale_galerie, imag.cale_imagine)
    }
    console.log(normMsg(`am initializat galeria cu ${vImagini.length} imagini`))
  } catch (error) {
    console.error(normMsg('eroare la initializare galerie'))
  }
}

function esteInInterval(oraActuala, interval) {
  try {
    const [oraStart, oraEnd] = interval.split('-')
    const [startHour, startMin] = oraStart.split(':').map(Number)
    const [endHour, endMin] = oraEnd.split(':').map(Number)
    const startMinutes = startHour * 60 + startMin
    let endMinutes = endHour * 60 + endMin
    const [currentHour, currentMin] = oraActuala.split(':').map(Number)
    const currentMinutes = currentHour * 60 + currentMin
    if (endMinutes <= startMinutes) {
      return currentMinutes >= startMinutes || currentMinutes <= endMinutes
    } else {
      return currentMinutes >= startMinutes && currentMinutes <= endMinutes
    }
  } catch (error) {
    console.error(normMsg(`eroare la verificarea intervalului ${interval}`))
    return false
  }
}

function filtreazaImaginiDupaOra(imagini, oraActuala) {
  const imaginiFiltrate = imagini.filter(imagine => esteInInterval(oraActuala, imagine.timp))
  return imaginiFiltrate.slice(0, 10)
}

function obtineGalerieData(oraFortat = null) {
  try {
    if (!obGlobal.obImagini) return null
    const oraActuala = oraFortat || new Date().toTimeString().slice(0, 5)
    const imaginiFiltrate = filtreazaImaginiDupaOra(obGlobal.obImagini.imagini, oraActuala)
    return {
      cale_galerie: obGlobal.obImagini.cale_galerie,
      imagini: imaginiFiltrate,
      totalImagini: obGlobal.obImagini.imagini.length,
      oraAfisare: oraActuala
    }
  } catch {
    console.error(normMsg('eroare la obtinerea datelor galeriei'))
    return null
  }
}

const imaginiGalerie = [
  'arta1.jpg','arta2.jpg','arta3.jpg','arta4.jpg','arta5.jpg',
  'arta6.jpg','arta7.jpg','arta8.jpg','arta9.jpg','arta10.jpg',
  'arta11.jpg','arta12.jpg','arta13.jpg','arta14.jpg','arta15.jpg',
  'arta16.jpg','arta17.jpg','arta18.jpg','arta19.jpg','arta20.jpg',
  'brush.png','brushstroke.png','paint stroke.png','paint stroke1.png',
  'problema.png','StarryNight.jpg'
]

function genereazaNumarImagini() {
  const numereValide = [3, 6, 9, 12, 15]
  return numereValide[Math.floor(Math.random() * numereValide.length)]
}

function genereazaOffset(numarImagini) {
  const offsetMaxim = imaginiGalerie.length - numarImagini
  return Math.floor(Math.random() * (offsetMaxim + 1))
}

function selecteazaImagini() {
  const numarImagini = genereazaNumarImagini()
  const offset = genereazaOffset(numarImagini)
  const imaginiSelectate = []
  for (let i = 0; i < numarImagini; i++) imaginiSelectate.push(imaginiGalerie[offset + i])
  return { imagini: imaginiSelectate, numarImagini, offset }
}

function genereazaHTMLGalerie() {
  const { imagini, numarImagini, offset } = selecteazaImagini()
  let html = `<h3 class="galerie-animata-titlu">galerie animata colectia noastra</h3>\n`
  html += `<p class="galerie-info">${normMsg('imagini')} ${numarImagini} | ${normMsg('offset')} ${offset}</p>\n`
  html += '<div class="galerie-animata">\n'
  imagini.forEach((imagine, index) => {
    const caleCompleta = `/resurse/imagini/${imagine}`
    html += `    <div class="imagine-container">
        <img src="${caleCompleta}" alt="${normMsg('opera de arta')} ${index + 1}" loading="lazy" />
    </div>\n`
  })
  html += '</div>\n'
  return html
}

function compileazaScss(caleScss, caleCss) {
  try {
    let caleAbsolutaScss = path.isAbsolute(caleScss) ? caleScss : path.join(obGlobal.folderScss, caleScss)
    let caleAbsolutaCss
    if (caleCss) {
      caleAbsolutaCss = path.isAbsolute(caleCss) ? caleCss : path.join(obGlobal.folderCss, caleCss)
    } else {
      const numeScss = path.basename(caleAbsolutaScss, '.scss')
      caleAbsolutaCss = path.join(obGlobal.folderCss, numeScss + '.css')
    }
    if (!fs.existsSync(caleAbsolutaScss)) {
      console.error(normMsg('fisierul scss nu exista'))
      return false
    }
    salvareInBackup(caleAbsolutaCss)
    const rezultat = sass.compile(caleAbsolutaScss, { style: 'expanded', sourceMap: false })
    const folderDestinatie = path.dirname(caleAbsolutaCss)
    if (!fs.existsSync(folderDestinatie)) fs.mkdirSync(folderDestinatie, { recursive: true })
    fs.writeFileSync(caleAbsolutaCss, rezultat.css)
    console.log(normMsg('compilat cu succes scss'))
    return true
  } catch {
    console.error(normMsg('eroare la compilarea scss'))
    return false
  }
}

function salvareInBackup(caleCss) {
  try {
    if (!fs.existsSync(caleCss)) return
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19)
    const numeFisierBackup = `${path.basename(caleCss, '.css')}_${timestamp}.css`
    const caleBackup = path.join(__dirname, 'backup', 'resurse', 'css', numeFisierBackup)
    const folderBackup = path.dirname(caleBackup)
    if (!fs.existsSync(folderBackup)) fs.mkdirSync(folderBackup, { recursive: true })
    fs.copyFileSync(caleCss, caleBackup)
  } catch {
    console.error(normMsg('eroare la salvare backup css'))
  }
}

function compilareInitiala() {
  if (!fs.existsSync(obGlobal.folderScss)) {
    fs.mkdirSync(obGlobal.folderScss, { recursive: true })
    return
  }
  try {
    const fisiere = fs.readdirSync(obGlobal.folderScss)
    const fisiereScss = fisiere.filter(fisier => path.extname(fisier) === '.scss')
    let compilateReusit = 0
    fisiereScss.forEach(fisier => {
      if (compileazaScss(fisier)) compilateReusit++
    })
    console.log(normMsg(`compilare initiala completa ${compilateReusit} din ${fisiereScss.length}`))
  } catch {
    console.error(normMsg('eroare la compilarea initiala'))
  }
}

function configurareWatch() {
  if (!fs.existsSync(obGlobal.folderScss)) {
    console.log(normMsg('folder scss nu exista pentru watch'))
    return
  }
  try {
    fs.watch(obGlobal.folderScss, { recursive: true }, (eventType, filename) => {
      if (!filename || !filename.endsWith('.scss')) return
      setTimeout(() => {
        const caleCompletaScss = path.join(obGlobal.folderScss, filename)
        if (fs.existsSync(caleCompletaScss)) {
          compileazaScss(filename)
        } else {
          console.log(normMsg('fisier sters'))
        }
      }, 100)
    })
    console.log(normMsg('watch setat pentru fisiere scss'))
  } catch {
    console.error(normMsg('eroare la configurare watch'))
  }
}

function initErori() {
  try {
    const eroriPath = path.join(__dirname, 'erori.json')
    const eroriData = JSON.parse(fs.readFileSync(eroriPath, 'utf-8'))
    let caleBaza = eroriData.cale_baza
    if (!caleBaza.endsWith('/')) caleBaza += '/'
    eroriData.info_erori.forEach(eroare => { eroare.imagine = caleBaza + eroare.imagine })
    if (eroriData.eroare_default) eroriData.eroare_default.imagine = caleBaza + eroriData.eroare_default.imagine
    obGlobal.obErori = eroriData
    console.log(normMsg('erorile au fost incarcate cu succes'))
  } catch {
    obGlobal.obErori = {
      cale_baza: '/resurse/imagini/erori/',
      eroare_default: {
        titlu: normMsg('eroare'),
        text: normMsg('a aparut o eroare neasteptata'),
        imagine: '/resurse/imagini/erori/default.png'
      },
      info_erori: [
        {
          identificator: 400,
          status: true,
          titlu: normMsg('cerere invalida'),
          text: normMsg('cererea nu poate fi procesata fisierele ejs nu pot fi accesate direct'),
          imagine: '/resurse/imagini/erori/400.jpg'
        },
        {
          identificator: 403,
          status: true,
          titlu: normMsg('acces interzis'),
          text: normMsg('nu aveti permisiunea sa accesati aceasta resursa sau director'),
          imagine: '/resurse/imagini/erori/403.jpg'
        },
        {
          identificator: 404,
          status: true,
          titlu: normMsg('pagina nu a fost gasita'),
          text: normMsg('pagina cautata nu exista verifica url sau mergi la pagina principala'),
          imagine: '/resurse/imagini/erori/404.jpg'
        }
      ]
    }
    console.log(normMsg('s au incarcat datele de eroare implicite'))
  }
}

function afisareEroare(res, identificator, titlu, text, imagine, ipUtilizator) {
  let eroare
  if (identificator) eroare = obGlobal.obErori.info_erori.find(e => e.identificator === identificator)
  if (!eroare) eroare = obGlobal.obErori.eroare_default
  const statusCode = (eroare.status && identificator) ? identificator : 200
  const ipFinal = ipUtilizator || (res.req ? (res.req.ip || res.req.connection.remoteAddress || '::1') : '::1')
  const dateleFinale = {
    titlu: normMsg(titlu || eroare.titlu),
    text: normMsg(text || eroare.text),
    imagine: imagine || eroare.imagine,
    ipUtilizator: ipFinal
  }
  res.status(statusCode)
  res.render('pagini/eroare', dateleFinale, function (eroareRender, rezultatRandare) {
    if (eroareRender) {
      res.send(`<!DOCTYPE html>
<html lang="ro">
<head>
  <title>artmodern ${dateleFinale.titlu}</title>
  <meta charset="UTF-8">
  <link rel="stylesheet" type="text/css" href="/resurse/CSS/general.css">
</head>
<body>
  <header>
    <h1>magazin online de arta moderna</h1>
    <div class="user-info"><p>${normMsg('ip utilizator')} ${ipFinal}</p></div>
    <nav><ul><li><a href="/">acasa</a></li></ul></nav>
  </header>
  <main>
    <section class="eroare-section">
      <h2>${dateleFinale.titlu}</h2>
      <div class="eroare-content">
        <img src="${dateleFinale.imagine}" alt="${dateleFinale.titlu}" style="max-width: 200px;" />
        <p>${dateleFinale.text}</p>
        <p><a href="/">inapoi la pagina principala</a></p>
      </div>
    </section>
  </main>
</body>
</html>`)
    } else {
      res.send(rezultatRandare)
    }
  })
}

function creeazaFoldere() {
  const vect_foldere = ['temp', 'backup']
  vect_foldere.forEach(folder => {
    const folderPath = path.join(__dirname, folder)
    if (!fs.existsSync(folderPath)) fs.mkdirSync(folderPath, { recursive: true })
  })
  ;[obGlobal.folderScss, obGlobal.folderCss].forEach(folder => {
    if (!fs.existsSync(folder)) fs.mkdirSync(folder, { recursive: true })
  })
}

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

initErori()
creeazaFoldere()
compilareInitiala()
configurareWatch()
initImagini()

app.locals.genereazaGalerieAnimata = genereazaHTMLGalerie

app.get('*.ejs', function (req, res) {
  const ipUtilizator = req.ip || req.connection.remoteAddress || '::1'
  afisareEroare(res, 400, null, null, null, ipUtilizator)
})

app.use((req, res, next) => {
  if (req.path.endsWith('.ejs')) {
    const ipUtilizator = req.ip || req.connection.remoteAddress || '::1'
    return afisareEroare(res, 400, null, null, null, ipUtilizator)
  }
  next()
})

app.get('/favicon.ico', (req, res) => {
  const faviconPath = path.join(__dirname, 'resurse', 'ico', 'favicon', 'favicon.ico')
  if (fs.existsSync(faviconPath)) res.sendFile(faviconPath)
  else res.status(404).send(normMsg('favicon lipsa'))
})

app.all('/resurse/*', (req, res, next) => {
  if (req.path.endsWith('/')) {
    const ipUtilizator = req.ip || req.connection.remoteAddress || '::1'
    return afisareEroare(res, 403, null, null, null, ipUtilizator)
  }
  next()
})

app.use('/resurse', express.static(path.join(__dirname, 'resurse')))

app.get(['/', '/index', '/home'], (req, res) => {
  const ipUtilizator = req.ip || req.connection.remoteAddress || '::1'
  res.render('pagini/index', {
    title: 'artmodern acasa',
    ipUtilizator: ipUtilizator
  }, function (eroare, rezultatRandare) {
    if (eroare) {
      if (eroare.message.startsWith('Failed to lookup view')) {
        afisareEroare(res, 404, null, null, null, ipUtilizator)
      } else {
        afisareEroare(res, 500, null, null, null, ipUtilizator)
      }
    } else res.send(rezultatRandare)
  })
})

app.get('/galerie', (req, res) => {
  const ipUtilizator = req.ip || req.connection.remoteAddress || '::1'
  try {
    const oraTest = req.query.ora || null
    const galerieData = obtineGalerieData(oraTest)
    res.render('pagini/galerie', {
      title: 'artmodern galeria de arta',
      ipUtilizator: ipUtilizator,
      galerieData: galerieData,
      oraAfisare: galerieData ? galerieData.oraAfisare : new Date().toTimeString().slice(0, 5),
      oraTest: oraTest
    }, function (eroare, rezultatRandare) {
      if (eroare) afisareEroare(res, 500, null, null, null, ipUtilizator)
      else res.send(rezultatRandare)
    })
  } catch {
    afisareEroare(res, 500, normMsg('eroare galerie'), normMsg('nu s au putut incarca imaginile galeriei'), null, ipUtilizator)
  }
})

app.get('/galerie/test/:ora', (req, res) => {
  const ipUtilizator = req.ip || req.connection.remoteAddress || '::1'
  const oraTest = req.params.ora
  if (!/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(oraTest)) {
    return afisareEroare(res, 400, normMsg('format ora invalid'), normMsg('foloseste format hh mm ex 14 30'), null, ipUtilizator)
  }
  try {
    const galerieData = obtineGalerieData(oraTest)
    res.render('pagini/galerie', {
      title: `artmodern galerie test ora ${oraTest}`,
      ipUtilizator: ipUtilizator,
      galerieData: galerieData,
      oraAfisare: oraTest,
      oraTest: oraTest
    }, function (eroare, rezultatRandare) {
      if (eroare) afisareEroare(res, 500, null, null, null, ipUtilizator)
      else res.send(rezultatRandare)
    })
  } catch {
    afisareEroare(res, 500, normMsg('eroare test galerie'), normMsg('nu s au putut incarca imaginile pentru testare'), null, ipUtilizator)
  }
})

app.get('/test-400', (req, res) => {
  const ipUtilizator = req.ip || req.connection.remoteAddress || '::1'
  afisareEroare(res, 400, null, null, null, ipUtilizator)
})

app.get('/bootstrap-demo', (req, res) => {
  const ipUtilizator = req.ip || req.connection.remoteAddress || '::1'
  res.render('pagini/bootstrap-demo', {
    title: 'artmodern demo bootstrap',
    ipUtilizator: ipUtilizator
  }, function (eroare, rezultatRandare) {
    if (eroare) {
      if (eroare.message.startsWith('Failed to lookup view')) {
        afisareEroare(res, 404, null, null, null, ipUtilizator)
      } else {
        afisareEroare(res, 500, null, null, null, ipUtilizator)
      }
    } else res.send(rezultatRandare)
  })
})

app.get('/produse', async (req, res) => {
  const ipUtilizator = req.ip || req.connection.remoteAddress || '::1'
  const categorieSelectata = req.query.categorie || null
  try {
    const produse = await getProduse(categorieSelectata)
    const categorii = await getCategorii()
    res.render('pagini/produse', {
      title: categorieSelectata ? `artmodern ${categorieSelectata}` : 'artmodern produse',
      ipUtilizator: ipUtilizator,
      produse: produse,
      categorii: categorii,
      categoriaSelectata: categorieSelectata
    }, function (eroare, rezultatRandare) {
      if (eroare) {
        if (eroare.message.startsWith('Failed to lookup view')) {
          afisareEroare(res, 404, null, null, null, ipUtilizator)
        } else {
          afisareEroare(res, 500, null, null, null, ipUtilizator)
        }
      } else res.send(rezultatRandare)
    })
  } catch {
    afisareEroare(res, 500, normMsg('eroare baza de date'), normMsg('nu s au putut incarca produsele'), null, ipUtilizator)
  }
})

app.get('/produs/:id', async (req, res) => {
  const ipUtilizator = req.ip || req.connection.remoteAddress || '::1'
  const produsId = parseInt(req.params.id)
  if (isNaN(produsId)) {
    return afisareEroare(res, 400, normMsg('id invalid'), normMsg('id ul produsului trebuie sa fie numar'), null, ipUtilizator)
  }
  try {
    const produs = await getProdusById(produsId)
    if (!produs) {
      return afisareEroare(res, 404, normMsg('produs negasit'), normMsg(`produsul cu id ${produsId} nu a fost gasit`), null, ipUtilizator)
    }
    res.render('pagini/produs', {
      title: `artmodern ${produs.nume}`,
      ipUtilizator: ipUtilizator,
      produs: produs
    }, function (eroare, rezultatRandare) {
      if (eroare) {
        if (eroare.message.startsWith('Failed to lookup view')) {
          afisareEroare(res, 404, null, null, null, ipUtilizator)
        } else {
          afisareEroare(res, 500, null, null, null, ipUtilizator)
        }
      } else res.send(rezultatRandare)
    })
  } catch {
    afisareEroare(res, 500, normMsg('eroare baza de date'), normMsg('nu s a putut incarca produsul'), null, ipUtilizator)
  }
})

app.get('/admin/db', requireAdmin, async (req, res) => {
  const ipUtilizator = req.ip || req.connection.remoteAddress || '::1'
  try {
    const tables = await listTables()
    const active = req.query.t || tables[0] || null
    let data = { rows: [], total: 0, cols: [] }
    if (active) {
      data = await fetchRows(active, {
        page: parseInt(req.query.page || '1', 10),
        limit: Math.min(parseInt(req.query.limit || '20', 10), 100),
        sort: req.query.sort || null,
        dir: req.query.dir || 'asc'
      })
    }
    res.render('pagini/admin-db', {
      title: 'admin db',
      ipUtilizator,
      tables,
      active,
      rows: data.rows,
      total: data.total,
      cols: data.cols,
      page: parseInt(req.query.page || '1', 10),
      limit: Math.min(parseInt(req.query.limit || '20', 10), 100),
      dir: (req.query.dir || 'asc')
    }, (e, html) => {
      if (e) return afisareEroare(res, 500, normMsg('eroare admin db'), normMsg('nu s a putut incarca pagina'), null, ipUtilizator)
      res.send(html)
    })
  } catch {
    afisareEroare(res, 500, normMsg('eroare admin db'), normMsg('nu s a putut incarca pagina'), null, ipUtilizator)
  }
})

app.post('/admin/query', requireAdmin, async (req, res) => {
  try {
    const sql = (req.body.sql || '').trim()
    if (!sql.toLowerCase().startsWith('select')) {
      return res.status(400).json({ ok: false, error: normMsg('doar interogari select sunt permise') })
    }
    const { rows } = await db.query(sql)
    return res.json({ ok: true, rows })
  } catch (e) {
    return res.status(400).json({ ok: false, error: normMsg(e.message || 'eroare interogare') })
  }
})

app.get('/debug-db', async (req, res) => {
  try {
    const ping = await db.query('SELECT NOW() AS now;')
    res.send(`<pre>db ok\n${JSON.stringify(ping.rows || ping, null, 2)}</pre>`)
  } catch (e) {
    res.status(500).send(`<pre>eroare db\n${e.message}</pre>`)
  }
})

app.get('/*', (req, res) => {
  let url = req.url
  if (url.startsWith('/')) url = url.substring(1)
  if (!url) return res.redirect('/')
  const ipUtilizator = req.ip || req.connection.remoteAddress || '::1'
  res.render(`pagini/${url}`, {
    title: `artmodern ${url}`,
    ipUtilizator: ipUtilizator
  }, function (eroare, rezultatRandare) {
    if (eroare) {
      if (eroare.message.startsWith('Failed to lookup view')) {
        return afisareEroare(res, 404, null, null, null, ipUtilizator)
      } else {
        return afisareEroare(res, 500, null, null, null, ipUtilizator)
      }
    } else res.send(rezultatRandare)
  })
})

async function startServer() {
  try {
    await testConexiune()
    app.listen(PORT, () => {
      console.log(normMsg(`serverul ruleaza pe http localhost ${PORT}`))
      console.log(normMsg('galerie statica ok'))
      console.log(normMsg('galerie animata ok'))
      console.log(normMsg('compilator scss activ'))
      console.log(normMsg('conexiune postgresql activa'))
      console.log(normMsg('pagina produse cu filtrare si sortare ok'))
      console.log(normMsg('pentru testare galerie ruta galerie test hh mm'))
      console.log(normMsg('admin db ruta admin db seteaza env admin secret pt protectie'))
      console.log(`http://localhost:${PORT}`)
    })
  } catch {
    console.error(normMsg('eroare la pornirea serverului'))
    process.exit(1)
  }
}

startServer()

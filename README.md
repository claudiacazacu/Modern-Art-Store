# 🎨 ArtModern - Magazin Online de Artă Modernă

Un site web elegant și interactiv pentru un magazin online specializat în artă modernă și contemporană, dezvoltat cu Node.js și Express. 

## 📖 Despre Proiect

ArtModern este o platformă web inovatoare care prezintă și comercializează opere de artă modernă românească și internațională. Proiectul combină tehnologia modernă cu designul artistic pentru a crea o experiență unică de navigare prin lumea artei contemporane.

### 🌟 Viziunea Proiectului
Să democratizeze accesul la arta contemporană și să creeze o punte între artiști și colecționari, oferind o platformă digitală elegantă pentru descoperirea și achiziționarea operelor de artă.

## ✨ Caracteristici Principale

- 🖼️ **Galerie Animată Dinamică**: Sistem sofisticat de afișare a operelor cu CSS generat programatic și animații fluide
- 📱 **Design Responsive**: Interfață adaptabilă perfect optimizată pentru desktop, tabletă și mobil
- 🏛️ **Pagini Tematice**: Acasă, Galerie, Artiști, Evenimente, Contact și Despre
- ⚡ **Template Engine EJS**: Randare dinamică a conținutului cu performanțe optimize
- 📁 **Organizare Resurse**: Sistem structurat pentru imagini, stiluri și documente
- 🎭 **Conținut Artistic**: Testimoniale, informații despre artiști și colecții curate
- 🔒 **Securitate**: Middleware pentru protecția resurselor și gestionarea erorilor

## 🛠️ Tehnologii Utilizate

### Backend
- 🟢 **Node.js**: Runtime JavaScript pentru server
- 🚀 **Express.js 4.18.2**: Framework web rapid și minimalist
- 📄 **EJS 3.1.9**: Template engine pentru generarea HTML dinamic

### Frontend
- 🌐 **HTML5**: Markup semantic modern
- 🎨 **CSS3**: Stilizare avansată cu animații și efecte
- ⚡ **JavaScript**: Interactivitate și funcționalități dinamice
- 🎯 **Font Awesome**: Set complet de iconuri vectoriale

### Funcționalități Avansate
- 🔄 **CSS Dinamic**: Generare automată de stiluri SASS simulate
- 🖱️ **Animații CSS**: Efecte vizuale cu clip-path și transformări
- 📊 **Debugging**: Sistem de logging pentru monitorizarea galeriei

## 🚀 Instalare și Rulare

### Prerequisite
- Node.js (versiunea 0.10.0 sau mai nouă)
- npm (Node Package Manager)

### Pași de instalare

```bash
# 📥 Clonează repository-ul
git clone https://github.com/claudiacazacu/tehniciweb.git

# 📂 Intră în directorul proiectului
cd tehniciweb

# 📦 Instalează dependințele
npm install

# 🎬 Pornește serverul în modul dezvoltare
npm start
```

### 🌐 Accesare
Serverul va rula pe **http://localhost:8080**

### 🔧 Comenzi disponibile
- `npm start`: Pornește serverul de producție
- `npm test`: Rulează testele (momentan nedefinite)

## 📁 Structura Detaliată a Proiectului

```
📦 tehniciweb/
├── 📄 index.js                    # Fișierul principal al serverului Express
├── 📋 package.json               # Configurația NPM și dependințele
├── 📋 package-lock.json          # Versiunile exacte ale dependințelor
├── 📁 views/                     # Template-uri EJS
│   └── 📁 pagini/               # Paginile principale ale site-ului
│       ├── 🏠 index.ejs         # Pagina principală
│       ├── ℹ️ despre.ejs        # Pagina despre site
│       ├── 🖼️ galerie.ejs      # Galeria de opere
│       ├── 👨‍🎨 artisti.ejs      # Pagina artiștilor
│       ├── 🎪 evenimente.ejs    # Evenimente artistice
│       └── 📞 contact.ejs       # Informații de contact
├── 📁 resurse/                  # Toate resursele statice
│   ├── 🎨 CSS/                  # Fișiere de stil
│   │   ├── general.css          # Stiluri principale
│   │   ├── nav700.css           # Navigare responsive 700px
│   │   ├── nav1000.css          # Navigare responsive 1000px
│   │   └── galerie-animata.css  # CSS generat dinamic
│   ├── 🖼️ imagini/             # Colecția de imagini
│   │   ├── arta1.jpg - arta20.jpg # Opere de artă
│   │   ├── StarryNight.jpg      # Imagine specială pentru border
│   │   └── 📁 erori/            # Imagini pentru paginile de eroare
│   ├── 📄 pdf/                  # Documente și cataloage
│   └── 🎯 ico/                  # Favicon-uri și iconuri
└── 📁 temp/                     # Director temporar (generat automat)
```

## 🎭 Funcționalități Speciale

### 🖼️ Galerie Animată Inteligentă
- **🎲 Algoritm de selecție**: Generează aleator un număr de imagini divizibil cu 3 (3, 6, 9, 12, 15)
- **🔄 Offset dinamic**: Selectează un punct de începere aleator din colecția de 26 de imagini
- **⏱️ Timing calculat**: Durata animației se adaptează automat la numărul de imagini (4 secunde/imagine)
- **🎨 Efecte vizuale**: Animații complexe cu clip-path pentru tranziții cinematografice
- **📱 Responsive**: Se ascunde automat pe ecrane mai mici de 1024px pentru o experiență optimă

### 🛡️ Sistem de Securitate și Erori
- **🚫 Protecție resurse**: Middleware pentru blocarea accesului direct la directoare
- **🔒 Blocare EJS**: Împiedică accesul direct la fișierele template
- **📄 Pagini de eroare personalizate**: 
  - 400 (Bad Request) - Cereri invalide
  - 403 (Forbidden) - Acces interzis  
  - 404 (Not Found) - Pagină inexistentă
- **📊 Logging**: Sistem complet de înregistrare a activității

### 🎯 Optimizări Performance
- **🗂️ Servire statică optimizată**: Express.static pentru resurse
- **💾 Cache headers**: Configurarea corectă a cache-ului pentru CSS dinamic
- **⚡ Lazy loading**: Încărcare întârziată pentru imagini
- **🔄 Regenerare inteligentă**: CSS-ul galeriei se regenerează doar când este necesar

## 📚 Pagini și Conținut

### 🏠 Pagina Principală (/)
- Prezentare generală a magazinului
- Galerie animată cu opere selectate
- Testimoniale de la clienți
- Informații despre misiunea companiei
- Tabel cu top opere de artă
- Video-uri educaționale integrate

### 🖼️ Alte Pagini
- **Galerie**: Colecția completă de opere
- **Artiști**: Profiluri și biografii
- **Evenimente**: Expoziții și vernisaje
- **Contact**: Formulare și informații
- **Despre**: Istoria și valorile companiei

## 🔧 Dezvoltare și Personalizare

### 📝 Adăugarea de noi imagini
1. Copiază imaginile în `resurse/imagini/`
2. Actualizează array-ul `imaginiGalerie` din `index.js`
3. Serverul va include automat noile imagini în rotația aleatorie

### 🎨 Modificarea stilurilor
- Stilurile principale: `resurse/CSS/general.css`
- Responsive design: `resurse/CSS/nav700.css` și `nav1000.css`
- Galeria animată: generată dinamic în `index.js`

### 📄 Adăugarea de noi pagini
1. Creează un fișier EJS în `views/pagini/`
2. Ruta va fi disponibilă automat la `/{numele_fișierului}`

## 🐛 Debugging și Monitorizare

Proiectul include un sistem complet de logging care afișează:
- 📊 Statistici galerie (număr imagini, offset, durată)
- 🖼️ Lista imaginilor selectate pentru fiecare sesiune
- ✅ Confirmări de încărcare a imaginilor
- ❌ Erori de încărcare a resurselor
- 🚀 Statusul generării CSS-ului dinamic

## 🚀 Funcționalități Viitoare

- 🛒 **Sistem de comandă**: Coș de cumpărături și procesare plăți
- 👤 **Conturi utilizatori**: Sistem de autentificare și profile
- 🔍 **Căutare avansată**: Filtrare după artist, preț, stil
- 💬 **Sistem de review-uri**: Evaluări și comentarii pentru opere
- 📧 **Newsletter**: Notificări pentru opere noi și evenimente
- 🌍 **Multilingv**: Suport pentru multiple limbi

## 👩‍💻 Autor

**Claudia Cazacu** - Dezvoltator Full-Stack  
📚 Proiect realizat pentru cursul de **Tehnici Web**  
🎓 Focalizat pe dezvoltarea de aplicații web moderne și interactive

## 📞 Contact și Suport

Pentru întrebări, sugestii sau contribuții:
- 📧 Email: [prin repository GitHub]
- 🐛 Bug reports: [GitHub Issues]
- 💡 Feature requests: [GitHub Discussions]

## 📜 Licență

📄 **ISC License** - Proiect cu scop educațional  

---

⭐ **Dacă proiectul îți place, oferă-i o stea pe GitHub!** ⭐

# Magazin Online de Artă Modernă  

## Descriere  
Acest proiect reprezintă o aplicație web pentru gestionarea și prezentarea unui **magazin online de artă modernă**.  
Aplicația a fost dezvoltată în cadrul cursului de **Baze de Date** și respectă cerințele de proiect: proiectarea modelului conceptual, implementarea în PostgreSQL, interfață web pentru interacțiunea cu baza de date și funcționalități avansate (vizualizări, rapoarte, constrângeri, sortare).  

## Tehnologii utilizate  
- **Backend:** Node.js + Express  
- **Bază de date:** PostgreSQL (pg + pg-promise)  
- **Frontend:** EJS (template engine), Bootstrap 5, SCSS compilat cu `sass`  
- **Altele:** `sharp` pentru procesarea imaginilor, sistem de erori personalizat  

## Structura proiectului  
- `index.js` – serverul principal, configurări rute, erori, galerii și produse  
- `db.js` – conexiunea la baza de date PostgreSQL  
- `create-table.js` – script pentru crearea tabelelor  
- `seed.sql` / `seed.js` – popularea bazei de date cu date inițiale  
- `views/` – șabloanele EJS (ex: `produse.ejs`, `galerie.ejs`, `produs.ejs`, `admin-db.ejs`)  
- `resurse/` – fișiere CSS, SCSS, JS, imagini și favicon  
- `erori.json` – configurarea erorilor afișate pe site  

## Model de date  
Modelul bazei de date conține următoarele entități principale:  
- **Artist** (nume, prenume, email)  
- **Colectie** (nume)  
- **Categorie** (nume)  
- **Produs** (nume, material, preț, stoc, referință la artist și colecție)  
- **Client** (nume, prenume, email, adresă)  
- **Comandă** (data, adresă livrare)  
- **Comandă_Client** (asociativ)  
- **Produs_Comandă** (asociativ, include cantitate)  
- **Factură** (1:1 cu Comandă)  
- **Recenzie** (legată de Comandă)  

Popularea bazei de date este realizată prin scriptul `seed.sql`, care introduce artiști, colecții, categorii, produse, clienți, comenzi, facturi și recenzii.  

## Funcționalități implementate  

### Public (utilizatori)  
- **Listare produse** din baza de date, cu sortare și filtrare pe categorii  
- **Detalii produs individual** (cu breadcrumb, galerie și specificații)  
- **Galerie statică și animată** cu imagini optimizate  
- **Pagini informative:** Acasă, Despre noi  

### Admin  
- **Interfață Admin DB:** listă tabele, vizualizare coloane și date, sortare, paginare  
- **Consolă SQL** (SELECT-only) pentru interogări directe din browser  
- **Vizualizări SQL:**  
  - `v_produs_simplu` (updatabilă)  
  - `v_produs_complex` (complexă, multi-join)  
- **Rapoarte:**  
  - JOIN pe 3 tabele + 2 condiții  
  - Funcții grup + HAVING  
- **Exemplu de `ON DELETE CASCADE`** demonstrat din interfață (ștergere client → ștergere comenzi asociate)  

### Utilitare  
- **Gestionare erori personalizate** (400, 403, 404 etc.)  
- **Compilare automată SCSS → CSS** la modificări  
- **Procesare imagini** cu `sharp` pentru versiuni optimizate  

## Cum rulezi proiectul  

1. **Instalare dependențe**  
```bash
npm install
```

2. **Creare tabele în PostgreSQL**  
```bash
node create-table.js
```

3. **Populare cu date de test**  
```bash
node seed.js
```

4. **Pornire server**  
```bash
npm start
```

5. **Acces aplicație**  
- Site public: [http://localhost:8080](http://localhost:8080)  
- Admin DB: [http://localhost:8080/admin/db](http://localhost:8080/admin/db)  


## Autor  
**Claudia Cazacu** – Proiect Tehnici Web / Baze de Date  

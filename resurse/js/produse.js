// produse.js - JavaScript pentru filtrare, sortare și funcționalități complete

document.addEventListener('DOMContentLoaded', function() {
    console.log('🔄 Inițializare pagina produse...');
    
    // Referințe către elementele DOM
    const produseGrid = document.getElementById('produse-grid');
    const numarProduseSpan = document.getElementById('numar-produse');
    const totalProduseSpan = document.getElementById('total-produse');
    
    // Inputuri pentru filtrare
    const filtruNume = document.getElementById('filtru-nume');
    const rangePretMin = document.getElementById('range-pret-min');
    const rangePretMax = document.getElementById('range-pret-max');
    const valoarePretMin = document.getElementById('valoare-pret-min');
    const valoarePretMax = document.getElementById('valoare-pret-max');
    const filtruDimensiune = document.getElementById('filtru-dimensiune');
    const radioCuloare = document.querySelectorAll('input[name="culoare"]');
    const checkboxLivrare = document.getElementById('disponibil-livrare');
    const filtruDescriere = document.getElementById('filtru-descriere');
    const selectPrezentare = document.getElementById('select-prezentare');
    const selectTehnici = document.getElementById('select-tehnici');
    
    // Butoane de acțiune
    const btnFiltreaza = document.getElementById('btn-filtreaza');
    const btnSorteazaAsc = document.getElementById('btn-sorteaza-asc');
    const btnSorteazaDesc = document.getElementById('btn-sorteaza-desc');
    const btnCalculeaza = document.getElementById('btn-calculeaza');
    const btnReseteaza = document.getElementById('btn-reseteaza');
    
    // Starea inițială
    let produsele = [];
    let produseOriginale = [];
    let ordineaInitiala = [];
    
    // ===================================================================
    // INIȚIALIZARE
    // ===================================================================
    
    function initializare() {
        // Colectează toate produsele din DOM
        const produseCards = Array.from(document.querySelectorAll('.produs-card'));
        
        produsele = produseCards.map((card, index) => ({
            element: card,
            id: card.id,
            nume: card.dataset.nume,
            pret: parseInt(card.dataset.pret),
            dimensiune: parseInt(card.dataset.dimensiune),
            culoare: card.dataset.culoare,
            prezentare: card.dataset.prezentare,
            tehnici: card.dataset.tehnici.split(','),
            descriere: card.dataset.descriere,
            livrare: card.dataset.livrare === 'true',
            data: card.dataset.data,
            ordineaInitiala: index
        }));
        
        produseOriginale = [...produsele];
        ordineaInitiala = produsele.map(p => p.ordineaInitiala);
        
        console.log(`✅ Încărcate ${produsele.length} produse`);
        
        // Inițializează valorile range-urilor
        initializeazaRangeuri();
        
        // Adaugă event listenere
        adaugaEventListenere();
        
        // Actualizează contorul inițial
        actualizeazaContor();
    }
    
    function initializeazaRangeuri() {
        // Găsește valorile min și max pentru preț
        const preturi = produsele.map(p => p.pret);
        const pretMin = Math.min(...preturi);
        const pretMax = Math.max(...preturi);
        
        // Setează atributele range-urilor
        rangePretMin.min = pretMin;
        rangePretMin.max = pretMax;
        rangePretMin.value = pretMin;
        
        rangePretMax.min = pretMin;
        rangePretMax.max = pretMax;
        rangePretMax.value = pretMax;
        
        // Actualizează afișajul valorilor
        valoarePretMin.textContent = pretMin;
        valoarePretMax.textContent = pretMax;
        
        // Actualizează valorile min/max în interfață
        document.querySelectorAll('.range-min').forEach(el => el.textContent = pretMin);
        document.querySelectorAll('.range-max')[0].textContent = `${pretMax} (${pretMin} RON)`;
        document.querySelectorAll('.range-max')[1].textContent = `${pretMax} (${pretMax} RON)`;
    }
    
    function adaugaEventListenere() {
        // Event listenere pentru range-uri (actualizare în timp real)
        rangePretMin.addEventListener('input', function() {
            valoarePretMin.textContent = this.value;
            // Asigură-te că min <= max
            if (parseInt(this.value) > parseInt(rangePretMax.value)) {
                rangePretMax.value = this.value;
                valoarePretMax.textContent = this.value;
            }
        });
        
        rangePretMax.addEventListener('input', function() {
            valoarePretMax.textContent = this.value;
            // Asigură-te că min <= max
            if (parseInt(this.value) < parseInt(rangePretMin.value)) {
                rangePretMin.value = this.value;
                valoarePretMin.textContent = this.value;
            }
        });
        
        // Event listenere pentru butoane
        btnFiltreaza.addEventListener('click', filtreazaProduse);
        btnSorteazaAsc.addEventListener('click', () => sorteazaProduse('asc'));
        btnSorteazaDesc.addEventListener('click', () => sorteazaProduse('desc'));
        btnCalculeaza.addEventListener('click', calculeazaPretMediu);
        btnReseteaza.addEventListener('click', reseteazaFiltre);
    }
    
    // ===================================================================
    // VALIDARE INPUTURI
    // ===================================================================
    
    function valideazaInputuri() {
        const erori = [];
        
        // Validează inputul de nume (nu trebuie să conțină doar cifre)
        const numeValue = filtruNume.value.trim();
        if (numeValue && /^\d+$/.test(numeValue)) {
            erori.push('Numele produsului nu poate conține doar cifre');
            filtruNume.style.borderColor = '#f44336';
        } else {
            filtruNume.style.borderColor = '';
        }
        
        // Validează descrierea (nu trebuie să fie goală dacă este completată)
        const descriereValue = filtruDescriere.value.trim();
        if (filtruDescriere.value && descriereValue.length < 3) {
            erori.push('Căutarea în descriere trebuie să aibă cel puțin 3 caractere');
            filtruDescriere.style.borderColor = '#f44336';
        } else {
            filtruDescriere.style.borderColor = '';
        }
        
        // Validează dimensiunea (trebuie să fie o opțiune validă)
        const dimensiuneValue = filtruDimensiune.value;
        if (dimensiuneValue && !['0-30', '31-60', '61-100', '101+'].includes(dimensiuneValue)) {
            erori.push('Selectați o dimensiune validă din listă');
            filtruDimensiune.style.borderColor = '#f44336';
        } else {
            filtruDimensiune.style.borderColor = '';
        }
        
        return erori;
    }
    
    function afiseazaErori(erori) {
        if (erori.length > 0) {
            const mesaj = 'Erori de validare:\\n\\n' + erori.join('\\n');
            alert(mesaj);
            return false;
        }
        return true;
    }
    
    // ===================================================================
    // FILTRARE PRODUSE
    // ===================================================================
    
    function filtreazaProduse() {
        console.log('🔍 Începe filtrarea...');
        
        // Validează inputurile
        const erori = valideazaInputuri();
        if (!afiseazaErori(erori)) {
            return;
        }
        
        // Obține valorile filtrelor
        const filtreActive = {
            nume: filtruNume.value.trim().toLowerCase(),
            pretMin: parseInt(rangePretMin.value),
            pretMax: parseInt(rangePretMax.value),
            dimensiune: filtruDimensiune.value,
            culoare: document.querySelector('input[name="culoare"]:checked')?.value || '',
            livrare: checkboxLivrare.checked,
            descriere: filtruDescriere.value.trim().toLowerCase(),
            prezentare: selectPrezentare.value,
            tehnici: Array.from(selectTehnici.selectedOptions).map(opt => opt.value)
        };
        
        console.log('📋 Filtre active:', filtreActive);
        
        // Filtrează produsele
        const produseFiltrate = produsele.filter(produs => {
            // Filtru nume (cu suport pentru wildcards)
            if (filtreActive.nume) {
                if (!aplicaFiltruNume(produs.nume, filtreActive.nume)) {
                    return false;
                }
            }
            
            // Filtru preț
            if (produs.pret < filtreActive.pretMin || produs.pret > filtreActive.pretMax) {
                return false;
            }
            
            // Filtru dimensiune
            if (filtreActive.dimensiune) {
                if (!aplicaFiltruDimensiune(produs.dimensiune, filtreActive.dimensiune)) {
                    return false;
                }
            }
            
            // Filtru culoare
            if (filtreActive.culoare && filtreActive.culoare !== produs.culoare) {
                return false;
            }
            
            // Filtru livrare
            if (filtreActive.livrare && !produs.livrare) {
                return false;
            }
            
            // Filtru descriere
            if (filtreActive.descriere) {
                if (!produs.descriere.includes(filtreActive.descriere)) {
                    return false;
                }
            }
            
            // Filtru mod prezentare
            if (filtreActive.prezentare && filtreActive.prezentare !== produs.prezentare) {
                return false;
            }
            
            // Filtru tehnici (trebuie să aibă cel puțin una dintre tehnicile selectate)
            if (filtreActive.tehnici.length > 0) {
                const areTehnicaSelectata = filtreActive.tehnici.some(tehnica => 
                    produs.tehnici.some(prodTehnica => prodTehnica.trim() === tehnica)
                );
                if (!areTehnicaSelectata) {
                    return false;
                }
            }
            
            return true;
        });
        
        // Afișează rezultatele
        afiseazaProduse(produseFiltrate);
        
        console.log(`✅ Filtrare completă: ${produseFiltrate.length} produse găsite`);
    }
    
    function aplicaFiltruNume(numeProdu, filtruNume) {
        const pattern = filtruNume.toLowerCase();
        
        // Verifică dacă este pattern cu wildcard (*)
        if (pattern.includes('*')) {
            const parts = pattern.split('*');
            if (parts.length === 2) {
                const [start, end] = parts;
                return numeProdu.startsWith(start) && numeProdu.endsWith(end);
            }
        }
        
        // Căutare normală
        return numeProdu.includes(pattern);
    }
    
    function aplicaFiltruDimensiune(dimensiuneProdu, filtruDimensiune) {
        switch (filtruDimensiune) {
            case '0-30':
                return dimensiuneProdu >= 0 && dimensiuneProdu <= 30;
            case '31-60':
                return dimensiuneProdu >= 31 && dimensiuneProdu <= 60;
            case '61-100':
                return dimensiuneProdu >= 61 && dimensiuneProdu <= 100;
            case '101+':
                return dimensiuneProdu > 100;
            default:
                return true;
        }
    }
    
    // ===================================================================
    // SORTARE PRODUSE
    // ===================================================================
    
    function sorteazaProduse(directie) {
        console.log(`🔄 Sortare ${directie}...`);
        
        // Validează inputurile
        const erori = valideazaInputuri();
        if (!afiseazaErori(erori)) {
            return;
        }
        
        // Obține produsele vizibile
        const produseVizibile = produsele.filter(p => !p.element.classList.contains('ascuns'));
        
        // Sortează după nume (cheia 1) și lungimea descrierii (cheia 2)
        produseVizibile.sort((a, b) => {
            // Prima cheie: numele
            let comparareNume = a.nume.localeCompare(b.nume, 'ro');
            
            if (directie === 'desc') {
                comparareNume = -comparareNume;
            }
            
            // Dacă numele sunt egale, sortează după lungimea descrierii
            if (comparareNume === 0) {
                let comparareDescriere = a.descriere.length - b.descriere.length;
                
                if (directie === 'desc') {
                    comparareDescriere = -comparareDescriere;
                }
                
                return comparareDescriere;
            }
            
            return comparareNume;
        });
        
        // Reordonează elementele în DOM
        produseVizibile.forEach((produs, index) => {
            produseGrid.appendChild(produs.element);
        });
        
        console.log(`✅ Sortare ${directie} completă pentru ${produseVizibile.length} produse`);
    }
    
    // ===================================================================
    // CALCULARE PREȚ MEDIU
    // ===================================================================
    
    function calculeazaPretMediu() {
        console.log('🧮 Calculare preț mediu...');
        
        // Obține produsele vizibile
        const produseVizibile = produsele.filter(p => !p.element.classList.contains('ascuns'));
        
        if (produseVizibile.length === 0) {
            alert('Nu există produse vizibile pentru calculare!');
            return;
        }
        
        // Calculează prețul mediu
        const sumaPreturi = produseVizibile.reduce((suma, produs) => suma + produs.pret, 0);
        const pretMediu = Math.round(sumaPreturi / produseVizibile.length);
        
        // Calculează și alte statistici
        const preturi = produseVizibile.map(p => p.pret);
        const pretMin = Math.min(...preturi);
        const pretMax = Math.max(...preturi);
        
        // Creează elementul de afișare
        const divCalcul = document.createElement('div');
        divCalcul.className = 'calcul-rezultat';
        divCalcul.innerHTML = `
            <i class="fa-solid fa-calculator"></i>
            <div><strong>Statistici preț (${produseVizibile.length} produse)</strong></div>
            <div>Preț mediu: <strong>${pretMediu} RON</strong></div>
            <div>Minim: ${pretMin} RON | Maxim: ${pretMax} RON</div>
        `;
        
        // Adaugă la pagină
        document.body.appendChild(divCalcul);
        
        // Șterge după 2 secunde
        setTimeout(() => {
            if (divCalcul.parentNode) {
                divCalcul.parentNode.removeChild(divCalcul);
            }
        }, 2000);
        
        console.log(`✅ Calculare completă: ${pretMediu} RON (din ${produseVizibile.length} produse)`);
    }
    
    // ===================================================================
    // RESETARE FILTRE
    // ===================================================================
    
    function reseteazaFiltre() {
        console.log('🔄 Resetare filtre...');
        
        // Confirmă resetarea
        const confirmare = confirm('Sigur doriți să resetați toate filtrele și să reveniți la afișarea inițială?');
        
        if (!confirmare) {
            console.log('❌ Resetare anulată de utilizator');
            return;
        }
        
        // Resetează toate inputurile
        filtruNume.value = '';
        filtruNume.style.borderColor = '';
        
        rangePretMin.value = rangePretMin.min;
        rangePretMax.value = rangePretMax.max;
        valoarePretMin.textContent = rangePretMin.min;
        valoarePretMax.textContent = rangePretMax.max;
        
        filtruDimensiune.value = '';
        filtruDimensiune.style.borderColor = '';
        
        // Resetează radio buttons (selectează primul - "orice culoare")
        if (radioCuloare.length > 0) {
            radioCuloare[0].checked = true;
        }
        
        checkboxLivrare.checked = false;
        
        filtruDescriere.value = '';
        filtruDescriere.style.borderColor = '';
        
        selectPrezentare.selectedIndex = 0;
        
        // Resetează select multiplu
        for (let option of selectTehnici.options) {
            option.selected = false;
        }
        
        // Afișează toate produsele în ordinea inițială
        produsele.forEach(produs => {
            produs.element.classList.remove('ascuns');
        });
        
        // Reordonează în ordinea inițială
        const produseOrdonateInitial = [...produsele].sort((a, b) => a.ordineaInitiala - b.ordineaInitiala);
        produseOrdonateInitial.forEach(produs => {
            produseGrid.appendChild(produs.element);
        });
        
        // Actualizează contorul
        actualizeazaContor();
        
        console.log('✅ Filtre resetate și produse reordonate în starea inițială');
    }
    
    // ===================================================================
    // FUNCȚII UTILITARE
    // ===================================================================
    
    function afiseazaProduse(produseFiltrate) {
        // Ascunde toate produsele
        produsele.forEach(produs => {
            produs.element.classList.add('ascuns');
        });
        
        // Afișează doar produsele filtrate
        produseFiltrate.forEach(produs => {
            produs.element.classList.remove('ascuns');
        });
        
        // Actualizează contorul
        actualizeazaContor(produseFiltrate.length);
    }
    
    function actualizeazaContor(numarVizibil = null) {
        const numarAfisate = numarVizibil !== null ? numarVizibil : produsele.filter(p => !p.element.classList.contains('ascuns')).length;
        const totalProduse = produsele.length;
        
        if (numarProduseSpan) {
            numarProduseSpan.textContent = numarAfisate;
        }
        
        if (totalProduseSpan) {
            totalProduseSpan.textContent = totalProduse;
        }
    }
    
    // ===================================================================
    // FUNCȚII PENTRU INTERACȚIUNI SUPLIMENTARE
    // ===================================================================
    
    // Funcție pentru afișarea detaliilor rapide la hover
    function adaugaHoverEffects() {
        document.querySelectorAll('.produs-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = '';
            });
        });
    }
    
    // Funcție pentru căutare în timp real (opțională)
    function adaugaCautareTimReal() {
        let timeoutId;
        
        filtruNume.addEventListener('input', function() {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                if (this.value.length >= 2 || this.value.length === 0) {
                    filtreazaProduse();
                }
            }, 300); // Așteaptă 300ms după ce utilizatorul a terminat de tastat
        });
    }
    
    // ===================================================================
    // INIȚIALIZARE FINALĂ
    // ===================================================================
    
    // Pornește aplicația
    initializare();
    adaugaHoverEffects();
    
    // Opțional: adaugă căutare în timp real
    // adaugaCautareTimReal();
    
    console.log('✅ Pagina produse inițializată complet cu toate funcționalitățile');
});
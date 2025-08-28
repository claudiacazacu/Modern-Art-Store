// produs.js - JavaScript pentru pagina produsului individual

document.addEventListener('DOMContentLoaded', function() {
    console.log('🔄 Inițializare pagina produs individual...');
    
    // Referințe către elementele DOM
    const imaginePrincipala = document.getElementById('imagine-mare');
    const miniature = document.querySelectorAll('.miniatura');
    const modalZoom = document.getElementById('modal-zoom');
    const modalImg = document.getElementById('modal-img');
    const modalCaption = document.getElementById('modal-caption');
    const closeModal = document.querySelector('.close-modal');
    
    // Butoane de acțiune
    const btnAdaugaCos = document.getElementById('btn-adauga-cos');
    const btnListaDointe = document.getElementById('btn-lista-dointe');
    const btnShare = document.getElementById('btn-share');
    
    // ===================================================================
    // GALERIA DE IMAGINI
    // ===================================================================
    
    // Funcționalitate pentru schimbarea imaginii principale
    miniature.forEach(miniatura => {
        miniatura.addEventListener('click', function() {
            // Elimină clasa activă de la toate miniaturile
            miniature.forEach(m => m.classList.remove('activa'));
            
            // Adaugă clasa activă la miniatura curentă
            this.classList.add('activa');
            
            // Schimbă imaginea principală
            if (imaginePrincipala) {
                imaginePrincipala.src = this.src;
                imaginePrincipala.alt = this.alt;
            }
        });
    });
    
    // ===================================================================
    // MODAL PENTRU ZOOM IMAGINE
    // ===================================================================
    
    // Deschide modalul la click pe imaginea principală
    if (imaginePrincipala) {
        imaginePrincipala.addEventListener('click', function() {
            if (modalZoom && modalImg && modalCaption) {
                modalZoom.classList.add('activ');
                modalImg.src = this.src;
                modalCaption.textContent = this.alt;
                document.body.style.overflow = 'hidden'; // Previne scroll-ul
            }
        });
    }
    
    // Închide modalul
    function inchideModal() {
        if (modalZoom) {
            modalZoom.classList.remove('activ');
            document.body.style.overflow = ''; // Restabilește scroll-ul
        }
    }
    
    // Event listenere pentru închiderea modalului
    if (closeModal) {
        closeModal.addEventListener('click', inchideModal);
    }
    
    if (modalZoom) {
        modalZoom.addEventListener('click', function(e) {
            if (e.target === this) {
                inchideModal();
            }
        });
    }
    
    // Închide modalul cu ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            inchideModal();
        }
    });
    
    // ===================================================================
    // BUTOANE DE ACȚIUNE
    // ===================================================================
    
    // Butonul "Adaugă în coș"
    if (btnAdaugaCos) {
        btnAdaugaCos.addEventListener('click', function() {
            // Simulează adăugarea în coș
            const produsNume = document.querySelector('.produs-header h1')?.textContent || 'Produs';
            const produsPreț = document.querySelector('.pret-principal')?.textContent || 'Preț necunoscut';
            
            // Creează notificare de succes
            afiseazaNotificare(`✅ "${produsNume}" a fost adăugat în coș!`, 'success');
            
            // Animație pentru buton
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            console.log(`Produs adăugat în coș: ${produsNume} - ${produsPreț}`);
        });
    }
    
    // Butonul "Lista de dorințe"
    if (btnListaDointe) {
        btnListaDointe.addEventListener('click', function() {
            const produsNume = document.querySelector('.produs-header h1')?.textContent || 'Produs';
            
            // Verifică dacă produsul este deja în lista de dorințe (simulat prin localStorage)
            const listaDointe = JSON.parse(localStorage.getItem('listaDointe') || '[]');
            const produsId = window.location.pathname.split('/').pop();
            
            if (listaDointe.includes(produsId)) {
                // Elimină din lista de dorințe
                const indexProdus = listaDointe.indexOf(produsId);
                listaDointe.splice(indexProdus, 1);
                localStorage.setItem('listaDointe', JSON.stringify(listaDointe));
                
                this.innerHTML = '<i class="fa-regular fa-heart"></i> Adaugă la dorințe';
                this.classList.remove('btn-warning');
                this.classList.add('btn-secondary');
                
                afiseazaNotificare(`💔 "${produsNume}" a fost eliminat din lista de dorințe`, 'info');
            } else {
                // Adaugă în lista de dorințe
                listaDointe.push(produsId);
                localStorage.setItem('listaDointe', JSON.stringify(listaDointe));
                
                this.innerHTML = '<i class="fa-solid fa-heart"></i> În lista de dorințe';
                this.classList.remove('btn-secondary');
                this.classList.add('btn-warning');
                
                afiseazaNotificare(`💖 "${produsNume}" a fost adăugat în lista de dorințe!`, 'success');
            }
            
            console.log(`Lista de dorințe actualizată:`, listaDointe);
        });
    }
    
    // Butonul "Distribuie"
    if (btnShare) {
        btnShare.addEventListener('click', function() {
            const produsNume = document.querySelector('.produs-header h1')?.textContent || 'Produs';
            const currentUrl = window.location.href;
            
            // Verifică dacă browser-ul suportă Web Share API
            if (navigator.share) {
                navigator.share({
                    title: `ArtModern - ${produsNume}`,
                    text: `Descoperă această operă de artă minunată: ${produsNume}`,
                    url: currentUrl
                }).then(() => {
                    afiseazaNotificare('📤 Produs distribuit cu succes!', 'success');
                }).catch((error) => {
                    console.log('Eroare la distribuire:', error);
                    copiazaLinkInClipboard(currentUrl, produsNume);
                });
            } else {
                // Fallback: copiază link-ul în clipboard
                copiazaLinkInClipboard(currentUrl, produsNume);
            }
        });
    }
    
    // ===================================================================
    // FUNCȚII UTILITARE
    // ===================================================================
    
    function afiseazaNotificare(mesaj, tip = 'info') {
        // Creează elementul de notificare
        const notificare = document.createElement('div');
        notificare.className = `notificare notificare-${tip}`;
        notificare.innerHTML = `
            <div class="notificare-content">
                <span class="notificare-mesaj">${mesaj}</span>
                <button class="notificare-close">&times;</button>
            </div>
        `;
        
        // Adaugă stiluri inline pentru notificare
        Object.assign(notificare.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            zIndex: '2000',
            minWidth: '300px',
            maxWidth: '500px',
            padding: '15px 20px',
            borderRadius: '12px',
            color: 'white',
            fontWeight: 'bold',
            boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease',
            fontSize: '0.95rem'
        });
        
        // Culori pe baza tipului
        const culori = {
            success: 'linear-gradient(135deg, #4caf50, #66bb6a)',
            info: 'linear-gradient(135deg, #2196f3, #42a5f5)',
            warning: 'linear-gradient(135deg, #ff9800, #ffb74d)',
            error: 'linear-gradient(135deg, #f44336, #ef5350)'
        };
        
        notificare.style.background = culori[tip] || culori.info;
        
        // Stilizează conținutul
        const content = notificare.querySelector('.notificare-content');
        Object.assign(content.style, {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '15px'
        });
        
        // Stilizează butonul de închidere
        const closeBtn = notificare.querySelector('.notificare-close');
        Object.assign(closeBtn.style, {
            background: 'rgba(255,255,255,0.3)',
            border: 'none',
            borderRadius: '50%',
            width: '25px',
            height: '25px',
            cursor: 'pointer',
            color: 'white',
            fontSize: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        });
        
        // Adaugă la pagină
        document.body.appendChild(notificare);
        
        // Animație de intrare
        setTimeout(() => {
            notificare.style.transform = 'translateX(0)';
        }, 100);
        
        // Funcție de eliminare
        function eliminaNotificare() {
            notificare.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notificare.parentNode) {
                    notificare.parentNode.removeChild(notificare);
                }
            }, 300);
        }
        
        // Event listener pentru butonul de închidere
        closeBtn.addEventListener('click', eliminaNotificare);
        
        // Elimină automat după 4 secunde
        setTimeout(eliminaNotificare, 4000);
    }
    
    function copiazaLinkInClipboard(url, produsNume) {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(url).then(() => {
                afiseazaNotificare(`📋 Link-ul către "${produsNume}" a fost copiat în clipboard!`, 'success');
            }).catch(() => {
                afiseazaFallbackShare(url);
            });
        } else {
            afiseazaFallbackShare(url);
        }
    }
    
    function afiseazaFallbackShare(url) {
        // Creează un modal simplu pentru share
        const modalShare = document.createElement('div');
        modalShare.innerHTML = `
            <div class="modal-share-overlay">
                <div class="modal-share-content">
                    <h3>Distribuie acest produs</h3>
                    <div class="share-url-container">
                        <input type="text" value="${url}" readonly class="share-url-input">
                        <button class="share-copy-btn">Copiază</button>
                    </div>
                    <div class="share-buttons">
                        <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}" target="_blank" class="share-btn facebook">
                            <i class="fa-brands fa-facebook"></i> Facebook
                        </a>
                        <a href="https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}" target="_blank" class="share-btn twitter">
                            <i class="fa-brands fa-twitter"></i> Twitter
                        </a>
                        <a href="https://wa.me/?text=${encodeURIComponent(url)}" target="_blank" class="share-btn whatsapp">
                            <i class="fa-brands fa-whatsapp"></i> WhatsApp
                        </a>
                    </div>
                    <button class="modal-close-btn">Închide</button>
                </div>
            </div>
        `;
        
        // Stilizează modalul
        const overlay = modalShare.querySelector('.modal-share-overlay');
        Object.assign(overlay.style, {
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: '3000'
        });
        
        const content = modalShare.querySelector('.modal-share-content');
        Object.assign(content.style, {
            backgroundColor: 'white',
            padding: '30px',
            borderRadius: '15px',
            maxWidth: '500px',
            width: '90%',
            textAlign: 'center'
        });
        
        document.body.appendChild(modalShare);
        
        // Event listenere pentru modal
        const copyBtn = modalShare.querySelector('.share-copy-btn');
        const urlInput = modalShare.querySelector('.share-url-input');
        const closeBtn = modalShare.querySelector('.modal-close-btn');
        
        copyBtn.addEventListener('click', () => {
            urlInput.select();
            document.execCommand('copy');
            afiseazaNotificare('📋 Link copiat în clipboard!', 'success');
        });
        
        closeBtn.addEventListener('click', () => {
            document.body.removeChild(modalShare);
        });
        
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                document.body.removeChild(modalShare);
            }
        });
    }
    
    // ===================================================================
    // INIȚIALIZARE COMPONENTE
    // ===================================================================
    
    function initializeazaListaDointe() {
        // Verifică dacă produsul curent este în lista de dorințe
        if (btnListaDointe) {
            const listaDointe = JSON.parse(localStorage.getItem('listaDointe') || '[]');
            const produsId = window.location.pathname.split('/').pop();
            
            if (listaDointe.includes(produsId)) {
                btnListaDointe.innerHTML = '<i class="fa-solid fa-heart"></i> În lista de dorințe';
                btnListaDointe.classList.remove('btn-secondary');
                btnListaDointe.classList.add('btn-warning');
            }
        }
    }
    
    function adaugaAnimatiiHover() {
        // Animații pentru spec-items
        document.querySelectorAll('.spec-item').forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.style.backgroundColor = 'var(--color-light)';
                this.style.transform = 'translateX(5px)';
                this.style.transition = 'all 0.3s ease';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.backgroundColor = '';
                this.style.transform = '';
            });
        });
        
        // Animații pentru badge-urile de tehnici
        document.querySelectorAll('.tehnica-badge').forEach(badge => {
            badge.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.05) rotate(2deg)';
                this.style.transition = 'all 0.3s ease';
            });
            
            badge.addEventListener('mouseleave', function() {
                this.style.transform = '';
            });
        });
    }
    
    function adaugaKeyboardNavigation() {
        // Navigare cu tastatura pentru galeria de imagini
        document.addEventListener('keydown', function(e) {
            if (modalZoom && modalZoom.classList.contains('activ')) {
                return; // Nu procesează dacă modalul este deschis
            }
            
            const activeMiniatura = document.querySelector('.miniatura.activa');
            if (!activeMiniatura) return;
            
            const toateMiniatura = Array.from(document.querySelectorAll('.miniatura'));
            const indexCurrent = toateMiniatura.indexOf(activeMiniatura);
            
            let nouIndex = -1;
            
            switch(e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    nouIndex = indexCurrent > 0 ? indexCurrent - 1 : toateMiniatura.length - 1;
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    nouIndex = indexCurrent < toateMiniatura.length - 1 ? indexCurrent + 1 : 0;
                    break;
            }
            
            if (nouIndex !== -1) {
                toateMiniatura[nouIndex].click();
            }
        });
    }
    
    // ===================================================================
    // INIȚIALIZARE FINALĂ
    // ===================================================================
    
    // Pornește toate componentele
    initializeazaListaDointe();
    adaugaAnimatiiHover();
    adaugaKeyboardNavigation();
    
    console.log('✅ Pagina produs individual inițializată complet');
    
    // Log pentru debugging
    console.log('📊 Elemente găsite:', {
        imaginePrincipala: !!imaginePrincipala,
        miniature: miniature.length,
        modalZoom: !!modalZoom,
        btnAdaugaCos: !!btnAdaugaCos,
        btnListaDointe: !!btnListaDointe,
        btnShare: !!btnShare
    });
});
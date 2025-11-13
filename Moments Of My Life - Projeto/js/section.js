document.addEventListener('DOMContentLoaded', function() {
    // --- Configuração dos Álbuns de Imagens ---
    const albums = {
        baby: {
            images: [
                '../imgs/Baby-me.jpeg', 
                '../imgs/inthebeach.jpeg',
                '../imgs/Birthday.jpeg',
            ]
        },
        child: {
            images: [
                '../imgs/Newme.png', 
                '../imgs/kid2.jpeg',
                '../imgs/meandmydog.jpeg',
            ]
        },
        preteen: {
        
            images: [
                '../imgs/praia.jpeg', 
           
            ]
        },
        today: {
            images: [
                '../imgs/ana.jpeg', 
            
            ]
        }
    };



    // --- Elementos do Modal de Álbuns (Grade de Thumbnails) ---
    const galleryItems = document.querySelectorAll('.gallery-item');
    const albumModal = document.getElementById('album-modal');
    const albumTitle = document.getElementById('album-title');
    const albumImagesContainer = document.getElementById('album-images-container');
    const closeBtnAlbum = albumModal ? albumModal.querySelector('.close-btn') : null;

    // --- Elementos do Lightbox de Imagem Única (Tela Cheia) ---
    // NOVO: Selecionando o elemento que você adicionou acima
    const singleImageLightbox = document.getElementById('single-image-lightbox');
    const singleImageImg = document.getElementById('single-image-img');
    const closeBtnSingle = document.querySelector('.close-btn-single');

    if (!albumModal || !closeBtnAlbum || !singleImageLightbox || !closeBtnSingle) return; 
    
    
    // ===========================================
    // FUNÇÕES DO LIGHTBOX DE IMAGEM ÚNICA
    // ===========================================
    
    function openSingleImageLightbox(imageSrc) {
        singleImageLightbox.style.display = 'flex';
        singleImageImg.src = imageSrc;
    }

    function closeSingleImageLightbox() {
        singleImageLightbox.style.display = 'none';
        singleImageImg.src = ''; // Limpa a imagem
    }
    
    // ===========================================
    // FUNÇÕES DO MODAL DE ÁLBUM (GRADE)
    // ===========================================

    function openAlbumModal(albumName) {
        const albumData = albums[albumName];
        if (!albumData) return;

        albumTitle.textContent = albumData.title; 
        albumImagesContainer.innerHTML = ''; 

        albumData.images.forEach(imageSrc => {
            const imgElement = document.createElement('img');
            imgElement.src = imageSrc;
            imgElement.alt = albumData.title + ' image';
            albumImagesContainer.appendChild(imgElement);

            // ** NOVO LISTENER AQUI **
            // Ao clicar na miniatura, chama a função de tela cheia
            imgElement.addEventListener('click', function() {
                openSingleImageLightbox(imageSrc);
            });
        });

        albumModal.style.display = 'flex'; 
    }

    function closeAlbumModal() {
        albumModal.style.display = 'none';
        albumImagesContainer.innerHTML = ''; 
    }

    // ===========================================
    // LISTENERS DE CLIQUE INICIAL
    // ===========================================

    // Listener para abrir o Modal de Álbum (1º clique)
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const albumName = this.dataset.album; 
            if (albumName) {
                openAlbumModal(albumName);
            }
        });
    });


    closeBtnAlbum.addEventListener('click', closeAlbumModal);
    albumModal.addEventListener('click', function(e) {
        if (e.target === albumModal) { 
            closeAlbumModal();
        }
    });
    
    // Fechamento do LIGHTBOX DE IMAGEM ÚNICA
    closeBtnSingle.addEventListener('click', closeSingleImageLightbox);
    singleImageLightbox.addEventListener('click', function(e) {
        if (e.target === singleImageLightbox) { 
            closeSingleImageLightbox();
        }
    });

    // Fechamento pela tecla ESC (para ambos)
    document.addEventListener('keydown', function(e) {
        if (e.key === "Escape") {
            if (singleImageLightbox.style.display === 'flex') {
                closeSingleImageLightbox();
            } else if (albumModal.style.display === 'flex') {
                closeAlbumModal();
            }
        }
    });
});

imgElement.addEventListener('click', function() {
    openSingleImageLightbox(imageSrc); // Isso abre a tela cheia
    
    // Verifique se você adicionou o código para forçar o tamanho máximo
    if (imageSrc.includes('Newme.png')) {
        singleImageImg.style.maxWidth = '100%'; 
        singleImageImg.style.maxHeight = '100vh';
    }
});
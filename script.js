document.addEventListener('DOMContentLoaded', () => {
    const mainImage = document.getElementById('main-image');
    const splashScreen = document.getElementById('splash-screen');

    // Função para fazer a transição do Splash para a Imagem
    function hideSplash() {
        // Ativa o fade-in da imagem principal
        mainImage.classList.add('loaded');
        // Ativa o fade-out do ecrã de logo
        splashScreen.classList.add('hidden');
    }

    // Se a imagem já estiver no cache e carregada
    if (mainImage.complete) {
        setTimeout(hideSplash, 800); // Mantém pelo menos 800ms para o utilizador ver o logo
    } else {
        // Se ainda estiver a carregar, espera o evento de load
        mainImage.addEventListener('load', () => {
            setTimeout(hideSplash, 500);
        });
    }
});

// Bloqueios de segurança contra interações indesejadas
document.body.addEventListener('touchmove', function(e) {
    if (e.touches.length > 1) {
        e.preventDefault();
    }
}, { passive: false });

// Registo do Service Worker para PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(reg => console.log('PWA Pronto!', reg.scope))
            .catch(err => console.log('Erro no PWA:', err));
    });
}
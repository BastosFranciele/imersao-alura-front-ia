const botoes = document.querySelectorAll('.profile-link');

botoes.forEach(botao => {
    botao.addEventListener('click', function(event) {
        event.preventDefault(); // Segura o envio imediato
        
        const genero = this.getAttribute('data-genero');
        localStorage.setItem('generoSelecionado', genero);
        
        console.log("Gênero salvo: " + genero);
        
        // Agora sim, redireciona manualmente para a nova página
        window.location.href = 'estante.html';
    });
});

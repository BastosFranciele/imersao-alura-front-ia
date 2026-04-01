/*script-estante.js - para inserir capas de livros e booktrailers*/


document.addEventListener('DOMContentLoaded', () => {
    const generoAlvo = localStorage.getItem('generoSelecionado');
    const tituloPagina = document.getElementById('titulo-genero');

    // 1. BANCO DE DADOS - AQUI VOCÊ PODE ADICIONAR OU REMOVER LIVROS, BASTA SEGUIR O PADRÃO DE PROPRIEDADES: 
    
    const bibliotecaBookflix = [
        { 
            title: "Krystallo - Jornadas para Além das Fronteiras", 
            author: "Raphael Fraemam", 
            category: "Fantasia Contemporânea", 
            rating: 5, 
            cover: "assets/krystallo.jpg",
            trailer: "https://www.youtube-nocookie.com/embed/busoMcgOSnk"
        },
        { 
            title: "Harry Potter e a Pedra Filosofal - Edição Ilustrada", 
            author: "J. K. Rowling", 
            category: "Fantasia Infantojuvenil", 
            rating: 4, 
            cover: "assets/harry-potter-e-a-pedra-filosofal.jpg",
            trailer: "https://www.youtube-nocookie.com/embed/_GkErSdhv8c"
        },
        { 
            title: "De Repente Ester", 
            author: "Kell Carvalho", 
            category: "Romance Cristão", 
            rating: 5, 
            cover: "assets/de-repente-ester.jpg",
            trailer: "https://www.youtube-nocooki.com/embed/4vUzQA_jSBI"
        },
        { 
            title: "98,8% de Compatibilidade", 
            author: "Lyla Mars", 
            category: "Romance Contemporâneo", 
            rating: 4, 
            cover: "assets/98-de-compatibilidade.jpg",
            trailer: "https://www.youtube-nocooki.com/embed/kY8Bek1JNj4"
        },
        { 
            title: "Nunca Minta", 
            author: "Freida McFadden", 
            category: "suspense", 
            rating: 5, 
            cover: "assets/nunca-minta.jpg",
            trailer: "https://www.youtube-nocookie.com/embed/di2UGHxr45E"
        },
        { 
            title: "O Desaparecimento de Stephanie Mailer", 
            author: "Joël Dicker", 
            category: "suspense", 
            rating: 4, 
            cover: "assets/desaparecimento-de-stephanie-mailer.jpg",
            trailer: "https://www.youtube-nocookie.com/embed/8SD813Aky6M"
        },
        { 
            title: "Orgulho e Preconceito", 
            author: "Jane Austen", 
            category: "Clássicos / Literatura Inglesa", 
            rating: 5, 
            cover: "assets/orgulho-e-preconceito.jpg",
            trailer: "https://www.youtube-nocookie.com/embed/EoAsKKNgEW4"
        },
        { 
            title: "Crime e Castigo", 
            author: "Fiódor Dostoiévski", 
            category: "Clássicos / Literatura Russa", 
            rating: 5, 
            cover: "assets/crime-e-castigo.jpg",
            trailer: "https://www.youtube-nocookie.com/embed/PGknbNvm4sU"
        }
    ];

        // LÓGICA DE FILTRO UNIFICADA (para que apareçam os livros quando clicar nos gêneros)
        if (generoAlvo) {
    const formatado = generoAlvo.charAt(0).toUpperCase() + generoAlvo.slice(1);
    tituloPagina.innerText = "Estante de " + formatado;

    const livrosFiltrados = bibliotecaBookflix.filter(livro => {
        const cat = livro.category.toLowerCase();
        const alvo = generoAlvo.toLowerCase();

        // 1. REGRA PARA ROMANCE (Exclui o que for Fantasia/Romantasy)
        if (alvo === 'romance') {
            return cat.includes('romance') && !cat.includes('fantasy') && !cat.includes('fantasia') && !cat.includes('romantasy');
        }
        
        // 2. REGRA PARA CLÁSSICOS (Trata o acento se necessário)
        if (alvo === 'classicos') {
            return cat.includes('classicos') || cat.includes('clássicos');
        }

        // 3. REGRA PARA FANTASIA (Garante que pegue tanto 'fantasia' quanto 'fantasy')
        if (alvo === 'fantasia') {
            return cat.includes('fantasia') || cat.includes('fantasy') || cat.includes('romantasy');
        }

        // 4. REGRA GERAL (Para Thriller e outros)
        // O includes(alvo) vai achar "Thriller" dentro de "Thriller Psicológico"
        if (alvo === 'thriller') {
        return cat.includes('thriller') || cat.includes('suspense');
        }
    });

    // Envia a lista filtrada para ser desenhada na tela
    exibirLivros(livrosFiltrados);
    }
});

//2. FUNÇÃO DE EXIBIÇÃO DE TRAILER (gatilho de passar o mouse na capa, o trailer é exibido)

function exibirLivros(lista) {
    const container = document.getElementById('container-livros');
    
    if (lista.length === 0) {
        container.innerHTML = `<p style="color: #a78bfa; margin-top: 50px;">Nenhum livro encontrado.</p>`;
        return;
    }

    container.innerHTML = lista.map((livro, index) => `
    <figure class="livro-card" data-trailer="${livro.trailer}" data-index="${index}">
        <div class="media-container">
            <img src="${livro.cover}" alt="Capa de ${livro.title}" class="livro-capa">
            <div class="trailer-container"></div>
        </div>
        <figcaption class="livro-info">
            <h3>${livro.title}</h3>
            <p>${livro.author}</p>
            <span>${"⭐".repeat(Math.floor(livro.rating))}</span>
        </figcaption>
    </figure>
`).join('');

// Adiciona os eventos depois de criar os cards
document.querySelectorAll('.livro-card').forEach(card => {
    card.addEventListener('mouseenter', () => playTrailer(card, card.dataset.trailer));
    card.addEventListener('mouseleave', () => stopTrailer(card));
});

}

// 3. NOVAS FUNÇÕES - Controles do trailer (adicione ao final do arquivo)
function playTrailer(card, trailerUrl) {
    const trailerDiv = card.querySelector('.trailer-container');
    // Parâmetros para autoplay, mudo (obrigatório para autoplay), sem controles e em loop
    const videoId = trailerUrl.split('/').pop();
    const urlFinal = `${trailerUrl}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&playlist=${videoId}&loop=1`;
    
    trailerDiv.innerHTML = `<iframe src="${urlFinal}" frameborder="0" allow="autoplay; encrypted-media"></iframe>`;
    trailerDiv.style.opacity = "1";
}

function stopTrailer(card) {
    const trailerDiv = card.querySelector('.trailer-container');
    trailerDiv.innerHTML = ""; // Remove o vídeo para parar o som e processamento
    trailerDiv.style.opacity = "0";
}
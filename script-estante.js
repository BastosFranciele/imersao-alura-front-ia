/*script.js atual tem a função de "escutar" os cliques nos perfis e salvar os dados. 
O script-estante.js terá a função de "ler" esses dados e montar a lista de livros. Se você colocar tudo num arquivo só, 
o navegador vai tentar procurar os botões de perfil na página da estante (onde eles não existem) e vai gerar erros no console.*/

document.addEventListener('DOMContentLoaded', () => {
    const generoAlvo = localStorage.getItem('generoSelecionado');
    const tituloPagina = document.getElementById('titulo-genero');

    // 1. BANCO DE DADOS - AQUI VOCÊ PODE ADICIONAR OU REMOVER LIVROS, BASTA SEGUIR O PADRÃO DE PROPRIEDADES: 
    // (title, author, category, rating, cover)
    const bibliotecaBookflix = [
        { 
            title: "Krystallo - Jornadas para Além das Fronteiras", 
            author: "Raphael Fraemam", 
            category: "Fantasia Contemporânea", 
            rating: 5, 
            cover: "/assets/Krystallo.jpg" 
        },
        { 
            title: "Harry Potter e a Pedra Filosofal - Edição Ilustrada", 
            author: "J. K. Rowling", 
            category: "Fantasia Infantojuvenil", 
            rating: 4, 
            cover: "/assets/harry-potter-e-a-pedra-filosofal.jpg"
        },
        { 
            title: "De Repente Ester", 
            author: "Kell Carvalho", 
            category: "Romance Cristão", 
            rating: 5, 
            cover: "/assets/de-repente-ester.jpg" 
        },
        { 
            title: "98,8% de Compatibilidade", 
            author: "Lyla Mars", 
            category: "Romance Contemporâneo", 
            rating: 4, 
            cover: "/assets/98-de-compatibilidade.jpg" 
        },
        { 
            title: "Nunca Minta", 
            author: "Freida McFadden", 
            category: "suspense", 
            rating: 5, 
            cover: "/assets/nunca-minta.jpg" 
        },
        { 
            title: "O Desaparecimento de Stephanie Mailer", 
            author: "Joël Dicker", 
            category: "suspense", 
            rating: 4, 
            cover: "/assets/desaparecimento-de-stephanie-mailer.jpg" 
        },
        { 
            title: "Orgulho e Preconceito", 
            author: "Jane Austen", 
            category: "Clássicos / Literatura Inglesa", 
            rating: 5, 
            cover: "/assets/orgulho-e-preconceito.jpg" 
        },
        { 
            title: "Crime e Castigo", 
            author: "Fiódor Dostoiévski", 
            category: "Clássicos / Literatura Russa", 
            rating: 5, 
            cover: "/assets/crime-e-castigo.jpg" 
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

// 3. FUNÇÃO DE EXIBIÇÃO (O HTML é gerado aqui!)
function exibirLivros(lista) {
    const container = document.getElementById('container-livros');
    
    if (lista.length === 0) {
        container.innerHTML = `<p style="color: #a78bfa; margin-top: 50px;">Nenhum livro encontrado.</p>`;
        return;
    }

    container.innerHTML = lista.map(livro => `
        <figure class="livro-card">
            <img src="${livro.cover}" alt="Capa de ${livro.title}" class="livro-capa">
            <figcaption class="livro-info">
                <h3>${livro.title}</h3>
                <p>${livro.author}</p>
                <span>${"⭐".repeat(Math.floor(livro.rating))}</span>
            </figcaption>
        </figure>
    `).join('');
}
document.querySelectorAll('.lingua_individual').forEach(item => {
    item.addEventListener('click', function() {
        document.querySelectorAll('#descricao-linguas p').forEach(p => p.style.display = 'none');
        const lingua = item.getAttribute('data-lingua');
        const desc = document.getElementById('desc-'+ lingua)
        if (desc) {
            desc.style.display = 'flex';
            typeWriter('desc-'+ lingua, desc.textContent, 60);
        }})
    }
);

function typeWriter(elementId, text, speed = 40, callback) {
    const el = document.getElementById(elementId);
    el.textContent = "";
    let i = 0;
    function type() {
        if (i < text.length) {
            el.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else if (callback) {
            callback();
        }
    }
    type();
}

document.addEventListener('DOMContentLoaded', function() {
    typeWriter('typed_nome', 'João Santos', 70, function() {
        typeWriter('typed-text', 'Bem-vindo ao meu site pessoal! Aqui encontrará informações sobre mim, as minhas qualidades e como entrar em contato.', 30, function() {
            typeWriter('typed_text1', 'Sinta-se à vontade para explorar!', 30);
        });
    });
});

const projetos = [
    { img: "/Image/soon.webp", titulo: "Projeto 1" },
    { img: "/Image/soon.webp", titulo: "Projeto 2" },
    { img: "/Image/soon.webp", titulo: "Projeto 3" },
    // Adicione mais projetos aqui
];

let current = 0;

function updateCarousel() {
    // Imagem principal
    document.getElementById('main-project-img').src = projetos[current].img;
    document.getElementById('main-project-img').alt = projetos[current].titulo;
    document.getElementById('main-project-title').textContent = projetos[current].titulo;

    // Imagem atrás à esquerda
    const leftIdx = (current - 1 + projetos.length) % projetos.length;
    document.getElementById('left-img').src = projetos[leftIdx].img;
    document.getElementById('left-img').alt = projetos[leftIdx].titulo;

    // Imagem atrás à direita
    const rightIdx = (current + 1) % projetos.length;
    document.getElementById('right-img').src = projetos[rightIdx].img;
    document.getElementById('right-img').alt = projetos[rightIdx].titulo;
}

document.querySelector('.arrow.left').onclick = function() {
    current = (current - 1 + projetos.length) % projetos.length;
    updateCarousel();
};
document.querySelector('.arrow.right').onclick = function() {
    current = (current + 1) % projetos.length;
    updateCarousel();
};

updateCarousel();

const btnContacto = document.getElementById('btn-contacto');
const formContacto = document.getElementById('form-contacto');
const backdrop = document.getElementById('form-contacto-backdrop');

btnContacto.addEventListener('click', function() {
    const isVisible = formContacto.style.display === 'block';
    formContacto.style.display = isVisible ? 'none' : 'block';
    backdrop.style.display = isVisible ? 'none' : 'block';
    if (!isVisible) {
        window.scrollTo({top: 0, behavior: 'smooth'});
    }
});

// Fechar ao clicar no fundo escurecido
backdrop.addEventListener('click', function() {
    formContacto.style.display = 'none';
    backdrop.style.display = 'none';
});

document.querySelectorAll('.arrow').forEach(btn => {
    btn.addEventListener('mouseup', function() {
        btn.blur();
    });
});

// Função para enviar o formulário
function enviarFormulario(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    // Obter os valores dos campos
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const mensagem = document.getElementById('mensagem').value;

    // Validar campos (exemplo simples)
    if (!nome || !email || !mensagem) {
        return alert('Por favor, preencha todos os campos.');
    }

    // Enviar dados para o servidor
    fetch('https://portfolio-joao-santos.onrender.com/enviar-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            nome: nome,
            email: email,
            mensagem: mensagem
        })
    })
    .then(response => response.json())
    .then(data => alert(data.mensagem))
    .catch(error => alert('Erro ao enviar: ' + error.message));
}

// Adicionar listener ao formulário
formContacto.addEventListener('submit', enviarFormulario);

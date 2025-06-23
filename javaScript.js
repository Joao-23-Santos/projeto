let intervalo_tempoID;
const cores = ['rgb(83, 13, 83)', 'rgb(13, 83, 83)', 'rgb(83, 83, 13)', 'rgb(13, 13, 83)'];

document.querySelectorAll('.nav_li').forEach(li => {
    let step = 0;
    li.addEventListener('mouseenter', function() {
        const link = li.querySelector('a');
        intervalo_tempoID = setInterval(() => {
            link.style.backgroundColor = cores[step % cores.length];
            step++;
        }, 700);
    });
    li.addEventListener('mouseleave', function() {
        clearInterval(intervalo_tempoID);
        const link = li.querySelector('a');
        link.style.backgroundColor = '';
        step = 0;
    });
});

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

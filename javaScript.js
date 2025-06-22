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

const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const listaBotoes = document.querySelectorAll('.app__card-button');
const comecarContagemBt = document.querySelector('#start-pause');

const contagemBtTexto = document.querySelector('#start-pause span');
const contagemIcon = document.querySelector('.app__card-primary-butto-icon');

const timer = document.querySelector('#timer');

const imagem = document.querySelector('.app__image');
const texto = document.querySelector('.app__title');
const strong = document.querySelector('.app__title-strong');

const alternadorSom = document.querySelector('#alternar-musica');
alternadorSom.checked = false;

const musica = new Audio("/sons/luna-rise-part-one.mp3");
musica.loop = true;


let focoTimer = 1500;
let curtoTimer = 300;
let longoTimer = 900;


let tempoDecorridoSegundos = focoTimer;
let intervaloId = null;

let contexto = 'foco';



focoBt.addEventListener('click', ()=>{
    contexto = 'foco'
    alterarContexto(contexto)
    focoBt.classList.add('active')
});

curtoBt.addEventListener('click', ()=>{
    contexto = 'descanso-curto'
    alterarContexto(contexto)
    curtoBt.classList.add('active')
});

longoBt.addEventListener('click', ()=>{
    contexto = 'descanso-longo'
    alterarContexto(contexto)
    longoBt.classList.add('active')
});

alternadorSom.addEventListener('change', ()=>{
    if(musica.paused){
        musica.volume = 0.4;
        musica.play();
    }else{
        musica.pause();
    }
})

function alterarContexto(contexto){
    listaBotoes.forEach(function(contexto){
        contexto.classList.remove('active');
    });
    html.setAttribute('data-contexto', contexto);
    imagem.setAttribute('src', `/imagens/${contexto}.png`);
    
    switch (contexto) {
        case 'foco':
            tempoDecorridoSegundos = focoTimer
            texto.innerHTML = `Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>`
            
            break;
        case 'descanso-longo':
            tempoDecorridoSegundos = longoTimer
            texto.innerHTML = `Hora de voltar à superfície.<br>
                <strong class="app__title-strong">Faça uma pausa longa.</strong>`

            break;

        case 'descanso-curto':
            tempoDecorridoSegundos = curtoTimer
            texto.innerHTML = `Que tal dar uma respirada?<br>
                <strong class="app__title-strong">Faça uma pausa curta!</strong>`    
        
    }
    mostrarTempo();
}

const audioComecarContagem = new Audio("/sons/play.wav");
const audioContagemFinalizada = new Audio("/sons/beep.mp3");
const audioContagemPausada = new Audio("/sons/pause.mp3");

const contagemRegressiva = () =>{
    if(tempoDecorridoSegundos <= 0){
        zerar()
        audioContagemFinalizada.play();
        setTimeout(()=>{
            audioContagemFinalizada.pause();
            audioContagemFinalizada.currentTime = 0;
        }, 1000)
        alert('Tempo finalizado!');
        contagemBtTexto.innerHTML = `Começar`
        alterarContexto(contexto)
        return
    }
    tempoDecorridoSegundos -= 1;
    mostrarTempo();
}

comecarContagemBt.addEventListener('click', () =>{
    if(intervaloId){
        audioContagemPausada.play();
    }else{
        audioComecarContagem.play();
    }
    iniciarPausarContagem();
});

function iniciarPausarContagem(){
    if(intervaloId){
        zerar()
        return
    }
    intervaloId = setInterval(contagemRegressiva, 1000);
    contagemBtTexto.innerHTML = `<strong>Pausar</strong>`
    mudarIcon('pause')

}

function zerar(){
    clearInterval(intervaloId)
    intervaloId = null;
    contagemBtTexto.innerHTML = `<strong>Começar</strong>`
    mudarIcon('play_arrow')
}

function mudarIcon(contexto){
    contagemIcon.setAttribute('src', `imagens/${contexto}.png`)
}

function mostrarTempo(){
    const tempo = new Date(tempoDecorridoSegundos * 1000)//parametro = milisegundos
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'})
    timer.innerHTML = `${tempoFormatado}`
}

mostrarTempo();


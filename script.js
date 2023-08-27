const html = document.querySelector("html");

const focobtn = document.querySelector(".app__card-button--foco");
const curtobtn = document.querySelector(".app__card-button--curto");
const longobtn = document.querySelector(".app__card-button--longo");
const botoes = document.querySelectorAll(".app__card-button");
const botaoComecar = document.querySelector("#start-pause");

const banner = document.querySelector(".app__image");

const title = document.querySelector(".app__title");

const inputMusic = document.getElementById("alternar-musica");
const musica = new Audio("./sons/luna-rise-part-one.mp3");
musica.loop = true;

const temporizadorPlay = new Audio("./sons/play.wav");
const temporizadorPause = new Audio("./sons/pause.mp3");
const temporizadorFim = new Audio("./sons/beep.mp3");

const iniciarText = document.querySelector("#start-pause span");
const iniciarTextIcon = document.querySelector(".app__card-primary-butto-icon");
const tempoNaTela = document.querySelector("#timer");

let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;

focobtn.addEventListener("click", () => {
  tempoDecorridoEmSegundos = 1500;
  alterarContexto("foco");
  focobtn.classList.add("active");
});

curtobtn.addEventListener("click", () => {
  tempoDecorridoEmSegundos = 300;
  alterarContexto("descanso-curto");
  curtobtn.classList.add("active");
});

longobtn.addEventListener("click", () => {
  tempoDecorridoEmSegundos = 900;
  alterarContexto("descanso-longo");

  longobtn.classList.add("active");
});

inputMusic.addEventListener("change", () => {
  if (musica.paused) {
    musica.play();
  } else musica.pause();
});

function alterarContexto(contexto) {
  mostrarTemporizador();
  html.setAttribute("data-contexto", contexto);
  banner.setAttribute("src", `./imagens/${contexto}.png`);
  botoes.forEach(function (contexto) {
    contexto.classList.remove("active");
  });

  switch (contexto) {
    case "foco":
      title.innerHTML = `Otimize sua produtividade,<br />
      <strong class="app__title-strong">mergulhe no que importa.</strong>`;
      break;
    case "descanso-curto":
      title.innerHTML = `Que tal dar uma respirada?<br />
    <strong class="app__title-strong">Faça uma pausa curta!</strong>`;
      break;
    case "descanso-longo":
      title.innerHTML = `Hora de voltar a superfície.<br />
      <strong class="app__title-strong">Faça uma pausa longa.</strong>`;
      break;
    default:
      break;
  }
}

const contagemRegressiva = () => {
  if (tempoDecorridoEmSegundos <= 0) {
    temporizadorFim.play();
    zerar();
    return;
  }

  tempoDecorridoEmSegundos -= 1;
  console.log(tempoDecorridoEmSegundos);
  mostrarTemporizador();
};

botaoComecar.addEventListener("click", iniciarOuPausar);

function mostrarTemporizador() {
  const tempo = new Date(tempoDecorridoEmSegundos * 1000);
  const tempoFormatado = tempo.toLocaleTimeString("pt-br", {
    minute: "2-digit",
    second: "2-digit",
  });
  tempoNaTela.innerHTML = `${tempoFormatado}`;
}

function iniciarOuPausar() {
  if (intervaloId) {
    temporizadorPause.play();
    iniciarText.textContent = "Começar";
    iniciarTextIcon.setAttribute("src", "./imagens/play_arrow.png");

    zerar();

    return;
  } else {
    temporizadorPlay.play();
    iniciarText.textContent = "Pausar";
    iniciarTextIcon.setAttribute("src", "./imagens/pause.png");

    intervaloId = setInterval(contagemRegressiva, 1000);
  }
}

function zerar() {
  clearInterval(intervaloId);

  intervaloId = null;
}

console.log(contagemRegressiva);

mostrarTemporizador();

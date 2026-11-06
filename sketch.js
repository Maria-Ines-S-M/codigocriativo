let modo = "menu";
let pautaY = 200;
let espacamentoLinhas = 12;

// Hino da Alegria
let melodia = [
  //Linha 1
  ['e', 'e', 'f', 'g', 'g', 'f', 'e', 'd', 'c', 'c', 'd', 'e', 'e', 'd', 'd'],
  //Linha 2
  ['e', 'e', 'f', 'g', 'g', 'f', 'e', 'd', 'c', 'c', 'd', 'e', 'd', 'c', 'c'],
  //Linha 3
  ['d', 'd', 'e', 'c', 'd', 'e', 'f', 'e', 'c', 'd', 'e', 'f', 'e', 'd', 'c', 'd', 'g'],
  //Linha 4
  ['e', 'e', 'f', 'g', 'g', 'f', 'e', 'd', 'c', 'c', 'd', 'e', 'd', 'c', 'c']
];

let linhaAtual = 0;
let indiceNotaAtual = 0;
let musicaCompleta = false;

let notasPossiveis = ['c', 'd', 'e', 'f', 'g', 'a', 'b'];
let notaQuiz = '';
let feedbackQuiz = "Qual é esta nota na pauta?";
let corFeedback = [50, 50, 50];
let pontuacaoQuiz = 0;
let totalTentativas = 0;

let osc;

let frequencias = {
  'c': 261.63,
  'd': 293.66,
  'e': 329.63,
  'f': 349.23,
  'g': 392.00,
  'a': 440.00,
  'b': 493.88
};

let cores = {
  'c' : [150, 80, 255],
  'd' : [255, 150, 50],
  'e' : [240, 220, 50],
  'f' : [80, 150, 255],
  'g' : [255, 80, 80],
  'a' : [255, 100, 200],
  'b' : [80, 200, 120]
};

function setup() {
  let cnv = createCanvas(900, 650);
  let x = (windowWidth - width) / 2;
  let y = (windowHeight - height) / 2;
  cnv.position(x, y);

  osc = new p5.Oscillator('sine');
  osc.start();
  osc.amp(0);

  gerarNovaNotaQuiz();
}

function draw() {
  background(245);
  
  if (modo === "menu") {
    desenharMenu();
  } else if (modo === "melodia") {
    desenharModoMelodia();
  } else if (modo === "quiz") {
    desenharModoQuiz();
  }
}

//Menu
function desenharMenu() {
  textAlign(CENTER);
  textSize(28);
  fill(50);
  text("Aprende Música com o Hino da Alegria", width / 2, 170);

  textSize(16);
  fill(100);
  text("Escolha um modo de Quiz:", width / 2, 220);

  fill(70, 130, 180);
  rect(width / 2 - 220, 265, 440, 50, 8);
  rect(width / 2 - 220, 335, 440, 50, 8);

  fill(255);
  textSize(15);
  text("Pressiona [ 1 ] - Modo Melodia Hino da Alegria", width / 2, 296);
  text("Pressiona [ 2 ] - Modo Quiz de Notas Musicais", width / 2, 366);

  textSize(12);
  fill(140);
  text("Usa a tecla [ESC] para voltar ao menu a qualquer momento.", width / 2, 470);
  }

  //Modo Melodia
  function desenharModoMelodia() {
    textAlign(CENTER);
    textSize(18);
    fill(40);
    text("Modo Melodia - Hino da Alegria" , width / 2, 35);

    textSize(12);
    fill(100);
    text("Usa o teclado (C, D, E, F, G, A, B) para tocar as notas correspondentes na pauta. [ESC] para voltar ao menu.", width / 2, 55);

    let espacamentoLinhasPauta = 10;
    let yInicial = 110;
    let alturaBloco = 120;

    for (let r = 0; r < melodia.length; r++) {
      let staffY = yInicial + (r * alturaBloco);
      desenharPauta(staffY, espacamentoLinhasPauta);
      desenharNotasDaLinha(r, staffY);
    }

    if (musicaCompleta) {
      textSize(20);
      fill(46, 204, 113);
      text("PARABENSSSSSSSS! Concluiste a paartitura inteira com sucesso!", width / 2, 610);
      }
   }

   // Modo Quiz
   function desenharModoQuiz() {
    textAlign(CENTER);
    textSize(18);
    fill(40);
    text("Modo Quiz - Notas Musicais" , width / 2, 35);

    textSize(12);
    fill(100);
    text("Identifica a nota musical na paauta e prime a tecla correspondente (C, D, E, F, G, A, B). [ESC] para voltar ao menu.", width / 2, 55);

    let quizStaffY =320;
    let dQuiz = 12;
    desenharPauta(quizStaffY, dQuiz);

    let xNota = width / 2;
    let yNota = calcularPosicaoYQuiz(notaQuiz, quizStaffY, dQuiz);

    //Dó
    if (notaQuiz ==='c') {
      stroke(120);
      strokeWeight(1);
      line(xNota - 12, quizStaffY + dQuiz, xNota + 12, quizStaffY + dQuiz);
      noStroke();
    }

    fill(corFeedback [0], corFeedback[1], corFeedback[2]);
    stroke(0);
    strokeWeight(2);
    ellipse(xNota, yNota, 18, 14);
    noStroke();

    textSize(16);
    fill(60);
    text(`Pontuação: ${pontuacaoQuiz} / ${totalTentativas}`, width / 2, 460);

    textSize(18);
    fill(corFeedback [0], corFeedback[1], corFeedback[2]);
    text(feedbackQuiz, width / 2, 510);
  }

  //

  function desenharPauta(staffY, d) {
    stroke(160);
    strokeWeight(1);

    for (let i = 0; i < 5; i++) {
      let y = staffY - (i * d);
      line(70, y, width - 50, y);
    }

    noStroke();
    fill(50);
    textSize(42);
    text("𝄞", 78, (staffY - d) + 8);
    }

    function desenharNotasDaLinha(r, staffY) {
      let inicioX = 140;
      let espacamentoX = 42;
      let notasDaLinha = melodia[r];

      for (let i = 0; i < notasDaLinha.length; i++) {
        let nota = notasDaLinha[i];
        let x = inicioX + (i * espacamentoX);
        let y = calcularPosicaoY (nota, staffY);

        if (nota === 'c') {
          stroke(120);
        strokeWeight(1);
        let yLedger = staffY + 10;
        line(x - 8, yLedger, x + 8, yLedger);
        noStroke();
      }

      if (r === linhaAtual && i === indiceNotaAtual) {
        let c = cores[nota];
        fill(c[0], c[1], c[2]);
        stroke(0);
        strokeWeight(2);
        ellipse(x, y, 14, 11);
        noStroke();
      } else if (r < linhaAtual || (r === linhaAtual && i < indiceNotaAtual)) {
        let c = cores[nota];
        fill(c[0], c[1], c[2], 100);
        ellipse(x, y, 12, 9);
       } else {
        fill(200);
        ellipse(x, y, 12, 9);
      }

      textSize(10);
      fill(130);
      text(nota.toUpperCase(), x, staffY + 30);
  }
}

function calcularPosicaoY(nota, staffY) {
  let d = 10;
  if (nota === 'c') return staffY + 10;
  if (nota === 'd') return staffY + 5;
  if (nota === 'e') return staffY;
  if (nota === 'f') return staffY - 5;
  if (nota === 'g') return staffY - 10;
  if (nota === 'a') return staffY - 15;
  if (nota === 'b') return staffY - 20;
  return staffY;
  }

  function calcularPosicaoYQuiz(nota, staffY, d) {
    if (nota === 'c') return staffY + d;
  if (nota === 'd') return staffY + (d / 2);
  if (nota === 'e') return staffY;
  if (nota === 'f') return staffY - (d / 2);
  if (nota === 'g') return staffY - d;
  if (nota === 'a') return staffY - (d * 1.5);
  if (nota === 'b') return staffY - (d * 2);
  return staffY;
  }

  function gerarNovaNotaQuiz() {
    notaQuiz = random (notasPossiveis);
    feedbackQuiz = "Qual é esta nota?";
    corFeedback = [80, 80, 80];
  }

  //Teclado
  function mousePressed() {
    userStartAudio();
  }

  function keyPressed() {
    userStartAudio();

    if (keyCode === ESCAPE) {
      modo = "menu";
      return;
     }
     
     if (modo === "menu") {
      if (key === '1' || keyCode === 49) {
        modo = "melodia";
        linhaAtual = 0;
        indiceNotaAtual = 0;
        musicaCompleta = false;
      } else if (key === '2' || keyCode === 50) {
        modo = "quiz";
        pontuacaoQuiz = 0;
        totalTentativas = 0;
        gerarNovaNotaQuiz();
      }
      return;
   }

   let teclaPremida = key.toLowerCase();

   if (frequencias[teclaPremida]) {
    tocaNota(teclaPremida);
  }

  // Modo Melodia
  if (modo === "melodia") {
    if (musicaCompleta) return;

    let notaEsperada = melodia[linhaAtual][indiceNotaAtual];
    if (teclaPremida === notaEsperada) {
      indiceNotaAtual++;
      if (indiceNotaAtual >= melodia[linhaAtual].length) {
        indiceNotaAtual = 0;
        linhaAtual++;
        if (linhaAtual >= melodia.length) {
          musicaCompleta = true;
        }
      }
    }
  }

  //Modo Quiz
  else if (modo === "quiz") {
    if (frequencias[teclaPremida]) {
      totalTentativas++;
      if (teclaPremida === notaQuiz) {
        pontuacaoQuiz++;
        feedbackQuiz = "Correto!"
        corFeedback = [46,204,113];
        setTimeout(gerarNovaNotaQuiz, 1200);
      } else {
        feedbackQuiz = `Incorreto! Pista: cor associada.`;
        corFeedback = cores[notaQuiz];
      }
    }
  }
}

function tocaNota(nota) {
  let freq = frequencias[nota];
  osc.freq(freq);
  osc.amp(0.4, 0.05);

  setTimeout (() => {
    osc.amp(0, 0.1);
    }, 250);
  }

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

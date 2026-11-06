# Interatividade Musical

Com base na pedagogia musical, neste trabalho trabalhei a associação cognitiva através das cores e a prática em forma de quiz.

- Para construir a estrutura gráfica e interativa, utilizei o createCanvas para definir o tamanho da tela que pretendia e usei o cnv.position com (windowWidth - width) / 2 e (windowHeight - height) / 2 para centrar na janela do navegador.
- Para a gestão dos diferentes menus usei o if e else para poder alternar a minha escolha os ecrãs.
- O meu código quando fui para abrir live server não estava a abrir estava sempre a carregar ao que acabei por recorrer ao Gemini porque não encontrava no p5js.org  onde ele me corrigiu alguns erros ortográficos (letras a mais nas palavras) e ainda me mudou o index.html porque a versão que estava do link da biblioteca principal e a versão do link da biblioteca de som faziam interferência e ficava eternamente a carregar 

Para defenir a primeira página usei let modo = "menu"
let pautaY = 200 usei para defenir a posição vertical base e o let espacamentoLinhas = 12 para defenir a disância entre as linhas persentes na pauta musical.
No let melodia, escrevi a melodia do Hino da Alegria onde cada letra (cifra) representa a sua espetiva nota.

osc.start(); e osc.am(0); - Serve para iniciar o som mas começa no 0 para começar em silencio e não soar estranho

## Menu:
function desenharMenu() - Aqui defeni os textos e criei os retangulos de selecção

## Modo Quiz:
- Para fazer o modo Quiz comecei por escrever todas as notas existentes para o Quiz: let notasPossiveis = []
- let feedbackQuiz corresponde ao texto que diz se a resposta está correta ou não
utilizei o let corFeedback para alterar a cor das notas consuante a resposta, predefenidamente a nota é cinzenta mas quando acerto na resposta muda paranverde
- O let pontuacaoQuiz e o let totalTentativas, teem como objetivo marcar a pontuação e as tentativas já jogadas.
- gerarNovaNotaQuiz();: servre para fazer o sorteio aleatorio da nota
- function desenharModoQuiz(): Contem o texto e a pauta; calcularPosicaoYQuiz serve para calcular a posição vertical da proxima nota aleatoria a aparecer.
if (notaQuiz === 'c') serve para desenhar a linha caso a nota seja Dó 
- utilizei a função random(notasPossiveis) para sortear notas aleatórias, totalTentativas e pontuacaoQuiz para contabilizar o progresso, e a função setTimeout para aguardar antes de gerar uma nova pergunta após uma resposta correta

## Modo Melodia:
Como este modo serve para treinar o sitio das notas com a ajuda da associação de cor e som. Usei o let frequencias, para defenir a cada nota o seu respetivo som e o let cores para defenir as cores que queria associar a cada nota.
- function desenharModoMelodia(): Este modo tal como os outros modos também serviu para escrerver os textos presentes dentro dele e para criar a pauta; Utilizei o for para evitar repetição pois eram 4 colunas de pauta 
https://p5js.org/tutorials/variables-and-change/

## Outras Funções:
- function desenharPauta(staffY, d): Serve para desenhar as 5 lihas da pauta em todas as pautas sem ter de estar a repetir código, e para colocar a Clave de Sol exatamente em cima da segunda linha.
- function desenharNotasDaLinha(r, staffY): Calcula as coordenadas e desenha a linha do Dó.
- Tive de ir buscar a net o simbolo "𝄞" porque não tinha no teclado

## Teclado:
- Tive de utilizar o function mousePressed() porque o audio não estava a arrancar e esta função faz executar o userStarAudio()
- https://p5js.org/reference/p5/constants/ESCAPE/
- https://p5js.org/es/reference/p5/code/
- Para gerir os controlos do teclado, utilizei a função keyPressed. Usei a propriedade key.toLowerCase() para detetar as teclas de A a G, o keyCode === ESCAPE para voltar ao menu e as teclas '1' e '2' para alternar entre os modos de jogo.
- https://editor.p5js.org/chjno/sketches/Hkm84o6FW

### Referencias: 
    https://p5js.org/reference/p5/setup/
https://p5js.org/reference/p5/draw/
https://p5js.org/reference/p5.Element/position/
https://p5js.org/reference/p5/p5.Element/
    https://p5js.org/reference/p5/line/
https://p5js.org/reference/p5/ellipse/
https://p5js.org/reference/p5/rect/
https://p5js.org/reference/p5/fill/
https://p5js.org/reference/p5/stroke/
https://p5js.org/reference/p5/noStroke/
https://p5js.org/reference/p5/strokeWeight/
    https://p5js.org/reference/p5/text/
https://p5js.org/reference/p5/textSize/
https://p5js.org/reference/p5/textAlign/
    https://p5js.org/reference/p5/keyPressed/
https://p5js.org/reference/p5/mousePressed/
https://p5js.org/reference/p5/key/
https://p5js.org/reference/p5/keyCode/
https://p5js.org/reference/p5/constants/ESCAPE/
    https://p5js.org/reference/p5/random/
    https://p5js.org/reference/p5.sound/p5.Oscillator/
https://p5js.org/reference/p5.p5soundSource/start/
https://p5js.org/reference/p5.Oscillator/freq/
https://editor.p5js.org/yin_yu/sketches/rfKuPVYyl
https://p5js.org/reference/p5.sound/
https://p5js.org/reference/p5.p5soundNode/amp/
https://p5js.org/reference/p5/userStartAudio/

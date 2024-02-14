let listaDeNumerosSorteados = [];
let cicloDeNumerosSorteados = 1;
let numeroLimite = Math.round(Math.random()*50) + 1;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;
document.querySelector('input').max = numeroLimite;

function exibirTextoNaTela(tag, texto) {
  let campo = document.querySelector(tag);
  campo.innerHTML = texto;
  responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function exibirMensagemInicial() {
  exibirTextoNaTela('h1', 'Jogo do número secreto');
  exibirTextoNaTela('p', `Escolha um número entre 1 e ${numeroLimite}`);
  exibirTextoNaTela('sub', `${cicloDeNumerosSorteados}ª rodada. Faltam ${numeroLimite - listaDeNumerosSorteados.length + 1} números para próxima rodada.`);
}

exibirMensagemInicial();

function verificarChute() {
  let chute = document.querySelector('input').value;
  if (chute == numeroSecreto) {
    exibirTextoNaTela('h1', numeroLimite==listaDeNumerosSorteados.length?'Você completou a rodada!':'Acertou!');
    let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
    let mensagemTentativas = `Você descobriu o número secreto (${numeroSecreto}) com ${tentativas} ${palavraTentativa}!`;
    exibirTextoNaTela('p', mensagemTentativas);
    limparCampo();
    document.getElementById('chutar').setAttribute('disabled', '');
    document.getElementById('reiniciar').removeAttribute('disabled');
  } else {
    if (chute > numeroSecreto) {
      exibirTextoNaTela('p', 'O número secreto é menor');
    } else {
      exibirTextoNaTela('p', 'O número secreto é maior');
    }
    tentativas ++;
    limparCampo();
  }
}

function gerarNumeroAleatorio() {
  let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
  let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

  if (quantidadeDeElementosNaLista == numeroLimite) {
    listaDeNumerosSorteados = [];
    cicloDeNumerosSorteados ++;
  }

  if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
    return gerarNumeroAleatorio();
  } else {
    listaDeNumerosSorteados.push(numeroEscolhido);
    return numeroEscolhido;
  };
}

function limparCampo() {
  chute = document.querySelector('input');
  chute.value = '';
}

function reiniciarJogo() {
  numeroSecreto = gerarNumeroAleatorio();
  limparCampo();
  tentativas = 1;
  exibirMensagemInicial();
  document.getElementById('chutar').removeAttribute('disabled');
  document.getElementById('reiniciar').setAttribute('disabled', '');
}

function instrucoes() {
  let texto = `Instruções do Jogo\n\nAcerte números aleatórios entre 1 e ${numeroLimite} que este número sairá da lista.\nQuando completar todos os ${numeroLimite} números, uma nova rodada irá iniciar.\nCuidado porque atualizando a página zera o placar.\nNo Google Chrome, este jogo possui recursos de fala.\nVocê pode habilitar apertando o botão allow, ou o aceito que aparecer em sua tela.`;
  responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
  alert(texto);
}

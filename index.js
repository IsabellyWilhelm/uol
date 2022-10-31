let getmensagem= axios(
    "https://mock-api.driven.com.br/api/v6/uol/messages"
  );
  let postmensagem;
  let buscadeusuario;
  let buscadestatus;
  const Chat = document.querySelector(".bate-papo");
  let input = document.querySelector("input");
  let usuario;
  let login = () => {
    usuario = {
      name: prompt("Qual é o seu nome?"),
    };
    buscadeusuario = axios.post(
        "https://mock-api.driven.com.br/api/v6/uol/participants",
        usuario
      );
    
      buscadeusuario.catch(login);
      buscadeusuario.then((resposta) => {
        verificar();
      });
    };
    login();
    function postverificacao() {
        buscadestatus = axios.post(
          "https://mock-api.driven.com.br/api/v6/uol/status",
          usuario
        );
        buscadestatus.then((resposta) => {});
        buscadestatus.catch((erro) => {
          window.location.reload();
        });
      }
      function exibirmensagem(resposta) {
        const retorno = resposta.data;
        Chat.innerHTML = "";
        for (let i = 0; i < retorno.length; i++) {
          switch (retorno[i].type) {
            case "status":
              if (retorno[i].text === "entra na sala...") {
                entrar(retorno[i].from, retorno[i].time);
              } else {
                saida(retorno[i].from, retorno[i].time);
              }
              break;
            case "message":
              exibirgeral(
                retorno[i].from,
                retorno[i].time,
                retorno[i].to,
                retorno[i].text
              );
              break;
            case "private_message":
              if (retorno[i].to === usuario) {
                exibirprivada(
                  retorno[i].from,
                  retorno[i].time,
                  retorno[i].to,
                  retorno[i].text
                );
              } else {
              }
              break;
            default:
              console.log(retorno[i].type);
              break;
          }
        }
        const mensagemfinal = document.querySelectorAll(".mensagem");
        mensagemfinal[mensagemfinal.length - 1].scrollIntoView();
      }
      
function espaco(botao) {
  botao.value = "";
}

function entrar(usuariox, time) {
  return (Chat.innerHTML += `<div class="mensagem status" data-identifier="message">
        <span class="horario"> (${time})</span> <span class="usuario">${usuariox}</span>  
        acaba de entrar na sala
        </div>`);
}
function saida(usuariox, time) {
  return (Chat.innerHTML += `<div class="mensagem status" data-identifier="message">
<span class="horario"> (${time}) </span><span class="usuario"> ${usuariox} </span>acaba de sair da sala
  </div>`);
}
function exibirgeral(usuariox, time, destinatario, mensagemx) {
  return (Chat.innerHTML += `<p class="mensagem" data-identifier="message">
  <span class="horario"> (${time}) </span>
  <span class="usuario"> ${usuariox} </span>
  para <span class="destinatario"> ${destinatario} </span>: 
  <span class="texto">${mensagemx}</span> 
  </p>`);
}
function exibirprivada(usuariox, time, destinatario, mensagemx) {
  return (Chat.innerHTML += `<p class="mensagem private" data-identifier="message">
  <span class="horario"> (${time}) </span><span class="usuario"> ${usuariox} </span> para <span> ${destinatario} </span>: <span class="texto">${mensagemx}</span> 
  </p>`);
}

getmensagem.then(exibirmensagem);
function ativarIntervalVerificacao(resposta) {
  setInterval(enviarVerificacao, 4999);
}
setInterval(() => {
  getmensagem = axios(
    "https://mock-api.driven.com.br/api/v6/uol/messages"
  );
  getmensagem.then(exibirmensagem);
}, 3000);

function enviarMsg(botao) {
  const mensagem = document.querySelector("input").value;
  if (mensagem === "") {
    mensagem.valueOf.innerHTML = "Escreva Aqui";
  }}
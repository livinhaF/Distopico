function pesquisar() {
  // Essa função é responsável por buscar os dados e renderizar os resultados na página.
  // Imprime os dados no console para fins de depuração

  // Seleciona a seção onde os resultados serão exibidos
  let section = document.getElementById("resultados-pesquisa");

  let campoPesquisa = document.getElementById("campo-pesquisa").value

  //se campoPesquisa for uma string vazia
  if (campoPesquisa == "") {
    section.innerHTML = "Acesso Negado"
    return //finaliza a execucao, ja que nao tem nada
  }
  campoPesquisa = campoPesquisa.toLowerCase() //entender tanto letras maisculas quantas minusculas
  console.log(campoPesquisa);

  // Inicializa uma string vazia para armazenar os resultados formatados
  let resultados = "";
  let titulo = "";
  let descricao = "";
  //let tags = "";

  // Itera sobre cada elemento (dado) do array de dados
  for (let dado of dados) {
    titulo = dado.titulo.toLocaleLowerCase()
    descricao = dado.descricao.toLocaleLowerCase()
    //tags = dado.tags.toLocaleLowerCase() //incluir no if || tags.includes(campoPesquisa)
    if (titulo.includes(campoPesquisa) ||
      descricao.includes(campoPesquisa)) {
      // Cria um novo elemento
      resultados += `
        <div class="item-resultado">
          <h2>
            <a href=${dado.link} target="_blank">${dado.titulo}</a>
          </h2>
          <p class="descricao-meta">${dado.descricao}</p>
          <a href=${dado.link} target="_blank"></a>
        </div>
      `;
    }
  }
  //se não houver um resultado

  // Se não houver resultados, mostra a tela com códigos caindo
  if (!resultados) {
    // Cria um novo elemento div para a tela preta
    const telaPreta = document.createElement('div');
    telaPreta.classList.add('tela-preta');
    telaPreta.addEventListener('click', fecharTelaPreta)
    document.body.appendChild(telaPreta);
    const tituloAcessoNegado = document.createElement('h1');
    tituloAcessoNegado.classList.add('titulo-acesso-negado');
    tituloAcessoNegado.textContent = 'ACESSO NEGADO';
    telaPreta.appendChild(tituloAcessoNegado);
    // Função para gerar um código aleatório
    function gerarCodigoAleatorio() {
      const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let codigo = '';
      for (let
        i = 0; i < Math.floor(Math.random() * 10) + 5; i++) {
        codigo += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
      }
      return codigo;
    }

    // Função para criar um novo código e animá-lo
    function criarCodigo() {
      const codigo = document.createElement('div');
      codigo.classList.add('codigo');
      codigo.textContent = gerarCodigoAleatorio();
      telaPreta.appendChild(codigo);

      // Animação CSS para a queda do código
      codigo.style.left = `${Math.random() * 100}%`; // Posição aleatória
      // ... outras animações CSS ...
    }

    // Cria códigos continuamente
    setInterval(criarCodigo, 50);
    container.appendChild(telaPreta);
  } else {
    // Se houver resultados, exibe normalmente
    section.innerHTML = resultados;
  }
}
function fecharTelaPreta() {
  telaPreta.remove();
}



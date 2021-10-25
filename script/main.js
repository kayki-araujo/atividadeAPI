// Atribuição dos objetos do DOM para constantes
const form = document.querySelector("form");
const selectEstado = form.querySelector("select[name='estado']");
const selectMunicipio = form.querySelector("select[name='municipio']");

// A função getEstados faz contato com a API que retorna um JSON com todos os estados do Brasil
const getEstados = () => {
    // Cria um objeto XMLHttpRequest para fazer contato com a API
    let request = new XMLHttpRequest();
    
    // Faz a 'Request' para a API atraves do metodo GET
    request.open("GET", "https://brasilapi.com.br/api/ibge/uf/v1", false);
    request.send();
    
    // Converte o arquivo JSON para um objeto do JavaScript
    let data = JSON.parse(request.responseText);
    
    // Ordena os Estados por ordem alfabetica
    data.sort((a, b) => {
        return a.nome.localeCompare(b.nome);
    });
    
    // Retorna o Objeto Ordenado
    return data;
};


// A função getMunicipios recebe como parámetro uma Unidade Federativa, faz contato com a API que retorna um JSON todos os municipios da mesma, e retorna em um objeto
const getMunicipios = (uf) => {
    
    // Cria um objeto XMLHttpRequest para fazer contato com a API
    let request = new XMLHttpRequest();
    
    // Faz a 'Request' para a API atraves do metodo GET
    request.open(
        "GET",
        "https://brasilapi.com.br/api/ibge/municipios/v1/" + uf, // A API recebe a unidade Federativa como parametro,
        false
    );
    request.send();
    
    // Converte o arquivo JSON para um objeto do JavaScript
    let data = JSON.parse(request.responseText);
    
    // Ordena os Municípios por ordem alfabetica
    data.sort((a, b) => {
        return a.nome.localeCompare(b.nome);
    });
    
    // Retorna o Objeto Ordenado
    return data;
};

// O proximo Código é responsavel de fazer a listagem dos estados e adiciona-los ao formulário

// Atribui os Estados a variavel estado e faz um loop por todos seu elementos 
let estados = getEstados();
estados.forEach((estado) => {
    
    // Cria um Elemento 'option' que sera adicionado ao 'select' do formulário 
    let option = document.createElement("option");
    
    // Atribui a sigla do estado como o atributo 'value'
    option.setAttribute("value", estado.sigla);
    
    // Atribui o nome do estado como o texto que ira aparecer no formulário
    option.innerHTML = estado.nome;
    
    // Adiciona o elemento 'option' ao elemento 'select' já com todas as informações do estado
    selectEstado.appendChild(option);
});

// Adiciona um evento de 'change' ao elemento 'select' para estados
// O que significa que o próximo código acontecerá toda vez que o usuário trocar o estado
// O codigo tem a finalidade de alterar os municipios conforme o usuario alterna os estados
selectEstado.addEventListener("change", (e) => {
    
    // Previne que a página de 'reload' 
    e.preventDefault();
    
    // Faz a remoção do atributo 'disabled' do 'select' para municipios
    // Esse código se faz importante apenas da primeira vez que ele é acionado, já que o elemento fica travado até que o usuario coloque um estado
    selectMunicipio.removeAttribute("disabled");
    
    // Troca o 'select' dos municipios por uma mensagem de carregamento, já que o proximo código entrara em contato com a API e pode levar algum tempo
    selectMunicipio.innerHTML = "<option>Carregando...<option>";

    // Atraves da função getMunicipios entra em contato com a API e atribui o objeto dos municipios a variavel municipios
    let uf = selectEstado.value;
    let municipios = getMunicipios(uf);

    // Após o retorno da API remove a mensagem de carregamento do elemento
    selectMunicipio.innerHTML = "";
    
    // Vai fazer um loop por cada municipio do objeto e irá adicionar ao elemento
    municipios.forEach((municipio) => {
        
        // Cria o elemento option
        let option = document.createElement("option");
        
        // Atribui o nome do municipio como valor e o texto do elemento option
        option.setAttribute("value", municipio.nome);
        option.innerHTML = municipio.nome;
        
        // Adiciona o elemento option ao select
        selectMunicipio.appendChild(option);
    });
});

// Adiciona o evento 'submit' ao formulário
// O que significa que o codigo a seguir irá rodar toda vez que o botão submit for pressionado
// O código tem a finalidade de ser um exemplo de uma operação que seria feita com os dados preenchidos
form.addEventListener("submit", (e) => {
    
    // Previne que a pegina faça reload
    e.preventDefault();
    
    // Atribui os campos preenchidos do formulário a variaveis
    let nome = form.querySelector("input[name='nome']").value;
    let estado = selectEstado.value;
    let municipio = selectMunicipio.value;
    
    // Mostra uma mensagem de "bem vindo" com as informações coletadas 
    alert("Bem Vindo " + nome + " de " + municipio + " - " + estado);
});

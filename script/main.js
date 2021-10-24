const form = document.querySelector("form");
const selectEstado = form.querySelector("select[name='estado']");
const selectMunicipio = form.querySelector("select[name='municipio']");

const getEstados = () => {
    let request = new XMLHttpRequest();
    request.open("GET", "https://brasilapi.com.br/api/ibge/uf/v1", false);
    request.send();
    let data = JSON.parse(request.responseText);
    data.sort((a, b) => {
        return a.nome.localeCompare(b.nome);
    });
    return data;
};

const getMunicipios = (uf) => {
    let request = new XMLHttpRequest();
    request.open(
        "GET",
        "https://brasilapi.com.br/api/ibge/municipios/v1/" + uf,
        false
    );
    request.send();
    let data = JSON.parse(request.responseText);
    data.sort((a, b) => {
        return a.nome.localeCompare(b.nome);
    });
    return data;
};

let estados = getEstados();
estados.forEach((estado) => {
    let option = document.createElement("option");
    option.setAttribute("value", estado.sigla);
    option.innerHTML = estado.nome;
    selectEstado.appendChild(option);
});

selectEstado.addEventListener("change", (e) => {
    e.preventDefault();

    selectMunicipio.removeAttribute("disabled");
    selectMunicipio.innerHTML = "<option>Carregando...<option>";

    let uf = selectEstado.value;
    let municipios = getMunicipios(uf);

    selectMunicipio.innerHTML = "";

    municipios.forEach((municipio) => {
        let option = document.createElement("option");
        option.setAttribute("value", municipio.nome);
        option.innerHTML = municipio.nome;
        selectMunicipio.appendChild(option);
    });
});

form.addEventListener("submit", (e) => {
    e.preventDefault();
    let nome = form.querySelector("input[name='nome']").value;
    let estado = selectEstado.value;
    let municipio = selectMunicipio.value;

    alert("Bem Vindo " + nome + " de " + municipio + " - " + estado);
});

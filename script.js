const options = document.querySelector("#escolha_averb");
const divForca = document.querySelector("#div_averb_forca");
const divPrivada = document.querySelector("#div_averb_privada");
options.addEventListener("change", function(event) {
    const selectedOption = event.target.value;
    switch (selectedOption){
        case "sem_averb":
            divForca.style.display = "none";
            divPrivada.style.display = "none";
            break;
        case "apenas_forcas_armadas":
            divForca.style.display = "block";
            divPrivada.style.display = "none";
            break;
        case "apenas_privada":
            divForca.style.display = "none";
            divPrivada.style.display = "block";
            break;
        case "forcas_e_empresas":
            divForca.style.display = "block";
            divPrivada.style.display = "block";
            break;
    }
}); options.dispatchEvent(new Event("change"));

const submitButton = document.querySelector("#button_Formulario");
submitButton.addEventListener("click", function(event) {
    event.preventDefault();
    const respostas = {
        inclusao: document.querySelector("#inclusao")?.value || "",
        genero: document.querySelector("input[name='genero']:checked")?.value || "",
        requerimento: document.querySelector("#requerimento")?.value || "",
        promocao: document.querySelector("#promocao")?.value || "",
        patente: document.querySelector("input[name='patente']:checked")?.value || "",
        escolha_averb: document.querySelector("#escolha_averb")?.value || "",
        averb_forca: {
            ano: document.querySelector("#ano_forcas")?.value || "",
            mes: document.querySelector("#mes_forcas")?.value || "",
            dia: document.querySelector("#dias_forcas")?.value || ""
        },
        averb_privada: {
            ano: document.querySelector("#ano_privada")?.value || "",
            mes: document.querySelector("#mes_privada")?.value || "",
            dia: document.querySelector("#dias_privada")?.value || ""
        }
    };
});
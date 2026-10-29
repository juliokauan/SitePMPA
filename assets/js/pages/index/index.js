const options = document.querySelector("#escolha_averb");
const divForca = document.querySelector("#div_averb_forca");
const divPrivada = document.querySelector("#div_averb_privada");
const tempoforaEscolha = document.querySelectorAll("#div_tempofora_escolha input");
const escolhaSim = document.querySelector("#tempoforaSim");
const divtempoFora = document.querySelector("#div_tempofora");

function verificarSelect(){
    const selecionada = options.value;
    switch (selecionada){
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
}

options.addEventListener("change", verificarSelect);
window.addEventListener("pageshow", verificarSelect);

tempoforaEscolha.forEach((e)=>{
    e.addEventListener("change", ()=>{
        divtempoFora.style.display = escolhaSim.checked ? "block" : "none";
    });
}); escolhaSim.dispatchEvent(new Event("change"));

document.addEventListener("DOMContentLoaded", ()=>{
    document.addEventListener("focusin", (e)=>{
        const target = e.target;
        if (target.tagName === "INPUT" && target.type === "number"){
            if (target.value === '0'){
                target.value = '';
            }
        }
    });
    
    document.addEventListener("focusout", (e)=>{
        const target = e.target;
        if (target.tagName === "INPUT" && target.type === "number"){
            if (target.value === ''){
                target.value = '0';
            }
        }
    })
})

const submitForm = document.querySelector("#formulario");
submitForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const respostas = {
        inclusao: document.querySelector("#inclusao")?.value || "",
        genero: document.querySelector("input[name='genero']:checked")?.value || "",
        requerimento: document.querySelector("#requerimento")?.value || "",
        promocao: document.querySelector("#promocao")?.value || "",
        patente: document.querySelector("input[name='patente']:checked")?.value || "",
        escolhaAverb: document.querySelector("#escolha_averb")?.value || "",
        averbForca: {
            ano: document.querySelector("#ano_forcas")?.value || "",
            mes: document.querySelector("#mes_forcas")?.value || "",
            dia: document.querySelector("#dias_forcas")?.value || ""
        },
        averbPrivada: {
            ano: document.querySelector("#ano_privada")?.value || "",
            mes: document.querySelector("#mes_privada")?.value || "",
            dia: document.querySelector("#dias_privada")?.value || ""
        },
        tempoFora: {
            ano: document.querySelector("#ano_tempofora")?.value || "",
            mes: document.querySelector("#mes_tempofora")?.value || "",
            dia: document.querySelector("#dias_tempofora")?.value || "",
        }
    };
    console.log(respostas);
    const respostasJSON = JSON.stringify(respostas);    
    localStorage.setItem("Respostas", respostasJSON);
    window.location.href = "resposta.html";
});
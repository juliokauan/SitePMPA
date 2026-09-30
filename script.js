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
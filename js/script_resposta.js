
// Elementos da página.
const obtain_respostas = localStorage.getItem("Respostas");
const popupErro = {
    erroFundo: document.querySelector("#fundo_erro"),
    containerErro: document.querySelector("#container_erro"),
    mensagemErro: document.querySelector("#mensagem_erro"),
    botaoFechar: document.querySelector(".botao_X")
}


// Dados
let respostas;
let tempoLei;


//Classes
class Datas{
    constructor({ano = 0, mes = 0, dia = 0} = {}){
        this.ano = Number(ano);
        this.mes = Number(mes);
        this.dia = Number(dia);
    }

    somaData(data){
        let dia = this.dia;
        let mes = this.mes;
        let ano = this.ano;
        
        dia += data.dia;
        while (dia > 30){
            mes++;
            dia -= 30;
        }
        mes += data.mes;
        while (mes > 12){
            ano++;
            mes -= 12;
        }
        ano += data.ano;
        return new Datas({ano, mes, dia});
    }

    subtrairData(data){
        let dia = this.dia;
        let mes = this.mes;
        let ano = this.ano;

        dia -= data.dia;
        while (dia <= 0){
            mes--;
            dia += 30;
        }
        mes -= data.mes;
        while (mes <= 0){
            ano--;
            mes += 12;
        }
        ano -= data.ano;
        return new Datas({ano, mes, dia});
    }
}

//Funções
function temRespostasFaltando(obj){
    return Object.values(obj).some(valor =>{
        if (typeof valor === 'object' && valor !== null){
            return temRespostasFaltando(valor);
        }
        return typeof valor === "string" ? valor.trim() === "": !valor;
    })
}

function Erro_popup(mensagem){
    popupErro.erroFundo.classList.add("fundo_escuro");
    popupErro.containerErro.style.display = "flex";
    popupErro.mensagemErro.textContent = mensagem;
    popupErro.botaoFechar.addEventListener("click", ()=>{
        popupErro.erroFundo.classList.remove("fundo_escuro");
        popupErro.containerErro.style.display = "none";
        popupErro.mensagemErro.textContent = "";
        history.back();
    });
}

function criarData(data){
    if (typeof data === "string" && data.trim() !== "")
    {
        const [ano, mes, dia] = data.split("-").map(Number);
        return new Datas({ano, mes, dia});
    }
    if (typeof data === "object" && data !== null){
        return new Datas(data);
    }
    return null;
}

function transformarDados(respostas){
    respostas.inclusao = criarData(respostas.inclusao);
    respostas.requerimento = criarData(respostas.requerimento);
    respostas.promocao = criarData(respostas.promocao);
    respostas.averb_forca = criarData(respostas.averb_forca);
    respostas.averb_privada = criarData(respostas.averb_privada);
}


// Main
if (obtain_respostas) {
    respostas = JSON.parse(obtain_respostas);
    if (temRespostasFaltando(respostas)){
        Erro_popup("Erro: Faltam campos para preencher.");
    }
    transformarDados(respostas);
    console.log(respostas);
    localStorage.removeItem("Respostas");
}
else {
    Erro_popup("Erro: Respostas não encontrada.");
}
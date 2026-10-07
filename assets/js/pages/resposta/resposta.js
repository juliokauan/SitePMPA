import * as functions from './partials/functions.js'
import Datas from './partials/datasClass.js'

const obtain_respostas = localStorage.getItem("Respostas");
let respostas;
let tempoLei;

if (obtain_respostas) {
    respostas = JSON.parse(obtain_respostas);
    if (functions.temRespostasFaltando(respostas)){
        erroPopup("Erro: Faltam campos para preencher.");
    }
    functions.transformarDados(respostas);
    console.log(respostas);
    localStorage.removeItem("Respostas");
}
else {
    erroPopup("Erro: Respostas não encontrada.");
}
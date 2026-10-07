import { erroPopup } from '../../global/script.js';
import * as functions from './partials/functions.js';
import Datas from './partials/datasClass.js';

const obtain_respostas = localStorage.getItem("Respostas");
let respostas;

if (!obtain_respostas){
    erroPopup("Erro: Resposta não encontada.");
}
else{
    respostas = JSON.parse(obtain_respostas);
    if (functions.temRespostasFaltando(respostas)){
        erroPopup("Erro: Faltam campos a preencer.");
    }
    else{
        respostas = functions.transformarDados(respostas);
        console.log(respostas);
    }
}
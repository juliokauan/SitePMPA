import { erroPopup } from '../../global/script.js';
import * as functions from './partials/functions.js';
import Datas from './partials/datasClass.js';

function lerRespostas(){
    try {
        return JSON.parse(localStorage.getItem("Respostas"));
    } catch{
        return null;
    }
}

const respostas = lerRespostas();

if (!respostas){
    erroPopup("Erro: Resposta não encontada.");
}
else if(functions.temRespostasFaltando(respostas)){
    erroPopup("Erro: Faltam campos a preencer.");
}
else{
    functions.transformarDados(respostas);
    console.log(respostas);
}

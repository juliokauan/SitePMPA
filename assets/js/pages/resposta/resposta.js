import { erroPopup } from '../../global/script.js';
import * as Utils from './partials/functions.js';
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
else if(Utils.temRespostasFaltando(respostas)){
    erroPopup("Erro: Faltam campos a preencer.");
}
else{
    Utils.transformarDados(respostas);
}

console.log(respostas);

let {
        inclusao,
        promocao,
        requerimento, 
        genero, 
        patente,
        escolhaAverb,
        averbForca,
        averbPrivada,
        tempoFora } = respostas;


const tempoGenero = genero == "masculino" ? new Datas(30, 0, 0) : new Datas(25, 0, 0),
      dataLei = new Datas(2022, 1, 1),   
      tempoEfetivo = requerimento.subtrairData(inclusao).somaData(averbForca),
      tempodeServico = tempoEfetivo.somaData(averbPrivada),
      averbTotal = averbForca.somaData(averbPrivada),
      intersticio = requerimento.subtrairData(promocao);

let Resultado = dataLei.subtrairData(inclusao);
Resultado = Resultado.somaData(averbTotal);
Resultado = tempoGenero.subtrairData(Resultado);
const Pedagio = new Datas(0, 0, ()=>{
    return Math.round((Resultado.ano * 365 + Resultado.mes * 30 + Resultado.dia) * 0.17);
})
console.log(Resultado);
console.log(Pedagio);






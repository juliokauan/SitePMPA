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

function temIntersticio(inter, metade){
    if (metade.ano == 3){
        return inter.ano >= 3;
    }
    else if (metade.ano == 2){
        return inter.ano >= 3 || (inter.ano == 2 && inter.mes >= 6); 
    }
}

function respostasHTML(tempoServ, tempoEfet, intersticio, resultado, pedagio, promocao, tempoFaltando, tempoRestante){
    document.querySelector("#tempo_de_servico").textContent = `${tempoServ.ano} Anos, ${tempoServ.mes} Meses e ${tempoServ.dia} dias`;
    document.querySelector("#tempo_efetivo").textContent = `${tempoEfet.ano} Anos, ${tempoEfet.mes} Meses e ${tempoEfet.dia} dias`;
    document.querySelector("#intersticio").textContent = `${intersticio.ano} Anos, ${intersticio.mes} Meses e ${intersticio.dia} dias`;
    if (pedagio){
        document.querySelector("#pedagio").textContent = `${pedagio.ano} Anos, ${pedagio.mes} Meses e ${pedagio.dia} dias`;
    }
    else{
        document.querySelector("#pedagio").textContent = "----";
    }
    
    document.querySelector("#resultado_final").textContent = `${resultado}`;

    if (tempoFaltando){
        const resultadoTexto = document.querySelector("#resultado_final");
        resultadoTexto.innerHTML = `
        ${resultado}<br>
        Data da Promoção: ${promocao.ano}/${promocao.mes < 10 ? "0" + promocao.mes : promocao.mes}/${promocao.dia < 10 ? "0" + promocao.dia : promocao.dia}<br>
        Tempo Restante: ${tempoRestante.ano} Anos, ${tempoRestante.mes} Meses e ${tempoRestante.dia} dias`;
        resultadoTexto.style.bottom = "30px";
    }
    else if (promocao){
        const resultadoTexto = document.querySelector("#resultado_final");
        resultadoTexto.innerHTML = `
        ${resultado}<br>
        Data da Promoção: ${promocao.ano}/${promocao.mes < 10 ? "0" + promocao.mes : promocao.mes}/${promocao.dia < 10 ? "0" + promocao.dia : promocao.dia}`;
        resultadoTexto.style.bottom = "30px";
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


const tempoGenero = respostas.genero === "masculino" ? new Datas(30, 0, 0) : new Datas(25, 0, 0),
      metadeIntersticio = respostas.patente === "3sgt_superior" ? new Datas(2, 6, 0) : new Datas (3, 0, 0),
      dataLei = new Datas(2022, 1, 1),
      intersticio = respostas.requerimento.subtrairData(respostas.promocao),
      tempoEfetivo = respostas.requerimento.subtrairData(respostas.inclusao).somaData(respostas.averbForca),
      tempodeServico = tempoEfetivo.somaData(respostas.averbPrivada),
      averbTotal = respostas.averbForca.somaData(respostas.averbPrivada);


let Resultado = dataLei.subtrairData(respostas.inclusao);
Resultado = Resultado.subtrairData(respostas.tempoFora);
Resultado = Resultado.somaData(averbTotal);
Resultado = tempoGenero.subtrairData(Resultado);



const Pedagio = new Datas(0, 0, Math.round((Resultado.ano * 365 + Resultado.mes * 30 + Resultado.dia) * 0.17));
Resultado = Resultado.somaData(Pedagio);

const dataPromocao = dataLei.somaData(Resultado),
      tempoRestante = dataPromocao.subtrairData(respostas.requerimento),
      temTempoFaltando = tempoRestante.ano >= 0 && tempoRestante.mes >= 0 && tempoRestante.dia > 0,
      limiteRequerimento = respostas.requerimento.subtrairData(dataPromocao),
      passouLimite = limiteRequerimento.ano > 0 || limiteRequerimento.mes > 1 || (limiteRequerimento.mes == 1 && (limiteRequerimento.dia >= 1 && limiteRequerimento.dia <= 30));


if (!temIntersticio(intersticio, metadeIntersticio)){
    respostasHTML(tempodeServico, tempoEfetivo, intersticio, "O Militar não possui metade de seu interstício.");
}
else if (Object.values(Resultado).some(valor => valor < 0) || Object.values(Resultado).every(valor => valor === 0)){
    respostasHTML(tempodeServico, tempoEfetivo, intersticio, "O Militar deverá ser promovido na data do Requerimento.");
}
else if (temTempoFaltando){
    respostasHTML(tempodeServico, tempoEfetivo, intersticio, "O Militar não está apto para ser promovido.", Pedagio, dataPromocao, temTempoFaltando, tempoRestante);
}
else if (passouLimite){
    respostasHTML(tempodeServico, tempoEfetivo, intersticio, "O Militar deverá ser promovido na data do Requerimento.", Pedagio, dataPromocao);
}
else{
    respostasHTML(tempodeServico, tempoEfetivo, intersticio, "O Militar está apto a ser promovido na data de sua promoção.", Pedagio, dataPromocao);
}











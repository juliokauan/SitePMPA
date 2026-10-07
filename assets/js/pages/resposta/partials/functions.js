import Datas from './datasClass';

export function temRespostasFaltando(obj){
    return Object.values(obj).some(valor =>{
        if (typeof valor === 'object' && valor !== null){
            return temRespostasFaltando(valor);
        }
        return typeof valor === "string" ? valor.trim() === "": !valor;
    })
}

export function criarData(data){
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

export function transformarDados(respostas){
    respostas.inclusao = criarData(respostas.inclusao);
    respostas.requerimento = criarData(respostas.requerimento);
    respostas.promocao = criarData(respostas.promocao);
    respostas.averbForca = criarData(respostas.averbForca);
    respostas.averbPrivada = criarData(respostas.averbPrivada);
}
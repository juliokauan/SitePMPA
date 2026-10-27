export default class Datas{
    constructor(anoOrobj = 0, mes = 0, dia = 0){
        if (typeof anoOrobj === 'object' && anoOrobj != null){
            const {ano = 0, mes = 0, dia = 0} = anoOrobj;
            this.ano = Number(ano);
            this.mes = Number(mes);
            this.dia = Number(dia);
        }
        else{
            this.ano = Number(anoOrobj);
            this.mes = Number(mes);
            this.dia = Number(dia);
        }
    }

    somaData(data){
        if (!data){
            return new Datas();
        }
        let dia = this.dia;
        let mes = this.mes;
        let ano = this.ano;
        
        dia += data.dia;
        while (dia >= 30){
            mes++;
            dia -= 30;
        }
        mes += data.mes;
        while (mes >= 12){
            ano++;
            mes -= 12;
        }
        ano += data.ano;
        return new Datas(ano, mes, dia);
    }

    subtrairData(data){
        if (!data){
            return new Datas();
        }
        let dia = this.dia;
        let mes = this.mes;
        let ano = this.ano;

        dia -= data.dia;
        while (dia < 0){
            mes--;
            dia += 30;
        }
        mes -= data.mes;
        while (mes < 0){
            ano--;
            mes += 12;
        }
        ano -= data.ano;
        return new Datas(ano, mes, dia);
    }
}
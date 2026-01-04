import { getISOWeek } from 'date-fns';

class CalculoSuporte{
    
    static diaSemana(data = new Date.now){
        
        const dia = data.getDate();
        const mes = data.getMonth() + 1;
        const ano = data.getFullYear();
        
        const diaDaSemana = (dia + Math.floor(((mes+1)*13)/5) + ano%100 + Math.floor((ano%100)/4) + Math.floor(ano/400) + 5*Math.floor(ano/100))%7;
        return diaDaSemana;
    }
    static semanaAno(data = new Date.now){

        const semanaDoAno = getISOWeek(data);
        
        return semanaDoAno;
    }

}
export default CalculoSuporte;
class CPF{
    constructor(cpf){
        this.cpf = cpf.replace(/\D+/g, '')
    }
    verificaCPF(){
        let cpfLimpo = this.cpf
        let cpfUndefined = cpfLimpo === "undefined"
        let lengthCPF = cpfLimpo.length !== 11
        if( cpfUndefined || lengthCPF ||this.isSequencia() ){
            return false
        }
        const cpfParcial = cpfLimpo.slice(0, -2)
        const digito1 = CPF.criaDigito(cpfParcial)
        const digito2 = CPF.criaDigito(cpfParcial + digito1)
        const cpfComDigito =  cpfParcial + digito1 + digito2
        return cpfComDigito === cpfLimpo

        
    }
    
    static criaDigito(cpfParcial){
        const cpfArray= Array.from(cpfParcial)
        const multiplicaDigitos = (valor, indice) => Number(valor * (cpfArray.length + 1 - indice))
        const somaTudo = (acumulador, valorAtual) => acumulador += valorAtual
        const soma =  cpfArray
            .map(multiplicaDigitos)
            .reduce(somaTudo,0)


        const criarDigito = (valor) => {
            if(valor % 11 === 0 || valor % 11 == 1){
                return 0
            }else{
                return 11 - (valor % 11)
            }
        }
        const digito = criarDigito(soma)
        
        return String(digito) 
    }
    isSequencia(){
        const sequencia = this.cpf[0].repeat(this.cpf.length)
        return sequencia === this.cpf
    }

    gerarCPF(){
        const cpfArray = []
        for(let i = 0; i <=8; i++){
            cpfArray.push(Math.floor(Math.random() * (9 - 0) + 0))
        }
        const cpfParcial = cpfArray.toString().replace(/\D+/g,'')
        const digito1 = CPF.criaDigito(cpfParcial)
        const digito2 = CPF.criaDigito(cpfParcial + digito1)
        const cpfComDigito =  cpfParcial + digito1 + digito2
        const cpfArray2 = Array.from(cpfComDigito)
        const cpfForm = (acumulador , atual, indice) => {
            if(indice === 2 || indice === 5){
                return acumulador += atual +'.'
            }else if(indice === 8){
                return acumulador += atual +'-'
            }
            return acumulador += atual
        }
        const cpfFormatado = cpfArray2.reduce(cpfForm, '')

        return cpfFormatado

    }
}


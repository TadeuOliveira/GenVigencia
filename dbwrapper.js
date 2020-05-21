const vigenciaHelpers = {
    formatId: (date) => {
        return date.toISOString().substr(0,10)
    },
    formatIdLabel: (date) => {
        let id = date.toISOString().substr(0,10)
        let label = id.split('-').reverse().join('/')
        return {id,label}
    }
}

function geraVigencia(isodate,params){
    let { 
        genFirstDate,
        bloqFirstDate,
        genNextDate,
        bloqNextDate,
        loopController,
        genList,
        forceSort
    } = params

    let primeiraVigencia = genFirstDate.func(isodate,genFirstDate.args)

    let bloqPrimeiraVigencia = bloqFirstDate ? bloqFirstDate.func(primeiraVigencia,bloqFirstDate.args) : false

    while(bloqPrimeiraVigencia){

        primeiraVigencia = genNextDate.func(primeiraVigencia,genNextDate.args)

        bloqPrimeiraVigencia = bloqFirstDate.func(primeiraVigencia,bloqFirstDate.args)
    }

    if(!genList) return primeiraVigencia
    
    let vigenciaList = [primeiraVigencia]
    let proximaVigencia = primeiraVigencia
    let loopIndex = 0
    
    while(loopController.func(proximaVigencia,loopIndex,loopController.args)){

        proximaVigencia = genNextDate.func(primeiraVigencia,genNextDate.args)

        bloqProximaVigencia = bloqNextDate.func(primeiraVigencia,bloqFirstDate.args)

        if(!bloqProximaVigencia) vigenciaList.push(proximaVigencia)
    }

    return vigenciaList
}
exports.geraVigencia = geraVigencia
exports.helpers = vigenciaHelpers

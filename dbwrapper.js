const vigenciaHelpers = {
    formatId: (date) => {
        return date.toISOString().substr(0,10)
    },
    formatIdLabel: (date) => {
        let id = date.toISOString().substr(0,10)
        let label = id.split('-').reverse().join('/')
        return {id,label}
    },
    skipNDays: (date,n) => {
        let d = new Date(date)
        d.setDate(d.getDate() + n)
        return d.toISOString().substr(0,10)
    },
    isAfterNDays: (currdate,initdate,n) => {
        let currd = new Date(currdate+'T00:00:00')
        let initd = new Date(initdate+'T00:00:00')
        return (currd - initd < 86400000*n)
    },
    getVigencia: (date,regras) => {
        let d = new Date(date+'T00:00:00')
        let vigObj = regras.find(e => e.min <= d.getDate() && e.max >= d.getDate())
        d.setMonth(d.getMonth() + (vigObj.vigencia <= vigObj.max))
        d.setDate(vigObj.vigencia)
        return d.toISOString().substr(0,10)
    },
    getNextVigencia: (date,regras) => {
        let vigencia = new Date(date+"T00:00:00")
        let oldvigencia = [vigencia.getDate(),vigencia.getMonth()]
        let regraAtual = regras.findIndex(e => vigencia.getDate() == e.vigencia)
        let proximaRegra = regras[(regraAtual+1)%regras.length]
        vigencia.setMonth(vigencia.getMonth() + (vigencia.getDate() >= proximaRegra.vigencia))
        vigencia.setDate(proximaRegra.vigencia)
        return vigencia.toISOString().substr(0,10)
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

    let bloqPrimeiraVigencia = bloqFirstDate ? bloqFirstDate.func(primeiraVigencia,bloqFirstDate.args,isodate) : false
    while(bloqPrimeiraVigencia){
        primeiraVigencia = genNextDate.func(primeiraVigencia,genNextDate.args,isodate)
        bloqPrimeiraVigencia = bloqFirstDate.func(primeiraVigencia,bloqFirstDate.args,isodate)
    }

    if(!genList) return primeiraVigencia
    
    let vigenciaList = [primeiraVigencia]
    let proximaVigencia = primeiraVigencia
    let loopIndex = 0
    
    while(loopController.func(proximaVigencia,loopIndex,loopController.args,isodate)){

        proximaVigencia = genNextDate.func(primeiraVigencia,genNextDate.arg,isodates)

        bloqProximaVigencia = bloqNextDate.func(primeiraVigencia,bloqFirstDate.args,isodate)

        if(!bloqProximaVigencia) vigenciaList.push(proximaVigencia)
    }

    return vigenciaList
}
exports.geraVigencia = geraVigencia
exports.helpers = vigenciaHelpers

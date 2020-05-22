//apagar coisas de node depois

global.vigenciaHelpers = {
    formatId: (date) => {
        return date.toISOString().substr(0,10)
    },
    formatIdLabel: (date) => {
        let id = date.toISOString().substr(0,10)
        let label = id.split('-').reverse().join('/')
        return {id,label}
    },
    convertIdToIdLabel: (id) => {
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
        return ((currd - initd) > 86400000*n)
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
    },
    getVigenciaAgendada: (date,agenda) => {
        let d = new Date(date)
        let {vigencia} = agenda.find(e => {
            let minDate = new Date(e.min)
            let maxDate = new Date(e.max)
            return (d >= minDate) && (d <= maxDate)
        })
        return vigencia
    },
    getNextVigenciaAgendada: (date,agenda) => {
        let index = agenda.findIndex(e => e.vigencia == date)
        return agenda[index+1].vigencia
    }
}

global.templatesVigencia = {



}

function geraVigencia(isodate,params){

    let helpers = vigenciaHelpers
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
        console.log({bloqPrimeiraVigencia,primeiraVigencia})
    }

    if(!genList) return primeiraVigencia
    let vigenciaList = [helpers.convertIdToIdLabel(primeiraVigencia)]
    let proximaVigencia = primeiraVigencia
    let loopIndex = 0
    
    while(loopController.func(proximaVigencia,loopIndex,vigenciaList,loopController.args,isodate)){
        proximaVigencia = genNextDate.func(proximaVigencia,genNextDate.args,isodate)
        bloqProximaVigencia = bloqNextDate ? bloqNextDate.func(proximaVigencia,loopIndex,vigenciaList,bloqNextDate.args,isodate) : false
        if(!bloqProximaVigencia) vigenciaList.push(helpers.convertIdToIdLabel(proximaVigencia))
        loopIndex++
        listSize = vigenciaList.length
    }

    if(forceSort){
        vigenciaList.sort((primeiro,segundo) => {
            let dataPrimeiro = new Date(primeiro.id)
            let dataSegundo  = new Date(segundo.id)
            let diff = dataPrimeiro - dataSegundo
            if(diff < 0) return -1;
            if(diff > 0) return 1;
            else return 0;
        })   
    }

    return vigenciaList
}
exports.geraVigencia = geraVigencia
exports.helpers = vigenciaHelpers

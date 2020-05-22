const dbw = require('./dbwrapper')

let agenda = [
    {
        min: '2020-04-16',
        max: '2020-04-30',
        vigencia: '2020-05-15'
    },
    {
        min: '2020-05-01',
        max: '2020-05-15',
        vigencia: '2020-06-01'
    },
    {
        min: '2020-05-16',
        max: '2020-05-31',
        vigencia: '2020-06-15'
    },
    {
        min: '2020-06-01',
        max: '2020-06-15',
        vigencia: '2020-07-01'
    },
    {
        min: '2020-06-16',
        max: '2020-06-30',
        vigencia: '2020-07-15'
    },
    {
        min: '2020-07-01',
        max: '2020-07-15',
        vigencia: '2020-08-01'
    },
    {
        min: '2020-07-16',
        max: '2020-07-30',
        vigencia: '2020-08-15'
    },
    {
        min: '2020-08-01',
        max: '2020-08-15',
        vigencia: '2020-09-01'
    } 
]

let regras = [
    {
        min: 1,
        max: 10,
        vigencia: 20
    },
    {
        min: 11,
        max: 31,
        vigencia: 20
    },
]

let vigConfig = {
    genFirstDate: {
        func: (isodate,args) => {
            let {iniVig} = args
            let d = new Date(isodate+'T00:00:00')
            let skipMonth = d.getDate() > iniVig
            d.setMonth(d.getMonth() + skipMonth)
            d.setDate(iniVig)
            return dbw.helpers.formatId(d)
        },
        args: {
            iniVig: 20
        }
    },
    bloqFirstDate: {
        func: (isodate,args,initdate) => {
            return !dbw.helpers.isAfterNDays(isodate,initdate,10)
        },
    },
    genNextDate: {
        func: (isodate,args) => {
            let {iniVig,finVig} = args
            let d = new Date(isodate+'T00:00:00')
            let reachedEnd = d.getDate() == finVig
            d.setMonth(d.getMonth() + reachedEnd)
            let newDate = reachedEnd ? iniVig : d.getDate()+1
            d.setDate(newDate)
            return dbw.helpers.formatId(d)
        },
        args: {
            iniVig: 20,
            finVig: 25
        }
    },
    genList: true,
    loopController: {
        func: (isodate,loopIndex,list,args,initdate) => {
            let {finVig} = args
            let primeiraVigencia = new Date(list[0].id+'T00:00:00')
            let dataAtual = new Date(isodate+'T00:00:00')
            return dataAtual.getDate() < finVig || dataAtual.getMonth()-primeiraVigencia.getMonth() < 1
        },
        args: {
            finVig: 25
        }
    },
    bloqNextDate: {
        func: (isodate,loopIndex,list,args,initdate) => {
            return false
        }
    }
}

console.log(dbw.geraVigencia('2020-05-12',vigConfig))

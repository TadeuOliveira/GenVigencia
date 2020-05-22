const dbw = require('./dbwrapper')

let agenda = [
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
        func: (isodate,params) => {
            let {agenda} = params
            return dbw.helpers.getVigenciaAgendada(isodate,agenda)
        },
        args: {
            agenda: agenda
        }
    },
    bloqFirstDate: {
        func: (isodate,params,initdate) => {
            return false
        },
    },
    genNextDate: {
        func: (isodate,params) => {
            let {agenda} = params
            return dbw.helpers.getNextVigenciaAgendada(isodate,agenda)
        },
        args: {
            agenda: agenda
        }
    },
    genList: true,
    loopController: {
        func: (isodate,loopIndex,listSize,params,initdate) => {
            return listSize < 4
        },
        args: {
            agenda: agenda
        }
    },
    bloqNextDate: {
        func: (isodate,loopIndex,listSize,params,initdate) => {
            let d = new Date(isodate+'T00:00:00')
            return d.getMonth() == 7
        }
    },
    forceSort: true
}

console.log(dbw.geraVigencia('2020-05-22',vigConfig))

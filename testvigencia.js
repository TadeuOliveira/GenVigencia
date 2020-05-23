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
           let {regras} = args
           return dbw.helpers.getVigenciaOneCase(isodate,regras) 
        },
        args: {
            regras
        }
    },
    bloqFirstDate: {
        func: (isodate,args,initdate) => {
            return false
        },
    },
    genNextDate: {
        func: (isodate,args) => {
            let {regras} = args
            return dbw.helpers.getNextVigenciaOneCase(isodate,regras)
        },
        args: {
            regras
        }
    },
    genList: false,
    loopController: {
        func: (isodate,loopIndex,list,args,initdate) => {
            
        },
        args: {
            
        }
    },
    bloqNextDate: {
        func: (isodate,loopIndex,list,args,initdate) => {
            
        }
    }
}

console.log(dbw.geraVigencia('2020-05-11',vigConfig))

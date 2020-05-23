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
//importando template de vigência agendada
console.log('Agendada, apenas uma data:')
console.log(dbw.geraVigencia(
    '2020-05-12',
    dbw.templates.agendada(agenda)
))

console.log('Agendada, uma lista de 3 datas:')
//também é possível sobrecarregar os templates incluindo novas chaves
console.log(dbw.geraVigencia(
    '2020-05-12',
    dbw.templates.agendada(agenda,{
        genList: true,
        loopController: {
            func: (isodate,loopIndex,list,args,initdate) => {
                return list.length < 3
            }
        }
    })
))

let regras = [
    {
        min: 1,
        max: 15,
        vigencia: 1
    },
    {
        min: 16,
        max: 31,
        vigencia: 15
    },
]
//também é possível sobrecarregar os templates incluindo novas chaves
console.log('direta, com 3 datas, evitando dias 01')
console.log(dbw.geraVigencia(
    '2020-05-12',
    dbw.templates.direta(regras,{
        bloqFirstDate: {
            func: (isodate,args,initdate) => {
                let d = new Date(isodate+'T00:00:00')
                return d.getDate() == 1
            }
        },
        genList: true,
        loopController: {
            func: (isodate,loopIndex,list,args,initdate) => {
                return list.length < 3
            }
        },
        bloqNextDate: {
            func: (isodate,args,initdate) => {
                let d = new Date(isodate+'T00:00:00')
                return d.getDate() == 1
            }
        },
    })
))
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

//console.log(dbw.geraVigencia('2020-05-11',vigConfig))

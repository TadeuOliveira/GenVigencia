const dbw = require('./dbwrapper')

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
        func: (isodate) => {
            return dbw.helpers.skipNDays(isodate,5)
        },
    },
    bloqFirstDate: {
        func: (isodate,params,initdate) => {
            return dbw.helpers.isAfterNDays(isodate,initdate,11)
        },
    },
    genNextDate: {
        func: (isodate) => {
            return dbw.helpers.skipNDays(isodate,5)
        },
    },
    genList: false
}

console.log(dbw.geraVigencia('2020-05-22',vigConfig))

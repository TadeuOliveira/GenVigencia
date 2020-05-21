const dbw = require('./dbwrapper')

let vigConfig = {
    genFirstDate: {
        func: (isodate) => {
            return dbw.helpers.skipNDays(isodate,5)
        },
        args: {
        }
    },
    bloqFirstDate: {
        func: (isodate) => {
            let d = new Date(isodate)
            return d.getDate() > 20
        },
        args: {
        }
    },
    genNextDate: {
        func: (isodate) => {
            return dbw.helpers.skipNDays(isodate,5)
        },
        args: {
        }
    }
}

console.log(dbw.geraVigencia('2020-05-20',vigConfig))

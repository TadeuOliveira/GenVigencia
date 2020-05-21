const dbw = require('./dbwrapper')

let vigConfig = {
    genFirstDate: {
        func: (isodate) => {
            let d = new Date()
            d.setDate(d.getDate() + 10)
            return dbw.helpers.formatId(d)
        },
        args: {
            isodate: '2020-05-21'
        }
    },
    genList: false
}

console.log(dbw.geraVigencia('2020-05-20',vigConfig))

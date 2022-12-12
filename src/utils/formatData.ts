
// format date to YYYYMMDD
function format(data?: string) {
    if (data) {
        var date = new Date(data)

        return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
    } else
        return ''
}


// function getFirstDayOfMonth() {
//     var date = new Date()
//     return new Date(date.getUTCFullYear(), date.getMonth(), 1);
// }

// function getLastDayOfMonth(data: Date) {
//     var umMesAFrente = new Date(data.getUTCFullYear(), data.getMonth() + 1, 1, 23, 59, 59);
//     return addDays(umMesAFrente, -1)
// }

// function addDays(date: Date, days: number) {
//     var result = new Date(date)
//     result.setDate(result.getDate() + days)
//     return result
// }

export { format }
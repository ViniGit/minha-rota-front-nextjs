
// format date to YYYYMMDD
export function formatData(data: string) {

    var [day, month, year] = data.split("/")

    return year + '-' + ("0" + month).slice(-2) + '-' + ("0" + day).slice(-2)

}
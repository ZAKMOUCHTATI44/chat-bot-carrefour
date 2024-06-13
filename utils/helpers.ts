export function convertStringToDate(dateString:string):Date {
    const [day, month, year] = dateString.toString().split("-")
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
}
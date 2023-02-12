export const TimeStringToDate = (time: string) => {
    const date = new Date(Date.parse(time))
    const [month, day, year] = [
        date.getMonth(),
        date.getDate(),
        date.getFullYear(),
    ];
    return `${day}-${month}-${year}`
}
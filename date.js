const getDate = () => {
    let today = new Date()

    let options = {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    }

    let day = today.toLocaleDateString('en-IN', options)
    return day
}
const getYear = () => {
    let today = new Date()
    return today.getFullYear()
}
export default getDate()
export { getYear }
export const parseListObjectToIds = (arr) => {
    const parsedArr = []
    let count = 0

    arr.forEach((el) => {
        if (typeof el === 'object') {
            parsedArr.push(el.id)
            count++
        }
    })

    if (count == 0) {
        return arr
    }

    return parsedArr
}
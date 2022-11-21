function showNumber(price, fixed = 0)
{
    let output = price.toFixed(fixed).toString().split("").reverse().join("")
    let index = 3
    while (output[index] !== undefined)
    {
        output = output.slice(0, index) + "," + output.slice(index)
        index += 4
    }
    return output.split("").reverse().join("")
}

export default showNumber